document.addEventListener("DOMContentLoaded", async function() {
    // 1. Load Navbar
    try {
        const navRes = await fetch("navbar.html");
        if (navRes.ok) {
            document.getElementById("navbar-container").innerHTML = await navRes.text();
            
            // Auto-highlight the current page!
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.style.color = "var(--accent-glow)";
                    link.style.fontWeight = "800";
                    link.style.textShadow = "0 0 10px rgba(0, 240, 255, 0.4)";
                }
            });

            // Activate the Theme Toggle Button
            const themeBtn = document.getElementById('themeBtn');
            if (themeBtn) {
                themeBtn.addEventListener('click', () => {
                    document.body.classList.toggle('light-mode');
                });
            }

            // Activate the Mobile Menu Button
            const menuToggle = document.getElementById('menuToggle');
            const navLinks = document.getElementById('navLinks');
            if (menuToggle && navLinks) {
                menuToggle.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-xmark');
                });
            }
        }
    } catch(e) { console.error("Failed to load navbar"); }

    // 2. Load Footer
    try {
        const footRes = await fetch("footer.html");
        if (footRes.ok) {
            document.getElementById("footer-container").innerHTML = await footRes.text();
        }
    } catch(e) { console.error("Failed to load footer"); }
});
