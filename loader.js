document.addEventListener("DOMContentLoaded", async function() {
    
    // 1. LOAD THE NAVBAR
    try {
        const navRes = await fetch("navbar.html");
        if (navRes.ok) {
            document.getElementById("navbar-container").innerHTML = await navRes.text();
            
            // --- Auto-Highlight the Current Page! ---
            let currentPath = window.location.pathname.split('/').pop();
            if (currentPath === "" || currentPath === "/") currentPath = "index.html"; 

            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add("active-page");
                }
            });

            // --- THEME BUTTON: THE 1-SECOND WAVE ANIMATION ---
            const themeBtn = document.getElementById('themeBtn');
            if (themeBtn) {
                themeBtn.addEventListener('click', () => {
                    const isLight = document.body.classList.contains('light-mode');
                    
                    // 1. Create the hardware-accelerated circle in the bottom right corner
                    const wave = document.createElement('div');
                    wave.style.position = 'fixed';
                    wave.style.bottom = '-50px';
                    wave.style.right = '-50px';
                    wave.style.width = '100px';
                    wave.style.height = '100px';
                    wave.style.borderRadius = '50%';
                    // Sets the color of the wave to match the theme we are switching to!
                    wave.style.backgroundColor = isLight ? '#030508' : '#f8fafc'; 
                    wave.style.zIndex = '9999999'; // Forces it on top of the navbar and footer
                    wave.style.pointerEvents = 'none';
                    wave.style.willChange = 'transform'; // Tells iPads/Phones to use the GPU for zero lag!
                    
                    // Set up the smooth 1-second curve animation
                    wave.style.transform = 'scale(0) translateZ(0)';
                    wave.style.transition = 'transform 1s cubic-bezier(0.25, 1, 0.3, 1)';
                    
                    document.body.appendChild(wave);
                    
                    // 2. Trigger the massive expansion to cover the screen
                    requestAnimationFrame(() => {
                        wave.style.transform = 'scale(50) translateZ(0)'; // Grows to 5000px wide!
                    });
                    
                    // 3. Exactly 1 second later (when the screen is covered), secretly flip the colors and melt the wave away
                    setTimeout(() => {
                        document.body.classList.toggle('light-mode');
                        wave.style.transition = 'opacity 0.4s ease';
                        wave.style.opacity = '0';
                        
                        // Delete the invisible circle from memory to save RAM
                        setTimeout(() => wave.remove(), 400);
                    }, 1000);
                });
            }

            // --- Activate Mobile Hamburger Menu ---
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
    } catch(e) { 
        console.error("Failed to load navbar", e); 
    }

    // 2. LOAD THE FOOTER
    try {
        const footRes = await fetch("footer.html");
        if (footRes.ok) {
            document.getElementById("footer-container").innerHTML = await footRes.text();
        }
    } catch(e) { 
        console.error("Failed to load footer", e); 
    }
});
