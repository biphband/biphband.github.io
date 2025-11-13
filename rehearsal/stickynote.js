const STICKY_NOTES_CONFIG = [
    {
        id: 'ALL BAND - The Nutcracker QR',
        forWhichClasses: ["MS Band", "HS Band", "MS Band ᵀᴴᵁᴿˢ"],
        position: { x: window.innerWidth - 300, y: 300 },
        dimensions: { width: 150, height: 150 },
        textContent: '',
        imageSrc: 'qr-code.png',
        backgroundColor: '#ffd75e', //yellow
    },


    {
        id: 'MIDDLE SCHOOL',
        forWhichClasses: ["MS Band"],
        position: { x: 100, y: 300 },
        dimensions: { width: 250, height: 200 },
        textContent: 'Don\'t forget to join a HS session this week 💡',
        imageSrc: '',
        //backgroundColor: '#7BDAC3', //teal
        backgroundColor: '#ff9999', //red
    },

        {
        id: 'MIDDLE SCHOOL (THURSDAY)',
        forWhichClasses: ["MS Band ᵀᴴᵁᴿˢ"],
        position: { x: 100, y: 300 },
        dimensions: { width: 250, height: 200 },
        textContent: 'Last day to join HS! Don\'t forget! 💡',
        imageSrc: '',
        //backgroundColor: '#7BDAC3', //teal
        backgroundColor: '#ff9999', //red
    },

    // {
    //     id: 'HIGH SCHOOL',
    //     forWhichClasses: ["HS Band"],
    //     position: { x: 100, y: 300 },
    //     dimensions: { width: 250, height: 60 },
    //     textContent: 'Reminder: ',
    //     imageSrc: '',
    //     backgroundColor: '#ff9999', //red
    // },


    {
        id: 'PRODUCTION TECH', 
        forWhichClasses: ["Production Tech"], 
        position: { x: 200, y: 200 }, 
        dimensions: { width: 230, height: 150 }, 
        textContent: 'If you need to make an event request to reserve a space, let me know.', 
        imageSrc: '',
        backgroundColor: '#ff9999', 
    },
];

function isStickyNoteAllowed(config) {
    const currentClass = classes[currentClassIndex].name;
    return config.forWhichClasses.includes(currentClass);
}

