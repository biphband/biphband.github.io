const instrumentData = {
    'Brass': {
        'Trumpets': [
            'Trumpet 1',
            'Trumpet 2',
            'Trumpet 3'
        ],
        'Horns': [
            'F Horn 1',
            'F Horn 2',
            'F Horn 3',
            'F Horn 4',
        ],
        'Baritone': [
             'Baritone'
        ]
    }
};

const songData = {
    'Trumpet 1': [
      { title: '1. This is Halloween', pdf: 'PDFs/Brass/Trumpet 1/This is Halloween-Bb_Trumpet_1.pdf', audio: 'mp3s/Brass/Trumpet 1/This is Halloween-Bb_Trumpet_1.mp3' },
      { title: '2. Year After Year', pdf: 'PDFs/Brass/Trumpet 1/Year After Year-Bb_Trumpet_2,_3.pdf', audio: 'mp3s/Brass/Trumpet 1/Year After Year-Bb_Trumpet_1.mp3' },
      { title: '4. What\'s This', pdf: 'PDFs/Brass/Trumpet 1/What\'s This - Trumpet 1,2.pdf', audio: 'mp3s/Brass/Trumpet 1/Whats This-Trumpet_1,2.mp3' },
      { title: '8. Sally\'s Song', pdf: 'PDFs/Brass/Trumpet 1/Sally\'s Song-Bb_Trumpet_1.pdf', audio: 'mp3s/Brass/Trumpet 1/Sally\'s Song-Bb_Trumpet_1.mp3' },
      { title: '10. Pay the Price', pdf: 'PDFs/Brass/Trumpet 1/Pay the Price Transition-Bb_Trumpet_1.pdf', audio: 'mp3s/Brass/Trumpet 1/Pay the Price-Bb_Trumpet_1.mp3' },
      { title: '11. Kidnap The Sandy Claws', pdf: 'PDFs/Brass/Trumpet 1/Kidnap The Sandy Claws-Bb_Trumpet_1.pdf', audio: 'mp3s/Brass/Trumpet 1/Kidnap The Sandy Claws-Bb_Trumpet_1.mp3' },
      { title: '12. Jack\'s Lament', pdf: 'PDFs/Brass/Trumpet 1/Jack\'s Lament-Bb_Trumpet_2,_3.pdf', audio: 'mp3s/Brass/Trumpet 1/Jack\'s Lament-Bb_Trumpet_1.mp3' },
      { title: '16. Oogie Boogie', pdf: 'PDFs/Brass/Trumpet 1/Oogie Boogie Bb Trumpet 1.pdf', audio: 'mp3s/Brass/Trumpet 1/Oogie Boogies Song-Bb_Trumpet_1.mp3' },
      { title: '18. Christmas Eve Montage', pdf: 'PDFs/Brass/Trumpet 1/Christmas Eve Montage-Bb_Trumpet_1.pdf', audio: 'mp3s/Brass/Trumpet 1/Christmas Eve Montage-Bb_Trumpet_1.mp3' },
      { title: '20. Sally Gets Caught', pdf: 'PDFs/Brass/Trumpet 1/Sally Gets Caught Transition-Bb_Trumpet_1.pdf', audio: 'mp3s/Brass/Trumpet 1/Sally Gets Caught-Bb_Trumpet_1.mp3' },
      { title: '25. Finale', pdf: 'PDFs/Brass/Trumpet 1/Finale-Bb_Trumpet_1.pdf', audio: 'mp3s/Brass/Trumpet 1/Finale-Bb_Trumpet_1.mp3' },
    ],
    'Trumpet 2': [
      { title: '1. This is Halloween', pdf: 'PDFs/Brass/Trumpet 2/This is Halloween-Bb_Trumpet_2,_3.pdf', audio: 'mp3s/Brass/Trumpet 2/This is Halloween-Bb_Trumpet_2,_3.mp3' },
      { title: '2. Year After Year', pdf: 'PDFs/Brass/Trumpet 2/Year After Year-Bb_Trumpet_2,_3.pdf', audio: 'mp3s/Brass/Trumpet 2/Year After Year-Bb_Trumpet_2,_3.mp3' },
      { title: '4. What\'s This', pdf: 'PDFs/Brass/Trumpet 2/What\'s This Trumpet 2.pdf', audio: 'mp3s/Brass/Trumpet 2/Whats This-Trumpet_1,2.mp3' },
      { title: '8. Sally\'s Song', pdf: 'PDFs/Brass/Trumpet 2/Sally\'s Song-Bb_Trumpet_2,_3.pdf', audio: 'mp3s/Brass/Trumpet 2/Sally\'s Song-Bb_Trumpet_2,_3.mp3' },
      { title: '10. Pay the Price', pdf: 'PDFs/Brass/Trumpet 2/Pay the Price Transition-Bb_Trumpet_2.pdf', audio: 'mp3s/Brass/Trumpet 2/Pay the Price-Bb_Trumpet_2.mp3' },
      { title: '11. Kidnap The Sandy Claws', pdf: 'PDFs/Brass/Trumpet 2/Kidnap The Sandy Claws-Bb_Trumpet_2.pdf', audio: 'mp3s/Brass/Trumpet 2/Kidnap The Sandy Claws-Bb_Trumpet_2.mp3' },
      { title: '12. Jack\'s Lament', pdf: 'PDFs/Brass/Trumpet 2/Jack\'s Lament-Bb_Trumpet_2,_3.pdf', audio: 'mp3s/Brass/Trumpet 2/Jack\'s Lament-Bb_Trumpet_2,_3.mp3' },
      { title: '16. Oogie Boogie', pdf: 'PDFs/Brass/Trumpet 2/Oogie Boogie Bb Trumpet 2.pdf', audio: 'mp3s/Brass/Trumpet 2/Oogie Boogies Song-Bb_Trumpet_2.mp3' },
      { title: '18. Christmas Eve Montage', pdf: 'PDFs/Brass/Trumpet 2/Christmas Eve Montage-Bb_Trumpet_2,_3.pdf', audio: 'mp3s/Brass/Trumpet 2/Christmas Eve Montage-Bb_Trumpet_2,_3.mp3' },
      { title: '20. Sally Gets Caught', pdf: 'PDFs/Brass/Trumpet 2/Sally Gets Caught Transition-Bb_Trumpet_2.pdf', audio: 'mp3s/Brass/Trumpet 2/Sally Gets Caught-Bb_Trumpet_2.mp3' },
      { title: '25. Finale', pdf: 'PDFs/Brass/Trumpet 2/Finale-Bb_Trumpet_2.pdf', audio: 'mp3s/Brass/Trumpet 2/Finale-Bb_Trumpet_2.mp3' },
    ],
    'Trumpet 3': [
      { title: '1. This is Halloween', pdf: 'PDFs/Brass/Trumpet 3/This is Halloween-Bb_Trumpet_2,_3.pdf', audio: 'mp3s/Brass/Trumpet 3/This is Halloween-Bb_Trumpet_2,_3.mp3' },
      { title: '2. Year After Year', pdf: 'PDFs/Brass/Trumpet 3/Year After Year-Bb_Trumpet_2,_3.pdf', audio: 'mp3s/Brass/Trumpet 3/Year After Year-Bb_Trumpet_2,_3.mp3' },
      { title: '4. What\'s This', pdf: 'PDFs/Brass/Trumpet 3/What\'s This Trumpet 3.pdf', audio: 'mp3s/Brass/Trumpet 3/Whats This-Trumpet_3.mp3' },
      { title: '8. Sally\'s Song', pdf: 'PDFs/Brass/Trumpet 3/Sally\'s Song-Bb_Trumpet_2,_3.pdf', audio: 'mp3s/Brass/Trumpet 3/Sally\'s Song-Bb_Trumpet_2,_3.mp3' },
      { title: '10. Pay the Price', pdf: 'PDFs/Brass/Trumpet 3/Pay the Price Transition-Bb_Trumpet_2.pdf', audio: 'mp3s/Brass/Trumpet 3/Pay the Price-Bb_Trumpet_2.mp3' },
      { title: '11. Kidnap The Sandy Claws', pdf: 'PDFs/Brass/Trumpet 3/Kidnap The Sandy Claws-Bb_Trumpet_2.pdf', audio: 'mp3s/Brass/Trumpet 3/Kidnap The Sandy Claws-Bb_Trumpet_2.mp3' },
      { title: '12. Jack\'s Lament', pdf: 'PDFs/Brass/Trumpet 3/Jack\'s Lament-Bb_Trumpet_2,_3.pdf', audio: 'mp3s/Brass/Trumpet 3/Jack\'s Lament-Bb_Trumpet_2,_3.mp3' },
      { title: '16. Oogie Boogie', pdf: 'PDFs/Brass/Trumpet 3/Oogie Boogie Bb Trumpet 2.pdf', audio: 'mp3s/Brass/Trumpet 3/Oogie Boogies Song-Bb_Trumpet_2.mp3' },
      { title: '18. Christmas Eve Montage', pdf: 'PDFs/Brass/Trumpet 3/Christmas Eve Montage-Bb_Trumpet_2,_3.pdf', audio: 'mp3s/Brass/Trumpet 3/Christmas Eve Montage-Bb_Trumpet_2,_3.mp3' },
      { title: '20. Sally Gets Caught', pdf: 'PDFs/Brass/Trumpet 3/Sally Gets Caught Transition-Bb_Trumpet_2.pdf', audio: 'mp3s/Brass/Trumpet 3/Sally Gets Caught-Bb_Trumpet_2.mp3' },
      { title: '25. Finale', pdf: 'PDFs/Brass/Trumpet 3/Finale-Bb_Trumpet_2.pdf', audio: 'mp3s/Brass/Trumpet 3/Finale-Bb_Trumpet_2.mp3' },
    ],
    'F Horn 1': [
        { title: '1. This is Halloween', pdf: 'PDFs/Brass/F Horn 1/1. This is Halloween-Horn_in_F_1,_2.pdf', audio: 'mp3s/Brass/F Horn 1/This is Halloween-Horn_in_F_1,_2.mp3' },
        { title: "4. What's This", pdf: 'PDFs/Brass/F Horn 1/4. What\'s This Horn in F 1, 2.pdf', audio: 'mp3s/Brass/F Horn 1/Whats This-Horn_in_F_1,_2.mp3' },
        { title: '6. And They Call Him Sandy Claws', pdf: 'PDFs/Brass/F Horn 1/6. And They Call Him Sandy Claws - F Horn.pdf', audio: 'mp3s/Brass/F Horn 1/And They Call Him Sandy Claws-F_Horn.mp3' },
        { title: "8. Sally's Song", pdf: 'PDFs/Brass/F Horn 1/8. Sally\'s Song-Horn_in_F_1,_2.pdf', audio: 'mp3s/Brass/F Horn 1/Sally\'s Song-Horn_in_F_1,_2.mp3' },
        { title: '10. Pay the Price', pdf: 'PDFs/Brass/F Horn 1/10. Pay the Price Horn 1, 2.pdf', audio: null },
        { title: '11. Kidnap The Sandy Claws', pdf: 'PDFs/Brass/F Horn 1/11. Kidnap The Sandy Claws-Horn_in_F.pdf', audio: 'mp3s/Brass/F Horn 1/Kidnap The Sandy Claws-Horn_in_F.mp3' },
        { title: '18. Christmas Eve Montage', pdf: 'PDFs/Brass/F Horn 1/18. Christmas Eve Montage-Horn_in_F_1,_2.pdf', audio: 'mp3s/Brass/F Horn 1/Christmas Eve Montage-Horn_in_F_1,_2.mp3' },
        { title: '20. Sally Gets Caught', pdf: 'PDFs/Brass/F Horn 1/20. Sally Gets Caught F Horn.pdf', audio: 'mp3s/Brass/F Horn 1/Sally Gets Caught-F_Horn.mp3' },
        { title: '25. Finale', pdf: 'PDFs/Brass/F Horn 1/25. Finale-Horn_in_F_1,2.pdf', audio: 'mp3s/Brass/F Horn 1/Finale-Horn_in_F_1.mp3' },
    ],
    'F Horn 2': [
        { title: '1. This is Halloween', pdf: 'PDFs/Brass/F Horn 2/1. This is Halloween-Horn_in_F_1,_2.pdf', audio: 'mp3s/Brass/F Horn 2/This is Halloween-Horn_in_F_1,_2.mp3' },
        { title: "4. What's This", pdf: 'PDFs/Brass/F Horn 2/4. What\'s This Horn in F 1, 2.pdf', audio: 'mp3s/Brass/F Horn 2/Whats This-Horn_in_F_1,_2.mp3' },
        { title: '6. And They Call Him Sandy Claws', pdf: 'PDFs/Brass/F Horn 2/6. And They Call Him Sandy Claws - F Horn.pdf', audio: 'mp3s/Brass/F Horn 2/And They Call Him Sandy Claws-F_Horn.mp3' },
        { title: "8. Sally's Song", pdf: 'PDFs/Brass/F Horn 2/8. Sally\'s Song-Horn_in_F_1,_2.pdf', audio: 'mp3s/Brass/F Horn 2/Sally\'s Song-Horn_in_F_1,_2.mp3' },
        { title: '10. Pay the Price', pdf: 'PDFs/Brass/F Horn 2/10. Pay the Price Horn 1, 2.pdf', audio: null },
        { title: '11. Kidnap The Sandy Claws', pdf: 'PDFs/Brass/F Horn 2/11. Kidnap The Sandy Claws-Horn_in_F.pdf', audio: 'mp3s/Brass/F Horn 2/Kidnap The Sandy Claws-Horn_in_F.mp3' },
        { title: '18. Christmas Eve Montage', pdf: 'PDFs/Brass/F Horn 2/18. Christmas Eve Montage-Horn_in_F_1,_2.pdf', audio: 'mp3s/Brass/F Horn 2/Christmas Eve Montage-Horn_in_F_1,_2.mp3' },
        { title: '20. Sally Gets Caught', pdf: 'PDFs/Brass/F Horn 2/20. Sally Gets Caught F Horn.pdf', audio: 'mp3s/Brass/F Horn 2/Sally Gets Caught-F_Horn.mp3' },
        { title: '25. Finale', pdf: 'PDFs/Brass/F Horn 2/25. Finale-Horn_in_F_1,2.pdf', audio: null },
    ],
    'F Horn 3': [
        { title: '1. This is Halloween', pdf: 'PDFs/Brass/F Horn 3/1. This is Halloween-Horn_in_F_3,_4.pdf', audio: 'mp3s/Brass/F Horn 3/This is Halloween-Horn_in_F_3,_4.mp3' },
        { title: "4. What's This", pdf: 'PDFs/Brass/F Horn 3/4. What\'s This Horn in F 3, 4.pdf', audio: 'mp3s/Brass/F Horn 3/Whats This-Horn_in_F_3,_4.mp3' },
        { title: '6. And They Call Him Sandy Claws', pdf: 'PDFs/Brass/F Horn 3/6. And They Call Him Sandy Claws - F Horn.pdf', audio: 'mp3s/Brass/F Horn 3/And They Call Him Sandy Claws-F_Horn.mp3' },
        { title: "8. Sally's Song", pdf: 'PDFs/Brass/F Horn 3/8. Sally\'s Song-Horn_in_F_3,_4.pdf', audio: 'mp3s/Brass/F Horn 3/Sally\'s Song-Horn_in_F_3,_4.mp3' },
        { title: '11. Kidnap The Sandy Claws', pdf: 'PDFs/Brass/F Horn 3/11. Kidnap The Sandy Claws-Horn_in_F.pdf', audio: 'mp3s/Brass/F Horn 3/Kidnap The Sandy Claws-Horn_in_F.mp3' },
        { title: '18. Christmas Eve Montage', pdf: 'PDFs/Brass/F Horn 3/18. Christmas Eve Montage-Horn_in_F_3,_4.pdf', audio: 'mp3s/Brass/F Horn 3/Christmas Eve Montage-Horn_in_F_3,_4.mp3' },
        { title: '20. Sally Gets Caught', pdf: 'PDFs/Brass/F Horn 3/20. Sally Gets Caught F Horn.pdf', audio: 'mp3s/Brass/F Horn 3/Sally Gets Caught-F_Horn.mp3' },
        { title: '25. Finale', pdf: 'PDFs/Brass/F Horn 3/25. Finale-Horn_in_F_3.4.pdf', audio: 'mp3s/Brass/F Horn 3/Finale-Horn_in_F_2.mp3' },
    ],
    'F Horn 4': [
        { title: '1. This is Halloween', pdf: 'PDFs/Brass/F Horn 4/1. This is Halloween-Horn_in_F_3,_4.pdf', audio: 'mp3s/Brass/F Horn 4/1. This is Halloween-Horn_in_F_3,_4.mp3' },
        { title: "4. What's This", pdf: 'PDFs/Brass/F Horn 4/4. What\'s This Horn in F 3, 4.pdf', audio: 'mp3s/Brass/F Horn 4/4. What\'s This Horn in F 3, 4.mp3' },
        { title: '6. And They Call Him Sandy Claws', pdf: 'PDFs/Brass/F Horn 4/6. And They Call Him Sandy Claws - F Horn.pdf', audio: 'mp3s/Brass/F Horn 4/6. And They Call Him Sandy Claws - F Horn.mp3' },
        { title: "8. Sally's Song", pdf: 'PDFs/Brass/F Horn 4/8. Sally\'s Song-Horn_in_F_3,_4.pdf', audio: 'mp3s/Brass/F Horn 4/8. Sally\'s Song-Horn_in_F_3,_4.mp3' },
        { title: '11. Kidnap The Sandy Claws', pdf: 'PDFs/Brass/F Horn 4/11. Kidnap The Sandy Claws-Horn_in_F.pdf', audio: 'mp3s/Brass/F Horn 4/11. Kidnap The Sandy Claws-Horn_in_F.mp3' },
        { title: '18. Christmas Eve Montage', pdf: 'PDFs/Brass/F Horn 4/18. Christmas Eve Montage-Horn_in_F_3,_4.pdf', audio: 'mp3s/Brass/F Horn 4/18. Christmas Eve Montage-Horn_in_F_3,_4.mp3' },
        { title: '20. Sally Gets Caught', pdf: 'PDFs/Brass/F Horn 4/20. Sally Gets Caught F Horn.pdf', audio: 'mp3s/Brass/F Horn 4/20. Sally Gets Caught F Horn.mp3' },
        { title: '25. Finale', pdf: 'PDFs/Brass/F Horn 4/25. Finale-Horn_in_F_3.4.pdf', audio: 'mp3s/Brass/F Horn 4/25. Finale-Horn_in_F_3.4.mp3' },
    ],
};