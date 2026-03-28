const fs = require('fs');
const { execSync } = require('child_process');

// Read Values.js to get item data
const valuesContent = fs.readFileSync('Values.js', 'utf8');
eval(valuesContent); // This will load all the data arrays

function generateItemPage(item, category) {
    const itemName = item.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const fileName = `${itemName}.html`;
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jailbreak Hub | ${item.name}</title>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbackend/js/adsbygoogle.js?client=ca-pub-4156751217830729"
     crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
            --bg: #030508;
            --surface: #0a0c10;
            --card: #11141a;
            --border: rgba(255, 255, 255, 0.08);
            --accent: #0070f3;
            --green: #00ff88;
            --red: #ff4444;
            --orange: #ffa500;
            --text-main: #ffffff;
            --text-dim: #94a3b8;
        }

        * { box-sizing: border-box; transition: all 0.2s ease; }
        body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            background: var(--bg); color: var(--text-main); 
            margin: 0; padding-top: 100px;
            background-image: radial-gradient(circle at 50% -20%, #111827 0%, #030508 60%);
            min-height: 100vh;
        }

        .nav-top {
            position: fixed; top: 0; width: 100%; height: 70px;
            background: rgba(3, 5, 8, 0.9); backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border); display: flex;
            align-items: center; justify-content: center;
            padding: 0 40px; z-index: 5000;
        }
        .nav-logo { position: absolute; left: 40px; font-weight: 800; font-size: 1.4rem; text-decoration: none; color: #fff; letter-spacing: -1px; }
        .nav-logo span { color: var(--accent); }

        .container { max-width: 1400px; margin: 0 auto; padding: 20px; }
        
        .back-btn {
            display: inline-flex; align-items: center; gap: 8px;
            padding: 12px 20px; background: var(--surface); border: 1px solid var(--border);
            border-radius: 12px; color: var(--text-dim); text-decoration: none;
            font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
            margin-bottom: 30px; transition: all 0.2s ease;
        }
        .back-btn:hover { 
            background: var(--card); 
            color: var(--accent); 
            transform: translateX(-4px);
        }

        .item-detail-container {
            display: grid; 
            grid-template-columns: minmax(350px, 1fr) minmax(400px, 1.5fr); 
            gap: 40px; 
            margin-bottom: 60px;
        }

        @media (max-width: 1024px) {
            .item-detail-container { grid-template-columns: 1fr; }
        }

        .item-image-section {
            background: var(--surface); border: 1px solid var(--border);
            border-radius: 24px; padding: 30px; display: flex; flex-direction: column;
            align-items: center; position: relative; overflow: hidden;
        }
        .item-image-wrapper {
            width: 100%; aspect-ratio: 1/1; background: #000;
            border-radius: 16px; display: flex; align-items: center;
            justify-content: center; overflow: hidden; margin-bottom: 20px;
            border: 1px solid var(--border);
        }
        .item-image { width: 85%; height: 85%; object-fit: contain; }
        
        .trend-badge-large {
            position: absolute; top: 20px; right: 20px;
            padding: 8px 16px; border-radius: 12px; font-size: 0.7rem;
            font-weight: 900; text-transform: uppercase; border: 1px solid;
            backdrop-filter: blur(10px); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .trend-rising { 
            background: linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 255, 136, 0.1) 100%); 
            color: var(--green); 
            border-color: var(--green);
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
        }
        .trend-falling { 
            background: linear-gradient(135deg, rgba(255, 68, 68, 0.2) 0%, rgba(255, 68, 68, 0.1) 100%); 
            color: var(--red); 
            border-color: var(--red);
            box-shadow: 0 0 20px rgba(255, 68, 68, 0.3);
        }
        .trend-stable { 
            background: linear-gradient(135deg, rgba(148, 163, 184, 0.2) 0%, rgba(148, 163, 184, 0.1) 100%); 
            color: var(--text-dim); 
            border-color: var(--border);
        }

        .item-info-section {
            display: flex; flex-direction: column; gap: 30px;
        }

        .item-header {
            background: var(--surface); border: 1px solid var(--border);
            border-radius: 24px; padding: 30px;
        }
        .item-category {
            color: var(--accent); font-size: 0.7rem; font-weight: 800;
            text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;
        }
        .item-name {
            font-size: 2.5rem; font-weight: 900; line-height: 1.1;
            margin: 0 0 20px 0; text-transform: uppercase;
        }
        .item-description {
            color: var(--text-dim); line-height: 1.6; font-size: 1rem;
            margin: 0;
        }

        .values-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        .value-box {
            background: var(--surface); border: 1px solid var(--border);
            border-radius: 16px; padding: 20px;
            transition: all 0.2s ease;
        }
        .value-box:hover {
            transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        .value-label {
            font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase;
            font-weight: 800; letter-spacing: 0.05em; margin-bottom: 8px;
        }
        .value-amount {
            font-family: 'JetBrains Mono'; font-size: 1.5rem; font-weight: 700;
        }
        .value-clean { color: var(--green); }
        .value-duped { color: var(--orange); }
        .value-original { color: var(--text-dim); }

        .meta-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        .meta-box {
            background: var(--surface); border: 1px solid var(--border);
            border-radius: 16px; padding: 20px;
        }
        .meta-label {
            font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase;
            font-weight: 800; letter-spacing: 0.05em; margin-bottom: 8px;
        }
        .meta-value {
            font-size: 1rem; font-weight: 700; color: var(--text-main);
        }
        .demand-high { color: var(--green); }
        .demand-medium { color: var(--orange); }
        .demand-low { color: var(--red); }
    </style>
</head>
<body>
    <div class="nav-top">
        <a href="values.html" class="nav-logo">Jailbreak <span>Hub</span></a>
    </div>
    
    <div class="container">
        <a href="values.html" class="back-btn">
            <i class="fa-solid fa-arrow-left"></i>
            Back to Market Database
        </a>

        <div class="item-detail-container">
            <div class="item-image-section">
                <div class="trend-badge-large trend-${(item.trend || 'stable').toLowerCase()}">${(item.trend || 'stable').toUpperCase()}</div>
                <div class="item-image-wrapper">
                    <img src="${item.image || 'https://via.placeholder.com/400/0a0c10/64748b?text=%3F'}" class="item-image" alt="${item.name}">
                </div>
            </div>

            <div class="item-info-section">
                <div class="item-header">
                    <div class="item-category">${category.toUpperCase()}</div>
                    <h1 class="item-name">${item.name}</h1>
                    <p class="item-description">No description available for this item.</p>
                </div>

                <div class="values-grid">
                    <div class="value-box">
                        <div class="value-label">Clean Value</div>
                        <div class="value-amount value-clean">$${(item.cash_value || 0).toLocaleString()}</div>
                    </div>
                    <div class="value-box">
                        <div class="value-label">Duped Value</div>
                        <div class="value-amount value-duped">$${(item.duped_value || 0).toLocaleString()}</div>
                    </div>
                    ${item.original_price && item.original_price !== 'N/A' ? `
                    <div class="value-box">
                        <div class="value-label">Original Price</div>
                        <div class="value-amount value-original">${item.original_price}</div>
                    </div>` : ''}
                </div>

                <div class="meta-grid">
                    <div class="meta-box">
                        <div class="meta-label">Demand</div>
                        <div class="meta-value ${getDemandClass(item.demand)}">${item.demand || 'Normal'}</div>
                    </div>
                    <div class="meta-box">
                        <div class="meta-label">Trend</div>
                        <div class="meta-value">${item.trend || 'Stable'}</div>
                    </div>
                    <div class="meta-box">
                        <div class="meta-label">Category</div>
                        <div class="meta-value">${category}</div>
                    </div>
                    <div class="meta-box">
                        <div class="meta-label">Last Updated</div>
                        <div class="meta-value">Unknown</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function getDemandClass(demand) {
            if (!demand) return '';
            const d = demand.toLowerCase();
            if (d.includes('high') || d.includes('very high')) return 'demand-high';
            if (d.includes('medium') || d.includes('decent')) return 'demand-medium';
            if (d.includes('low') || d.includes('very low') || d.includes('close to none')) return 'demand-low';
            return '';
        }
    </script>
</body>
</html>`;

    fs.writeFileSync(fileName, html);
    console.log(`Generated: ${fileName}`);
}

function getDemandClass(demand) {
    if (!demand) return '';
    const d = demand.toLowerCase();
    if (d.includes('high') || d.includes('very high')) return 'demand-high';
    if (d.includes('medium') || d.includes('decent')) return 'demand-medium';
    if (d.includes('low') || d.includes('very low') || d.includes('close to none')) return 'demand-low';
    return '';
}

// Generate pages for all items
const categories = {
    'Vehicles': vehicleData,
    'Weapon Skins': weaponSkinData,
    'Hyperchromes': hyperchromeData,
    'Textures': driftData,
    'Furniture': furnitureData,
    'Horns': hornData,
    'Rims': rimData,
    'Spoilers': spoilerData,
    'Tire Stickers': tireStickerData,
    'Tire Styles': tireStyleData
};

for (const [category, items] of Object.entries(categories)) {
    items.forEach(item => {
        generateItemPage(item, category);
    });
}

console.log('Generated individual item pages!');
