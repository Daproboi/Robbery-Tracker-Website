async function init() {
    const grid = document.getElementById('grid');
    grid.innerHTML = `<div class="col-span-full text-center py-20"><p class="text-accent animate-pulse">Connecting to Market Database...</p></div>`;

    try {
        // Attempting to fetch from the most stable proxy available
        const proxy = "https://api.allorigins.win/get?url=";
        const itemsUrl = encodeURIComponent('https://api.jbvalues.com/v1/items');
        const dataUrl = encodeURIComponent('https://api.jbvalues.com/v1/itemdata');

        console.log("Fetching items...");
        const itemsRes = await fetch(proxy + itemsUrl);
        const itemsDataRaw = await itemsRes.json();
        const itemsList = JSON.parse(itemsDataRaw.contents);

        console.log("Fetching price data...");
        const dataRes = await fetch(proxy + dataUrl);
        const priceDataRaw = await dataRes.json();
        const priceMap = JSON.parse(priceDataRaw.contents);

        // Debug: See what we actually got in the console
        console.log("Items Received:", itemsList);
        console.log("Prices Received:", priceMap);

        // Handle case where API might wrap data in a property
        const finalItems = Array.isArray(itemsList) ? itemsList : (itemsList.data || itemsList.items || []);
        const finalPrices = priceMap.data || priceMap.itemdata || priceMap;

        if (finalItems.length === 0) {
            throw new Error("The API returned an empty list. They may have moved their data.");
        }

        // Reset global DB
        db = {}; 

        finalItems.forEach(item => {
            const category = item.category || 'Other';
            if (!db[category]) db[category] = [];
            
            // The API uses 'name' to link items to prices
            const details = finalPrices[item.name] || {};
            
            db[category].push({
                name: item.name || "Unknown Item",
                image: item.image || "",
                cash_value: details.value || 0,
                duped_value: details.dupedValue || 0,
                trend: details.trend || 'stable',
                demand: details.demand || 'Normal'
            });
        });

        // Update Filters
        const fContainer = document.getElementById('filters');
        fContainer.innerHTML = '<div class="f-btn active" id="btn-all" onclick="setCat(\'all\', this)">All Items</div>';
        
        Object.keys(db).sort().forEach(category => {
            const btn = document.createElement('div');
            btn.className = 'f-btn';
            btn.innerText = category;
            btn.onclick = () => setCat(category, btn);
            fContainer.appendChild(btn);
        });

        updateData();
        console.log("Success! Database populated.");

    } catch (error) {
        console.error("Critical Error:", error);
        grid.innerHTML = `
            <div class="col-span-full text-center py-20 border border-red-900/50 bg-red-900/10 rounded-3xl">
                <p class="text-red-500 font-bold text-xl mb-2">Market Link Offline</p>
                <p class="text-dim text-sm px-10">Error Details: ${error.message}</p>
                <button onclick="location.reload()" class="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600">Try Again</button>
            </div>`;
    }
}
