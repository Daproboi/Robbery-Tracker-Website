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
                
                // Fix avatar URL - use Discord CDN with fallback
                if (userAvatar) {
                    const avatarUrl = user.id ? 
                        `https://cdn.discordapp.com/avatars/${user.id}.png` : 
                        'https://cdn.discordapp.com/embed/avatars/0.png';
                    userAvatar.src = avatarUrl;
                    userAvatar.onerror = function() {
                        this.src = 'https://cdn.discordapp.com/embed/avatars/0.png';
                    };
                }
                
                if (adminLink && user.isAdmin) {
                    adminLink.style.display = 'block';
                }
                
                // Setup click handler for profile dropdown
                setupProfileDropdown();
                
                // Also update fixed profile button if it exists
                updateFixedProfileButton(user);
            } else {
                // If navbar not loaded yet, try fixed button
                updateFixedProfileButton(user);
            }
        }, 500);
    }
    
    // Setup profile dropdown click handlers
    function setupProfileDropdown() {
        const userProfile = document.getElementById('userProfile');
        const userMenu = document.getElementById('userMenu');
        
        if (userProfile && userMenu) {
            // Remove existing handlers to avoid duplicates
            userProfile.onclick = null;
            
            // Add click handler
            userProfile.addEventListener('click', function(e) {
                e.stopPropagation();
                const isHidden = userMenu.style.display === 'none' || !userMenu.style.display;
                userMenu.style.display = isHidden ? 'block' : 'none';
            });
            
            // Close when clicking outside
            document.addEventListener('click', function(e) {
                if (!userProfile.contains(e.target)) {
                    userMenu.style.display = 'none';
                }
            });
        }
    }
    
    // Global logout function
    window.logout = function() {
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('sessionTime');
        window.location.href = '/login.html';
    };
    
    // Update fixed profile button (fallback for pages without navbar)
    function updateFixedProfileButton(user) {
        const profileFixed = document.getElementById('userProfileFixed');
        if (profileFixed) {
            profileFixed.style.display = 'block';
            
            const userNameFixed = document.getElementById('userNameFixed');
            const userAvatarFixed = document.getElementById('userAvatarFixed');
            const adminLinkFixed = document.getElementById('adminLinkFixed');
            
            if (userNameFixed) userNameFixed.textContent = user.username;
            
            if (userAvatarFixed) {
                const avatarUrl = user.id ? 
                    `https://cdn.discordapp.com/avatars/${user.id}.png` : 
                    'https://cdn.discordapp.com/embed/avatars/0.png';
                userAvatarFixed.src = avatarUrl;
                userAvatarFixed.onerror = function() {
                    this.src = 'https://cdn.discordapp.com/embed/avatars/0.png';
                };
            }
            
            if (adminLinkFixed && user.isAdmin) {
                adminLinkFixed.style.display = 'block';
            }
        }
    }
    
    // Run check immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAuth);
    } else {
        checkAuth();
    }
})();
