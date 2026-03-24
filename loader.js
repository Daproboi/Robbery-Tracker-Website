// --- THEME MEMORY ENGINE (Runs instantly before the page fully loads!) ---
if (localStorage.getItem('jailbreakHubTheme') === 'light') {
    document.body.classList.add('light-mode');
}

document.addEventListener("DOMContentLoaded", async function() {
    
    // --- THE 1.5 SECOND MELTING ENGINE ---
    // This perfectly synchronizes all text and card colors to melt into their new theme
    // at the exact same 1.5s speed that the wave expands behind them!
    const fixStyle = document.createElement('style');
    fixStyle.innerHTML = `
        * { transition: background-color 1.5s ease-out, color 1.5s ease-out, border-color 1.5s ease-out, box-shadow 1.5s ease-out; }
        .container { position: relative; z-index: 10; } 
    `;
    document.head.appendChild(fixStyle);

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
                    
                    // Puts the wave perfectly behind the glass cards and glass footer!
                    wave.style.zIndex = '0'; 
                    wave.style.pointerEvents = 'none';
                    wave.style.willChange = 'transform'; 
                    
                    // Setup the smooth 1.5-second curve animation
                    wave.style.transform = 'scale(0) translateZ(0)';
                    wave.style.transition = 'transform 1.5s cubic-bezier(0.25, 1, 0.3, 1)';
                    
                    document.body.appendChild(wave);
                    
                    // Trigger the massive background expansion
                    requestAnimationFrame(() => {
                        wave.style.transform = 'scale(50) translateZ(0)'; 
                    });
                    
                    // NEW: Instantly trigger the 1.5s CSS color-melt to perfectly match the wave!
                    document.body.classList.toggle('light-mode');
                    
                    // Save the user's choice to their browser's memory
                    if (document.body.classList.contains('light-mode')) {
                        localStorage.setItem('jailbreakHubTheme', 'light');
                    } else {
                        localStorage.setItem('jailbreakHubTheme', 'dark');
                    }
                    
                    // Clean up the wave from memory exactly 1.5 seconds later when it finishes
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
