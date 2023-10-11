var vocab;

var cumulative = [
    {"Term":"Audiate","Definition":"To mentally hear a note or melody without actually producing any sound."},
    {"Term":"Legato","Definition":"A musical term indicating smooth and connected playing or singing, without any noticeable breaks between notes."},
    {"Term":"Staccato","Definition":"A musical term indicating short and detached playing or singing, with brief pauses between notes."},
    {"Term":"Andante","Definition":"A tempo marking indicating a moderately slow and flowing pace of music."},
    {"Term":"Moderato","Definition":"A tempo marking indicating a moderate pace of music."},
    {"Term":"Allegro","Definition":"A tempo marking indicating a fast and lively pace of music."},
    {"Term":"Embouchure","Definition":"The way in which a musician applies their mouth to a wind instrument to produce sound."},
    {"Term":"Fermata","Definition":"A symbol placed above a note or rest to indicate that it should be prolonged beyond its normal duration."},
    {"Term":"Crescendo","Definition":"A dynamic marking indicating a gradual increase in volume or intensity of the music."},
    {"Term":"Decrescendo","Definition":"A dynamic marking indicating a gradual decrease in volume or intensity of the music."},
    {"Term":"Subdivide","Definition":"The act of dividing a beat or pulse into smaller rhythmic units."},
    {"Term":"Phrasing","Definition":"The way in which musical phrases are shaped and articulated to create a sense of musical expression and communication."},
    {"Term":"Coda","Definition":"A concluding section of a musical composition that is separate from the main body of the piece."},
    {"Term":"Dynamics","Definition":"The varying levels of volume and intensity in music, indicated by dynamic markings such as piano (soft) and forte (loud)."},
    {"Term":"Intonation","Definition":"The act of being in tune"},
    {"Term":"Dissonance","Definition":"A sound of clashing produced by conflicting notes"},
    {"Term":"Consonance","Definition":"The opposite of dissonance, pleasant sounds"},
    {"Term":"Staff","Definition":"The five lines you write music on"},
    {"Term":"Ledger Lines","Definition":"Short lines written above and below the staff"},
    {"Term":"Treble Clef","Definition":"G clef, the symbol representing the upper register"},
    {"Term":"Bass Clef","Definition":"F clef, the symbol representing the lower register"},
    {"Term":"Accidental","Definition":"markings in the music that alter the pitch of a note"},
    {"Term":"Sharp","Definition":"Raises a natural pitch by one half step"},
    {"Term":"Flat","Definition":"Lowers a natural pitch by one half step"},
    {"Term":"Natural","Definition":"Returns a note to it’s natural state, canceling any accidentals"},
    {"Term":"Enharmonic","Definition":"An alternate spelling of a note (i.e. C#/Db)"},
    {"Term":"Key","Definition":"The scale used in a piece of music"},
    {"Term":"Key Signature","Definition":"The set of sharps and flats which determine the key"},
    {"Term":"Solfege","Definition":"Do, Re, Mi, etc."},
    {"Term":"Scale","Definition":"The notes of a given key, ascending and descending"},
];

