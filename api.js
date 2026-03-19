// This function starts everything
async function init() {
    const grid = document.getElementById('grid');
    grid.innerHTML = `<div class="col-span-full text-center py-20"><p class="text-accent animate-pulse font-bold">BYPASSING SECURITY FILTERS... PLEASE WAIT</p></div>`;

    // We use a different proxy that is more reliable for 2026
    const proxy = "https://api.allorigins.win/get?url=";
    const itemsUrl = 'https://api.jbvalues.com/v1/items';
    const dataUrl = 'https://api.jbvalues.com/v1/itemdata';

    try {
        // Step 1: Get Item List
        const response1 = await fetch(proxy + encodeURIComponent(itemsUrl));
        if (!response1.ok) throw new Error("Could not reach Item Server");
        const raw1 = await response1.json();
        const itemsList = JSON.parse(raw1.contents);

        // Step 2: Get Price Data
        const response2 = await fetch(proxy + encodeURIComponent(dataUrl));
        if (!response2.ok) throw new Error("Could not reach Price Server");
        const raw2 = await response2.json();
        const priceMap = JSON.parse(raw2.contents);

        console.log("Data Received Successfully!");
        
        // Step 3: Send data to your HTML's variables
        buildDatabase(itemsList, priceMap);

    } catch (err) {
        console.error(err);
        grid.innerHTML = `
            <div class="col-span-full text-center py-20 text-red-500">
                <h2 class="text-2xl font-bold">CONNECTION BLOCKED</h2>
                <p class="mt-2 text-white opacity-60">The API sent a response, but your browser blocked it.</p>
                <p class="text-xs mt-4">Error: ${err.message}</p>
                <button onclick="location.reload()" class="mt-6 px-6 py-2 bg-accent text-white rounded-lg">Retry Sync</button>
            </div>`;
    }
}

function buildDatabase(items, prices) {
    // 1. Clear the old database
    db = {}; 

    // 2. Map the API items to our local DB format
    // Note: Items is usually an array, prices is usually an object
    const finalItems = items.items || items.data || items;
    const finalPrices = prices.itemdata || prices.data || prices;

    finalItems.forEach(item => {
        const category = item.category || "Uncategorized";
        if (!db[category]) db[category] = [];

        // Find the matching price info using the item's name
        const pInfo = finalPrices[item.name] || {};

        db[category].push({
            name: item.name,
            image: item.image,
            cash_value: pInfo.value || 0,
            duped_value: pInfo.dupedValue || 0,
            trend: pInfo.trend || 'stable',
            demand: pInfo.demand || 'Normal'
        });
    });

    // 3. Update the filter buttons in your HTML
    const filterContainer = document.getElementById('filters');
    filterContainer.innerHTML = '<div class="f-btn active" id="btn-all" onclick="setCat(\'all\', this)">All Items</div>';
    
    Object.keys(db).forEach(cat => {
        const btn = document.createElement('div');
        btn.className = 'f-btn';
        btn.innerText = cat;
        btn.onclick = function() { setCat(cat, this); };
        filterContainer.appendChild(btn);
    });

    // 4. Tell your HTML to draw the items
    updateData();
}
