// --- THEME MEMORY ENGINE ---
if (localStorage.getItem('jailbreakHubTheme') === 'light') {
    document.body.classList.add('light-mode');
}

// Lock to prevent double-click glitches!
let isAnimating = false;

document.addEventListener("DOMContentLoaded", async function() {
    
    // --- THE ULTRA-AGGRESSIVE GLOBAL CSS INJECTOR ---
    const globalStyle = document.createElement('style');
    globalStyle.innerHTML = `
        /* 1. Z-INDEX FIX: Forces Navbar to ALWAYS be on top! */
        #navbar-container { position: relative; z-index: 99999 !important; }
        #footer-container { position: relative; z-index: 10 !important; }
        body > div:not(#navbar-container):not(#footer-container), section, main { position: relative; z-index: 10; }
        
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
        
        /* 4. ULTRA-AGGRESSIVE OVERRIDE FOR OTHER PAGES (Calculator, Values, Pity, Changelogs) */
        /* This hunts down ANY dark background, dropdown, input, or Tailwind class and forces it Light! */
        body.light-mode section, body.light-mode .box, body.light-mode .panel, body.light-mode .card, 
        body.light-mode input, body.light-mode select, body.light-mode textarea,
        body.light-mode .dropdown, body.light-mode .dropdown-content, body.light-mode .dropdown-menu,
        body.light-mode .modal, body.light-mode .modal-content, body.light-mode .search-input,
        body.light-mode[class*="bg-black"], body.light-mode [class*="bg-gray-"], 
        body.light-mode [class*="bg-slate-"], body.light-mode [class*="bg-zinc-"],
        body.light-mode[class*="bg-gradient"], body.light-mode .bg-muted, body.light-mode .bg-card {
            background: var(--card) !important;
            background-color: var(--card) !important;
            border-color: var(--border) !important;
            color: var(--text-main) !important;
        }

        /* Forces inputs and dropdown text to be readable */
        body.light-mode input::placeholder, body.light-mode textarea::placeholder { color: var(--text-dim) !important; }
        body.light-mode option { background-color: var(--surface) !important; color: var(--text-main) !important; }

        /* Remove glowing text shadows in Light Mode (fixes the weird 0% Pity text!) */
        body.light-mode h1, body.light-mode h2, body.light-mode .text-4xl, body.light-mode .text-5xl, body.light-mode .text-6xl {
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
        
        /* 7. REMOVE FADE DELAYS - INSTANT SNAP ONLY! */
        *:not(.theme-wave) { transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease !important; }
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

            // --- THEME BUTTON LOGIC ---
            const themeBtn = document.getElementById('themeBtn');
            if (themeBtn) {
                themeBtn.addEventListener('click', () => {
                    // Prevent double-click glitch
                    if (isAnimating) return;
                    isAnimating = true;

                    const isLight = document.body.classList.contains('light-mode');
                    
                    const wave = document.createElement('div');
                    wave.className = 'theme-wave'; 
                    wave.style.position = 'fixed';
                    wave.style.bottom = '-50px';
                    wave.style.right = '-50px';
                    wave.style.width = '100px';
                    wave.style.height = '100px';
                    wave.style.borderRadius = '50%';
                    wave.style.backgroundColor = isLight ? '#030508' : '#f8fafc'; 
                    wave.style.zIndex = '0'; 
                    wave.style.pointerEvents = 'none';
                    wave.style.willChange = 'transform'; 
                    
                    // Setup initial state
                    wave.style.transform = 'scale(0) translateZ(0)';
                    document.body.appendChild(wave);
                    
                    // CRITICAL BROWSER FIX: Force Reflow to prevent the animation from skipping!
                    wave.getBoundingClientRect();
                    
                    // Start the 1.5s animation
                    wave.style.transition = 'transform 1.5s cubic-bezier(0.25, 1, 0.3, 1)';
                    wave.style.transform = 'scale(50) translateZ(0)'; 
                    
                    // INSTANT COLOR SNAP
                    document.body.classList.toggle('light-mode');
                    
                    if (document.body.classList.contains('light-mode')) {
                        localStorage.setItem('jailbreakHubTheme', 'light');
                    } else {
                        localStorage.setItem('jailbreakHubTheme', 'dark');
                    }
                    
                    setTimeout(() => {
                        wave.style.transition = 'opacity 0.4s ease';
                        wave.style.opacity = '0';
                        setTimeout(() => {
                            wave.remove();
                            isAnimating = false; // Unlock button after cleanup
                        }, 400);
                    }, 1500); 
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
