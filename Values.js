const vehicleData = [
  { "name": "Javelin", "cash_value": 49500000, "duped_value": 49500000, "image": "images/javelin.png" },
  { "name": "Torpedo", "cash_value": 49000000, "duped_value": 43500000, "image": "images/torpedo.png" },
  { "name": "Beignet", "cash_value": 40000000, "duped_value": 37000000, "image": "images/beignet.png" },
  { "name": "Celsior", "cash_value": 30000000, "duped_value": 28000000, "image": "placeholder.png" },
  { "name": "Proto-8", "cash_value": 30000000, "duped_value": 30000000, "image": "placeholder.png" },
  { "name": "Power 1", "cash_value": 23000000, "duped_value": 23000000, "image": "placeholder.png" },
  { "name": "Arachnid", "cash_value": 21000000, "duped_value": 17500000, "image": "placeholder.png" },
  { "name": "Icebreaker", "cash_value": 20000000, "duped_value": 17000000, "image": "placeholder.png" },
  { "name": "Beam Hybrid", "cash_value": 19000000, "duped_value": 16000000, "image": "placeholder.png" },
  { "name": "Banana Car", "cash_value": 17000000, "duped_value": 17000000, "image": "placeholder.png" },
  // For any items where you haven't uploaded a photo yet, use placeholder.png
  { "name": "Scorpion", "cash_value": 6000000, "duped_value": 6000000, "image": "placeholder.png" },
  { "name": "Bandit", "cash_value": 5000000, "duped_value": 5000000, "image": "placeholder.png" }
];

// ... (Your other data lists like rimData, driftData etc. stay here)

const db = {
    "Vehicles": vehicleData, // Changed from "Vehicle" to "Vehicles" to match the HTML
    "Weapon Skins": weaponSkinData,
    "Hyperchromes": hyperchromeData,
    "Body Colors": bodyColorData,
    "Drifts": driftData,
    "Furniture": furnitureData,
    "Horns": hornData,
    "Rims": rimData,
    "Spoilers": spoilerData,
    "Tire Stickers": tireStickerData,
    "Tire Styles": tireStyleData
};

console.log("Database loaded successfully.");
