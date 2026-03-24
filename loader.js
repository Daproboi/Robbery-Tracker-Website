// --- THEME MEMORY ENGINE (Runs instantly before the page fully loads!) ---
if (localStorage.getItem('jailbreakHubTheme') === 'light') {
    document.body.classList.add('light-mode');
}

document.addEventListener("DOMContentLoaded", async function() {
    
    // --- BUTTERY SMOOTH COLOR TRANSITIONS ---
    // Forces the entire page (Cards, Text, Buttons) to float above the wave (z-index: 10)
    // while melting their colors over exactly 0.8 seconds!
    const fadeStyle = document.createElement('style');
    fadeStyle.innerHTML = `
        * { transition: background-color 0.8s ease, color 0.8s ease, border-color 0.8s ease, box-shadow 0.8s ease; }
        .container { position: relative; z-index: 10; } 
    `;
    document.head.appendChild(fadeStyle);

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

            // --- THE VISIBLE BACKGROUND WAVE ANIMATION ---
            const themeBtn = document.getElementById('themeBtn');
            if (themeBtn) {
                themeBtn.addEventListener('click', () => {
                    const isLight = document.body.classList.contains('light-mode');
                    
                    // Create the hardware-accelerated wave
                    const wave = document.createElement('div');
                    wave.style.position = 'fixed';
                    wave.style.bottom = '-50px';
                    wave.style.right = '-50px';
                    wave.style.width = '100px';
                    wave.style.height = '100px';
                    wave.style.borderRadius = '50%';
                    
                    // The color the wave will expand into
                    wave.style.backgroundColor = isLight ? '#030508' : '#f8fafc'; 
                    
                    // FIXED: z-index 0 puts it perfectly behind your cards, but in front of the background!
                    wave.style.zIndex = '0'; 
                    wave.style.pointerEvents = 'none';
                    wave.style.willChange = 'transform'; 
                    
                    // Setup the smooth 1-second curve animation
                    wave.style.transform = 'scale(0) translateZ(0)';
                    wave.style.transition = 'transform 1s cubic-bezier(0.25, 1, 0.3, 1)';
                    
                    document.body.appendChild(wave);
                    
                    // Trigger the massive background expansion
                    requestAnimationFrame(() => {
                        wave.style.transform = 'scale(50) translateZ(0)'; 
                    });
                    
                    // Instantly trigger the text and borders to start smoothly changing colors on top of the wave!
                    document.body.classList.toggle('light-mode');
                    
                    // Save the user's choice to their browser's memory
                    if (document.body.classList.contains('light-mode')) {
                        localStorage.setItem('jailbreakHubTheme', 'light');
                    } else {
                        localStorage.setItem('jailbreakHubTheme', 'dark');
                    }
                    
                    // Clean up the wave from memory exactly 1 second later when it finishes
                    setTimeout(() => {
                        wave.style.transition = 'opacity 0.4s ease';
                        wave.style.opacity = '0';
                        setTimeout(() => wave.remove(), 400);
                    }, 1000);
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
