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
  // Populates the SVG transmitter map with per-button action summaries for
  // the currently-selected mode. Each .bcg-ref-btn-zone gets a .configured
  // class when its mapping is non-empty, and a pair of <text> labels are
  // dropped into #bcgRefLabels — primary = highest-priority action summary,
  // secondary = number of tap tiers configured (e.g. "1× 2×").
  //
  // The SVG coordinates for each button were chosen to match the visual
  // layout in index.html; if you reposition a button there, mirror the
  // change in BTN_LABEL_POS below.
  const BTN_LABEL_POS = {
    // Trim row (around gimbals)
    11: { x: 364, y: 350, anchor: 'middle' },
    12: { x: 364, y: 485, anchor: 'middle' },
    13: { x: 636, y: 350, anchor: 'middle' },
    14: { x: 636, y: 485, anchor: 'middle' },
    7:  { x: 173, y: 595, anchor: 'middle' },
    8:  { x: 213, y: 595, anchor: 'middle' },
    9:  { x: 278, y: 595, anchor: 'middle' },
    10: { x: 318, y: 595, anchor: 'middle' },
    15: { x: 683, y: 595, anchor: 'middle' },
    16: { x: 723, y: 595, anchor: 'middle' },
    17: { x: 788, y: 595, anchor: 'middle' },
    18: { x: 828, y: 595, anchor: 'middle' },
    // B1-B6 cluster at bottom
    1:  { x: 385, y: 660, anchor: 'middle' },
    2:  { x: 435, y: 660, anchor: 'middle' },
    3:  { x: 485, y: 660, anchor: 'middle' },
    4:  { x: 535, y: 660, anchor: 'middle' },
    5:  { x: 585, y: 660, anchor: 'middle' },
    6:  { x: 635, y: 660, anchor: 'middle' },
  };

  function renderReferenceView() {
    const refModeLbl = $('bcgRefModeLabel');
    if (refModeLbl) refModeLbl.textContent = `Mode ${state.currentMode} (${['', 'SW Down', 'SW Mid', 'SW Up'][state.currentMode]})`;
    const screenMode = $('bcgRefScreenMode');
    if (screenMode) screenMode.textContent = `Mode ${state.currentMode} — ${['', 'SW Down', 'SW Mid', 'SW Up'][state.currentMode]}`;

    const labels = $('bcgRefLabels');
    if (!labels) return;
    labels.innerHTML = '';

    // Update per-button "configured" highlighting + summary labels
    for (let btn = 1; btn <= 18; btn++) {
      const zone = document.querySelector(`.bcg-ref-btn-zone[data-btn="${btn}"]`);
      if (!zone) continue;
      const key = String(state.currentMode * 100 + btn);
      const m   = state.config.mappings[key];
      const hasAny = m && (m.t1?.length || m.t2?.length || m.t3?.length);
      zone.classList.toggle('configured', !!hasAny);

      // Drop a small summary near the button. Line 1 = primary action label,
      // line 2 = tier count badge ("1× 2× 3×" depending on which tiers exist).
      const pos = BTN_LABEL_POS[btn]; if (!pos) continue;
      if (!hasAny) {
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('x', pos.x); t.setAttribute('y', pos.y);
        t.setAttribute('text-anchor', pos.anchor);
        t.setAttribute('class', 'empty');
        t.textContent = '—';
        labels.appendChild(t);
        continue;
      }
      // Primary line: shortest sensible action summary from tier 1 (fallback to 2 or 3)
      const primaryTier = m.t1?.length ? m.t1 : (m.t2?.length ? m.t2 : m.t3);
      const primary = (primaryTier && primaryTier[0]) ? actionSummaryShort(primaryTier[0]) : '';
      const t1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t1.setAttribute('x', pos.x); t1.setAttribute('y', pos.y);
      t1.setAttribute('text-anchor', pos.anchor);
      t1.textContent = primary;
      labels.appendChild(t1);

      // Secondary line — small "1× 2×" badge for which tiers exist (only show if >1)
      const tiers = ['t1','t2','t3'].map((k,i) => m[k]?.length ? (i+1)+'×' : null).filter(Boolean);
      if (tiers.length > 1) {
        const t2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t2.setAttribute('x', pos.x); t2.setAttribute('y', pos.y + 11);
        t2.setAttribute('text-anchor', pos.anchor);
        t2.setAttribute('class', 'line2');
        t2.textContent = tiers.join(' ');
        labels.appendChild(t2);
      }
    }

    // Wire click handlers (idempotent — using onclick property)
    document.querySelectorAll('.bcg-ref-btn-zone').forEach(g => {
      const btn = +g.dataset.btn;
      if (!btn) return;
      g.onclick = () => openButtonModal(btn);
    });
  }

  // Tight one-line action summary for the SVG label (vs. actionSummary which
  // is more verbose and used in the button-grid cards).
  function actionSummaryShort(a) {
    if (!a || !a.type) return '—';
    if (a.type === 'espnow') return `${a.target||'?'}:${truncate(a.cmd||'',8)}`;
    if (a.type === 'hcr') {
      const fnLbl = (HCR_FN_LIST.find(x => x[0] === +a.fn) || [0, `fn${a.fn}`])[1];
      return `HCR ${fnLbl}`;
    }
    if (a.type === 'anim') {
      const fnLbl = (ANIM_FN_LIST.find(x => x[0] === +a.fn) || [0, `a${a.fn}`])[1];
      return truncate(fnLbl, 14);
    }
    if (a.type === 'serial') return `${a.port||'?'}:${truncate(a.cmd||'',8)}`;
    return a.type;
  }
  function truncate(s, n) { return s.length > n ? s.slice(0, n - 1) + '…' : s; }

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
