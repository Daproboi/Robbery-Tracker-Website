// --- THEME MEMORY ENGINE (Runs instantly before the page fully loads!) ---
if (localStorage.getItem('jailbreakHubTheme') === 'light') {
    document.body.classList.add('light-mode');
}

document.addEventListener("DOMContentLoaded", async function() {
    
    // DELETED: The 0.8s CSS color-fade delay! The website will now snap colors instantly!
    // We only force the content to sit above the wave (z-index 10)
    const fixStyle = document.createElement('style');
    fixStyle.innerHTML = `.container { position: relative; z-index: 10; }`;
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

            // --- THE ZERO-DELAY BACKGROUND WAVE ANIMATION ---
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
                    
                    wave.style.backgroundColor = isLight ? '#030508' : '#f8fafc'; 
                    wave.style.zIndex = '0'; // Puts it perfectly behind your cards!
                    wave.style.pointerEvents = 'none';
                    wave.style.willChange = 'transform'; 
                    
                    // Setup the smooth curve animation, slowed down to 1.5 seconds!
                    wave.style.transform = 'scale(0) translateZ(0)';
                    wave.style.transition = 'transform 1.5s cubic-bezier(0.25, 1, 0.3, 1)';
                    
                    document.body.appendChild(wave);
                    
                    // Trigger the massive background expansion
                    requestAnimationFrame(() => {
                        wave.style.transform = 'scale(50) translateZ(0)'; 
                    });
                    
                    // We wait exactly 0.2 seconds for the wave to cover enough of the screen, 
                    // then we INSTANTLY snap the text/footer colors with zero delay!
                    setTimeout(() => {
                        document.body.classList.toggle('light-mode');
                        
                        if (document.body.classList.contains('light-mode')) {
                            localStorage.setItem('jailbreakHubTheme', 'light');
                        } else {
                            localStorage.setItem('jailbreakHubTheme', 'dark');
                        }
                    }, 200);
                    
                    // Clean up the wave from memory exactly 1.5 seconds later
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
