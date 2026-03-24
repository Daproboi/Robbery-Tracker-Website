// --- THEME MEMORY ENGINE (Runs instantly before the page fully loads!) ---
if (localStorage.getItem('jailbreakHubTheme') === 'light') {
    document.body.classList.add('light-mode');
}

document.addEventListener("DOMContentLoaded", async function() {
    
    // --- THE ULTIMATE GLOBAL CSS INJECTOR ---
    // This perfectly fixes the wave z-index, removes all lag/fades, and guarantees Light Mode 
    // works flawlessly on ALL 13 pages, including the Footer and Changelogs!
    const globalStyle = document.createElement('style');
    globalStyle.innerHTML = `
        /* 1. Force the wave to sit behind ALL content on every page */
        body > * { position: relative; z-index: 10; }
        
        /* 2. Global Light Mode Variables */
        body.light-mode {   
            --bg: #f8fafc !important;   
            --surface: rgba(255, 255, 255, 0.8) !important;   
            --card: rgba(241, 245, 249, 0.8) !important;   
            --card-hover: rgba(255, 255, 255, 0.95) !important;
            --border: rgba(0, 0, 0, 0.08) !important;   
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
        }

        /* 3. Force hardcoded text to turn dark in light mode */
        body.light-mode * { color: var(--text-main); }
        
        /* 4. Protect specific colored elements from turning dark */
        body.light-mode .text-green, body.light-mode .sb-val { color: var(--green) !important; }
        body.light-mode .text-orange { color: var(--orange) !important; }
        body.light-mode .text-red { color: var(--red) !important; }
        body.light-mode .bounty-name, body.light-mode .bounty-slider-val { color: var(--accent) !important; text-shadow: none !important; }
        body.light-mode .nav-logo span { color: var(--accent) !important; text-shadow: none !important; }
        
        /* 5. PERFECT FOOTER LIGHT MODE FIX */
        body.light-mode .site-footer { background: #f8fafc !important; border-top-color: rgba(0,0,0,0.1) !important; }
        body.light-mode .f-brand { color: #0f172a !important; }
        body.light-mode .f-brand span { color: var(--accent) !important; text-shadow: none !important; }
        body.light-mode .f-credits, body.light-mode .f-legal, body.light-mode .f-copy { color: #475569 !important; }
        body.light-mode .f-credits strong { color: #0f172a !important; }
        body.light-mode .f-links a { color: #475569 !important; opacity: 1 !important; }
        body.light-mode .f-links a:hover { color: var(--accent) !important; }
        body.light-mode .f-support-btn { background: rgba(0,0,0,0.05) !important; border-color: rgba(0,0,0,0.1) !important; color: #0f172a !important; box-shadow: none !important; }
        body.light-mode .f-support-btn:hover { background: var(--accent) !important; color: #fff !important; border-color: var(--accent) !important; }
        
        /* 6. REMOVE ALL FADE DELAYS - INSTANT SNAP ONLY! */
        /* This explicitly blocks the browser from trying to softly fade the colors! */
        * { transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease !important; }
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
                    const isLight = document.body.classList.contains('light-mode');
                    
                    const wave = document.createElement('div');
                    wave.style.position = 'fixed';
                    wave.style.bottom = '-50px';
                    wave.style.right = '-50px';
                    wave.style.width = '100px';
                    wave.style.height = '100px';
                    wave.style.borderRadius = '50%';
                    
                    // Wave color
                    wave.style.backgroundColor = isLight ? '#030508' : '#f8fafc'; 
                    
                    // Puts wave firmly behind content on ALL pages!
                    wave.style.zIndex = '0'; 
                    wave.style.pointerEvents = 'none';
                    wave.style.willChange = 'transform'; 
                    
                    // 1.5 Second Expand
                    wave.style.transform = 'scale(0) translateZ(0)';
                    wave.style.transition = 'transform 1.5s cubic-bezier(0.25, 1, 0.3, 1)';
                    
                    document.body.appendChild(wave);
                    
                    requestAnimationFrame(() => {
                        wave.style.transform = 'scale(50) translateZ(0)'; 
                    });
                    
                    // INSTANT COLOR SNAP - Zero Delay!
                    document.body.classList.toggle('light-mode');
                    
                    if (document.body.classList.contains('light-mode')) {
                        localStorage.setItem('jailbreakHubTheme', 'light');
                    } else {
                        localStorage.setItem('jailbreakHubTheme', 'dark');
                    }
                    
                    setTimeout(() => {
                        wave.style.transition = 'opacity 0.4s ease';
                        wave.style.opacity = '0';
                        setTimeout(() => wave.remove(), 400);
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
