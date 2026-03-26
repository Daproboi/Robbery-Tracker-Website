// --- THEME MEMORY ENGINE (Runs instantly before the page fully loads!) ---
if (localStorage.getItem('jailbreakHubTheme') === 'light') {
    document.body.classList.add('light-mode');
}

// Lock to prevent button spamming while the transition runs!
let isAnimating = false;

document.addEventListener("DOMContentLoaded", async function() {
    
    // --- THE ULTIMATE GLOBAL CSS INJECTOR ---
    const globalStyle = document.createElement('style');
    globalStyle.innerHTML = `
        /* 1. Z-INDEX FIX & MOBILE PERFORMANCE: Forces Navbar to ALWAYS be top! */
        #navbar-container { position: relative; z-index: 99999 !important; }
        #footer-container { position: relative; z-index: 10 !important; }
        body > div:not(#navbar-container):not(#footer-container), section, main { position: relative; z-index: 10; }
        
        /* NEW: Deletes the ugly blue tap highlight on mobile phones! */
        * { -webkit-tap-highlight-color: transparent; }
        
        /* NEW: Forces mobile devices to use hardware acceleration, removing all animation lag! */
        body { -webkit-font-smoothing: antialiased; backface-visibility: hidden; }
        
        /* 2. GLOBAL LIGHT MODE VARIABLES */
        body.light-mode {   
            --bg: #f8fafc !important;   
            --surface: rgba(255, 255, 255, 0.8) !important;   
            --card: rgba(241, 245, 249, 0.8) !important;   
            --card-hover: rgba(255, 255, 255, 0.95) !important;
            --border: rgba(0, 0, 0, 0.1) !important;   
            --border-light: rgba(0, 0, 0, 0.15) !important;
            --accent: #005bb5 !important;   
            --accent-glow: #005bb5 !important;   
            --green: #00b35f !important;   
            --orange: #d97706 !important;
            --red: #dc2626 !important;
            --text-main: #0f172a !important;   
            --text-dim: #475569 !important;   
            --muted: rgba(0, 0, 0, 0.05) !important;
            --muted-hover: rgba(0, 0, 0, 0.1) !important;
            --invert: 1 !important;
            
            background-color: var(--bg) !important;
            background-image: none !important; 
        }

        /* 3. Force all text to turn dark in light mode */
        body.light-mode, body.light-mode * { color: var(--text-main); }
        
        /* 4. EXPLICIT OVERRIDES FOR CALCULATOR & CHANGELOG PAGES */
        body.light-mode .log-card, body.light-mode #pickerOverlay, 
        body.light-mode .mega-picker-card, body.light-mode .search-giant, 
        body.light-mode .add-box, body.light-mode .result-panel,
        body.light-mode section, body.light-mode .box, body.light-mode .panel, body.light-mode .card, 
        body.light-mode input, body.light-mode select, body.light-mode textarea,
        body.light-mode .dropdown, body.light-mode .dropdown-content, body.light-mode .dropdown-menu,
        body.light-mode .modal, body.light-mode .modal-content, body.light-mode .search-input,
        body.light-mode[class*="bg-"] {
            background: var(--card) !important;
            background-color: var(--card) !important;
            border-color: var(--border) !important;
            color: var(--text-main) !important;
            background-image: none !important; 
        }
        
        body.light-mode #pickerOverlay { background: rgba(248, 250, 252, 0.95) !important; }
        body.light-mode input::placeholder, body.light-mode textarea::placeholder { color: var(--text-dim) !important; }
        body.light-mode option { background-color: var(--surface) !important; color: var(--text-main) !important; }

        body.light-mode h1, body.light-mode h2, body.light-mode .text-4xl, body.light-mode .text-5xl, body.light-mode .text-6xl,
        body.light-mode .log-title, body.light-mode .log-section-title, body.light-mode .card-name, body.light-mode .status-big {
            text-shadow: none !important;
            color: var(--accent) !important;
        }

        /* 5. Protect specific colored elements */
        body.light-mode .text-green, body.light-mode .sb-val { color: var(--green) !important; text-shadow: none !important;}
        body.light-mode .text-orange { color: var(--orange) !important; text-shadow: none !important;}
        body.light-mode .text-red { color: var(--red) !important; text-shadow: none !important;}
        body.light-mode .bounty-name, body.light-mode .bounty-slider-val { color: var(--accent) !important; text-shadow: none !important; }
        body.light-mode .nav-logo span { color: var(--accent) !important; text-shadow: none !important; }
        
        /* 6. PERFECT FOOTER LIGHT MODE FIX */
        body.light-mode .site-footer { background: #f8fafc !important; border-top-color: rgba(0,0,0,0.1) !important; }
        body.light-mode .f-brand { color: #0f172a !important; }
        body.light-mode .f-brand span { color: var(--accent) !important; text-shadow: none !important; }
        body.light-mode .f-credits, body.light-mode .f-legal, body.light-mode .f-copy { color: #475569 !important; }
        body.light-mode .f-credits strong { color: #0f172a !important; }
        body.light-mode .f-links a { color: #475569 !important; opacity: 1 !important; }
        body.light-mode .f-links a:hover { color: var(--accent) !important; }
        body.light-mode .f-support-btn { background: rgba(0,0,0,0.05) !important; border-color: rgba(0,0,0,0.1) !important; color: #0f172a !important; box-shadow: none !important; }
        body.light-mode .f-support-btn:hover { background: var(--accent) !important; color: #fff !important; border-color: var(--accent) !important; }
        
        /* 7. NATIVE BROWSER VIEW TRANSITION SETTINGS */
        /* Stops default animations so the custom circular wipe works! */
        ::view-transition-old(root), ::view-transition-new(root) {
            animation: none;
            mix-blend-mode: normal;
        }
    `;
    document.head.appendChild(globalStyle);

    // 1. LOAD THE NAVBAR
    try {
        const navRes = await fetch("navbar.html");
        if (navRes.ok) {
            document.getElementById("navbar-container").innerHTML = await navRes.text();
            
            let currentPath = window.location.pathname.split('/').pop();
            if (currentPath === "" || currentPath === "/") currentPath = "index.html"; 

            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add("active-page");
                }
            });

            // --- THE NATIVE "VIEW TRANSITIONS API" THEME TOGGLE ---
            const themeBtn = document.getElementById('themeBtn');
            if (themeBtn) {
                themeBtn.addEventListener('click', (event) => {
                    if (isAnimating) return;
                    
                    const isDark = !document.body.classList.contains('light-mode');

                    // Fallback for older browsers (Safely flips colors instantly if API is not supported)
                    if (!document.startViewTransition) {
                        document.body.classList.toggle('light-mode');
                        localStorage.setItem('jailbreakHubTheme', isDark ? 'light' : 'dark');
                        return;
                    }

                    isAnimating = true;

                    // Start the stunning native browser transition!
                    const transition = document.startViewTransition(() => {
                        document.body.classList.toggle('light-mode');
                        localStorage.setItem('jailbreakHubTheme', isDark ? 'light' : 'dark');
                    });

                    // Draw the perfectly smooth circular mask radiating from the exact click location!
                    transition.ready.then(() => {
                        const x = event.clientX;
                        const y = event.clientY;
                        
                        // Calculate how big the circle needs to be to reach the farthest corner of the screen
                        const endRadius = Math.hypot(
                            Math.max(x, window.innerWidth - x),
                            Math.max(y, window.innerHeight - y)
                        );

                        document.documentElement.animate(
                            {
                                clipPath:[
                                    `circle(0px at ${x}px ${y}px)`,
                                    `circle(${endRadius}px at ${x}px ${y}px)`
                                ]
                            },
                            {
                                duration: 600, // Reduced to 600ms to completely eliminate lag!
                                easing: 'ease-in-out',
                                // FIXED: Forces the wave to explode outward in BOTH directions!
                                pseudoElement: '::view-transition-new(root)' 
                            }
                        );

                        setTimeout(() => { isAnimating = false; }, 600);
                    });
                });
            }

            // Mobile Hamburger Menu
            const menuToggle = document.getElementById('menuToggle');
            const navLinks = document.getElementById('navLinks');
            if (menuToggle && navLinks) {
                menuToggle.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                    const icon = menuToggle.querySelector('i');
                    if (navLinks.classList.contains('active')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-xmark');
                    } else {
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                });
            }
        }
    } catch(e) { console.error("Failed to load navbar", e); }

    // 2. LOAD THE FOOTER
    try {
        const footRes = await fetch("footer.html");
        if (footRes.ok) {
            document.getElementById("footer-container").innerHTML = await footRes.text();
        }
    } catch(e) { console.error("Failed to load footer", e); }
});
