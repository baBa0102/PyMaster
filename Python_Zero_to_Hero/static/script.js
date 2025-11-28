document.addEventListener('DOMContentLoaded', () => {
    // --- AUTHENTICATION CHECK ---
    // This MUST run before any other game logic.
    const currentUserString = localStorage.getItem('currentUser');
    if (!currentUserString) {
        window.location.href = 'login.html'; // Redirect to login if not logged in
        return; // STOP execution of the rest of script.js if no user is logged in
    }

    // Parse the current user's data from localStorage
    // This 'currentUser' object will now include 'id', 'email', and 'currentLevelId'
    let currentUser = JSON.parse(currentUserString); 
    
    // Reference the global variable created by data.js (ensure data.js is loaded BEFORE script.js)
    const levels = PythonZeroToHeroLevels; 

    // Initialize currentLevelIndex based on the currentUser's saved progress
    // currentLevelIndex is 0-indexed, so subtract 1 from the level ID
    let currentLevelIndex = (currentUser.currentLevelId || 1) - 1; 
    const totalLevels = levels.length;

    // --- DOM Elements ---
    const levelTitle = document.getElementById('level-title');
    const userLevelSpan = document.getElementById('user-level');
    const progressFill = document.getElementById('progress-fill');
    const theoryContent = document.getElementById('theory-content');
    const diagramPlaceholder = document.getElementById('diagram-placeholder');
    const exampleContent = document.getElementById('example-content');
    const challengeDesc = document.getElementById('challenge-desc');
    const codeEditor = document.getElementById('code-editor');
    const feedbackArea = document.getElementById('feedback-area');
    const levelMapContainer = document.getElementById('level-map'); 

    // --- Logout Button Listener ---
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/logout', { method: 'POST' });
                if (response.ok) {
                    localStorage.removeItem('currentUser'); // Clear client-side stored user
                    window.location.href = '/login.html'; // Redirect to login
                } else {
                    alert('Failed to log out. Please try again.');
                }
            } catch (error) {
                console.error('Logout error:', error);
                alert('An error occurred during logout.');
            }
        });
    }

    // --- Progress Management (Uses Flask backend as source of truth) ---

    // This function sends the level update to the Flask backend
    // It also updates the client-side 'currentUser' object in localStorage
    async function updateLevelOnBackend(newLevelId) {
        try {
            const response = await fetch('/api/update_level', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ levelId: newLevelId })
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Backend level update successful:', data.message);
                // Update the client-side currentUser object with the *actual* currentLevelId from the backend's response
                currentUser.currentLevelId = data.currentLevelId;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            } else {
                console.error('Backend level update failed:', data.message);
                // Handle potential authentication issues (e.g., session expired)
                if (response.status === 401) {
                    localStorage.removeItem('currentUser');
                    window.location.href = '/login.html';
                }
                alert(`Failed to save progress: ${data.message || 'Server error'}`);
            }
        } catch (error) {
            console.error('Error updating level on backend:', error);
            alert('An error occurred while saving your progress. Please check your connection.');
        }
    }

    // Gets the HIGHEST level unlocked by the CURRENT user from the client-side currentUser object
    // (This object is kept in sync with the backend by updateLevelOnBackend and login.js)
    function getUnlockedLevelForCurrentUser() {
        return currentUser.currentLevelId || 1;
    }

    // --- Initialization and Rendering ---

    async function init() {
        // Load the highest unlocked level for the current user from the synced currentUser object
        const lastUnlockedLevelId = getUnlockedLevelForCurrentUser();
        
        // currentLevelIndex will be the 0-indexed index of the last unlocked level, or 0
        currentLevelIndex = (lastUnlockedLevelId > totalLevels ? totalLevels : lastUnlockedLevelId) - 1;
        
        // Load the initial level, ensuring it's the user's highest unlocked progress
        await loadLevel(currentLevelIndex); 
        renderSidebar(); // Render sidebar after initial level is loaded
    }

    // Loads a specific level, and ensures its progress is saved if it's a new highest
    async function loadLevel(index) {
        const level = levels[index];
        currentLevelIndex = index; // Ensure currentLevelIndex is always in sync with loaded level
        
        // CRUCIAL: Only update on backend if the loaded level is HIGHER than current progress.
        // This prevents unnecessary backend calls if a user clicks on an already unlocked lower level in the sidebar.
        if (level.id > getUnlockedLevelForCurrentUser()) {
             await updateLevelOnBackend(level.id); // Call backend to update and save if it's a new highest level
        }
       
        levelTitle.innerText = `Level ${level.id}: ${level.title}`;
        userLevelSpan.innerText = `${level.id}`;
        
        const progress = (level.id / totalLevels) * 100;
        progressFill.style.width = `${progress}%`;

        theoryContent.innerHTML = level.theory;
        diagramPlaceholder.innerHTML = level.diagram_alt;
        exampleContent.innerText = level.real_life;
        challengeDesc.innerHTML = level.challenge;
        
        codeEditor.value = ""; // Clear editor
        
        // Reset feedback area and hide
        feedbackArea.className = "hidden";
        feedbackArea.innerHTML = "";

        renderSidebar(); // Ensure sidebar reflects current state after loading
    }

    function renderSidebar() {
        levelMapContainer.innerHTML = ''; // Clear existing map
        const unlockedLevelId = getUnlockedLevelForCurrentUser(); // Get current user's highest unlocked level
        
        levels.forEach((level, index) => {
            const btn = document.createElement('button');
            const isActive = index === currentLevelIndex;
            const isLocked = level.id > unlockedLevelId; // Check against current user's unlocked level

            btn.className = `level-btn ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`;
            btn.innerText = `Lv ${level.id}: ${level.title}`;
            
            btn.onclick = async () => { // Make async because loadLevel is async
                if (!isLocked) {
                    currentLevelIndex = index;
                    await loadLevel(index); // Load selected level
                    // renderSidebar() called inside loadLevel() already
                }
            };
            levelMapContainer.appendChild(btn);
        });
    }

    // --- Challenge Logic and Scoring ---

    async function checkAnswer() {
    const userCode = codeEditor.value.toLowerCase();
    const currentLevel = levels[currentLevelIndex];
    feedbackArea.className = "";
    
    const requiredKeywords = currentLevel.expected_keywords;
    let correctKeywords = 0;

    requiredKeywords.forEach(keyword => {
        // --- MODIFIED LOGIC HERE ---
        const lowerKeyword = keyword.toLowerCase();
        const escapedKeyword = lowerKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special regex chars

        let regex;
        // Check if the keyword itself is a "word" (alphanumeric or underscore)
        // If it's a symbol like '[' or ']', we don't use word boundaries.
        if (/^[a-z0-9_]+$/.test(lowerKeyword)) {
            // It's a "word", so use word boundaries
            regex = new RegExp(`\\b${escapedKeyword}\\b`);
        } else {
            // It's a symbol, just check for its literal presence
            regex = new RegExp(escapedKeyword);
        }
        // --- END MODIFIED LOGIC ---

        if (regex.test(userCode)) {
            correctKeywords++;
        }
    });

    const score = (correctKeywords / requiredKeywords.length) * 100;
    const isPassed = score >= 80;

    let feedbackMessage = `**Score: ${score.toFixed(0)}%** (Requires 80% to pass)<br>`;
    
    if (isPassed) {
        feedbackArea.className = "success";
        feedbackMessage += "✅ **Level Passed!** Your logic is sound. Advancing to the next level...";
        
        const nextLevelId = currentLevel.id + 1;
        if (nextLevelId <= totalLevels) {
            await updateLevelOnBackend(nextLevelId); 
        }
        
        setTimeout(async () => {
            if (currentLevelIndex < totalLevels - 1) {
                currentLevelIndex++;
                await loadLevel(currentLevelIndex); 
            } else {
                alert("🎉 Congratulations! You've completed the entire Python track!");
            }
        }, 2000);
        
    } else {
        feedbackArea.className = "error";
        let missing = requiredKeywords.filter(keyword => {
            // --- MODIFIED LOGIC HERE (same as above) ---
            const lowerKeyword = keyword.toLowerCase();
            const escapedKeyword = lowerKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            let regex;
            if (/^[a-z0-9_]+$/.test(lowerKeyword)) {
                regex = new RegExp(`\\b${escapedKeyword}\\b`);
            } else {
                regex = new RegExp(escapedKeyword);
            }
            // --- END MODIFIED LOGIC ---
            return !regex.test(userCode);
        });
        
        feedbackMessage += `❌ **Failed.** Missing or incorrectly spelled keywords required for the logic: 
                           <span style="color: #ef4444; font-weight: bold;">${missing.join(", ")}</span>. 
                           Review the concept and try again.`;
    }

    feedbackArea.innerHTML = feedbackMessage;
}   

    // --- TOGGLE HINT ---
    function toggleHint() {
        const hint = levels[currentLevelIndex].hint;
        if (feedbackArea.classList.contains('hint-active')) {
            feedbackArea.classList.remove('hint-active');
            feedbackArea.classList.add('hidden');
            feedbackArea.innerHTML = "";
        } else {
            feedbackArea.className = "info hint-active"; 
            feedbackArea.innerHTML = `💡 HINT: ${hint || "No hint available for this level."}`;
            feedbackArea.classList.remove('hidden');
        }
    }

    // --- INITIALIZE THE APPLICATION ---
    init();

    // --- Expose functions to global scope for HTML event handlers ---
    window.checkAnswer = checkAnswer;
    window.toggleHint = toggleHint;
});