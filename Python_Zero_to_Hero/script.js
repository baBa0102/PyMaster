// CHANGE: Reference the global variable created by data.js
const levels = PythonZeroToHeroLevels; 

let currentLevelIndex = 0;
const totalLevels = levels.length;

// --- Progress Management ---

function getUnlockedLevel() {
    // Retrieves the highest unlocked level ID from local storage, defaults to 1 (Level 1)
    return parseInt(localStorage.getItem('pyMasteryUnlockedLevel')) || 1;
}

function setUnlockedLevel(levelId) {
    // Sets the highest unlocked level ID
    localStorage.setItem('pyMasteryUnlockedLevel', levelId);
}

// --- Initialization and Rendering ---

function init() {
    // Load the highest unlocked level
    const lastCompletedLevel = getUnlockedLevel();
    // currentLevelIndex will be the index of the last completed level, or 0
    currentLevelIndex = lastCompletedLevel > totalLevels ? totalLevels - 1 : lastCompletedLevel - 1;
    
    // If the last completed level is the current index, move to the next logical level, unless it's the very last level
    // This logic ensures if level 5 is unlocked, we start on level 5, not level 4
    if (currentLevelIndex < totalLevels - 1 && getUnlockedLevel() > currentLevelIndex + 1) {
         currentLevelIndex = getUnlockedLevel() - 1;
    }

    renderSidebar();
    loadLevel(currentLevelIndex);
}

function renderSidebar() {
    const container = document.getElementById('level-map');
    container.innerHTML = '';
    const unlockedLevelId = getUnlockedLevel();
    
    levels.forEach((level, index) => {
        const btn = document.createElement('button');
        const isActive = index === currentLevelIndex;
        const isLocked = level.id > unlockedLevelId;

        btn.className = `level-btn ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`;
        btn.innerText = `Lv ${level.id}: ${level.title}`;
        
        btn.onclick = () => {
            if (!isLocked) {
                currentLevelIndex = index;
                loadLevel(index);
                renderSidebar();
            }
        };
        container.appendChild(btn);
    });
}

function loadLevel(index) {
    const level = levels[index];
    document.getElementById('level-title').innerText = `Level ${level.id}: ${level.title}`;
    document.getElementById('user-level').innerText = `${level.id}`;
    
    const progress = (level.id / 20) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;

    // Embed content from data.js
    document.getElementById('theory-content').innerHTML = level.theory;
    document.getElementById('diagram-placeholder').innerHTML = level.diagram_alt; // Directly insert the <img> tag
    document.getElementById('example-content').innerText = level.real_life;
    document.getElementById('challenge-desc').innerHTML = level.challenge;
    
    document.getElementById('code-editor').value = "";
    
    // Reset feedback area and hide
    const feedbackArea = document.getElementById('feedback-area');
    feedbackArea.className = "hidden";
    feedbackArea.innerHTML = "";
}

// --- Challenge Logic and Scoring ---

function checkAnswer() {
    const userCode = document.getElementById('code-editor').value.toLowerCase();
    const currentLevel = levels[currentLevelIndex];
    const feedback = document.getElementById('feedback-area');
    feedback.className = "";
    
    const requiredKeywords = currentLevel.expected_keywords;
    let correctKeywords = 0;

    requiredKeywords.forEach(keyword => {
        // Simple check: does the code contain the keyword?
        if (userCode.includes(keyword.toLowerCase())) {
            correctKeywords++;
        }
    });

    const score = (correctKeywords / requiredKeywords.length) * 100;
    const isPassed = score >= 80; // Pass mark is 80%

    let feedbackMessage = `**Score: ${score.toFixed(0)}%** (Requires 80% to pass)<br>`;
    
    if (isPassed) {
        feedback.className = "success";
        feedbackMessage += "✅ **Level Passed!** Your logic is sound. Advancing to the next level...";
        
        // Unlock the next level (if it's not the last one)
        const nextLevelId = currentLevel.id + 1;
        if (nextLevelId <= totalLevels) {
            setUnlockedLevel(nextLevelId);
        }
        
        // Automatically load the next level after a brief pause
        setTimeout(() => {
            // Only advance if it's not the final level
            if (currentLevelIndex < totalLevels - 1) {
                currentLevelIndex++;
                loadLevel(currentLevelIndex);
                renderSidebar(); // Update sidebar to show unlock
            } else {
                alert("Congratulations! You've completed the current Python track!");
            }
        }, 2000);
        
    } else {
        feedback.className = "error";
        let missing = requiredKeywords.filter(keyword => !userCode.includes(keyword.toLowerCase()));
        
        feedbackMessage += `❌ **Failed.** Missing or incorrectly spelled keywords required for the logic: 
                           <span style="color: #ef4444; font-weight: bold;">${missing.join(", ")}</span>. 
                           Review the concept and try again.`;
    }

    feedback.innerHTML = feedbackMessage;
}

function toggleHint() {
    const hint = levels[currentLevelIndex].hint;
    alert(`💡 HINT: ${hint}`);
}

// Initialize the application
init();