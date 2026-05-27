/* ============================================================================
 *  BC Remote Config GUI — Astromech-Control integration
 *  --------------------------------------------------------------------------
 *  Drives the BC's RC button-matrix configuration (multi-tap mappings,
 *  switch positions, knob functions, thresholds, mode binding) from the
 *  Gest section of the Astromech-Control web app. Pushes changes to the
 *  BC over the existing transport (WebSerial → LoRa OR HTTP → gateway)
 *  using a chunked-JSON protocol that the BC firmware reassembles via
 *  #CB / #CC / #CE commands.
 *
 *  Wire format per push:
 *    :EBC#CB <seq> <N>                — begin transaction (N total chunks)
 *    :EBC#CC <seq> <idx>:<rawJson>    — one chunk; raw JSON bytes after ':'
 *    :EBC#CE <seq>                    — commit (BC parses + applies)
 *
 *  The :L prefix wrapping happens in sendBCCommand() based on
 *  CommandConnectionSerial. URL-encoding for the HTTP path is also handled
 *  there. Each push is debounced (500 ms idle) to avoid hammering the link
 *  during slider drags / rapid edits.
 * ============================================================================ */
(function () {
  'use strict';

  // ── DOM helpers ──────────────────────────────────────────────────────────
  const $    = (id) => document.getElementById(id);
  const $$   = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const escH = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
                              .replace(/>/g,'&gt;').replace(/"/g,'&quot;');

  // ── BC config domain model (mirrors rc_config.h on the BC) ───────────────
  // Defaults match the BC firmware's rcConfigLoadDefaults() output so a
  // first-load state is meaningful even before we read anything back.
  const BTN_LABELS = ['', 'B1','B2','B3','B4','B5','B6',
                          'T4 Left','T4 Right','T5 Left','T5 Right',
                          'T3 Left','T3 Right','T2 Left','T2 Right',
                          'T6 Left','T6 Right','T1 Left','T1 Right','Unassigned'];

  const SWITCH_DEFAULTS = {
    SA: {channel:  8, positions: 3}, SB: {channel:  9, positions: 3},
    SC: {channel: 10, positions: 3}, SD: {channel: 11, positions: 3},
    SE: {channel: 12, positions: 3}, SF: {channel: 13, positions: 2},
    SG: {channel: 14, positions: 3}, SH: {channel: 15, positions: 2},
    SI: {channel:  0, positions: 2}, SJ: {channel:  0, positions: 2},
  };
  const SWITCH_NAMES = Object.keys(SWITCH_DEFAULTS);
  const KNOB_DEFAULTS = { S1: {channel: 5, function: 1}, S2: {channel: 6, function: 2} };
  const KNOB_NAMES    = Object.keys(KNOB_DEFAULTS);

  // Action types — keep in sync with BC's RcActionType enum + actionFromJson.
  const ACTION_LABELS = {
    '':       '— none —',
    'espnow': 'ESP-NOW command',
    'hcr':    'HCR Vocalizer',
    'anim':   'Local animation',
    'serial': 'Serial command',
  };
  const ESPNOW_TARGETS = ['BS','DC','DP','HP','DG','BR'];
  const SERIAL_PORTS   = [
    { v: 'BL', n: 'BL — Body LED Controller' },
    { v: 'RD', n: 'RD — Roam-A-Dome' },
    { v: 'MP', n: 'MP — HCR / MP3' },
    { v: 'ST', n: 'ST — Stealth controller' },
    { v: 'S1', n: 'S1 — Aux serial 1' },
    { v: 'S2', n: 'S2 — Aux serial 2' },
  ];
  const HCR_FN_LIST = [
    [14,'PlayWAV'], [16,'StopWAV'], [9,'StopEmote'], [8,'Stop All'],
    [4,'Stimulate'], [3,'Trigger'], [2,'SetEmotion'], [17,'SetVolume'],
    [5,'Overload'], [6,'Muse'], [11,'ResetEmotions'],
  ];
  const HCR_EMOTIONS    = [['0','HAPPY'],['1','SAD'],['2','MAD'],['3','SCARED'],['4','OVERLOAD']];
  const HCR_AUDIO_CHANS = [['0','V (vocalizer)'],['1','A'],['2','B']];
  const HCR_FN_USES_EMOTION    = new Set([2,3,4,12,19]);
  const HCR_FN_USES_AUDIO_CHAN = new Set([14,15,16,17,22,24,25,26,28]);

  const ANIM_FN_LIST = [
    [1,'Normal Operations'], [2,'Panel Wave'], [3,'Panel Wave Fast'],
    [4,'Dome Periscope'], [5,'All Open/Close'], [6,'Harlem Shake'],
  ];

  const MAX_ACTIONS_PER_TIER = 5;

  // ── Default thresholds (matches BC firmware) ─────────────────────────────
  function defaultThresholds() {
    const labels = ['B1','B2','B3','B4','B5','B6',
                    'T4 Left','T4 Right','T5 Left','T5 Right',
                    'T3 Left','T3 Right','T2 Left','T2 Right',
                    'T6 Left','T6 Right',
                    'T1 Left','T1 Right','Unassigned'];
    return labels.map((label, i) => {
      let minPwm = 1850 - (i + 1) * 50;
      let maxPwm = 1850 - i * 50 - 1;
      if (i === 16) { minPwm = 1023; maxPwm = 1049; }
      else if (i === 17) { minPwm = 850;  maxPwm = 960;  }
      else if (i === 18) { minPwm = 800;  maxPwm = 849;  }
      return { id: i + 1, label, minPwm, maxPwm };
    });
  }

  // ── State ────────────────────────────────────────────────────────────────
  const state = {
    config: {
      tapWindowMs:   500,
      matrixChannel: 7,
      funcBindings:  { mode: 4 },          // SE = index 4
      thresholds:    defaultThresholds(),
      mappings:      {},                   // keyed by mode*100 + btn
      switches:      Object.fromEntries(SWITCH_NAMES.map(n => [n, { ...SWITCH_DEFAULTS[n] }])),
      knobs:         Object.fromEntries(KNOB_NAMES.map(n => [n, { ...KNOB_DEFAULTS[n] }])),
    },
    currentMode:  1,        // 1 / 2 / 3
    editingBtn:   null,     // when modal is open for a button
    seqCounter:   1,        // chunked-config sequence number
    debounceId:   null,     // pending debounced push
    livePush:     true,
    busy:         false,    // suppress overlapping pushes
  };

  // ────────────────────────────────────────────────────────────────────────
  //  Transport — send a single :EBC-prefixed command to the BC
  //
  //  Picks between WebSerial (writeToStream) and HTTP (httpGet) based on
  //  the existing CommandConnectionSerial flag in main.js. The :L LoRa
  //  routing prefix is added here so callers only think about the inner
  //  :EBC#... payload.
  // ────────────────────────────────────────────────────────────────────────
  function sendBCCommand(inner /* string without :L:EBC envelope */) {
    // 'inner' is the raw command the BC's main-loop parser should see, e.g.
    // "#CB 1 47" or "#CC 1 0:{\"type\"..." (no leading :L:EBC).
    // We wrap with :EBC for ESP-NOW routing, and :L for the LoRa relay.
    const fullPayload = ':L:EBC' + inner;
    try {
      if (typeof CommandConnectionSerial !== 'undefined' && CommandConnectionSerial && typeof writeToStream === 'function') {
        writeToStream(fullPayload);
      } else if (typeof httpGet === 'function') {
        // HTTP gateway path. Encode the part after the gateway's static prefix.
        const url = 'http://192.168.4.101/?param0=:&param1=' + encodeURIComponent(fullPayload);
        httpGet(url);
      } else {
        console.warn('[BCG] no transport available for', fullPayload);
      }
    } catch (e) {
      console.error('[BCG] sendBCCommand failed:', e, fullPayload);
    }
  }

  // ────────────────────────────────────────────────────────────────────────
  //  Chunker — serialize state.config to JSON and ship it over the wire
  //
  //  CHUNK_PAYLOAD_BYTES is the budget for raw JSON per #CC command. The
  //  ESP-NOW structCommand[100] is the real hard limit; "#CC <seq> <idx>:"
  //  envelope is ~13 bytes for sane seq/idx → 85 bytes data is safe.
  // ────────────────────────────────────────────────────────────────────────
  const CHUNK_PAYLOAD_BYTES = 80;
  const CHUNK_INTER_DELAY_MS = 25;   // small gap between sends to give the relay breathing room

  function setSyncStatus(text, kind /* '', 'busy', 'synced', 'error' */) {
    const el = $('bcgSyncStatus'); if (!el) return;
    el.textContent = text;
    el.classList.remove('busy', 'synced', 'error');
    if (kind) el.classList.add(kind);
  }

  async function pushConfigChunked() {
    if (state.busy) return;     // another push in flight; latest debounced will catch up
    state.busy = true;
    setSyncStatus('pushing…', 'busy');

    const envelope = { type: 'SET_CONFIG', data: state.config };
    const payload  = JSON.stringify(envelope);

    // Split into raw byte chunks (no escaping — the BC reassembles by
    // concatenation). JSON characters are all printable ASCII so the colon
    // separator on the wire is unambiguous (data after the FIRST ':' is raw).
    const chunks = [];
    for (let i = 0; i < payload.length; i += CHUNK_PAYLOAD_BYTES) {
      chunks.push(payload.slice(i, i + CHUNK_PAYLOAD_BYTES));
    }

    const seq = (state.seqCounter++ & 0xFFFF) || 1;   // never 0 (BC uses 0 as "no active")
    try {
      sendBCCommand(`#CB ${seq} ${chunks.length}`);
      for (let i = 0; i < chunks.length; i++) {
        // Tiny delay between packets to avoid overrunning the LoRa relay
        if (i > 0) await sleep(CHUNK_INTER_DELAY_MS);
        sendBCCommand(`#CC ${seq} ${i}:${chunks[i]}`);
      }
      await sleep(CHUNK_INTER_DELAY_MS);
      sendBCCommand(`#CE ${seq}`);
      console.log(`[BCG] pushed config seq=${seq} (${chunks.length} chunks, ${payload.length} bytes)`);
      setSyncStatus(`synced (${chunks.length}c · ${payload.length}B)`, 'synced');
    } catch (e) {
      console.error('[BCG] push failed:', e);
      setSyncStatus('push failed', 'error');
    } finally {
      state.busy = false;
    }
  }
  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  // Debounced trigger — call this on every edit; we'll bundle bursts into a
  // single push at the trailing edge of a 500ms idle window.
  const DEBOUNCE_MS = 500;
  function schedulePush() {
    if (!state.livePush) { setSyncStatus('local — Live push off'); return; }
    if (state.debounceId) clearTimeout(state.debounceId);
    setSyncStatus('queued…', 'busy');
    state.debounceId = setTimeout(() => {
      state.debounceId = null;
      pushConfigChunked();
    }, DEBOUNCE_MS);
  }

  // ────────────────────────────────────────────────────────────────────────
  //  GET_CONFIG (single-packet — fits in one ESP-NOW command, no chunking
  //  needed since the request itself is tiny). Note: the BC's RESPONSE
  //  travels back over USB Serial, not ESP-NOW, so this is a "kick the BC
  //  to print its current config to its USB monitor" affordance for now.
  // ────────────────────────────────────────────────────────────────────────
  function requestConfig() {
    sendBCCommand('{"type":"GET_CONFIG"}');
    setSyncStatus('GET_CONFIG sent — see BC serial monitor', 'busy');
  }

  function requestDefaults() {
    if (!confirm('Reset BC config to factory defaults? This will overwrite the BC\'s NVS settings.')) return;
    // Reset our local state to defaults too so the UI reflects what the BC
    // will become after applying.
    state.config = {
      tapWindowMs:   500,
      matrixChannel: 7,
      funcBindings:  { mode: 4 },
      thresholds:    defaultThresholds(),
      mappings:      {},
      switches:      Object.fromEntries(SWITCH_NAMES.map(n => [n, { ...SWITCH_DEFAULTS[n] }])),
      knobs:         Object.fromEntries(KNOB_NAMES.map(n => [n, { ...KNOB_DEFAULTS[n] }])),
    };
    renderAll();
    sendBCCommand('{"type":"RESET_DEFAULTS"}');
    setSyncStatus('defaults sent', 'busy');
  }

  // ────────────────────────────────────────────────────────────────────────
  //  Render — top-level (called on init + after any state mutation)
  // ────────────────────────────────────────────────────────────────────────
  function renderAll() {
    renderReferenceView();
    renderButtonGrid();
    renderSwitchList();
    renderKnobList();
    renderThresholds();
    renderSettings();
  }

  // Reference view ────────────────────────────────────────────────────────
  // Photo-overlay version: drops cream-coloured callout boxes onto a clean
  // photo of the transmitter at percentage coordinates, so the layout scales
  // with the image at any size and stays usable on a 7" tablet.
  //
  // Each callout's content comes from the action `note` field that the user
  // typed in the modal — NOT from a synthesized action summary. Per the
  // user's design choice: if no note is typed, the line is left blank.
  //
  // REF_LAYOUT maps each control to its anchor position on the image and the
  // tier/position labels to display on each line. Adjust the {l, t} percents
  // if you change the transmitter background image.
  const REF_LAYOUT = {
    // ── Buttons (clickable — open the button modal on click) ────────────
    //   Trim switches T1-T6 around the gimbals. Tiers labeled "1×/2×/3×"
    //   matching the modal's Single/Double/Triple tap layout.
    btn: [
      // T3 (vertical, RIGHT of left gimbal): top/bottom = btn 11 / 12
      { btn: 11, title: 'T3 Up',    l: 32, t: 50 },
      { btn: 12, title: 'T3 Down',  l: 32, t: 73 },
      // T2 (vertical, LEFT of right gimbal): top/bottom = btn 13 / 14
      { btn: 13, title: 'T2 Up',    l: 66, t: 50 },
      { btn: 14, title: 'T2 Down',  l: 66, t: 73 },
      // T4 (horiz, bottom-LEFT): left/right = btn 7 / 8
      { btn:  7, title: 'T4 Left',  l: 16, t: 87 },
      { btn:  8, title: 'T4 Right', l: 27, t: 87 },
      // T5 (horiz, bottom-LEFT inner): left/right = btn 9 / 10
      { btn:  9, title: 'T5 Left',  l: 36, t: 87 },
      { btn: 10, title: 'T5 Right', l: 47, t: 87 },   // (NOTE: was T5 wiring sub-row)
      // T6 (horiz, bottom-RIGHT inner): left/right = btn 15 / 16
      { btn: 15, title: 'T6 Left',  l: 53, t: 87 },
      { btn: 16, title: 'T6 Right', l: 64, t: 87 },
      // T1 (horiz, bottom-RIGHT): left/right = btn 17 / 18
      { btn: 17, title: 'T1 Left',  l: 73, t: 87 },
      { btn: 18, title: 'T1 Right', l: 84, t: 87 },
      // Six programmable buttons B1-B6 at very bottom (rough positions)
      { btn:  1, title: 'B1', l: 38, t: 97 },
      { btn:  2, title: 'B2', l: 44, t: 97 },
      { btn:  3, title: 'B3', l: 50, t: 97 },
      { btn:  4, title: 'B4', l: 56, t: 97 },
      { btn:  5, title: 'B5', l: 62, t: 97 },
      { btn:  6, title: 'B6', l: 68, t: 97 },
    ],
    // ── Switches (display-only for now; modal editor TODO) ──────────────
    sw: [
      { sw: 'SF', title: 'SF', l:  3, t: 15 },
      { sw: 'SE', title: 'SE', l:  3, t: 32 },
      { sw: 'SA', title: 'SA', l:  3, t: 49 },
      { sw: 'SB', title: 'SB', l: 18, t:  8 },
      { sw: 'SC', title: 'SC', l: 82, t:  8 },
      { sw: 'SD', title: 'SD', l: 97, t: 49 },
      { sw: 'SG', title: 'SG', l: 97, t: 32 },
      { sw: 'SH', title: 'SH', l: 97, t: 15 },
      { sw: 'SI', title: 'SI', l: 33, t: 36 },
      { sw: 'SJ', title: 'SJ', l: 67, t: 36 },
    ],
    // ── Knobs (display-only) ────────────────────────────────────────────
    knob: [
      { knob: 'S1', title: 'S1 — HCR Vocalizer Vol', l: 41, t: 33 },
      { knob: 'S2', title: 'S2 — HCR WAV Vol',       l: 59, t: 33 },
    ],
  };

  // 3-position switch display labels (override per-switch if a switch only
  // has 2 positions — Down/Up).
  const SWITCH_POS_LABELS_3 = ['Dn:', 'Md:', 'Up:'];
  const SWITCH_POS_LABELS_2 = ['Dn:', 'Up:'];

  function renderReferenceView() {
    // Quick Reference is now a pure hand-curated image — no dynamic overlay,
    // no per-mode mutation, no clickable callouts. Editing happens on the
    // sibling editor tabs. Leaving this function as a no-op so the rest of
    // the render chain (called from mode tabs, modal apply, etc.) doesn't
    // need to know whether the dynamic overlay exists.
    return;
  }

  // Dead-code path for the old dynamic-overlay reference view. Kept commented
  // out below for reference in case we want to re-enable a dynamic version
  // alongside the Quick Reference image in a future revision.
  function _renderReferenceView_legacy_dynamicOverlay() {
    const refModeLbl = $('bcgRefModeLabel');
    if (refModeLbl) refModeLbl.textContent = `Mode ${state.currentMode} (${['', 'SW Down', 'SW Mid', 'SW Up'][state.currentMode]})`;

    const overlay = $('bcgRefOverlay');
    if (!overlay) return;
    overlay.innerHTML = '';

    // ── Button callouts (clickable) ──────────────────────────────────────
    for (const spec of REF_LAYOUT.btn) {
      const key = String(state.currentMode * 100 + spec.btn);
      const m   = state.config.mappings[key];
      const note1 = noteForTier(m, 't1');
      const note2 = noteForTier(m, 't2');
      const note3 = noteForTier(m, 't3');
      const hasAny = !!(note1 || note2 || note3);
      const callout = makeCallout({
        title: spec.title,
        lines: [
          { tier: '1×', text: note1 },
          { tier: '2×', text: note2 },
          { tier: '3×', text: note3 },
        ],
        left: spec.l, top: spec.t,
        configured: hasAny,
        onClick: () => openButtonModal(spec.btn),
      });
      overlay.appendChild(callout);
    }

    // ── Switch callouts (display-only) ───────────────────────────────────
    for (const spec of REF_LAYOUT.sw) {
      const sw = state.config.switches?.[spec.sw];
      const positions = sw?.positions || 3;
      const labels = (positions === 2) ? SWITCH_POS_LABELS_2 : SWITCH_POS_LABELS_3;
      const slots = (positions === 2) ? ['p0', 'p2'] : ['p0', 'p1', 'p2'];
      const lines = slots.map((slot, i) => ({
        tier: labels[i],
        text: noteForSwitchSlot(sw, slot),
      }));
      const hasAny = lines.some(l => l.text);
      const callout = makeCallout({
        title: spec.title,
        lines,
        left: spec.l, top: spec.t,
        configured: hasAny,
        readonly: true,
      });
      overlay.appendChild(callout);
    }

    // ── Knob callouts (display-only) ─────────────────────────────────────
    for (const spec of REF_LAYOUT.knob) {
      const kn = state.config.knobs?.[spec.knob];
      const fnLabels = { 0: '— none —', 1: 'HCR Vocalizer Volume', 2: 'HCR WAV Volume' };
      const fnText = kn ? (fnLabels[kn.function] || `fn${kn.function}`) : '';
      const chText = kn ? `CH ${kn.channel ?? '?'}` : '';
      const callout = makeCallout({
        title: spec.title,
        lines: [
          { tier: 'fn:', text: fnText },
          { tier: 'ch:', text: chText },
        ],
        left: spec.l, top: spec.t,
        configured: !!(kn && kn.function),
        readonly: true,
      });
      overlay.appendChild(callout);
    }
  }

  // Pull the typed `note` string off the first action in a tap tier. If
  // there's no action in that tier, or the action has no note, returns ''.
  function noteForTier(mapping, tierKey) {
    if (!mapping) return '';
    const arr = mapping[tierKey];
    if (!Array.isArray(arr) || arr.length === 0) return '';
    // If multiple actions in one tier, just show the first's note — keeps
    // the callout to one line per tier. User can open the modal for detail.
    return (arr[0] && arr[0].note) || '';
  }
  // Same but for switch position slots (p0/p1/p2).
  function noteForSwitchSlot(sw, slotKey) {
    if (!sw) return '';
    const arr = sw[slotKey];
    if (!Array.isArray(arr) || arr.length === 0) return '';
    return (arr[0] && arr[0].note) || '';
  }

  // Build a callout DIV. `lines` = array of { tier, text }. Each line is
  // rendered as `tier` (bold) + `text` (the note); empty text shows as a
  // blank space-holder so layout stays stable across mode/config changes.
  function makeCallout(opts) {
    const el = document.createElement('div');
    el.className = 'bcg-ref-callout';
    if (opts.configured) el.classList.add('configured');
    else el.classList.add('empty');
    if (opts.readonly) el.classList.add('readonly');
    el.style.left = opts.left + '%';
    el.style.top  = opts.top  + '%';
    // Title
    const t = document.createElement('div');
    t.className = 'bcg-co-title';
    t.textContent = opts.title || '';
    el.appendChild(t);
    // Lines
    for (const ln of opts.lines || []) {
      const row = document.createElement('div');
      row.className = 'bcg-co-line';
      const tier = document.createElement('span');
      tier.className = 'bcg-co-tier';
      tier.textContent = ln.tier || '';
      const text = document.createElement('span');
      text.className = 'bcg-co-text' + (ln.text ? '' : ' empty');
      text.textContent = ln.text || ' ';  // single space keeps the line tall
      row.appendChild(tier);
      row.appendChild(text);
      el.appendChild(row);
    }
    if (opts.onClick) el.addEventListener('click', opts.onClick);
    return el;
  }

  // Buttons ───────────────────────────────────────────────────────────────
  function renderButtonGrid() {
    const grid = $('bcgButtonGrid'); if (!grid) return;
    grid.innerHTML = '';
    $('bcgModeLabel').textContent =
      `Mode ${state.currentMode} (${['', 'SW Down', 'SW Mid', 'SW Up'][state.currentMode]})`;
    for (let btn = 1; btn <= 18; btn++) {       // 19 = "Unassigned", hidden
      const key = String(state.currentMode * 100 + btn);
      const m   = state.config.mappings[key];
      const card = document.createElement('div');
      card.className = 'bcg-button-card';
      const configured = m && (m.t1?.length || m.t2?.length || m.t3?.length);
      if (configured) card.classList.add('configured');
      const excBadge = m?.exclusive ? '<span class="bcg-excl-badge">⚡ excl</span>' : '';
      card.innerHTML = `
        <div class="bcg-card-title ${configured ? '' : 'empty'}">${BTN_LABELS[btn]}${excBadge}</div>
        ${tierSummary(m, 1)}${tierSummary(m, 2)}${tierSummary(m, 3)}
      `;
      card.onclick = () => openButtonModal(btn);
      grid.appendChild(card);
    }
  }
  function tierSummary(m, tier) {
    if (!m) return '';
    const acts = m['t' + tier]; if (!acts || !acts.length) return '';
    const desc = acts.map(actionSummary).join(' + ');
    return `<div class="bcg-tier-summary">${tier}×: ${desc}</div>`;
  }
  function actionSummary(a) {
    if (!a || !a.type) return '—';
    if (a.type === 'espnow') return `→${escH(a.target||'')}: ${escH(a.cmd||'')}`;
    if (a.type === 'hcr') {
      const fnLbl = (HCR_FN_LIST.find(x => x[0] === +a.fn) || [0, `fn${a.fn}`])[1];
      let chanLbl = `c${a.chan}`;
      if (HCR_FN_USES_EMOTION.has(+a.fn))         chanLbl = (HCR_EMOTIONS.find(x => +x[0] === +a.chan)||[,'?'])[1];
      else if (HCR_FN_USES_AUDIO_CHAN.has(+a.fn)) chanLbl = (HCR_AUDIO_CHANS.find(x => +x[0] === +a.chan)||[,'?'])[1];
      return `HCR.${fnLbl}(${chanLbl}, ${a.track ?? 0})`;
    }
    if (a.type === 'anim') {
      const fnLbl = (ANIM_FN_LIST.find(x => x[0] === +a.fn) || [0, `anim${a.fn}`])[1];
      return `Anim: ${fnLbl}`;
    }
    if (a.type === 'serial') return `${escH(a.port||'')}: ${escH(a.cmd||'')}`;
    return a.type;
  }

  // Switches ──────────────────────────────────────────────────────────────
  function renderSwitchList() {
    const list = $('bcgSwitchList'); if (!list) return;
    list.innerHTML = '';
    for (const name of SWITCH_NAMES) {
      const sw = state.config.switches[name] || { ...SWITCH_DEFAULTS[name] };
      const item = document.createElement('div');
      item.className = 'bcg-list-item';
      item.innerHTML = `
        <div class="bcg-list-item-title">${name}<small>${sw.positions || 3}-pos</small></div>
        <div class="bcg-list-item-row">
          <label>SBUS ch</label>
          <input type="number" min="0" max="24" value="${sw.channel ?? 0}" data-sw="${name}" data-field="channel">
        </div>
        <div class="bcg-list-item-row">
          <label>Positions</label>
          <select data-sw="${name}" data-field="positions">
            <option value="2" ${sw.positions===2?'selected':''}>2 (Down / Up)</option>
            <option value="3" ${sw.positions===3?'selected':''}>3 (Down / Mid / Up)</option>
          </select>
        </div>
        <small style="color:var(--bcg-muted);font-size:10px">Per-position actions are edited via direct USB tool — this panel manages wiring only.</small>
      `;
      list.appendChild(item);
    }
    list.querySelectorAll('[data-sw]').forEach(el => {
      el.addEventListener('change', e => {
        const name  = e.target.dataset.sw;
        const field = e.target.dataset.field;
        if (!state.config.switches[name]) state.config.switches[name] = { ...SWITCH_DEFAULTS[name] };
        state.config.switches[name][field] = (field === 'channel' || field === 'positions')
          ? +e.target.value : e.target.value;
        schedulePush();
      });
    });
  }

  // Knobs ─────────────────────────────────────────────────────────────────
  function renderKnobList() {
    const list = $('bcgKnobList'); if (!list) return;
    list.innerHTML = '';
    const knobFns = { 0: '— none —', 1: 'HCR Vocalizer Volume', 2: 'HCR WAV Volume' };
    for (const name of KNOB_NAMES) {
      const kn = state.config.knobs[name] || { ...KNOB_DEFAULTS[name] };
      const item = document.createElement('div');
      item.className = 'bcg-list-item';
      item.innerHTML = `
        <div class="bcg-list-item-title">${name}</div>
        <div class="bcg-list-item-row">
          <label>SBUS ch</label>
          <input type="number" min="0" max="24" value="${kn.channel ?? 0}" data-knob="${name}" data-field="channel">
        </div>
        <div class="bcg-list-item-row">
          <label>Function</label>
          <select data-knob="${name}" data-field="function">
            ${Object.entries(knobFns).map(([v,lbl]) =>
              `<option value="${v}" ${+v===(kn.function ?? 0)?'selected':''}>${escH(lbl)}</option>`).join('')}
          </select>
        </div>
      `;
      list.appendChild(item);
    }
    list.querySelectorAll('[data-knob]').forEach(el => {
      el.addEventListener('change', e => {
        const name  = e.target.dataset.knob;
        const field = e.target.dataset.field;
        if (!state.config.knobs[name]) state.config.knobs[name] = { ...KNOB_DEFAULTS[name] };
        state.config.knobs[name][field] = +e.target.value;
        schedulePush();
      });
    });
  }

  // Thresholds ────────────────────────────────────────────────────────────
  function renderThresholds() {
    const body = $('bcgThreshBody'); if (!body) return;
    body.innerHTML = '';
    state.config.thresholds.forEach((t, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${t.id}</td>
        <td><input type="text" value="${escH(t.label)}" data-th="${i}" data-field="label"></td>
        <td><input type="number" value="${t.minPwm}" data-th="${i}" data-field="minPwm"></td>
        <td><input type="number" value="${t.maxPwm}" data-th="${i}" data-field="maxPwm"></td>
      `;
      body.appendChild(tr);
    });
    body.querySelectorAll('[data-th]').forEach(el => {
      el.addEventListener('change', e => {
        const i     = +e.target.dataset.th;
        const field = e.target.dataset.field;
        const val   = (field === 'label') ? e.target.value : +e.target.value;
        state.config.thresholds[i][field] = val;
        schedulePush();
      });
    });
  }

  // Settings ──────────────────────────────────────────────────────────────
  function renderSettings() {
    if ($('bcgTapWindow'))  $('bcgTapWindow').value  = state.config.tapWindowMs;
    if ($('bcgMatrixCh'))   $('bcgMatrixCh').value   = state.config.matrixChannel;
    if ($('bcgModeBind'))   $('bcgModeBind').value   = String(state.config.funcBindings?.mode ?? -1);
  }
  function bindSettings() {
    $('bcgTapWindow')?.addEventListener('change', e => {
      state.config.tapWindowMs = +e.target.value || 500;
      schedulePush();
    });
    $('bcgMatrixCh')?.addEventListener('change', e => {
      state.config.matrixChannel = +e.target.value || 7;
      schedulePush();
    });
    $('bcgModeBind')?.addEventListener('change', e => {
      if (!state.config.funcBindings) state.config.funcBindings = {};
      state.config.funcBindings.mode = +e.target.value;
      schedulePush();
    });
  }

  // ────────────────────────────────────────────────────────────────────────
  //  Button modal — tap1 / tap2 / tap3 action editor
  // ────────────────────────────────────────────────────────────────────────
  function openButtonModal(btn) {
    state.editingBtn = btn;
    const key  = String(state.currentMode * 100 + btn);
    const m    = state.config.mappings[key] || { exclusive: false };
    $('bcgModalTitle').textContent = `Button ${btn}: ${BTN_LABELS[btn]}`;
    const badge = $('bcgModalModeBadge');
    badge.className = `bcg-mode-badge m${state.currentMode}`;
    badge.textContent = `Mode ${state.currentMode}`;
    $('bcgModalExclusive').checked = !!m.exclusive;
    const container = $('bcgTiersContainer');
    container.innerHTML = '';
    for (let tier = 1; tier <= 3; tier++) {
      const acts = m['t' + tier] || [];
      container.appendChild(buildTierCard(tier, acts));
    }
    $('bcgModal').classList.add('open');
    // Lock background scroll while the modal is open — otherwise the body
    // scrolls under the backdrop on long button modals.
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onModalKey);
  }
  function closeModal() {
    $('bcgModal').classList.remove('open');
    state.editingBtn = null;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onModalKey);
  }
  function onModalKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); closeModal(); }
  }
  function buildTierCard(tier, actions) {
    const card = document.createElement('div');
    card.className = 'bcg-tier-card';
    card.dataset.tier = tier;
    const titles = ['', 'Single tap (1×)', 'Double tap (2×)', 'Triple tap (3×)'];
    const rows = document.createElement('div');
    rows.className = 'bcg-rows';
    const startCount = Math.max(1, actions.length);
    for (let ai = 0; ai < startCount; ai++) {
      const a = actions[ai] || { type: '' };
      rows.appendChild(buildActionRow(tier, ai, a));
    }
    const addBtn = document.createElement('button');
    addBtn.type = 'button'; addBtn.className = 'bcg-btn-add-action'; addBtn.textContent = '+ Add action';
    addBtn.onclick = () => addActionRow(tier);
    card.innerHTML = `<div class="bcg-tier-title">${titles[tier]}</div>`;
    card.appendChild(rows);
    card.appendChild(addBtn);
    refreshTierState(card);
    return card;
  }
  function addActionRow(tier) {
    const card = document.querySelector(`.bcg-tier-card[data-tier="${tier}"]`); if (!card) return;
    const rows = card.querySelector('.bcg-rows');
    const existing = rows.querySelectorAll('.bcg-action-row').length;
    if (existing >= MAX_ACTIONS_PER_TIER) return;
    const used = new Set(Array.from(rows.querySelectorAll('.bcg-action-row')).map(r => +r.dataset.ai));
    let ai = 0; while (used.has(ai)) ai++;
    rows.appendChild(buildActionRow(tier, ai, { type: '' }));
    refreshTierState(card);
  }
  function removeActionRow(tier, ai) {
    const row = document.querySelector(`.bcg-action-row[data-tier="${tier}"][data-ai="${ai}"]`); if (!row) return;
    const card = row.closest('.bcg-tier-card');
    row.remove();
    refreshTierState(card);
  }
  function refreshTierState(card) {
    const rows = card.querySelectorAll('.bcg-action-row');
    rows.forEach(r => {
      const x = r.querySelector('.bcg-btn-remove-action');
      if (x) x.style.visibility = rows.length > 1 ? 'visible' : 'hidden';
    });
    const addBtn = card.querySelector('.bcg-btn-add-action');
    if (addBtn) {
      const atMax = rows.length >= MAX_ACTIONS_PER_TIER;
      addBtn.disabled = atMax;
      addBtn.textContent = atMax ? `Max ${MAX_ACTIONS_PER_TIER} actions` : '+ Add action';
    }
  }

  function buildActionRow(tier, ai, action) {
    const row = document.createElement('div');
    row.className = 'bcg-action-row';
    row.dataset.tier = tier; row.dataset.ai = ai;
    // Type selector
    const typeSel = document.createElement('select');
    typeSel.className = 'bcg-type';
    Object.entries(ACTION_LABELS).forEach(([v, lbl]) => {
      const o = document.createElement('option'); o.value = v; o.textContent = lbl;
      if (v === (action.type || '')) o.selected = true;
      typeSel.appendChild(o);
    });
    typeSel.onchange = () => rebuildActionFields(row, { type: typeSel.value });
    row.appendChild(makeFG('Action', typeSel));

    // Per-type field group
    const fieldsDiv = document.createElement('div');
    fieldsDiv.className = 'bcg-fields';
    fieldsDiv.style.cssText = 'display:flex;gap:5px;flex-wrap:wrap;align-items:flex-end';
    appendActionFields(fieldsDiv, action);
    row.appendChild(fieldsDiv);

    // Delay
    const delayIn = document.createElement('input');
    delayIn.type='number'; delayIn.min=0; delayIn.max=10000; delayIn.step=50;
    delayIn.value = action.delay || 0; delayIn.style.width = '70px';
    delayIn.className = 'bcg-delay';
    row.appendChild(makeFG('Delay(ms)', delayIn));

    // Note
    const noteIn = document.createElement('input');
    noteIn.type='text'; noteIn.maxLength=19; noteIn.placeholder='note';
    noteIn.value = action.note || ''; noteIn.style.width = '140px';
    noteIn.className = 'bcg-note';
    row.appendChild(makeFG('Note', noteIn));

    // × Remove
    const rm = document.createElement('button');
    rm.type='button'; rm.className='bcg-btn-remove-action'; rm.textContent='×';
    rm.onclick = () => removeActionRow(tier, ai);
    row.appendChild(rm);

    return row;
  }
  function makeFG(label, el) {
    const g = document.createElement('div'); g.className = 'bcg-fg';
    const l = document.createElement('label'); l.textContent = label;
    g.appendChild(l); g.appendChild(el);
    return g;
  }
  function rebuildActionFields(row, action) {
    const fields = row.querySelector('.bcg-fields');
    appendActionFields(fields, action);
  }
  function appendActionFields(container, action) {
    container.innerHTML = '';
    const type = action.type || '';
    if (type === 'espnow') {
      const t = document.createElement('select'); t.className = 'bcg-espnow-target';
      ESPNOW_TARGETS.forEach(v => {
        const o = document.createElement('option'); o.value=v; o.textContent=v;
        if (v === action.target) o.selected = true;
        t.appendChild(o);
      });
      const c = document.createElement('input');
      c.type='text'; c.placeholder=':D303'; c.style.width='150px'; c.className='bcg-cmd';
      c.value = action.cmd || '';
      container.appendChild(makeFG('Target', t));
      container.appendChild(makeFG('Command', c));
    } else if (type === 'hcr') {
      const fn = document.createElement('select'); fn.className = 'bcg-fn';
      HCR_FN_LIST.forEach(([v, lbl]) => {
        const o = document.createElement('option'); o.value=v; o.textContent=lbl;
        if (v === (+action.fn || 14)) o.selected = true;
        fn.appendChild(o);
      });
      fn.onchange = () => rebuildHcrChan(container, +fn.value);
      container.appendChild(makeFG('Function', fn));
      rebuildHcrChan(container, +(action.fn ?? 14), action.chan);
      const tr = document.createElement('input');
      tr.type='number'; tr.min=0; tr.max=999; tr.value=action.track ?? 0; tr.style.width='65px';
      tr.className = 'bcg-track';
      container.appendChild(makeFG('Track/Val', tr));
    } else if (type === 'anim') {
      const fn = document.createElement('select'); fn.className='bcg-fn'; fn.style.minWidth='180px';
      ANIM_FN_LIST.forEach(([v,lbl]) => {
        const o = document.createElement('option'); o.value=v; o.textContent=`${v}: ${lbl}`;
        if (v === (+action.fn || 1)) o.selected = true;
        fn.appendChild(o);
      });
      container.appendChild(makeFG('Function', fn));
    } else if (type === 'serial') {
      const p = document.createElement('select'); p.className='bcg-port';
      SERIAL_PORTS.forEach(sp => {
        const o = document.createElement('option'); o.value=sp.v; o.textContent=sp.n;
        if (sp.v === action.port) o.selected = true;
        p.appendChild(o);
      });
      const c = document.createElement('input');
      c.type='text'; c.placeholder='M1518'; c.maxLength=31; c.style.width='150px'; c.className='bcg-cmd';
      c.value = action.cmd || '';
      container.appendChild(makeFG('Port', p));
      container.appendChild(makeFG('Command', c));
    }
  }
  function rebuildHcrChan(container, fn, curVal) {
    const old = container.querySelector('.bcg-chan-fg');
    if (old) old.remove();
    let widget;
    if (HCR_FN_USES_EMOTION.has(+fn)) {
      widget = document.createElement('select');
      HCR_EMOTIONS.forEach(([v,lbl]) => {
        const o=document.createElement('option'); o.value=v; o.textContent=lbl;
        if (curVal!==undefined && +curVal === +v) o.selected = true;
        widget.appendChild(o);
      });
    } else if (HCR_FN_USES_AUDIO_CHAN.has(+fn)) {
      widget = document.createElement('select');
      HCR_AUDIO_CHANS.forEach(([v,lbl]) => {
        const o=document.createElement('option'); o.value=v; o.textContent=lbl;
        if (curVal!==undefined && +curVal === +v) o.selected = true;
        widget.appendChild(o);
      });
    } else {
      widget = document.createElement('input');
      widget.type='number'; widget.min=0; widget.max=99;
      widget.value = curVal ?? 0; widget.style.width='55px';
    }
    widget.className = 'bcg-chan';
    const lbl = HCR_FN_USES_EMOTION.has(+fn) ? 'Emotion'
              : HCR_FN_USES_AUDIO_CHAN.has(+fn) ? 'Audio chan' : 'Chan';
    const g = makeFG(lbl, widget); g.classList.add('bcg-chan-fg');
    // Insert just after the Function selector
    const fnFg = container.querySelector('.bcg-fn')?.parentElement;
    if (fnFg && fnFg.nextSibling) container.insertBefore(g, fnFg.nextSibling);
    else container.appendChild(g);
  }

  function readActionFromRow(row) {
    const type   = row.querySelector('.bcg-type')?.value || '';
    if (!type) return null;
    const delay  = +(row.querySelector('.bcg-delay')?.value || 0);
    const note   = (row.querySelector('.bcg-note')?.value || '').trim();
    const fields = row.querySelector('.bcg-fields');
    const out = { type };
    if (type === 'espnow') {
      out.target = fields.querySelector('.bcg-espnow-target')?.value || 'BS';
      out.cmd    = fields.querySelector('.bcg-cmd')?.value || '';
      if (!out.cmd.trim()) return null;
    } else if (type === 'hcr') {
      out.fn    = +(fields.querySelector('.bcg-fn')?.value    || 14);
      out.chan  = +(fields.querySelector('.bcg-chan')?.value  || 0);
      out.track = +(fields.querySelector('.bcg-track')?.value || 0);
    } else if (type === 'anim') {
      out.fn    = +(fields.querySelector('.bcg-fn')?.value || 1);
    } else if (type === 'serial') {
      out.port = fields.querySelector('.bcg-port')?.value || 'BL';
      out.cmd  = fields.querySelector('.bcg-cmd')?.value  || '';
      if (!out.cmd.trim()) return null;
    } else { return null; }
    if (delay) out.delay = delay;
    if (note)  out.note  = note;
    return out;
  }
  function collectTierActions(tier) {
    const card = document.querySelector(`.bcg-tier-card[data-tier="${tier}"]`); if (!card) return [];
    return Array.from(card.querySelectorAll('.bcg-action-row'))
      .map(r => readActionFromRow(r))
      .filter(Boolean);
  }

  function applyModal() {
    if (!state.editingBtn) return;
    const key = String(state.currentMode * 100 + state.editingBtn);
    const exclusive = $('bcgModalExclusive').checked;
    const mapping = { exclusive };
    for (let tier = 1; tier <= 3; tier++) {
      const acts = collectTierActions(tier);
      if (acts.length) mapping['t' + tier] = acts;
    }
    state.config.mappings[key] = mapping;
    closeModal();
    renderButtonGrid();
    renderReferenceView();
    schedulePush();
  }
  function clearModalDispatch() {
    if (!state.editingBtn) return;
    const key = String(state.currentMode * 100 + state.editingBtn);
    delete state.config.mappings[key];
    closeModal();
    renderButtonGrid();
    renderReferenceView();
    schedulePush();
  }

  // ────────────────────────────────────────────────────────────────────────
  //  Wiring — event listeners
  // ────────────────────────────────────────────────────────────────────────
  function bindTopbar() {
    $('bcgRefreshBtn')?.addEventListener('click', requestConfig);
    $('bcgDefaultsBtn')?.addEventListener('click', requestDefaults);
    $('bcgApplyBtn')?.addEventListener('click', () => {
      if (state.debounceId) { clearTimeout(state.debounceId); state.debounceId = null; }
      pushConfigChunked();
    });
    $('bcgLiveToggle')?.addEventListener('change', e => {
      state.livePush = !!e.target.checked;
      setSyncStatus(state.livePush ? 'idle' : 'local — Live push off');
    });
  }
  function bindModeTabs() {
    $$('.bcg-mode-tab').forEach(t => {
      t.addEventListener('click', () => {
        state.currentMode = +t.dataset.mode;
        $$('.bcg-mode-tab').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        renderButtonGrid();
        renderReferenceView();
      });
    });
  }
  function bindSectionTabs() {
    $$('.bcg-section-tab').forEach(t => {
      t.addEventListener('click', () => {
        $$('.bcg-section-tab').forEach(x => x.classList.remove('active'));
        $$('.bcg-pane').forEach(p => p.classList.remove('active'));
        t.classList.add('active');
        const pane = $('bcgPane-' + t.dataset.section);
        if (pane) pane.classList.add('active');
      });
    });
  }
  function bindModal() {
    $('bcgModalClose')?.addEventListener('click', closeModal);
    $('bcgModalCancel')?.addEventListener('click', closeModal);
    $('bcgModalApply')?.addEventListener('click', applyModal);
    $('bcgModalClear')?.addEventListener('click', clearModalDispatch);
    $('bcgModal')?.addEventListener('click', e => {
      if (e.target.id === 'bcgModal') closeModal();
    });
  }
  function bindThresholdRebuild() {
    $('bcgThreshRebuildBtn')?.addEventListener('click', () => {
      state.config.thresholds = defaultThresholds();
      renderThresholds();
      schedulePush();
    });
  }

  // ────────────────────────────────────────────────────────────────────────
  //  Init — wait for DOM, then wire everything up
  // ────────────────────────────────────────────────────────────────────────
  function init() {
    if (!$('bcgButtonGrid')) {
      // Page might still be loading the Gest section — try again shortly.
      setTimeout(init, 200);
      return;
    }
    bindTopbar();
    bindModeTabs();
    bindSectionTabs();
    bindModal();
    bindSettings();
    bindThresholdRebuild();
    renderAll();
    setSyncStatus('idle');
    console.log('[BCG] Remote BC Config GUI initialized.');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose a small debug handle on window for poking from the console.
  window.BCG = {
    state,
    push: pushConfigChunked,
    refresh: requestConfig,
    resetDefaults: requestDefaults,
    setConfig: (cfg) => { state.config = cfg; renderAll(); },
  };
})();
