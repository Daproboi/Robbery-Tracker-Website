const vehicleData = [
  { "name": "Javelin", "cash_value": 49500000, "duped_value": 49500000, "image": "images/javelin.png" },
  { "name": "Torpedo", "cash_value": 49000000, "duped_value": 43500000, "image": "images/torpedo.png" },
  { "name": "Beignet", "cash_value": 40000000, "duped_value": 37000000, "image": "images/beignet.png" },
  { "name": "Celsior", "cash_value": 30000000, "duped_value": 28000000, "image": "images/celsior.png" },
  { "name": "Proto-8", "cash_value": 30000000, "duped_value": 30000000, "image": "images/proto8.png" },
  { "name": "Power 1", "cash_value": 23000000, "duped_value": 23000000, "image": "images/power1.png" },
  { "name": "Arachnid", "cash_value": 21000000, "duped_value": 17500000, "image": "images/arachnid.png" },
  { "name": "Icebreaker", "cash_value": 20000000, "duped_value": 17000000, "image": "images/icebreaker.png" },
  { "name": "Beam Hybrid", "cash_value": 18000000, "duped_value": 14000000, "image": "images/beamhybrid.png" },
  { "name": "Crew Capsule", "cash_value": 5000000, "duped_value": 4000000, "image": "images/crewcapsule.png" }
];

const rimData = [
  { "name": "Spinner", "cash_value": 60000000, "duped_value": 45000000, "image": "images/spinner.png" },
  { "name": "Void", "cash_value": 15000000, "duped_value": 13500000, "image": "images/void.png" },
  { "name": "Blue Eyes", "cash_value": 10000000, "duped_value": 10000000, "image": "images/blueeyes.png" },
  { "name": "Hypno", "cash_value": 7500000, "duped_value": 6500000, "image": "images/hypno.png" },
  { "name": "Trackstar", "cash_value": 1500000, "duped_value": 1500000, "image": "images/trackstar.png" },
  { "name": "All-Terrain", "cash_value": 500000, "duped_value": 500000, "image": "images/allterrain.png" }
];

// This variable 'db' MUST exist for the HTML to work
const db = {
  "Vehicles": vehicleData,
  "Rims": rimData
};
