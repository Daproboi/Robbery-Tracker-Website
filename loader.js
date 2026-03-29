// --- THEME MEMORY ENGINE ---
if (localStorage.getItem('jailbreakHubTheme') === 'light') {
    document.body.classList.add('light-mode');
}

// Lock to prevent button spamming while the wave runs
let isAnimating = false;

document.addEventListener("DOMContentLoaded", async function() {
    
    // --- THE ULTIMATE GLOBAL CSS INJECTOR ---
    const globalStyle = document.createElement('style');
    globalStyle.innerHTML = `
        /* 1. Z-INDEX FIX: Forces Navbar to ALWAYS be on top! */
        #navbar-container { position: relative; z-index: 99999 !important; }
        #footer-container { position: relative; z-index: 10 !important; }
        body > div:not(#navbar-container):not(#footer-container), section, main { position: relative; z-index: 10; }
        
        /* 2. GLOBAL LIGHT MODE VARIABLES (Fixed for Crisp Boundaries!) */
        body.light-mode {   
            --bg: #f3f4f6 !important; /* Slightly darker background so pure white cards POP out! */
            --surface: #ffffff !important;   
            --card: #ffffff !important;   
            --card-hover: #f8fafc !important;
            --border: rgba(0, 0, 0, 0.18) !important; /* Darker, clearly visible borders */
            --border-light: rgba(0, 0, 0, 0.1) !important;
            --accent: #005bb5 !important;   
            --accent-glow: #005bb5 !important;   
            --green: #00b35f !important;   
            --orange: #d97706 !important;
            --red: #dc2626 !important;
            --text-main: #0f172a !important;   
            --text-dim: #475569 !important;   
            --muted: #f1f5f9 !important; /* Solid light grey for boxes/pills */
            --muted-hover: #e2e8f0 !important;
            --invert: 1 !important;
            
            background-color: var(--bg) !important;
            background-image: none !important; 
        }

        /* 3. Force all text to turn dark in light mode */
        body.light-mode, body.light-mode * { color: var(--text-main); }
        
        /* 4. THE BOUNDARY FIX: Forces visible borders and soft shadows on all cards/boxes! */
        body.light-mode section, body.light-mode [class*="card"], body.light-mode [class*="box"], 
        body.light-mode [class*="panel"], body.light-mode input, body.light-mode select, 
        body.light-mode textarea, body.light-mode [class*="dropdown"], body.light-mode .modal, 
        body.light-mode[class*="bg-"], body.light-mode .inv-pill {
            background-color: var(--card) !important;
            border: 1px solid var(--border) !important; /* Forces the outline to appear */
            color: var(--text-main) !important;
            background-image: none !important; 
            box-shadow: 0 4px 15px rgba(0,0,0,0.05) !important; /* Makes boxes physically separate from the background */
        }
        
        /* Specific transparent fix for the massive Calculator Overlay! */
        body.light-mode #pickerOverlay { background: rgba(248, 250, 252, 0.95) !important; backdrop-filter: blur(10px) !important; }

        /* Forces inputs and dropdown text to be readable */
        body.light-mode input::placeholder, body.light-mode textarea::placeholder { color: var(--text-dim) !important; }
        body.light-mode option { background-color: var(--surface) !important; color: var(--text-main) !important; }

        /* Remove glowing text shadows on Titles in Light Mode */
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
        body.light-mode .site-footer { background: #ffffff !important; border-top: 1px solid var(--border) !important; }
        body.light-mode .f-brand { color: #0f172a !important; }
        body.light-mode .f-brand span { color: var(--accent) !important; text-shadow: none !important; }
        body.light-mode .f-credits, body.light-mode .f-legal, body.light-mode .f-copy { color: #475569 !important; }
        body.light-mode .f-credits strong { color: #0f172a !important; }
        body.light-mode .f-links a { color: #475569 !important; opacity: 1 !important; }
        body.light-mode .f-links a:hover { color: var(--accent) !important; }
        body.light-mode .f-support-btn { background: rgba(0,0,0,0.05) !important; border-color: var(--border) !important; color: #0f172a !important; box-shadow: none !important; }
        body.light-mode .f-support-btn:hover { background: var(--accent) !important; color: #fff !important; border-color: var(--accent) !important; }
        
        /* 7. NATIVE BROWSER VIEW TRANSITION (Required for the flawless circle wave!) */
        ::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
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

            // Run login status check after navbar loads
            setTimeout(() => {
                if (typeof checkLoginStatus === 'function') {
                    checkLoginStatus();
                }
            }, 100);

            // --- THE NATIVE VIEW TRANSITION API (Flawless Wave in BOTH directions!) ---
            const themeBtn = document.getElementById('themeBtn');
            if (themeBtn) {
                themeBtn.addEventListener('click', (event) => {
                    if (isAnimating) return;
                    
                    const isDark = !document.body.classList.contains('light-mode');

                    // Fallback for extremely old browsers that don't support the new API
                    if (!document.startViewTransition) {
                        document.body.classList.toggle('light-mode');
                        localStorage.setItem('jailbreakHubTheme', isDark ? 'light' : 'dark');
                        return;
                    }

                    isAnimating = true;

                    // Takes a high-speed screenshot and prepares the new colors in the background
                    const transition = document.startViewTransition(() => {
                        document.body.classList.toggle('light-mode');
                        localStorage.setItem('jailbreakHubTheme', isDark ? 'light' : 'dark');
                    });

                    // Instructs the Graphics Card to wipe the new colors in a perfect circle!
                    transition.ready.then(() => {
                        const x = event.clientX || window.innerWidth / 2;
                        const y = event.clientY || window.innerHeight / 2;
                        
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
                                duration: 800, // Perfect 0.8s speed
                                easing: 'ease-in-out',
                                pseudoElement: '::view-transition-new(root)' // Fixes the Light-to-Dark glitch!
                            }
                        );

                        // Unlocks the button right when the animation finishes
                        setTimeout(() => { isAnimating = false; }, 800);
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
