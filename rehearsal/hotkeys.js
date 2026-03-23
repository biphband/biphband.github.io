const hotkeys = [
    { key: "t", description: "Toggle teacher mode." },
    { key: "/", description: "Search student name." },
    { key: "→", description: "Next student." },
    { key: "←", description: "Previous student." },
    { key: "↑", description: "Increase participation by 10." },
    { key: "↓", description: "Decrease participation by 10." },
    { key: "r", description: "Call a random student." },
    { key: "?", description: "Show hotkeys menu." }
];

// Track called students for the current class
let calledStudents = [];

function getMenuHotkeys() {
    const isProductionTech = classes[currentClassIndex].name === "Production Tech";
    return [
        { key: "a", description: "Toggle Attendance." },
        { key: isProductionTech ? "d" : "s", description: `Toggle ${isProductionTech ? 'Devices' : 'Stands'} checkbox(es).` },
        { key: isProductionTech ? "e" : "i", description: `Toggle ${isProductionTech ? 'Engagement' : 'intonation'} checkbox(es).` },
        { key: isProductionTech ? "r" : "r", description: `Toggle ${isProductionTech ? 'Review' : 'Returned'} checkbox(es).` },
        { key: isProductionTech ? "p" : "e", description: `Toggle ${isProductionTech ? 'Progress' : 'Engagement'} checkbox(es).` },
        { key: "h", description: "Toggle House Shield." },
        { key: "Esc", description: "Close current window or House Shield." }
    ];
}

function populateHotkeys(hotkeys, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    hotkeys.forEach(hotkey => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${hotkey.key}</strong>\t: ${hotkey.description}`;
        container.appendChild(div);
    });
}

function updateHotkeysDisplay() {
    populateHotkeys(hotkeys, 'hotkeys');
    populateHotkeys(getMenuHotkeys(), 'menuHotkeys');
}

function handleHouseShieldHotkey(event) {
    if (window.isObjectiveInputFocused) return;

    if (event.key === 'h' && !isActive) {
        activateHouseshield();
    } else if (isActive) {
        handleActiveHouseshield(event);
    }
}

function handleFloatingMenuHotkeys(event, studentName) {
    if (window.isObjectiveInputFocused) return;

    const student = students.find(s => s.name === studentName);
    if (!student) return;

    if (currentStudentIndex === -1) {
        currentStudentIndex = students.findIndex(s => s.name === studentName);
    }

    const isProductionTech = classes[currentClassIndex].name === "Production Tech";
    
    switch (event.key) {
        case 'a':
            cycleAttendanceForStudent(student);
            break;
        case isProductionTech ? 'd' : 's':
            toggleCheckboxForStudent(student, isProductionTech ? 'devices' : 'stands');
            break;
        case isProductionTech ? 'e' : 'i':
            toggleCheckboxForStudent(student, isProductionTech ? 'engagement' : 'intonation');
            break;
        case 'r':
            toggleCheckboxForStudent(student, isProductionTech ? 'review' : 'returned');
            break;
        case isProductionTech ? 'p' : 'e':
            toggleCheckboxForStudent(student, isProductionTech ? 'progress' : 'engagement');
            break;
        case 'h':
            toggleHouseShield();
            break;
    }
    updateFloatingMenu(student);
}

function handleSearchBoxKeys(event) {
    if (window.isObjectiveInputFocused) return;

    const searchInput = document.getElementById('search-input');
    const results = searchResults.children;

    if (event.shiftKey && (event.key === '=' || event.key === '+')) {
        event.preventDefault();
        toggleAddStudentMode();
        return;
    }

    switch (event.key) {
        case 'Escape':
            closeSearchBox();
            break;
        case 'ArrowUp':
            event.preventDefault();
            if (selectedIndex > 0) {
                results[selectedIndex].classList.remove('selected');
                selectedIndex--;
                results[selectedIndex].classList.add('selected');
            }
            break;
        case 'ArrowDown':
            event.preventDefault();
            if (selectedIndex < results.length - 1) {
                results[selectedIndex].classList.remove('selected');
                selectedIndex++;
                results[selectedIndex].classList.add('selected');
            }
            break;
        case 'Enter':
            event.preventDefault();
            if (results[selectedIndex]) {
                const studentName = results[selectedIndex].textContent;
                if (isAddingStudent) {
                    addStudent(studentName);
                } else {
                    showFloatingMenu(null, studentName);
                    closeSearchBox();
                }
            }
            break;
        default:
            setTimeout(() => updateSearchResults(searchInput.value), 0);
    }
}

function handleActiveHouseshield(event) {
    if (currentStudentIndex === -1 || currentStudentIndex >= students.length) {
        deactivateHouseshield();
        return;
    }
    if (event.key.toLowerCase() === 'h') {
        toggleHouseShield();
    } else if (event.key === 'ArrowUp') {
        currentPoints = Math.min(currentPoints + 10, 100);
        updatePoints();
    } else if (event.key === 'ArrowDown') {
        currentPoints = Math.max(currentPoints - 10, -100);
        updatePoints();
    } else if (event.key === 'Enter') {
        applyHousePointsChange();
        deactivateHouseshield();
    } else if (event.key === 'Escape') {
        deactivateHouseshield();
    }
}

function handleObjectiveInputKeys(event) {
    if (!window.isObjectiveInputFocused) return;
    const objectiveInput = document.getElementById('objectiveInput');
    if (!objectiveInput) return;

    switch (event.key) {
        case 'Enter':
            event.preventDefault();
            if (objectiveInput.value.trim() !== '') {
                const index = Array.from(document.querySelectorAll('#objectiveList li')).findIndex(li => li.textContent === objectiveInput.dataset.originalValue);
                if (index !== -1) {
                    document.querySelector(`#objectiveList li:nth-child(${index + 1})`).textContent = objectiveInput.value.trim();
                    saveObjectives(classes[currentClassIndex].objectivesKey);
                }
            }
            objectiveInput.closest('div').remove();
            window.isObjectiveInputFocused = false;
            break;
        case 'Escape':
            event.preventDefault();
            objectiveInput.closest('div').remove();
            window.isObjectiveInputFocused = false;
            break;
    }
}

