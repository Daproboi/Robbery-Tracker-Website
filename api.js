// api.js

async function init() {
    try {
        console.log("Attempting to fetch live values...");
        
        // Using a proxy to prevent "Failed to load" (CORS) errors
        const proxy = "https://corsproxy.io/?";
        const itemsUrl = encodeURIComponent('https://api.jbvalues.com/v1/items');
        const dataUrl = encodeURIComponent('https://api.jbvalues.com/v1/itemdata');

        const [itemsRes, dataRes] = await Promise.all([
            fetch(proxy + itemsUrl),
            fetch(proxy + dataUrl)
        ]);

        if (!itemsRes.ok) throw new Error("Could not reach JB API");

        const itemsRaw = await itemsRes.json();
        const itemDataRaw = await dataRes.json();

        // Safety check: Extract the list if it's hidden inside a ".data" property
        const items = Array.isArray(itemsRaw) ? itemsRaw : (itemsRaw.data || []);
        const itemData = itemDataRaw.data || itemDataRaw;

        if (items.length === 0) {
            console.error("API returned success, but the item list was empty.");
            return;
        }

        // Reset our database object
        db = {}; 

        items.forEach(item => {
            const category = item.category || 'Other';
            if (!db[category]) db[category] = [];
            
            // Link the item name to the price data
            const details = itemData[item.name] || {};
            
            db[category].push({
                name: item.name,
                image: item.image,
                cash_value: details.value || 0,
                duped_value: details.dupedValue || 0,
                trend: details.trend || 'stable',
                demand: details.demand || 'Normal'
            });
        });

        // Update the Filter Buttons in the HTML
        const fContainer = document.getElementById('filters');
        if (fContainer) {
            fContainer.innerHTML = '<div class="f-btn active" id="btn-all" onclick="setCat(\'all\', this)">All Items</div>';
            Object.keys(db).sort().forEach(category => {
                const btn = document.createElement('div');
                btn.className = 'f-btn';
                btn.innerText = category;
                btn.onclick = () => setCat(category, btn);
                fContainer.appendChild(btn);
            });
        }

        // Tell the HTML to show the items
        updateData();
        console.log("Market data loaded successfully!");

    } catch (error) {
        console.error("Detailed API Error:", error);
        const grid = document.getElementById('grid');
        if (grid) {
            grid.innerHTML = `<p class="col-span-full text-center py-20 text-red-500 font-bold">Error: ${error.message}. Please refresh.</p>`;
        }
    }
}
