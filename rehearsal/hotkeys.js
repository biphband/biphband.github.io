const hotkeys = [
    { key: "t", description: "Toggle teacher mode." },
    { key: "/", description: "Search student name." },
    { key: "→", description: "Next student." },
    { key: "←", description: "Previous student." },
    { key: "↑", description: "Increase participation by 10." },
    { key: "↓", description: "Decrease participation by 10." },
    { key: "Cmd + →", description: "Cycle to next class." },
    { key: "Cmd + ←", description: "Cycle to previous class." },
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

function cycleClass(direction) {
    currentClassIndex = (currentClassIndex + direction + classes.length) % classes.length;
    calledStudents = []; // Reset called students when class changes
    updateClassDisplay();
}

function handleGlobalHotkeys(event) {
    if (window.isObjectiveInputFocused) {
        // Allow standard text editing keys
        if (['Control', 'Meta', 'Alt', 'Shift'].includes(event.key)) return;
        if (event.metaKey || event.ctrlKey) {
            const allowedShortcuts = ['a', 'c', 'v', 'x', 'z', 'y', '='];
            if (allowedShortcuts.includes(event.key.toLowerCase())) return;
            if (event.key.toLowerCase() === 'r') return; // Allow Cmd+R or Ctrl+R for page refresh
        }
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Backspace', 'Delete', 'Tab'].includes(event.key)) return;
        if (event.key.length === 1) return; // Allow single character input
        if (['Enter', 'Escape'].includes(event.key)) {
            handleObjectiveInputKeys(event);
            return;
        }
        event.preventDefault(); // Block all other hotkeys
        return;
    }

    if (event.key === 'Escape' && menuStack.length > 0) {
        closeTopMenu();
        event.preventDefault();
        return;
    }

    if ((event.key === '?' || (event.altKey && event.key === '/')) && currentMode === MODES.GLOBAL) {
        toggleOverlay();
        event.preventDefault();
        return;
    }

    if (event.key === '/' && currentMode === MODES.GLOBAL) {
        if (!document.getElementById('search-box')) {
            createSearchBox();
            event.preventDefault();
        }
        return;
    }

    const isProductionTech = classes[currentClassIndex].name === "Production Tech";
    const floatingMenu = document.getElementById('floating-menu');
    const teacherMode = document.getElementById('teacher-mode');

    const validKeys = ['t', 'a', isProductionTech ? 'd' : 's', isProductionTech ? 'e' : 'i', 'r', isProductionTech ? 'p' : 'e', '/', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'h', '=', '+', '?'];

    if (!validKeys.includes(event.key) && !(event.metaKey && ['ArrowLeft', 'ArrowRight'].includes(event.key))) {
        return;
    }

    if (event.key === 'r' && currentMode === MODES.GLOBAL && menuStack.length === 0 && !event.metaKey && !event.ctrlKey) {
        // Filter students who are not marked as "EX" or "Absent" and not yet called
        let eligibleStudents = students.filter(student => 
            student.attendance !== "EX" && student.attendance !== "Absent" && !calledStudents.includes(student.name)
        );

        // If no eligible students are left, reset the called students list
        if (eligibleStudents.length === 0) {
            calledStudents = [];
            // Repopulate with all students who are not "EX" or "Absent"
            eligibleStudents = students.filter(student => 
                student.attendance !== "EX" && student.attendance !== "Absent"
            );
        }

        // Select a random student from eligible students
        if (eligibleStudents.length > 0) {
            const randomIndex = Math.floor(Math.random() * eligibleStudents.length);
            const randomStudent = eligibleStudents[randomIndex];
            if (randomStudent && randomStudent.name) {
                // Add student to calledStudents *before* displaying to prevent re-selection
                calledStudents.push(randomStudent.name);
                const masterStudent = masterList.find(s => s.name === randomStudent.name);
                const displayText = randomStudent.name; // Display the name field
                const speechText = masterStudent && masterStudent.altName ? masterStudent.altName : randomStudent.name; // Speak the altName
                displayStudentName(displayText);
                const utterance = new SpeechSynthesisUtterance(speechText);
                utterance.volume = 1.0;
                utterance.rate = 1.25;
                utterance.pitch = 1.0;
                window.speechSynthesis.speak(utterance);
            }
        }
        event.preventDefault();
        return;
    }


    switch (event.key) {
        case 'h':
            if (currentStudentIndex !== -1 || floatingMenu.style.display === 'block') {
                toggleHouseShield();
                event.preventDefault();
            }
            break;
        case 't':
            if (teacherMode.style.display === 'block') {
                exitTeacherMode();
            } else {
                enterTeacherMode();
            }
            event.preventDefault();
            break;
        case '/':
            if (!document.getElementById('search-box')) {
                event.preventDefault();
                createSearchBox();
            }
            break;
        case 'ArrowRight':
            if (event.metaKey) {
                cycleClass(1); // Cmd + Right Arrow cycles to next class
                event.preventDefault();
            } else {
                navigateStudentMenu(1); // Right Arrow navigates to next student
                event.preventDefault();
            }
            break;
        case 'ArrowLeft':
            if (event.metaKey) {
                cycleClass(-1); // Cmd + Left Arrow cycles to previous class
                event.preventDefault();
            } else {
                navigateStudentMenu(-1); // Left Arrow navigates to previous student
                event.preventDefault();
            }
            break;
        case 'ArrowUp':
            if (floatingMenu.style.display === 'block') {
                const studentName = floatingMenu.querySelector('h3').textContent;
                if (event.altKey) {
                    updateHousePoints(studentName, 10);
                } else {
                    updateScore(studentName, 10);
                }
                event.preventDefault();
            }
            break;
        case 'ArrowDown':
            if (floatingMenu.style.display === 'block') {
                const studentName = floatingMenu.querySelector('h3').textContent;
                if (event.altKey) {
                    updateHousePoints(studentName, -10);
                } else {
                    updateScore(studentName, -10);
                }
                event.preventDefault();
            }
            break;
        case 'a':
        case 'd':
        case 's':
        case 'e':
        case 'i':
        case 'r':
        case 'p':
            if (floatingMenu.style.display === 'block') {
                const studentName = floatingMenu.querySelector('h3').textContent;
                handleFloatingMenuHotkeys(event, studentName);
                event.preventDefault();
            } else if (teacherMode.style.display === 'block') {
                switch (event.key) {
                    case 'a':
                        cycleAttendance();
                        break;
                    case isProductionTech ? 'd' : 's':
                        toggleAllCheckboxes(isProductionTech ? 'devices' : 'stands');
                        break;
                    case isProductionTech ? 'e' : 'i':
                        toggleAllCheckboxes(isProductionTech ? 'engagement' : 'intonation');
                        break;
                    case 'r':
                        toggleAllCheckboxes(isProductionTech ? 'review' : 'returned');
                        break;
                    case isProductionTech ? 'p' : 'e':
                        toggleAllCheckboxes(isProductionTech ? 'progress' : 'engagement');
                        break;
                }
                event.preventDefault();
            }
            break;
        case '=':
        case '+':
            if (event.shiftKey && !event.ctrlKey && !event.metaKey) {
                toggleAddStudentMode();
                event.preventDefault();
            }
            break;
    }
}