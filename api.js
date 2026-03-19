async function getLiveValues() {
    try {
        // 1. Fetch the items and the data at the same time
        const [itemsResponse, dataResponse] = await Promise.all([
            fetch('https://api.jbvalues.com/v1/items'),
            fetch('https://api.jbvalues.com/v1/itemdata')
        ]);

        const items = await itemsResponse.json();
        const itemData = await dataResponse.json();

        // 2. Combine them into a format your calculator understands
        // This maps the API data to match your old "cash_value" style
        const formattedData = items.map(item => {
            const details = itemData[item.name] || {};
            return {
                name: item.name,
                cash_value: details.value || 0,
                duped_value: details.dupedValue || details.value || 0,
                image: item.image,
                category: item.category
            };
        });

        return formattedData;
    } catch (error) {
        console.error("Could not load live values:", error);
        return []; // Return empty list if API fails
    }
}
