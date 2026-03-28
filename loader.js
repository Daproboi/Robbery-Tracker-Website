<style>
/* --- GLOBAL LIGHT MODE FIX --- */
/* Because this is in navbar.html, it now applies to ALL 13 pages! */
body.light-mode {   
    --bg: #f8fafc;   
    --surface: rgba(255, 255, 255, 0.8);   
    --card: rgba(241, 245, 249, 0.8);   
    --card-hover: rgba(255, 255, 255, 0.95);
    --border: rgba(0, 0, 0, 0.08);   
    --border-light: rgba(0, 0, 0, 0.15);
    --accent: #005bb5;   
    --accent-glow: #005bb5;   
    --green: #00b35f;   
    --orange: #d97706;
    --red: #dc2626;
    --text-main: #0f172a;   
    --text-dim: #475569;   
    --muted: rgba(0, 0, 0, 0.05);
    --muted-hover: rgba(0, 0, 0, 0.1);
// --- THEME MEMORY ENGINE (Runs instantly before the page fully loads!) ---
if (localStorage.getItem('jailbreakHubTheme') === 'light') {
    document.body.classList.add('light-mode');
}

/* --- MASTER NAVBAR STYLES --- */
.nav-pill-wrapper {
    position: fixed; top: 20px; left: 0; right: 0; 
    display: flex; justify-content: center; z-index: 9999;
    pointer-events: none; 
    font-family: 'Plus Jakarta Sans', sans-serif;
}

.nav-pill {
    background: rgba(10, 14, 23, 0.85); 
    border: 1px solid rgba(0, 240, 255, 0.15);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 100px; padding: 0 15px 0 25px;
    height: 64px; display: flex; align-items: center; justify-content: space-between;
    width: 95%; max-width: 1400px; 
    box-shadow: 0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(36, 98, 205, 0.2);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    pointer-events: auto; transition: all 0.3s ease;
    .nav-pill {
    background: #06080c; border: 1px solid rgba(255,255,255,0.05);
    border-radius: 100px; padding: 0 15px 0 25px;
    height: 64px; display: flex; align-items: center; justify-content: space-between;
    width: 95%; max-width: 1400px; 
    box-shadow: 0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(36, 98, 205, 0.2);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    pointer-events: auto; transition: all 0.3s ease;
    gap: 20px; 
}
}

/* Light mode overrides for the pill itself so it turns white! */
body.light-mode .nav-pill { background: rgba(255,255,255,0.95); border-color: rgba(0,0,0,0.1); box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
body.light-mode .nav-logo { color: #000; }
body.light-mode .nav-logo span { color: var(--accent); text-shadow: none; }
body.light-mode .nav-link { color: #475569; }
body.light-mode .nav-link:hover { color: #000; background: rgba(0,0,0,0.05); }
body.light-mode .nav-item:hover .nav-link, body.light-mode .nav-link.active-page { color: #fff; background: var(--accent); box-shadow: none; border: none; }
body.light-mode .theme-toggle { color: #000; border-color: rgba(0,0,0,0.1); }
body.light-mode .theme-toggle:hover { background: rgba(0,0,0,0.05); border-color: var(--accent); }

.nav-logo { font-weight: 900; font-size: 1.5rem; text-decoration: none; color: #fff; letter-spacing: -1px; text-transform: uppercase; display: flex; align-items: center; gap: 4px; }
.nav-logo span { color: #00f0ff; text-shadow: 0 0 15px rgba(0, 240, 255, 0.5); }

.nav-links { display: flex; align-items: center; gap: 4px; margin: 0 auto; transition: all 0.3s ease; }
.nav-item { position: relative; display: flex; align-items: center; height: 64px; }

.nav-link { 
    text-decoration: none; color: #94a3b8; font-size: 0.85rem; font-weight: 700; 
    text-transform: uppercase; letter-spacing: 1px; cursor: pointer; 
    padding: 10px 16px; border-radius: 100px; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-link:hover { color: #fff; background: rgba(0, 240, 255, 0.05); }

/* Active Page Glow */
.nav-item:hover .nav-link, .nav-link.active-page { 
    color: #fff; background: rgba(36, 98, 205, 0.3); 
    box-shadow: inset 0 0 10px rgba(0, 240, 255, 0.2); border: 1px solid rgba(0, 240, 255, 0.3);
}

/* Beautiful Dropdowns */
.dropdown {
    position: absolute; top: 75px; left: 50%; transform: translateX(-50%) translateY(10px) scale(0.95);
    background: rgba(10, 14, 23, 0.95); border: 1px solid rgba(0, 240, 255, 0.15);
    border-radius: 16px; min-width: 220px; padding: 12px;
    opacity: 0; pointer-events: none; 
    box-shadow: 0 20px 50px rgba(0,0,0,0.9), 0 0 20px rgba(36, 98, 205, 0.2);
    backdrop-filter: blur(25px); transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
body.light-mode .dropdown { background: rgba(255,255,255,0.95); border-color: rgba(0,0,0,0.1); box-shadow: 0 15px 40px rgba(0,0,0,0.1); }
.dropdown::before { content: ""; position: absolute; top: -20px; left: 0; width: 100%; height: 20px; }
.nav-item:hover .dropdown { opacity: 1; pointer-events: auto; transform: translateX(-50%) translateY(0) scale(1); }

.drop-link { 
    display: flex; flex-direction: column; padding: 12px 16px; color: #94a3b8; 
    text-decoration: none; font-size: 0.85rem; font-weight: 700; 
    border-radius: 10px; margin-bottom: 4px; transition: all 0.2s;
}
.drop-link:hover { background: rgba(36, 98, 205, 0.15); color: #fff; padding-left: 20px; border-left: 2px solid #00f0ff; }
body.light-mode .drop-link { color: #475569; }
body.light-mode .drop-link:hover { background: rgba(0,0,0,0.05); color: #000; border-left-color: var(--accent); }

/* Right Side Actions */
.nav-actions { display: flex; align-items: center; gap: 10px; }

.theme-toggle {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #fff;
    width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 1rem; 
    display: flex; align-items: center; justify-content: center; transition: all 0.2s;
}
.theme-toggle:hover { background: rgba(255,255,255,0.1); border-color: #00f0ff; box-shadow: 0 0 15px rgba(0, 240, 255, 0.3); transform: rotate(15deg); }

.mobile-toggle {
    display: none; background: transparent; border: none; color: #fff;
    font-size: 1.5rem; cursor: pointer; width: 40px; height: 40px;
}
body.light-mode .mobile-toggle { color: #000; }

/* --- MOBILE & TABLET RESPONSIVENESS --- */
@media (max-width: 1100px) {
    .nav-link { padding: 10px 10px; font-size: 0.75rem; }
    .nav-pill { padding: 0 15px; }
}

@media (max-width: 900px) {
    .mobile-toggle { display: flex; align-items: center; justify-content: center; }
    .nav-links {
        position: absolute; top: 80px; right: 0; 
        background: rgba(10, 14, 23, 0.95); border: 1px solid rgba(0, 240, 255, 0.15);
        border-radius: 16px; padding: 20px; flex-direction: column; width: 260px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.9); backdrop-filter: blur(25px);
        opacity: 0; pointer-events: none; transform: translateY(-10px);
    }
    body.light-mode .nav-links { background: rgba(255,255,255,0.95); border-color: rgba(0,0,0,0.1); box-shadow: 0 15px 40px rgba(0,0,0,0.1); }
    .nav-links.active { opacity: 1; pointer-events: auto; transform: translateY(0); }
    .nav-item { width: 100%; height: auto; flex-direction: column; align-items: flex-start; }
    .nav-link { width: 100%; padding: 12px 16px; text-align: left; }
    .dropdown {
        position: static; transform: none; opacity: 1; pointer-events: auto; 
        box-shadow: none; border: none; background: transparent; padding: 5px 0 5px 15px; 
        min-width: 100%; display: none; 
    }
    .nav-item:hover .dropdown { display: block; }
}
</style>

<div class="nav-pill-wrapper">
    <nav class="nav-pill">
        <!-- Clickable Logo perfectly links to the Home Page! -->
        <a href="index.html" class="nav-logo">JAILBREAK<span>HUB</span></a>
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

        <div class="nav-links" id="navLinks">
            <!-- FIXED: Home link completely removed to save space! -->
            <div class="nav-item">
                <a class="nav-link">Seasons ▼</a>
                <div class="dropdown">
                    <a href="contracts.html" class="drop-link">Season Contracts</a>
                    <a href="prizes.html" class="drop-link">Season Rewards</a>
                </div>
            </div>
            <div class="nav-item">
                <a class="nav-link">Values ▼</a>
                <div class="dropdown">
                    <a href="values.html" class="drop-link">Value List</a>
                    <a href="calculator.html" class="drop-link">Value Calculator</a>
                </div>
            </div>
            <div class="nav-item">
                <a class="nav-link">Community ▼</a>
                <div class="dropdown">
                    <a href="vip.html" class="drop-link">Private Servers</a>
                    <a href="testimonials.html" class="drop-link">Testimonials</a>
                </div>
            </div>
            <div class="nav-item"><a href="pity.html" class="nav-link">Pity Calc</a></div>
            <div class="nav-item"><a href="tracker.html" class="nav-link">Tracker</a></div>
            <div class="nav-item"><a href="changelogs.html" class="nav-link">Change Logs</a></div>
        </div>

        <div class="nav-actions">
            <!-- Theme Toggle Button -->
            <button class="theme-toggle" id="themeBtn" title="Toggle Theme">🌓</button>
            <button class="mobile-toggle" id="menuToggle"><i class="fa-solid fa-bars"></i></button>
        </div>
    </nav>
</div>
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
                            Math.max(x, innerWidth - x),
                            Math.max(y, innerHeight - y)
                        );

                        document.documentElement.animate(
                            {
                                clipPath:[
                                    `circle(0px at ${x}px ${y}px)`,
                                    `circle(${endRadius}px at ${x}px ${y}px)`
                                ]
                            },
                            {
                                duration: 1000, // 1 Full Second
                                easing: 'ease-out',
                                pseudoElement: isDark ? '::view-transition-new(root)' : '::view-transition-old(root)'
                            }
                        );

                        setTimeout(() => { isAnimating = false; }, 1000);
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
