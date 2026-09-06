/**
 * All Middle School instrument configs for AMIS MSHO / MSHB Set 1
 * Each config is consumed by AuditionRecorder.init()
 */
window.MSInstruments = {

  /* ================================================================
   *  MS Alto Saxophone – Honor Band (3 tracks)
   * ================================================================ */
  altosax: {
    headerTitle: "AMIS MSHB Alto Sax – Set 1",
    headerSub: "Tap a numbered circle next to each scale or etude.",
    filePrefix: "MS_AltoSax",
    zipName: "AMIS_MSHB_AltoSax_Set1",
    shareTitle: "AMIS MSHB Alto Sax Audition – Set 1",
    shareText: "My alto sax audition recordings",
    pages: [
      {
        image: "parts/MS-AltoSax-1.jpg",
        alt: "Alto Sax – Chromatic Scale",
        buttons: [{ track: 1, top: "32%" }]
      },
      {
        image: "parts/MS-AltoSax-2.jpg",
        alt: "Alto Sax – Etude 1",
        buttons: [{ track: 2, top: "22%" }]
      },
      {
        image: "parts/MS-AltoSax-3.jpg",
        alt: "Alto Sax – Etude 2",
        buttons: [{ track: 3, top: "22%" }]
      }
    ],
    tracks: {
      1: {
        title: "Track 1 – Chromatic Scale",
        tempoFixed: null, tempoMin: 70, tempoMax: 100, defaultTempo: 85,
        tempoLabel: "♩ =",
        metronome: true,
        note: "Chromatic scale with metronome. ♩ = 70–100."
      },
      2: {
        title: "Track 2 – Etude 1 (A la marcia)",
        tempoFixed: null, tempoMin: 120, tempoMax: 144, defaultTempo: 132,
        tempoLabel: "♩ =",
        metronome: false,
        note: "A la marcia ♩ = 120–144. Perform WITHOUT metronome."
      },
      3: {
        title: "Track 3 – Etude 2 (Espressivo e cantabile)",
        tempoFixed: null, tempoMin: 63, tempoMax: 72, defaultTempo: 68,
        tempoLabel: "♩ =",
        metronome: false,
        note: "Espressivo e cantabile ♩ = 63–72. Perform WITHOUT metronome."
      }
    }
  },

  /* ================================================================
   *  MS Flute – Honor Band (3 tracks)
   * ================================================================ */
  flute: {
    headerTitle: "AMIS MSHB Flute – Set 1",
    headerSub: "Tap a numbered circle next to each scale or etude.",
    filePrefix: "MS_Flute",
    zipName: "AMIS_MSHB_Flute_Set1",
    shareTitle: "AMIS MSHB Flute Audition – Set 1",
    shareText: "My flute audition recordings",
    pages: [
      {
        image: "parts/MS-Flute-1.jpg",
        alt: "Flute – Chromatic Scale",
        buttons: [{ track: 1, top: "34%" }]
      },
      {
        image: "parts/MS-Flute-2.jpg",
        alt: "Flute – Etude 1",
        buttons: [{ track: 2, top: "22%" }]
      },
      {
        image: "parts/MS-Flute-3.jpg",
        alt: "Flute – Etude 2",
        buttons: [{ track: 3, top: "22%" }]
      }
    ],
    tracks: {
      1: {
        title: "Track 1 – Chromatic Scale (Two Octaves)",
        tempoFixed: null, tempoMin: 70, tempoMax: 100, defaultTempo: 85,
        tempoLabel: "♩ =",
        metronome: true,
        note: "Two-octave chromatic scale with metronome. ♩ = 70–100."
      },
      2: {
        title: "Track 2 – Etude 1 (A la marcia)",
        tempoFixed: null, tempoMin: 120, tempoMax: 144, defaultTempo: 132,
        tempoLabel: "♩ =",
        metronome: false,
        note: "A la marcia ♩ = 120–144. Perform WITHOUT metronome."
      },
      3: {
        title: "Track 3 – Etude 2 (Espressivo e cantabile)",
        tempoFixed: null, tempoMin: 63, tempoMax: 72, defaultTempo: 68,
        tempoLabel: "♩ =",
        metronome: false,
        note: "Espressivo e cantabile ♩ = 63–72. Perform WITHOUT metronome."
      }
    }
  },

  /* ================================================================
   *  MS Trumpet – Honor Band (3 tracks)
   * ================================================================ */
  trumpet: {
    headerTitle: "AMIS MSHB Trumpet – Set 1",
    headerSub: "Tap a numbered circle next to each scale or etude.",
    filePrefix: "MS_Trumpet",
    zipName: "AMIS_MSHB_Trumpet_Set1",
    shareTitle: "AMIS MSHB Trumpet Audition – Set 1",
    shareText: "My trumpet audition recordings",
    pages: [
      {
        image: "parts/MS-Trumpet-1.jpg",
        alt: "Trumpet – Chromatic Scale",
        buttons: [{ track: 1, top: "32%" }]
      },
      {
        image: "parts/MS-Trumpet-2.jpg",
        alt: "Trumpet – Etude 1",
        buttons: [{ track: 2, top: "22%" }]
      },
      {
        image: "parts/MS-Trumpet-3.jpg",
        alt: "Trumpet – Etude 2",
        buttons: [{ track: 3, top: "22%" }]
      }
    ],
    tracks: {
      1: {
        title: "Track 1 – Chromatic Scale",
        tempoFixed: null, tempoMin: 70, tempoMax: 100, defaultTempo: 85,
        tempoLabel: "♩ =",
        metronome: true,
        note: "Chromatic scale with metronome. ♩ = 70–100."
      },
      2: {
        title: "Track 2 – Etude 1 (A la marcia)",
        tempoFixed: null, tempoMin: 120, tempoMax: 144, defaultTempo: 132,
        tempoLabel: "♩ =",
        metronome: false,
        note: "A la marcia ♩ = 120–144. Perform WITHOUT metronome."
      },
      3: {
        title: "Track 3 – Etude 2 (Espressivo e cantabile)",
        tempoFixed: null, tempoMin: 63, tempoMax: 72, defaultTempo: 68,
        tempoLabel: "♩ =",
        metronome: false,
        note: "Espressivo e cantabile ♩ = 63–72. Perform WITHOUT metronome."
      }
    }
  },

  /* ================================================================
   *  MS Violin – Honor Orchestra (4 tracks)
   * ================================================================ */
  violin: {
    headerTitle: "AMIS MSHO Violin – Set 1",
    headerSub: "Tap a numbered circle next to each scale or the excerpt.",
    filePrefix: "MS_Violin",
    zipName: "AMIS_MSHO_Violin_Set1",
    shareTitle: "AMIS MSHO Violin Audition – Set 1",
    shareText: "My violin audition recordings",
    pages: [
      {
        image: "parts/MS-Violin-1.jpg",
        alt: "Violin page 1 – scales",
        buttons: [
          { track: 1, top: "44.5%" },
          { track: 2, top: "57.5%" },
          { track: 3, top: "70.0%" }
        ]
      },
      {
        image: "parts/MS-Violin-2.jpg",
        alt: "Violin – Sicilienne",
        buttons: [{ track: 4, top: "23.5%" }]
      }
    ],
    tracks: {
      1: {
        title: "Track 1 – Scale (NO vibrato)",
        tempoFixed: 126, tempoMin: 126, tempoMax: 126,
        tempoLabel: "♩ =", metronome: true,
        note: "♩ = 126. Start metronome 1 bar before. Metronome throughout. NO vibrato."
      },
      2: {
        title: "Track 2 – Melodic Minor (WITH vibrato)",
        tempoFixed: 60, tempoMin: 60, tempoMax: 60,
        tempoLabel: "♩ =", metronome: true,
        note: "♩ = 60. Start metronome 1 bar before. Metronome throughout. WITH vibrato."
      },
      3: {
        title: "Track 3 – Spiccato / String Crossing",
        tempoFixed: 144, tempoMin: 144, tempoMax: 144,
        tempoLabel: "♩ =", metronome: true,
        note: "♩ = 144. Play both lines without a break. Metronome throughout."
      },
      4: {
        title: "Track 4 – Sicilienne",
        tempoFixed: 80, tempoMin: 80, tempoMax: 80,
        tempoLabel: "♩ =", metronome: true, metroStopAfterBeats: 10,
        note: "♩ = 80. Metronome a few beats before + 2 bars only."
      }
    }
  },

  /* ================================================================
   *  MS Viola – Honor Orchestra (4 tracks)
   * ================================================================ */
  viola: {
    headerTitle: "AMIS MSHO Viola – Set 1",
    headerSub: "Tap a numbered circle next to each scale or the excerpt.",
    filePrefix: "MS_Viola",
    zipName: "AMIS_MSHO_Viola_Set1",
    shareTitle: "AMIS MSHO Viola Audition – Set 1",
    shareText: "My viola audition recordings",
    pages: [
      {
        image: "parts/MS-Viola-1.jpg",
        alt: "Viola page 1 – scales",
        buttons: [
          { track: 1, top: "45%" },
          { track: 2, top: "58%" },
          { track: 3, top: "70%" }
        ]
      },
      {
        image: "parts/MS-Viola-2.jpg",
        alt: "Viola – Vivaldi Sonata",
        buttons: [{ track: 4, top: "24%" }]
      }
    ],
    tracks: {
      1: {
        title: "Track 1 – Scale (NO vibrato)",
        tempoFixed: 80, tempoMin: 80, tempoMax: 80,
        tempoLabel: "♩ =", metronome: true,
        note: "♩ = 80. Start metronome 1 bar before. Metronome throughout. NO vibrato."
      },
      2: {
        title: "Track 2 – Melodic Minor (WITH vibrato)",
        tempoFixed: 60, tempoMin: 60, tempoMax: 60,
        tempoLabel: "♩ =", metronome: true,
        note: "♩ = 60. Start metronome 1 bar before. Metronome throughout. WITH vibrato."
      },
      3: {
        title: "Track 3 – Spiccato / String Crossing",
        tempoFixed: 120, tempoMin: 120, tempoMax: 120,
        tempoLabel: "♩ =", metronome: true,
        note: "♩ = 120. Play both lines without a break. Metronome throughout."
      },
      4: {
        title: "Track 4 – Vivaldi Sonata (Allegro con spirito)",
        tempoFixed: 80, tempoMin: 80, tempoMax: 80,
        tempoLabel: "♩ =", metronome: true, metroStopAfterBeats: 12,
        note: "♩ = 80. Metronome 1 bar before + continuing for 2 bars only."
      }
    }
  },

  /* ================================================================
   *  MS Cello – Honor Orchestra (4 tracks)
   * ================================================================ */
  cello: {
    headerTitle: "AMIS MSHO Cello – Set 1",
    headerSub: "Tap a numbered circle next to each scale or the excerpt.",
    filePrefix: "MS_Cello",
    zipName: "AMIS_MSHO_Cello_Set1",
    shareTitle: "AMIS MSHO Cello Audition – Set 1",
    shareText: "My cello audition recordings",
    pages: [
      {
        image: "parts/MS-Cello-1.jpg",
        alt: "Cello page 1 – scales",
        buttons: [
          { track: 1, top: "45%" },
          { track: 2, top: "58%" },
          { track: 3, top: "70.5%" }
        ]
      },
      {
        image: "parts/MS-Cello-2.jpg",
        alt: "Cello – Träumerei",
        buttons: [{ track: 4, top: "23%" }]
      }
    ],
    tracks: {
      1: {
        title: "Track 1 – Scale (NO vibrato)",
        tempoFixed: 80, tempoMin: 80, tempoMax: 80,
        tempoLabel: "♩ =", metronome: true,
        note: "♩ = 80. Start metronome 1 bar before. Metronome throughout. NO vibrato."
      },
      2: {
        title: "Track 2 – Melodic Minor (WITH vibrato)",
        tempoFixed: 60, tempoMin: 60, tempoMax: 60,
        tempoLabel: "♩ =", metronome: true,
        note: "♩ = 60. Start metronome 1 bar before. Metronome throughout. WITH vibrato."
      },
      3: {
        title: "Track 3 – Spiccato / String Crossing",
        tempoFixed: 144, tempoMin: 144, tempoMax: 144,
        tempoLabel: "♩ =", metronome: true,
        note: "♩ = 144. Play both lines without a break. Metronome throughout."
      },
      4: {
        title: "Track 4 – Träumerei (Schumann)",
        tempoFixed: 63, tempoMin: 63, tempoMax: 63,
        tempoLabel: "♩ =", metronome: true, metroStopAfterBeats: 10,
        note: "♩ = 63. Metronome a few beats before + 2 bars only."
      }
    }
  },

  /* ================================================================
   *  MS Contrabass / Bass – Honor Orchestra (4 tracks)
   * ================================================================ */
  bass: {
    headerTitle: "AMIS MSHO Bass – Set 1",
    headerSub: "Tap a numbered circle next to each scale or the excerpt.",
    filePrefix: "MS_Bass",
    zipName: "AMIS_MSHO_Bass_Set1",
    shareTitle: "AMIS MSHO Bass Audition – Set 1",
    shareText: "My bass audition recordings",
    pages: [
      {
        image: "parts/MS-Bass-1.jpg",
        alt: "Bass page 1 – scales",
        buttons: [
          { track: 1, top: "42%" },
          { track: 2, top: "55%" },
          { track: 3, top: "68%" }
        ]
      },
      {
        image: "parts/MS-Bass-2.jpg",
        alt: "Bass – Grand March from Aida",
        buttons: [{ track: 4, top: "24%" }]
      }
    ],
    tracks: {
      1: {
        title: "Track 1 – Scale (NO vibrato)",
        tempoFixed: 80, tempoMin: 80, tempoMax: 80,
        tempoLabel: "♩ =", metronome: true,
        note: "♩ = 80. Start metronome 1 bar before. Metronome throughout. NO vibrato."
      },
      2: {
        title: "Track 2 – Melodic Minor (WITH vibrato)",
        tempoFixed: 80, tempoMin: 80, tempoMax: 80,
        tempoLabel: "♩ =", metronome: true,
        note: "♩ = 80. Start metronome 1 bar before. Metronome throughout. WITH vibrato."
      },
      3: {
        title: "Track 3 – Spiccato / String Crossing",
        tempoFixed: 100, tempoMin: 100, tempoMax: 100,
        tempoLabel: "♩ =", metronome: true,
        note: "♩ = 100. Play both lines without a break (key change). Metronome throughout."
      },
      4: {
        title: "Track 4 – Grand March from Aida",
        tempoFixed: 100, tempoMin: 100, tempoMax: 100,
        tempoLabel: "♩ =", metronome: true, metroStopAfterBeats: 12,
        note: "♩ = 100. Metronome 1 bar before + continuing for 2 bars only."
      }
    }
  }
};