var unit1 = [
    {"Term":"Audiate","Definition":"To mentally hear a note or melody without actually producing any sound."},
    {"Term":"Legato","Definition":"A musical term indicating smooth and connected playing or singing, without any noticeable breaks between notes."},
    {"Term":"Staccato","Definition":"A musical term indicating short and detached playing or singing, with brief pauses between notes."},
    {"Term":"Andante","Definition":"A tempo marking indicating a moderately slow and flowing pace of music."},
    {"Term":"Moderato","Definition":"A tempo marking indicating a moderate pace of music."},
    {"Term":"Allegro","Definition":"A tempo marking indicating a fast and lively pace of music."},
    {"Term":"Embouchure","Definition":"The way in which a musician applies their mouth to a wind instrument to produce sound."},
    {"Term":"Fermata","Definition":"A symbol placed above a note or rest to indicate that it should be prolonged beyond its normal duration."},
    {"Term":"Crescendo","Definition":"A dynamic marking indicating a gradual increase in volume or intensity of the music."},
    {"Term":"Decrescendo","Definition":"A dynamic marking indicating a gradual decrease in volume or intensity of the music."},
    {"Term":"Subdivide","Definition":"The act of dividing a beat or pulse into smaller rhythmic units."},
    {"Term":"Phrasing","Definition":"The way in which musical phrases are shaped and articulated to create a sense of musical expression and communication."},
    {"Term":"Coda","Definition":"A concluding section of a musical composition that is separate from the main body of the piece."},
    {"Term":"Dynamics","Definition":"The varying levels of volume and intensity in music, indicated by dynamic markings such as piano (soft) and forte (loud)."},
    {"Term":"Intonation","Definition":"The act of being in tune"},
    {"Term":"Dissonance","Definition":"A sound of clashing produced by conflicting notes"},
    {"Term":"Consonance","Definition":"The opposite of dissonance, pleasant sounds"},
    {"Term":"Staff","Definition":"The five lines you write music on"},
    {"Term":"Ledger Lines","Definition":"Short lines written above and below the staff"},
    {"Term":"Treble Clef","Definition":"G clef, the symbol representing the upper register"},
    {"Term":"Bass Clef","Definition":"F clef, the symbol representing the lower register"},
    {"Term":"Accidental","Definition":"markings in the music that alter the pitch of a note"},
    {"Term":"Sharp","Definition":"Raises a natural pitch by one half step"},
    {"Term":"Flat","Definition":"Lowers a natural pitch by one half step"},
    {"Term":"Natural","Definition":"Returns a note to it’s natural state, canceling any accidentals"},
    {"Term":"Enharmonic","Definition":"An alternate spelling of a note (i.e. C#/Db)"},
    {"Term":"Key","Definition":"The scale used in a piece of music"},
    {"Term":"Key Signature","Definition":"The set of sharps and flats which determine the key"},
    {"Term":"Solfege","Definition":"Do, Re, Mi, etc."},
    {"Term":"Scale","Definition":"The notes of a given key, ascending and descending"},
];
var unit2 = [

];

    function getVocab() {
        let vocabSelect = document.querySelector('select');
        if (vocabSelect.value == 'Unit1') {
            vocab = unit1;
            getRandomWord()
        } else if (vocabSelect.value == 'Unit2') {
            vocab = unit2;
            getRandomWord()
        } else if (vocabSelect.value == 'Cumulative') {
            vocab = cumulative;
        }
    }

getVocab()

let listlength = Object.keys(vocab).length;
let theword = Math.floor(Math.random() * listlength);


const term = document.querySelector('.term');
const pinyin = document.querySelector('.pinyin');
const english = document.querySelector('.english');
const pinyinButton = document.querySelector('.button-container .pinyinbutton');
const definitionButton = document.querySelector('.button-container .definitionButton');
const nextButton = document.querySelector('.button-container .nextButton');

function getRandomWord() {
    listlength = Object.keys(vocab).length;
    theword = Math.floor(Math.random() * listlength);
    term.innerHTML = `<h3>${vocab[theword].Term}</h3>`;
    english.innerHTML = `<h3>${vocab[theword].Definition}</h3>`;
    term.style.visibility='hidden';
    pinyin.style.visibility='hidden';
    pinyinButton.style.display = 'none'; 
    definitionButton.style.display='block';
    nextButton.style.display='none';
}

 
definitionButton.addEventListener('click', () => {
    term.style.visibility = 'visible';
    definitionButton.style.display='none'
    nextButton.style.display='block';
})

nextButton.addEventListener('click', () => {
    pinyin.style.visibility = 'hidden';
    english.style.visibility = 'hidden';
    nextButton.style.display='none';
    definitionButton.style.display = 'block';  
    english.style.visibility = 'visible';
    getRandomWord();
});


