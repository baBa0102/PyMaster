document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginFeedback = document.getElementById('login-feedback');
    const signupFeedback = document.getElementById('signup-feedback');
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');
    const signupCard = document.getElementById('signup-card');
    const loginCard = document.querySelector('.login-card:not(#signup-card)');

    function showFeedback(element, message, type) {
        element.innerHTML = message; // Use innerHTML for potential bold/emojis
        element.className = `feedback-message ${type}`; 
        element.style.display = 'block';
    }

    function hideFeedback(element) {
        element.textContent = '';
        element.className = 'feedback-message';
        element.style.display = 'none';
    }

    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginCard.classList.add('hidden');
        signupCard.classList.remove('hidden');
        hideFeedback(loginFeedback);
        hideFeedback(signupFeedback);
        signupForm.reset();
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupCard.classList.add('hidden');
        loginCard.classList.remove('hidden');
        hideFeedback(signupFeedback);
        hideFeedback(loginFeedback);
        loginForm.reset();
    });

    // --- Signup Form Handler (Now communicates with Flask backend) ---
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideFeedback(signupFeedback);

        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (!email || !password || !confirmPassword) {
            showFeedback(signupFeedback, 'All fields are required.', 'error');
            return;
        }
        if (password.length < 6) {
            showFeedback(signupFeedback, 'Password must be at least 6 characters long.', 'error');
            return;
        }
        if (password !== confirmPassword) {
            showFeedback(signupFeedback, 'Passwords do not match.', 'error');
            return;
        }

        try {
            const response = await fetch('/api/register', { // Send to Flask /api/register
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok) {
                showFeedback(signupFeedback, `✅ ${data.message}! Please login.`, 'success');
                signupForm.reset();
                setTimeout(() => showLoginLink.click(), 1500);
            } else {
                showFeedback(signupFeedback, `❌ ${data.message}.`, 'error');
            }
        } catch (error) {
            console.error('Signup error:', error);
            showFeedback(signupFeedback, '❌ An unexpected error occurred. Please try again.', 'error');
        }
    });

    // --- Login Form Handler (Now communicates with Flask backend) ---
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideFeedback(loginFeedback);

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (!email || !password) {
            showFeedback(loginFeedback, 'Both email and password are required.', 'error');
            return;
        }

        try {
            const response = await fetch('/api/login', { // Send to Flask /api/login
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok) {
                showFeedback(loginFeedback, `✅ ${data.message}! Redirecting...`, 'success');
                loginForm.reset();
                // Store Flask's returned user data in localStorage
                // This is still client-side, but it's *user-specific data from the server*
                localStorage.setItem('currentUser', JSON.stringify(data.user)); 
                setTimeout(() => window.location.href = '/', 1000); // Redirect to Flask's root route
            } else {
                showFeedback(loginFeedback, `❌ ${data.message}.`, 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showFeedback(loginFeedback, '❌ An unexpected error occurred. Please try again.', 'error');
        }
    });

    // --- Initial Check on Page Load ---
    // This now checks if a 'currentUser' object exists in localStorage (set by successful login)
    // and if the server (Flask) indicates the user is still authenticated (via session)
    // The Flask session is handled server-side, so this client-side check is more for UX
    const currentUserData = localStorage.getItem('currentUser'); 
    if (currentUserData) {
        // We have a stored user, check if they are on login page, if so, try to redirect to index
        if (window.location.pathname === '/login.html' || window.location.pathname === '/static/login.html') {
             // In a real app, you'd make a /api/check_session call here.
             // For now, if currentUser exists in localStorage, we assume they are logged in
             // and Flask's session should match.
             window.location.href = '/'; // Redirect to Flask's root (index.html)
        }
    }
});