// Auth Guard - Forces login on all pages except login.html
// Add this script to every page: <script src="auth-guard.js"></script>

(function() {
    // Don't run on login page
    if (window.location.pathname.includes('login.html') || window.location.pathname === '/login') {
        return;
    }

    // Check session validity
    async function checkAuth() {
        const sessionToken = localStorage.getItem('sessionToken');
        const sessionTime = localStorage.getItem('sessionTime');
        
        // Check if session is older than 1 day (24 hours)
        const ONE_DAY = 24 * 60 * 60 * 1000; // milliseconds
        const now = Date.now();
        
        if (sessionTime && (now - parseInt(sessionTime)) > ONE_DAY) {
            console.log('Session expired (older than 1 day)');
            localStorage.removeItem('sessionToken');
            localStorage.removeItem('sessionTime');
            window.location.href = '/login.html';
            return;
        }
        
        if (!sessionToken) {
            console.log('No session token, redirecting to login');
            window.location.href = '/login.html';
            return;
        }
        
        try {
            const response = await fetch(`/api/check-session?token=${sessionToken}`);
            const data = await response.json();
            
            if (!data.valid) {
                console.log('Invalid session, redirecting to login');
                localStorage.removeItem('sessionToken');
                localStorage.removeItem('sessionTime');
                window.location.href = '/login.html';
                return;
            }
            
            // Valid session - update timestamp
            localStorage.setItem('sessionTime', now.toString());
            
            // Show user profile in navbar if exists
            updateNavbarProfile(data.user);
            
        } catch (err) {
            console.error('Auth check failed:', err);
            // On error, allow access but log it
        }
    }
    
    // Update navbar with user info
    function updateNavbarProfile(user) {
        // Wait for navbar to load
        setTimeout(() => {
            const userProfile = document.getElementById('userProfile');
            const loginBtn = document.getElementById('loginBtn');
            const loginNavItem = document.getElementById('loginNavItem');
            
            if (userProfile) {
                userProfile.style.display = 'block';
                if (loginBtn) loginBtn.style.display = 'none';
                if (loginNavItem) loginNavItem.style.display = 'none';
                
                const userName = document.getElementById('userName');
                const userAvatar = document.getElementById('userAvatar');
                const adminLink = document.getElementById('adminLink');
                
                if (userName) userName.textContent = user.username;
                if (userAvatar) userAvatar.src = `https://cdn.discordapp.com/avatars/${user.id}.png`;
                if (adminLink && user.isAdmin) {
                    adminLink.style.display = 'block';
                }
            }
        }, 500);
    }
    
    // Run check immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAuth);
    } else {
        checkAuth();
    }
})();
