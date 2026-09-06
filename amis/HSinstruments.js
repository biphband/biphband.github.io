/**
 * All High School instrument configs – AMIS HSHB / HSHO Set 1
 */
window.HSInstruments = {

  clarinet: {
    headerTitle: "AMIS HSHB Clarinet – Set 1",
    headerSub: "Tap a numbered circle next to each “Record the following…” line.",
    filePrefix: "HS_Clarinet",
    zipName: "AMIS_HSHB_Clarinet_Set1",
    shareTitle: "AMIS HSHB Clarinet Audition – Set 1",
    shareText: "My clarinet audition recordings",
    pages: [
      { image: "parts/HS-Clarinet-1.jpg", alt: "Clarinet scales",
        buttons: [ { track: 1, top: "16%" }, { track: 2, top: "38%" }, { track: 3, top: "58%" } ] },
      { image: "parts/HS-Clarinet-2.jpg", alt: "Clarinet etudes",
        buttons: [ { track: 4, top: "12%" }, { track: 5, top: "48%" } ] }
    ],
    tracks: {
      1: { title: "Track 1 – Scale", tempoFixed: 144, tempoMin: 144, tempoMax: 144, tempoLabel: "♩ =", metronome: true,
           note: "Quarter note = 144 bpm. Metronome clearly audible throughout." },
      2: { title: "Track 2 – Scale", tempoFixed: 72, tempoMin: 72, tempoMax: 72, tempoLabel: "♩ =", metronome: true,
           note: "Quarter note = 72 bpm. Metronome clearly audible throughout." },
      3: { title: "Track 3 – Scale", tempoFixed: null, tempoMin: 100, tempoMax: 120, defaultTempo: 110, tempoLabel: "dotted ♩ =", metronome: true,
           note: "Dotted quarter = 100–120 bpm. Metronome clearly audible throughout." },
      4: { title: "Track 4 – Toccata Marziale (Vaughan Williams)", tempoFixed: null, tempoMin: 90, tempoMax: 94, defaultTempo: 92, tempoLabel: "♩ =", metronome: false,
           note: "Allegro maestoso. Do NOT use a metronome." },
      5: { title: "Track 5 – Danzón No. 2 (Márquez)", tempoFixed: null, tempoMin: 90, tempoMax: 94, defaultTempo: 92, tempoLabel: "♩ =", metronome: false,
           note: "Do NOT use a metronome." }
    }
  },

  flute: {
    headerTitle: "AMIS HSHB Flute – Set 1",
    headerSub: "Tap a numbered circle next to each “Record the following…” line.",
    filePrefix: "HS_Flute",
    zipName: "AMIS_HSHB_Flute_Set1",
    shareTitle: "AMIS HSHB Flute Audition – Set 1",
    shareText: "My flute audition recordings",
    pages: [
      { image: "parts/HS-Flute-1.jpg", alt: "Flute scales / arpeggio",
        buttons: [ { track: 1, top: "18%" }, { track: 2, top: "40%" }, { track: 3, top: "58%" } ] },
      { image: "parts/HS-Flute-2.jpg", alt: "Flute etudes",
        buttons: [ { track: 4, top: "14%" }, { track: 5, top: "50%" } ] }
    ],
    tracks: {
      1: { title: "Track 1 – Scale", tempoFixed: 144, tempoMin: 144, tempoMax: 144, tempoLabel: "♩ =", metronome: true,
           note: "♩ = 144. Metronome clearly audible throughout." },
      2: { title: "Track 2 – Expressive Arpeggio", tempoFixed: 60, tempoMin: 60, tempoMax: 60, tempoLabel: "♩ =", metronome: true,
           note: "♩ = 60. Play with expression (vibrato). Metronome clearly audible." },
      3: { title: "Track 3 – Scale", tempoFixed: null, tempoMin: 100, tempoMax: 132, defaultTempo: 116, tempoLabel: "♩ =", metronome: true,
           note: "♩ = 100–132. Metronome clearly audible throughout." },
      4: { title: "Track 4 – Etude / Excerpt", tempoFixed: null, tempoMin: 80, tempoMax: 120, defaultTempo: 100, tempoLabel: "♩ =", metronome: false,
           note: "No metronome on the recording." },
      5: { title: "Track 5 – Etude / Excerpt", tempoFixed: null, tempoMin: 60, tempoMax: 90, defaultTempo: 72, tempoLabel: "♩ =", metronome: false,
           note: "No metronome on the recording." }
    }
  },

  horn: {
    headerTitle: "AMIS HSHB Horn – Set 1",
    headerSub: "Tap a numbered circle next to each “Record the following…” line.",
    filePrefix: "HS_Horn",
    zipName: "AMIS_HSHB_Horn_Set1",
    shareTitle: "AMIS HSHB Horn Audition – Set 1",
    shareText: "My horn audition recordings",
    pages: [
      { image: "parts/HS-Horn-1.jpg", alt: "Horn scales",
        buttons: [ { track: 1, top: "18%" }, { track: 2, top: "40%" }, { track: 3, top: "58%" } ] },
      { image: "parts/HS-Horn-2.jpg", alt: "Horn etudes",
        buttons: [ { track: 4, top: "14%" }, { track: 5, top: "50%" } ] }
    ],
    tracks: {
      1: { title: "Track 1 – Scale", tempoFixed: null, tempoMin: 120, tempoMax: 132, defaultTempo: 126, tempoLabel: "♩ =", metronome: true,
           note: "Quarter note = 120–132 bpm. Metronome clearly audible throughout." },
      2: { title: "Track 2 – Scale", tempoFixed: 72, tempoMin: 72, tempoMax: 72, tempoLabel: "♩ =", metronome: true,
           note: "Quarter note = 72 bpm. Metronome clearly audible throughout." },
      3: { title: "Track 3 – Scale", tempoFixed: null, tempoMin: 80, tempoMax: 100, defaultTempo: 90, tempoLabel: "dotted ♩ =", metronome: true,
           note: "Dotted quarter = 80–100 bpm. Metronome clearly audible throughout." },
      4: { title: "Track 4 – Etude / Excerpt", tempoFixed: null, tempoMin: 80, tempoMax: 120, defaultTempo: 100, tempoLabel: "♩ =", metronome: false,
           note: "No metronome on the recording." },
      5: { title: "Track 5 – Etude / Excerpt", tempoFixed: null, tempoMin: 60, tempoMax: 90, defaultTempo: 72, tempoLabel: "♩ =", metronome: false,
           note: "No metronome on the recording." }
    }
  },

  trumpet: {
    headerTitle: "AMIS HSHB Trumpet – Set 1",
    headerSub: "Tap a numbered circle next to each scale or excerpt.",
    filePrefix: "HS_Trumpet",
    zipName: "AMIS_HSHB_Trumpet_Set1",
    shareTitle: "AMIS HSHB Trumpet Audition – Set 1",
    shareText: "My trumpet audition recordings",
    pages: [
      { image: "parts/HS-Trumpet-1.jpg", alt: "Trumpet scales",
        buttons: [ { track: 1, top: "16%" }, { track: 2, top: "40%" }, { track: 3, top: "62%" } ] },
      { image: "parts/HS-Trumpet-2.jpg", alt: "Trumpet excerpt (Arutunian)",
        buttons: [ { track: 4, top: "14%" } ] },
      { image: "parts/HS-Trumpet-3.jpg", alt: "Trumpet excerpt 2",
        buttons: [ { track: 5, top: "14%" } ] }
    ],
    tracks: {
      1: { title: "Track 1 – Scale", tempoFixed: 144, tempoMin: 144, tempoMax: 144, tempoLabel: "♩ =", metronome: true,
           note: "♩ = 144. Metronome clearly audible throughout." },
      2: { title: "Track 2 – Scale", tempoFixed: 72, tempoMin: 72, tempoMax: 72, tempoLabel: "♩ =", metronome: true,
           note: "♩ = 72. Metronome clearly audible throughout." },
      3: { title: "Track 3 – Scale", tempoFixed: null, tempoMin: 100, tempoMax: 120, defaultTempo: 110, tempoLabel: "♩ =", metronome: true,
           note: "♩ = 100–120. Metronome clearly audible throughout." },
      4: { title: "Track 4 – Arutunian Concerto (excerpt)", tempoFixed: null, tempoMin: 60, tempoMax: 90, defaultTempo: 72, tempoLabel: "♩ =", metronome: false,
           note: "Andante maestoso. Do NOT use a metronome." },
      5: { title: "Track 5 – Excerpt 2", tempoFixed: null, tempoMin: 80, tempoMax: 120, defaultTempo: 100, tempoLabel: "♩ =", metronome: false,
           note: "Do NOT use a metronome." }
    }
  },

  euphonium: {
    headerTitle: "AMIS HSHB Euphonium – Set 1",
    headerSub: "Tap a numbered circle next to each “Record the following…” line.",
    filePrefix: "HS_Euphonium",
    zipName: "AMIS_HSHB_Euphonium_Set1",
    shareTitle: "AMIS HSHB Euphonium Audition – Set 1",
    shareText: "My euphonium audition recordings",
    pages: [
      { image: "parts/HS-Euphonium-1.jpg", alt: "Euphonium scales",
        buttons: [ { track: 1, top: "16%" }, { track: 2, top: "38%" }, { track: 3, top: "58%" } ] },
      { image: "parts/HS-Euphonium-2.jpg", alt: "Euphonium etudes",
        buttons: [ { track: 4, top: "14%" }, { track: 5, top: "50%" } ] }
    ],
    tracks: {
      1: { title: "Track 1 – Scale", tempoFixed: 144, tempoMin: 144, tempoMax: 144, tempoLabel: "♩ =", metronome: true,
           note: "Quarter note = 144 bpm. Metronome clearly audible throughout." },
      2: { title: "Track 2 – Scale", tempoFixed: 72, tempoMin: 72, tempoMax: 72, tempoLabel: "♩ =", metronome: true,
           note: "Quarter note = 72 bpm. Metronome clearly audible throughout." },
      3: { title: "Track 3 – Scale", tempoFixed: null, tempoMin: 100, tempoMax: 120, defaultTempo: 110, tempoLabel: "dotted ♩ =", metronome: true,
           note: "Dotted quarter = 100–120 bpm. Metronome clearly audible throughout." },
      4: { title: "Track 4 – Etude / Excerpt", tempoFixed: null, tempoMin: 80, tempoMax: 120, defaultTempo: 100, tempoLabel: "♩ =", metronome: false,
           note: "No metronome on the recording." },
      5: { title: "Track 5 – Etude / Excerpt", tempoFixed: null, tempoMin: 60, tempoMax: 90, defaultTempo: 72, tempoLabel: "♩ =", metronome: false,
           note: "No metronome on the recording." }
    }
  },

  tuba: {
    headerTitle: "AMIS HSHB Tuba – Set 1",
    headerSub: "Tap a numbered circle next to each “Record the following…” line.",
    filePrefix: "HS_Tuba",
    zipName: "AMIS_HSHB_Tuba_Set1",
    shareTitle: "AMIS HSHB Tuba Audition – Set 1",
    shareText: "My tuba audition recordings",
    pages: [
      { image: "parts/HS-Tuba-1.jpg", alt: "Tuba scales",
        buttons: [ { track: 1, top: "16%" }, { track: 2, top: "38%" }, { track: 3, top: "58%" } ] },
      { image: "parts/HS-Tuba-2.jpg", alt: "Tuba etudes",
        buttons: [ { track: 4, top: "12%" }, { track: 5, top: "48%" } ] }
    ],
    tracks: {
      1: { title: "Track 1 – Scale", tempoFixed: 120, tempoMin: 120, tempoMax: 120, tempoLabel: "♩ =", metronome: true,
           note: "♩ = 120. Metronome clearly audible throughout." },
      2: { title: "Track 2 – Scale", tempoFixed: 72, tempoMin: 72, tempoMax: 72, tempoLabel: "♩ =", metronome: true,
           note: "♩ = 72. Metronome clearly audible throughout." },
      3: { title: "Track 3 – Scale", tempoFixed: null, tempoMin: 80, tempoMax: 100, defaultTempo: 90, tempoLabel: "dotted ♩ =", metronome: true,
           note: "Dotted quarter = 80–100 bpm. Metronome clearly audible throughout." },
      4: { title: "Track 4 – Blazhevich Etude 28", tempoFixed: null, tempoMin: 72, tempoMax: 88, defaultTempo: 80, tempoLabel: "♩ =", metronome: false,
           note: "Andante espressivo. Do NOT use a metronome." },
      5: { title: "Track 5 – Bruckner Symphony No. 4 excerpt", tempoFixed: null, tempoMin: 84, tempoMax: 92, defaultTempo: 88, tempoLabel: "♩ =", metronome: false,
           note: "Do NOT use a metronome." }
    }
  },

  percussion: {
    headerTitle: "AMIS HSHB Percussion – Set 1",
    headerSub: "Tap a numbered circle next to each required track. ALL tracks are required.",
    filePrefix: "HS_Percussion",
    zipName: "AMIS_HSHB_Percussion_Set1",
    shareTitle: "AMIS HSHB Percussion Audition – Set 1",
    shareText: "My percussion audition recordings",
    pages: [
      { image: "parts/HS-Percussion-1.jpg", alt: "Snare Drum etude",
        buttons: [ { track: 1, top: "18%" } ] },
      { image: "parts/HS-Percussion-2.jpg", alt: "Mallets / keyboard",
        buttons: [ { track: 2, top: "14%" } ] },
      { image: "parts/HS-Percussion-3.jpg", alt: "Timpani",
        buttons: [ { track: 3, top: "14%" } ] }
    ],
    tracks: {
      1: { title: "Track 1 – Snare Drum Etude", tempoFixed: null, tempoMin: 112, tempoMax: 120, defaultTempo: 116, tempoLabel: "♩ =", metronome: false,
           note: "Playfully ♩ = 112–120. No audible metronome on the recording." },
      2: { title: "Track 2 – Mallets / Keyboard", tempoFixed: null, tempoMin: 80, tempoMax: 120, defaultTempo: 100, tempoLabel: "♩ =", metronome: false,
           note: "No audible metronome (unless the sheet specifically requires it)." },
      3: { title: "Track 3 – Timpani", tempoFixed: null, tempoMin: 80, tempoMax: 120, defaultTempo: 100, tempoLabel: "♩ =", metronome: false,
           note: "No audible metronome (unless the sheet specifically requires it)." }
    }
  },

  violin: {
    headerTitle: "AMIS HSHO Violin – Set 1",
    headerSub: "Tap a numbered circle next to each scale or the excerpt.",
    filePrefix: "HS_Violin",
    zipName: "AMIS_HSHO_Violin_Set1",
    shareTitle: "AMIS HSHO Violin Audition – Set 1",
    shareText: "My violin audition recordings",
    pages: [
      { image: "parts/HS-Violin-1.jpg", alt: "Violin scales",
        buttons: [ { track: 1, top: "42%" }, { track: 2, top: "56%" }, { track: 3, top: "68%" } ] },
      { image: "parts/HS-Violin-2.jpg", alt: "Violin excerpt",
        buttons: [ { track: 4, top: "22%" } ] }
    ],
    tracks: {
      1: { title: "Track 1 – Scale (NO vibrato)", tempoFixed: 100, tempoMin: 100, tempoMax: 100, tempoLabel: "♩ =", metronome: true,
           note: "♩ = 100. Start metronome 1 bar before. Metronome throughout. NO vibrato." },
      2: { title: "Track 2 – Melodic Minor (WITH vibrato)", tempoFixed: 60, tempoMin: 60, tempoMax: 60, tempoLabel: "♩ =", metronome: true,
           note: "♩ = 60. Start metronome 1 bar before. Metronome throughout. WITH vibrato, no open strings." },
      3: { title: "Track 3 – Spiccato / String Crossing", tempoFixed: 84, tempoMin: 84, tempoMax: 84, tempoLabel: "♩ =", metronome: true,
           note: "♩ = 84. Play 2nd & 3rd lines without a break. Metronome throughout." },
      4: { title: "Track 4 – Excerpt", tempoFixed: null, tempoMin: 60, tempoMax: 100, defaultTempo: 80, tempoLabel: "♩ =", metronome: true, metroStopAfterBeats: 12,
           note: "Metronome 1 bar before + continuing for 2 bars only (then stop)." }
    }
  },

  cello: {
    headerTitle: "AMIS HSHO Cello – Set 1",
    headerSub: "Tap a numbered circle next to each scale or the excerpt.",
    filePrefix: "HS_Cello",
    zipName: "AMIS_HSHO_Cello_Set1",
    shareTitle: "AMIS HSHO Cello Audition – Set 1",
    shareText: "My cello audition recordings",
    pages: [
      { image: "parts/HS-Cello-1.jpg", alt: "Cello scales",
        buttons: [ { track: 1, top: "42%" }, { track: 2, top: "56%" }, { track: 3, top: "68%" } ] },
      { image: "parts/HS-Cello-2.jpg", alt: "Cello excerpt",
        buttons: [ { track: 4, top: "22%" } ] }
    ],
    tracks: {
      1: { title: "Track 1 – Scale (NO vibrato)", tempoFixed: 100, tempoMin: 100, tempoMax: 100, tempoLabel: "♩ =", metronome: true,
           note: "♩ = 100. Start metronome 1 bar before. Metronome throughout. NO vibrato." },
      2: { title: "Track 2 – Melodic Minor (WITH vibrato)", tempoFixed: 60, tempoMin: 60, tempoMax: 60, tempoLabel: "♩ =", metronome: true,
           note: "♩ = 60. Start metronome 1 bar before. Metronome throughout. WITH vibrato, avoid open strings." },
      3: { title: "Track 3 – Spiccato / String Crossing", tempoFixed: 84, tempoMin: 84, tempoMax: 84, tempoLabel: "♩ =", metronome: true,
           note: "♩ = 84. Play both lines without a break. Metronome throughout." },
      4: { title: "Track 4 – Excerpt", tempoFixed: null, tempoMin: 60, tempoMax: 100, defaultTempo: 80, tempoLabel: "♩ =", metronome: true, metroStopAfterBeats: 12,
           note: "Metronome 1 bar before + continuing for 2 bars only (then stop)." }
    }
  }
};