function createStickyNote(config, id) {
    if (!isStickyNoteAllowed(config)) return;

    document.querySelectorAll(`.sticky-note[data-id="${id}"]`).forEach(note => note.remove());

    const note = document.createElement('div');
    note.className = 'sticky-note';
    note.dataset.id = id;
    note.style.position = 'absolute';
    note.style.left = `${config.position.x}px`;
    note.style.top = `${config.position.y}px`;
    note.style.width = `${config.dimensions.width}px`;
    note.style.height = `${config.dimensions.height}px`;
    note.style.minHeight = '60px';
    note.style.minWidth = '100px';
    note.style.backgroundColor = config.backgroundColor;
    note.style.padding = '20px';
    note.style.boxShadow = '2px 2px 8px rgba(0,0,0,0.3)';
    note.style.cursor = 'move';
    note.style.zIndex = currentZIndex++;
    note.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
    note.style.transform = 'rotate(-2deg)';
    note.style.resize = 'both';
    note.style.overflow = 'auto';

    // Pseudo-element effect for tape
    const tape = document.createElement('div');
    tape.style.position = 'absolute';
    tape.style.top = '0';
    tape.style.left = '50%';
    tape.style.width = '60px';
    tape.style.height = '10px';
    tape.style.backgroundColor = 'rgba(255,255,255,0.5)';
    tape.style.transform = 'translateX(-50%)';

    const header = document.createElement('div');
    header.className = 'sticky-note-header';
    header.style.marginBottom = '10px';
    header.style.cursor = 'move';
    header.style.position = 'relative';

    if (config.imageSrc) {
        const img = document.createElement('img');
        img.src = config.imageSrc;
        img.alt = 'QR Code';
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.userSelect = 'none';
        img.draggable = false;
        header.appendChild(img);
        header.style.height = '20px';
    } else {
        header.style.height = '0px';
    }

    const closeBtn = document.createElement('span');
    closeBtn.className = 'sticky-close';
    closeBtn.innerHTML = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '2px';
    closeBtn.style.right = '2px';
    closeBtn.style.padding = '2px 6px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = 'black';
    closeBtn.style.borderRadius = '50%';
    closeBtn.style.lineHeight = '1';
    closeBtn.onclick = function() {
        note.remove();
        removeStickyNote(id);
    };

    const contentDiv = document.createElement('div');
    contentDiv.className = 'sticky-note-content';
    contentDiv.textContent = config.textContent;
    contentDiv.style.width = '100%';
    contentDiv.style.height = config.imageSrc ? 'calc(100% - 60px)' : 'calc(100% - 40px)';
    contentDiv.style.border = 'none';
    contentDiv.style.background = 'transparent';
    contentDiv.style.resize = 'none';
    contentDiv.style.fontFamily = 'inherit';
    contentDiv.style.fontSize = '16px';
    contentDiv.style.lineHeight = '1.5';
    contentDiv.style.outline = 'none';

    // Make content editable and update config on change
    contentDiv.contentEditable = true;
    contentDiv.addEventListener('input', () => {
        config.textContent = contentDiv.textContent;
        saveStickyNote(id, config);
    });

    // Set mode to STICKY_NOTE when focused
    contentDiv.addEventListener('focus', () => {
        currentMode = MODES.STICKY_NOTE;
    });

    // Reset mode to GLOBAL when blurred
    contentDiv.addEventListener('blur', () => {
        currentMode = MODES.GLOBAL;
        saveStickyNote(id, config); // Save on blur to ensure latest content is saved
    });

    note.appendChild(tape);
    note.appendChild(header);
    note.appendChild(closeBtn);
    note.appendChild(contentDiv);
    document.body.appendChild(note);

    // Add drag functionality
    let isDragging = false;
    let currentX = config.position.x;
    let currentY = config.position.y;
    let initialX;
    let initialY;

    note.addEventListener('mousedown', (e) => {
        if (e.target === closeBtn || e.target === contentDiv) return;
        isDragging = true;
        initialX = e.clientX - currentX;
        initialY = e.clientY - currentY;
        note.style.cursor = 'grabbing';
        currentMode = MODES.STICKY_NOTE;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            note.style.left = `${currentX}px`;
            note.style.top = `${currentY}px`;
            config.position.x = currentX;
            config.position.y = currentY;
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            note.style.cursor = 'move';
            saveStickyNote(id, config);
            currentMode = MODES.GLOBAL;
        }
    });

    // Handle resize
    note.addEventListener('resize', () => {
        config.dimensions.width = note.offsetWidth;
        config.dimensions.height = note.offsetHeight;
        saveStickyNote(id, config);
    });
}

// Save sticky note content to localStorage
function saveStickyNote(id, config) {
    const currentClass = classes[currentClassIndex].name;
    const key = `stickyNote_${currentClass}_${id}`;
    const noteData = {
        id,
        textContent: config.textContent,
        position: config.position,
        dimensions: config.dimensions,
        backgroundColor: config.backgroundColor,
        imageSrc: config.imageSrc,
        forWhichClasses: config.forWhichClasses
    };
    localStorage.setItem(key, JSON.stringify(noteData));
}

// Remove sticky note from localStorage
function removeStickyNote(id) {
    const currentClass = classes[currentClassIndex].name;
    const key = `stickyNote_${currentClass}_${id}`;
    localStorage.removeItem(key);
}

// Load sticky notes for the current class
function loadStickyNotes() {
    // Remove existing sticky notes from DOM
    document.querySelectorAll('.sticky-note').forEach(note => note.remove());

    const currentClass = classes[currentClassIndex].name;
    STICKY_NOTES_CONFIG.forEach(config => {
        if (!isStickyNoteAllowed(config)) return;
        const key = `stickyNote_${currentClass}_${config.id}`;
        const savedNoteData = JSON.parse(localStorage.getItem(key));
        if (savedNoteData) {
            config.textContent = savedNoteData.textContent || config.textContent;
            config.position = savedNoteData.position || config.position;
            config.dimensions = savedNoteData.dimensions || config.dimensions;
            config.backgroundColor = savedNoteData.backgroundColor || config.backgroundColor;
            config.imageSrc = savedNoteData.imageSrc || config.imageSrc;
            config.forWhichClasses = savedNoteData.forWhichClasses || config.forWhichClasses;
        }
        createStickyNote(config, config.id);
    });
}