document.addEventListener('keydown', (e) => {
        if (e.keyCode == 32) { 
            e.preventDefault(); 
            autoProgress = !autoProgress;
            progressSpeedSlider.style.display = autoProgress ? 'block' : 'none';
            if (autoProgress) {
                autoProgressInterval = setInterval(() => {
                    if (pinyinButton.style.display == 'block') {
                        pinyinButton.click();
                    } else if (definitionButton.style.display == 'block') {
                        definitionButton.click();
                    } else if (nextButton.style.display == 'block') {
                        nextButton.click();
                    }
                }, progressSpeedSlider.value);
                autoProgressButton.textContent = "Stop";
            } else {
                clearInterval(autoProgressInterval);
                autoProgressButton.textContent = "Auto-progress";
            }
        } else if (e.key == 'Enter') { 
            if (pinyinButton.style.display == 'block') {
                pinyinButton.click();
            } else if (definitionButton.style.display == 'block') {
                definitionButton.click();
            } else if (nextButton.style.display == 'block') {
                nextButton.click();
            }
        } else if (e.keyCode == 39) { // check for left arrow key
                e.preventDefault(); 
                progressSpeedSlider.value = Math.max(500, parseInt(progressSpeedSlider.value) - 250); // decrease speed by 250
                if (autoProgress) { // restart auto-progress interval with new speed
                    clearInterval(autoProgressInterval);
                    autoProgressInterval = setInterval(() => {
                        if (pinyinButton.style.display == 'block') {
                            pinyinButton.click();
                        } else if (definitionButton.style.display == 'block') {
                            definitionButton.click();
                        } else if (nextButton.style.display == 'block') {
                            nextButton.click();
                        }
                    }, progressSpeedSlider.value);
                }
            } else if (e.keyCode == 37) { // check for right arrow key
                e.preventDefault(); 
                progressSpeedSlider.value = Math.min(3000, parseInt(progressSpeedSlider.value) + 250); // increase speed by 250
                if (autoProgress) { // restart auto-progress interval with new speed
                    clearInterval(autoProgressInterval);
                    autoProgressInterval = setInterval(() => {
                        if (pinyinButton.style.display == 'block') {
                            pinyinButton.click();
                        } else if (definitionButton.style.display == 'block') {
                            definitionButton.click();
                        } else if (nextButton.style.display == 'block') {
                            nextButton.click();
                        }
                    }, progressSpeedSlider.value);
                }
            }
        });


const autoProgressButton = document.querySelector('.autoProgressButton');
const progressSpeedSlider = document.getElementById('progressSpeed');
let autoProgress = false;
let autoProgressInterval;

autoProgressButton.addEventListener('click', () => {
        autoProgress = !autoProgress;
        progressSpeedSlider.style.display = autoProgress ? 'block' : 'none';
        if (autoProgress) {
            autoProgressInterval = setInterval(() => {
                if (pinyinButton.style.display == 'block') {
                    pinyinButton.click();
                } else if (definitionButton.style.display == 'block') {
                    definitionButton.click();
                } else if (nextButton.style.display == 'block') {
                    nextButton.click();
                }
            }, progressSpeedSlider.value);
            autoProgressButton.textContent = "Stop";
        } else {
            clearInterval(autoProgressInterval);
            autoProgressButton.textContent = "Auto-progress";
        }
    });

progressSpeedSlider.addEventListener('input', () => {
    if (autoProgress) {
        clearInterval(autoProgressInterval);
        autoProgressInterval = setInterval(() => {
            if (pinyinButton.style.display == 'block') {
                pinyinButton.click();
            } else if (definitionButton.style.display == 'block') {
                definitionButton.click();
            } else if (nextButton.style.display == 'block') {
                nextButton.click();
            }
        }, progressSpeedSlider.value);
    }
});
 
getRandomWord();