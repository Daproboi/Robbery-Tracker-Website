document.addEventListener("DOMContentLoaded", async function() {
    
    // 1. LOAD THE NAVBAR
    try {
        const navRes = await fetch("navbar.html");
        if (navRes.ok) {
            document.getElementById("navbar-container").innerHTML = await navRes.text();
            
            // --- FIX 1: Auto-Highlight the Current Page! ---
            // This gives the pill background to the page you are currently on.
            let currentPath = window.location.pathname.split('/').pop();
            if (currentPath === "" || currentPath === "/") currentPath = "index.html"; // Defaults to Home

            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add("active-page");
                }
            });

            // --- FIX 2: Activate the Theme Button! ---
            const themeBtn = document.getElementById('themeBtn');
            if (themeBtn) {
                themeBtn.addEventListener('click', () => {
                    document.body.classList.toggle('light-mode');
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