function displayStudentName(name) {
    let container = document.querySelector('.student-name-display');
    if (!container) {
        container = document.createElement('div');
        container.className = 'student-name-display';
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        container.style.backgroundColor = 'white';
        container.style.borderRadius = '5px';
        container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        container.style.padding = '20px';
        container.style.zIndex = '1000';
        container.style.opacity = '1';
        container.style.transition = 'opacity 0.5s ease-in-out';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.gap = '10px';
        document.body.appendChild(container);
    }

    const text = document.createElement('h2');
    text.textContent = name;
    text.style.margin = '0';
    text.style.textAlign = 'center';
    text.style.fontWeight = 'normal';
    container.appendChild(text);

    // Clear any existing timeout to extend display time
    if (container.timeoutId) {
        clearTimeout(container.timeoutId);
    }

    // Set new timeout for fade-out
    container.timeoutId = setTimeout(() => {
        container.style.opacity = '0';
        setTimeout(() => {
            container.remove();
        }, 500);
    }, 3000);
}


// Add global Esc listener just for this dialog
const escListener = (e) => {
    if (e.key === 'Escape') {
        dialog.remove();
        isTitleInputFocused = false;
        document.removeEventListener('keydown', escListener);
    }
};
document.addEventListener('keydown', escListener);

// Also add to the input itself if you want Enter to save
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        // your save logic here, e.g.:
        const newTitle = input.value.trim();
        if (newTitle) {
            document.querySelector('#title h1').textContent = newTitle;
            localStorage.setItem('rehearsalTitle', newTitle);
        }
        dialog.remove();
        isTitleInputFocused = false;
        document.removeEventListener('keydown', escListener);
    }
});