const vehicleData = [
  { "name": "Javelin", "cash_value": 49500000, "duped_value": 49500000, "image": "images/javelin.png" },
  { "name": "Torpedo", "cash_value": 49000000, "duped_value": 43500000, "image": "images/torpedo.png" },
  { "name": "Beignet", "cash_value": 40000000, "duped_value": 37000000, "image": "images/beignet.png" },
  { "name": "Celsior", "cash_value": 30000000, "duped_value": 28000000, "image": "images/placeholder.png" },
  { "name": "Proto-8", "cash_value": 30000000, "duped_value": 30000000, "image": "images/placeholder.png" },
  { "name": "Power 1", "cash_value": 23000000, "duped_value": 23000000, "image": "images/placeholder.png" },
  { "name": "Arachnid", "cash_value": 21000000, "duped_value": 17500000, "image": "images/placeholder.png" },
  { "name": "Icebreaker", "cash_value": 20000000, "duped_value": 17000000, "image": "images/placeholder.png" },
  { "name": "Beam Hybrid", "cash_value": 18000000, "duped_value": 14000000, "image": "images/placeholder.png" },
  { "name": "Crew Capsule", "cash_value": 5000000, "duped_value": 4000000, "image": "images/placeholder.png" }
];

const rimData = [
  { "name": "Spinner", "cash_value": 60000000, "duped_value": 45000000, "image": "images/placeholder.png" },
  { "name": "Void", "cash_value": 15000000, "duped_value": 13500000, "image": "images/placeholder.png" },
  { "name": "Blue Eyes", "cash_value": 10000000, "duped_value": 10000000, "image": "images/placeholder.png" },
  { "name": "Hypno", "cash_value": 7500000, "duped_value": 6500000, "image": "images/placeholder.png" },
  { "name": "Trackstar", "cash_value": 1500000, "duped_value": 1500000, "image": "images/placeholder.png" },
  { "name": "All-Terrain", "cash_value": 500000, "duped_value": 500000, "image": "images/placeholder.png" },
  { "name": "Retro Racer", "cash_value": 500000, "duped_value": 500000, "image": "images/placeholder.png" },
  { "name": "Spike", "cash_value": 500000, "duped_value": 500000, "image": "images/placeholder.png" },
  { "name": "Square", "cash_value": 500000, "duped_value": 500000, "image": "images/placeholder.png" },
  { "name": "Star", "cash_value": 500000, "duped_value": 500000, "image": "images/placeholder.png" },
  { "name": "Wedge", "cash_value": 500000, "duped_value": 500000, "image": "images/placeholder.png" },
  { "name": "6-Spoke", "cash_value": 250000, "duped_value": 250000, "image": "images/placeholder.png" },
  { "name": "Offroad", "cash_value": 250000, "duped_value": 250000, "image": "images/placeholder.png" },
  { "name": "Pentagram", "cash_value": 250000, "duped_value": 250000, "image": "images/placeholder.png" },
  { "name": "Steel", "cash_value": 250000, "duped_value": 250000, "image": "images/placeholder.png" },
  { "name": "Triangle", "cash_value": 250000, "duped_value": 250000, "image": "images/placeholder.png" }
];

// CRITICAL: This connects your lists to the categories on the website
const db = {
  "Vehicles": vehicleData,
  "Rims": rimData
};
