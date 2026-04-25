import numpy as np
import soundfile as sf

def generate_descending_r2d2_hooah(duration=0.6, sample_rate=44100):
    t = np.linspace(0, duration, int(sample_rate * duration), False)

    # Descending pitch sweep: like a slide whistle
    start_freq = 2200
    end_freq = 300
    freqs = np.logspace(np.log10(start_freq), np.log10(end_freq), len(t))

    # Use triangle wave for a more "vocal" sound
    phase = 2 * np.pi * np.cumsum(freqs) / sample_rate
    waveform = 2 * np.abs(2 * (phase / (2 * np.pi) % 1) - 1) - 1  # Triangle wave

    # Add subtle vibrato
    vibrato_freq = 6
    vibrato = 0.05 * np.sin(2 * np.pi * vibrato_freq * t)
    waveform *= (1 + vibrato)

    # Envelope: fade in/out for more natural start/end
    attack = int(0.05 * sample_rate)
    release = int(0.15 * sample_rate)
    sustain = len(t) - attack - release
    envelope = np.concatenate([
        np.linspace(0, 1, attack),
        np.ones(sustain),
        np.linspace(1, 0, release)
    ])
    waveform *= envelope

    # Normalize
    waveform /= np.max(np.abs(waveform))
    return waveform

# Generate and save
hooah = generate_descending_r2d2_hooah()
sf.write("r2d2_real_hooah.wav", hooah, 44100)
print("✅ Saved: r2d2_real_hooah.wav")
