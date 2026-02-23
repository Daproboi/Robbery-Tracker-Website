JavaScript


const vehicleData = [
  [
  {
    "name": "Javelin",
    "cash_value": 49500000,
    "duped_value": 49500000
  },
  {
    "name": "Torpedo",
    "cash_value": 49000000,
    "duped_value": 43500000
  },
  {
    "name": "Beignet",
    "cash_value": 40000000,
    "duped_value": 37000000
  },
  {
    "name": "Celsior",
    "cash_value": 30000000,
    "duped_value": 28000000
  },
  {
    "name": "Proto-8",
    "cash_value": 30000000,
    "duped_value": 30000000
  },
  {
    "name": "Power 1",
    "cash_value": 23000000,
    "duped_value": 23000000
  },
  {
    "name": "Arachnid",
    "cash_value": 21000000,
    "duped_value": 17500000
  },
  {
    "name": "Icebreaker",
    "cash_value": 20000000,
    "duped_value": 17000000
  },
  {
    "name": "Beam Hybrid",
    "cash_value": 19000000,
    "duped_value": 16000000
  },
  {
    "name": "Banana Car",
    "cash_value": 17000000,
    "duped_value": 17000000
  },
  {
    "name": "Molten M12",
    "cash_value": 15000000,
    "duped_value": 15000000
  },
  {
    "name": "Crew Capsule",
    "cash_value": 12500000,
    "duped_value": 12500000
  },
  {
    "name": "Raptor",
    "cash_value": 11000000,
    "duped_value": 11000000
  },
  {
    "name": "Volt 4x4",
    "cash_value": 10000000,
    "duped_value": 10000000
  },
  {
    "name": "Parisian",
    "cash_value": 8000000,
    "duped_value": 8000000
  },
  {
    "name": "Aperture",
    "cash_value": 7500000,
    "duped_value": 7500000
  },
  {
    "name": "Shogun",
    "cash_value": 6500000,
    "duped_value": 6500000
  },
  {
    "name": "Scorpion",
    "cash_value": 6000000,
    "duped_value": 6000000
  },
  {
    "name": "Carbonara",
    "cash_value": 5500000,
    "duped_value": 5500000
  },
  {
    "name": "Macaron",
    "cash_value": 5500000,
    "duped_value": 5500000
  },
  {
    "name": "Bandit",
    "cash_value": 5000000,
    "duped_value": 5000000
  },
  {
    "name": "Goliath",
    "cash_value": 5000000,
    "duped_value": 5000000
  },
  {
    "name": "Rattler",
    "cash_value": 4000000,
    "duped_value": 4000000
  },
  {
    "name": "Torero",
    "cash_value": 4000000,
    "duped_value": 4000000
  },
  {
    "name": "JB8",
    "cash_value": 3500000,
    "duped_value": 3500000
  },
  {
    "name": "Snake",
    "cash_value": 3500000,
    "duped_value": 3500000
  },
  {
    "name": "Orion M42",
    "cash_value": 3500000,
    "duped_value": 3500000
  },
  {
    "name": "Airtail",
    "cash_value": 3000000,
    "duped_value": 3000000
  },
  {
    "name": "Brulee",
    "cash_value": 3000000,
    "duped_value": 3000000
  },
  {
    "name": "Tiny Toy",
    "cash_value": 3000000,
    "duped_value": 3000000
  },
  {
    "name": "Iceborn",
    "cash_value": 3000000,
    "duped_value": 3000000
  },
  {
    "name": "Katana",
    "cash_value": 3000000,
    "duped_value": 3000000
  },
  {
    "name": "Bloxy",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Concept",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Poseidon",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Shell Classic",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Wedge",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Cobra",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Brick Kar-1",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Black Widow",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Agent",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "Jackrabbit",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "Stormrider",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "Polaire",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "LongHorn",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Manta",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Revox",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Blackbeard",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Frost Crawler",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "Megalodon",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "OG Monster",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "Striker",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "Drone",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "Maverick",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Monster",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Sloop",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Tank",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Trailblazer",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Volt",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Black Hawk",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Jet",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Bionic",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Crown",
    "cash_value": 666000,
    "duped_value": 666000
  },
  {
    "name": "Successor",
    "cash_value": 649000,
    "duped_value": 649000
  },
  {
    "name": "Eclaire",
    "cash_value": 600000,
    "duped_value": 600000
  },
  {
    "name": "Nascar 75th",
    "cash_value": 600000,
    "duped_value": 600000
  },
  {
    "name": "Roadster",
    "cash_value": 600000,
    "duped_value": 600000
  },
  {
    "name": "Classic",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Mighty",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Posh",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "SUV",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Steed",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Venom",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "UFO",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Wyndr",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Pizza Delivery",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Hammer Head",
    "cash_value": 350000,
    "duped_value": 350000
  },
  {
    "name": "Stunt",
    "cash_value": 300000,
    "duped_value": 300000
  },
  {
    "name": "XRK",
    "cash_value": 299000,
    "duped_value": 299000
  },
  {
    "name": "Fiasco",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "OG La Matador",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Sentinel",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Speed Yacht",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Desert Crawler",
    "cash_value": 229000,
    "duped_value": 229000
  },
  {
    "name": "Stallion",
    "cash_value": 200000,
    "duped_value": 200000
  },
  {
    "name": "Ray 9",
    "cash_value": 199000,
    "duped_value": 199000
  },
  {
    "name": "Little Bird",
    "cash_value": 190000,
    "duped_value": 190000
  },
  {
    "name": "Delorean",
    "cash_value": 175000,
    "duped_value": 175000
  },
  {
    "name": "Fire Truck",
    "cash_value": 175000,
    "duped_value": 175000
  },
  {
    "name": "Falcon S",
    "cash_value": 150000,
    "duped_value": 150000
  },
  {
    "name": "Prison Bus",
    "cash_value": 150000,
    "duped_value": 150000
  },
  {
    "name": "Surus",
    "cash_value": 109000,
    "duped_value": 109000
  },
  {
    "name": "CyberTruck",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "La Matador",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Laviolette",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Semi Truck",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Escape Bot",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Shell Mark 5",
    "cash_value": 92000,
    "duped_value": 92000
  },
  {
    "name": "Ambulance",
    "cash_value": 90000,
    "duped_value": 90000
  },
  {
    "name": "Tow Truck",
    "cash_value": 80000,
    "duped_value": 80000
  },
  {
    "name": "Tanker",
    "cash_value": 80000,
    "duped_value": 80000
  },
  {
    "name": "Camper",
    "cash_value": 79000,
    "duped_value": 79000
  },
  {
    "name": "Challenger",
    "cash_value": 59000,
    "duped_value": 59000
  },
  {
    "name": "Boxer",
    "cash_value": 55000,
    "duped_value": 55000
  },
  {
    "name": "Expeditioner",
    "cash_value": 55000,
    "duped_value": 55000
  },
  {
    "name": "ATV",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Jet Ski",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Badger",
    "cash_value": 45000,
    "duped_value": 45000
  },
  {
    "name": "Dune Buggy",
    "cash_value": 45000,
    "duped_value": 45000
  },
  {
    "name": "Patrol",
    "cash_value": 45000,
    "duped_value": 45000
  },
  {
    "name": "Dirt Bike",
    "cash_value": 35000,
    "duped_value": 35000
  },
  {
    "name": "Interrogator",
    "cash_value": 30000,
    "duped_value": 30000
  },
  {
    "name": "Ray",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "Model 3",
    "cash_value": 16000,
    "duped_value": 16000
  },
  {
    "name": "Deja",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Pickup",
    "cash_value": 9000,
    "duped_value": 9000
  },
  {
    "name": "Camaro",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Celestial",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Cruiser",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Jeep",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Lia",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "MCL36",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Nascar",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Nascar Free",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Swat Van",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Heli",
    "cash_value": null,
    "duped_value": null
  }
];

const weaponSkinData = [
  [
  {
    "name": "Drip",
    "cash_value": 15000000,
    "duped_value": 15000000
  },
  {
    "name": "Snowstorm",
    "cash_value": 4000000,
    "duped_value": 4000000
  },
  {
    "name": "Flaming",
    "cash_value": 1750000,
    "duped_value": 1750000
  },
  {
    "name": "Circuit Board",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Digital Confetti",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "White Marble",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "Fire",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Galactic Carbon",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Black Ice",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Earthquake",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Manga",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Money",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Tiger",
    "cash_value": 15000,
    "duped_value": 15000
  },
  {
    "name": "Wooden Toy",
    "cash_value": 15000,
    "duped_value": 15000
  },
  {
    "name": "Aurora",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "Aquatic",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Camo",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Candy Cane",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Diamond",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Donut",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Camo Radar",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Rainbow",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Scorch",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Zebra",
    "cash_value": null,
    "duped_value": null
  }
];

const hyperchromeData = [
  [
  {
    "name": "HyperShift",
    "cash_value": 355000000,
    "duped_value": 312000000
  },
  {
    "name": "HyperShift Level 4",
    "cash_value": 254000000,
    "duped_value": 254000000
  },
  {
    "name": "HyperDiamond Level 5",
    "cash_value": 70000000,
    "duped_value": 60000000
  },
  {
    "name": "HyperBlue Level 5",
    "cash_value": 61000000,
    "duped_value": 50000000
  },
  {
    "name": "HyperPink Level 5",
    "cash_value": 58000000,
    "duped_value": 51000000
  },
  {
    "name": "HyperBlue Level 4",
    "cash_value": 54000000,
    "duped_value": 54000000
  },
  {
    "name": "HyperDiamond Level 4",
    "cash_value": 47000000,
    "duped_value": 47000000
  },
  {
    "name": "HyperRed Level 5",
    "cash_value": 45000000,
    "duped_value": 39000000
  },
  {
    "name": "HyperPurple Level 5",
    "cash_value": 43000000,
    "duped_value": 40000000
  },
  {
    "name": "HyperPink Level 4",
    "cash_value": 42000000,
    "duped_value": 42000000
  },
  {
    "name": "HyperOrange Level 5",
    "cash_value": 34000000,
    "duped_value": 31500000
  },
  {
    "name": "HyperPurple Level 4",
    "cash_value": 32000000,
    "duped_value": 32000000
  },
  {
    "name": "HyperRed Level 4",
    "cash_value": 26000000,
    "duped_value": 26000000
  },
  {
    "name": "HyperGreen Level 5",
    "cash_value": 25000000,
    "duped_value": 23000000
  },
  {
    "name": "HyperBlue Level 3",
    "cash_value": 21000000,
    "duped_value": 21000000
  },
  {
    "name": "HyperOrange Level 4",
    "cash_value": 20000000,
    "duped_value": 20000000
  },
  {
    "name": "HyperYellow Level 5",
    "cash_value": 20000000,
    "duped_value": 18000000
  },
  {
    "name": "HyperGreen Level 4",
    "cash_value": 19000000,
    "duped_value": 19000000
  },
  {
    "name": "HyperDiamond Level 3",
    "cash_value": 17500000,
    "duped_value": 17500000
  },
  {
    "name": "HyperYellow Level 4",
    "cash_value": 14000000,
    "duped_value": 14000000
  },
  {
    "name": "HyperPink Level 3",
    "cash_value": 12000000,
    "duped_value": 12000000
  },
  {
    "name": "HyperPurple Level 3",
    "cash_value": 10000000,
    "duped_value": 10000000
  },
  {
    "name": "HyperRed Level 3",
    "cash_value": 6000000,
    "duped_value": 6000000
  },
  {
    "name": "HyperBlue Level 2",
    "cash_value": 4000000,
    "duped_value": 4000000
  },
  {
    "name": "HyperOrange Level 3",
    "cash_value": 4000000,
    "duped_value": 4000000
  },
  {
    "name": "HyperDiamond Level 2",
    "cash_value": 3500000,
    "duped_value": 3500000
  },
  {
    "name": "HyperGreen Level 3",
    "cash_value": 3500000,
    "duped_value": 3500000
  },
  {
    "name": "HyperYellow Level 3",
    "cash_value": 3000000,
    "duped_value": 3000000
  },
  {
    "name": "HyperPink Level 2",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "HyperGreen Level 2",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "HyperOrange Level 2",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "HyperPurple Level 2",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "HyperRed Level 2",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "HyperYellow Level 2",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "HyperBlue Level 1",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "HyperDiamond Level 1",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "HyperGreen Level 1",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "HyperOrange Level 1",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "HyperPink Level 1",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "HyperPurple Level 1",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "HyperRed Level 1",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "HyperYellow Level 1",
    "cash_value": null,
    "duped_value": null
  }
];

const bodyColorData = [
  [
  {
    "name": "Vantablack",
    "cash_value": 30000000,
    "duped_value": 30000000
  },
  {
    "name": "Gold",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "Radiant Ice",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Fall Chrome",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Radiant Orange",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Darkest Purple",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Radiant Green",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Radiant Pink",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Radiant Polar Blue",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Radiant Purple",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Radiant Red",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Radiant Sun",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Radiant Yellow",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Radiant White",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Deep Purple",
    "cash_value": 12000,
    "duped_value": 12000
  },
  {
    "name": "Hot Orange",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Super Lime",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Darkest Blue",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "Darkest Brown",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "Darkest Green",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "Darkest Marine",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "Darkest Red",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "Hottest Pink",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "Maroon",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "Military Green",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "Navy Blue",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "Mud",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "Black",
    "cash_value": 1000,
    "duped_value": 1000
  },
  {
    "name": "Blue",
    "cash_value": 1000,
    "duped_value": 1000
  },
  {
    "name": "Cyan",
    "cash_value": 1000,
    "duped_value": 1000
  },
  {
    "name": "Forest Green",
    "cash_value": 1000,
    "duped_value": 1000
  },
  {
    "name": "Green",
    "cash_value": 1000,
    "duped_value": 1000
  },
  {
    "name": "Grey",
    "cash_value": 1000,
    "duped_value": 1000
  },
  {
    "name": "Matte",
    "cash_value": 1000,
    "duped_value": 1000
  },
  {
    "name": "White",
    "cash_value": 1000,
    "duped_value": 1000
  },
  {
    "name": "Orange",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Pastel Blue",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Pastel Brown",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Pastel Gray",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Pastel Green",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Pastel Orange",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Pastel Pink",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Pastel Violet",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Pastel Yellow",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Pink",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Purple",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Real Green",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Red",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Sakura Pink",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Sand",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Yellow",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "VIP Chrome",
    "cash_value": null,
    "duped_value": null
  }
];

const driftData = [
  [
  {
    "name": "Blue Fire",
    "cash_value": 23000000,
    "duped_value": 23000000
  },
  {
    "name": "Gradient Pixel",
    "cash_value": 9000000,
    "duped_value": 9000000
  },
  {
    "name": "Spark",
    "cash_value": 3000000,
    "duped_value": 3000000
  },
  {
    "name": "Aurora",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "Brickset",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "Ocean Water",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Ice Spike",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Neo-Static",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Bloxxer",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Nemesis",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "OG Fuel",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Shooting Star",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "PixelCoin",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Jungle Vine",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Lightning",
    "cash_value": 400000,
    "duped_value": 400000
  },
  {
    "name": "Flamethrower",
    "cash_value": 300000,
    "duped_value": 300000
  },
  {
    "name": "Synth",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "SubSpace",
    "cash_value": 150000,
    "duped_value": 150000
  },
  {
    "name": "Cosmic",
    "cash_value": 120000,
    "duped_value": 120000
  },
  {
    "name": "Magic Purple",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Pixel",
    "cash_value": 75000,
    "duped_value": 75000
  },
  {
    "name": "Bubble Wand",
    "cash_value": 45000,
    "duped_value": 45000
  },
  {
    "name": "Cartoon",
    "cash_value": 35000,
    "duped_value": 35000
  },
  {
    "name": "Melons",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "Performance",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "Bananas",
    "cash_value": 10000,
    "duped_value": 10000
  }
];

const furnitureData = [
  [
  {
    "name": "Noob Scream",
    "cash_value": 14000000,
    "duped_value": 14000000
  },
  {
    "name": "Sci-Fi Kitchen",
    "cash_value": 5000000,
    "duped_value": 5000000
  },
  {
    "name": "Trapped Bookshelf",
    "cash_value": 4000000,
    "duped_value": 4000000
  },
  {
    "name": "Hot Chocolate Tub",
    "cash_value": 3500000,
    "duped_value": 3500000
  },
  {
    "name": "Race Simulator",
    "cash_value": 3500000,
    "duped_value": 3500000
  },
  {
    "name": "Race Car Bed",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Sarcophagus Bed",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Cryo Chamber",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Missile Bed",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Picnic Table",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Foosball Table",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "RGB Wall",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "Teleporters",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "Air Hockey Table",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Bloxy Lisa",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Sakura Tree",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Walk Of Fame",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Arcade Portal",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Arcade Sports Machine",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Beach Hammock",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Gamer Chair",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "If I Had One",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Liberty",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "London Telephone Sofa",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Nukamo Fridge",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Puzzle Couch",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Royal Throne",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Super Star Rug",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Tiger Rug",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Tiki Tea Bar",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Track Car Bed",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "80s Cassette Table",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Car Pool Table",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "OG Snow Machine",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Banana Chandelier",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Pirate Figurehead",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Avatar Wardrobe",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Aurora Chandelier",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "French Croissant Sofa",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Giant OG Snowman",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Hero Zapper",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Japanese Neon Sign",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Radiation Radio",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Wanted Background",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Wild West Wagon",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Pixel Campfire",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Neon Vein Wall-Art",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Spawn Rug",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Winter Rally Lamp",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Cosmetic Safe",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "CyberBlue Couch",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Fabulous Sign",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Toy Plane",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Voxel Sofa",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Badimo Bros Wall Light",
    "cash_value": 30000,
    "duped_value": 30000
  },
  {
    "name": "Sloopwreck Bed",
    "cash_value": 30000,
    "duped_value": 30000
  },
  {
    "name": "Dino Exhibit",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "Grand Piano",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "Missile Sofa",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "TNT Barrel",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "8-Bit Rug",
    "cash_value": 18000,
    "duped_value": 18000
  },
  {
    "name": "Captain Table",
    "cash_value": 15000,
    "duped_value": 15000
  },
  {
    "name": "Tiki Stack Of Badimo",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Captain Chandelier",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Rally Signage",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "VIP Radio",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Gamer TV Set",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Pixel Wardrobe",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Hologram Donut Vendor",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Wanted Hologram Signage",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Doghouse Bulldog",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Doghouse German",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Bounty Board",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Haunting Door",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Scary Organ",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Scary Sofa",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Rest In Peace",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Scary Treasures",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Trapped Spikes",
    "cash_value": null,
    "duped_value": null
  }
];

const hornData = [
 [
  {
    "name": "Cucaracha",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Winner",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Champion Trumpets",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Clown",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Ahooga",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Airhorn",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Bicycle",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "City",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Countdown",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Cruise Liner",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Drop Weapons",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Fire Brigade",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Injan",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Meep Meep",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Original",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Quack",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Realistic",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Rumble Siren",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Sendoff",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Steamer",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Train",
    "cash_value": null,
    "duped_value": null
  }
];

const rimData = [
  [
  {
    "name": "Void",
    "cash_value": 46000000,
    "duped_value": 41000000
  },
  {
    "name": "Laser Cannon",
    "cash_value": 28000000,
    "duped_value": 28000000
  },
  {
    "name": "RTX",
    "cash_value": 18000000,
    "duped_value": 18000000
  },
  {
    "name": "Spinner",
    "cash_value": 17000000,
    "duped_value": 15000000
  },
  {
    "name": "Snow Face",
    "cash_value": 10000000,
    "duped_value": 10000000
  },
  {
    "name": "Snowflake",
    "cash_value": 5000000,
    "duped_value": 5000000
  },
  {
    "name": "Icicle",
    "cash_value": 4500000,
    "duped_value": 4500000
  },
  {
    "name": "Ionize",
    "cash_value": 4500000,
    "duped_value": 4500000
  },
  {
    "name": "Planetary",
    "cash_value": 4000000,
    "duped_value": 4000000
  },
  {
    "name": "Brickset",
    "cash_value": 3000000,
    "duped_value": 3000000
  },
  {
    "name": "Blue Eyes",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Center Lock",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Hypno",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Iron Rock",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Diamond Engrave",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "Radar",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "Sakura",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "Stance",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "Track Toy",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "Wagon Wheel",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "Inf1n1ty",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "Daytona",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Doubloon",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Fore",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Frostburn",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Red Eyes",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Rubber Ducky",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Sparkler",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Spider Leg",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Blue Portal",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Bull",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "Soccer",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "Star Badge",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "Baller",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Biohazard",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Distorted",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Energized",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Euro Clover Leaf",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Marshmallow",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Nemesis",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Retrowave",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Tumble Weed",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Pixeltary",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Beadlock",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Compass",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Dino",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Handcuff",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Ship Wheel",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Shutter Shade",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "UK Heritage",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Sled Void",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Jungle Palm",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Storm",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "4 Billion",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Beachball",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Bonded",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "EXP 1",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Live 2020",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Piggy",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Roll-X",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "SawBlade",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Unknown Signal",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Spixel",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Neo-Runner",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Speed Coil",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Forged",
    "cash_value": 300000,
    "duped_value": 300000
  },
  {
    "name": "Belgian Waffle",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "BoominSpeaker",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Cassette",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Gun Fire",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Heli Prop",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Peppermint",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Quarter Dollar",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Rally",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Retro Racer",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Road Warrior",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Scope",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Spyglass",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Teddy Bear",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Tesseract",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Trion",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "VolleyBall",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Ice Crystal",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "8-Bit",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Brig Bone",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Kraken",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Hatch Voids",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Truss",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Dragon Chaser",
    "cash_value": 200000,
    "duped_value": 200000
  },
  {
    "name": "RFX",
    "cash_value": 150000,
    "duped_value": 150000
  },
  {
    "name": "Abstracts",
    "cash_value": 120000,
    "duped_value": 120000
  },
  {
    "name": "Evil Eye",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Propeller",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Radioactive",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Revolver",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Vault Door",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "DPad",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Grande Punto",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Subcarbon",
    "cash_value": 75000,
    "duped_value": 75000
  },
  {
    "name": "Electrostatic",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Hold E",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Roulette",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Python",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "P-100I",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Unified",
    "cash_value": 40000,
    "duped_value": 40000
  },
  {
    "name": "Police Chase",
    "cash_value": 35000,
    "duped_value": 35000
  },
  {
    "name": "Slashers",
    "cash_value": 35000,
    "duped_value": 35000
  },
  {
    "name": "VFX",
    "cash_value": 35000,
    "duped_value": 35000
  },
  {
    "name": "Bloxy",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "Cobweb",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "Reactor",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "SRT",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "Space-R",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "Corp CR1",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "Vecchio",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "147",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Settima",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "RX-1",
    "cash_value": 15000,
    "duped_value": 15000
  },
  {
    "name": "Treasure Island",
    "cash_value": 15000,
    "duped_value": 15000
  },
  {
    "name": "7 billion",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Billion",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Jet",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Landmine",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Mystic",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Spike",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Flower",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "Money",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "Bamboo",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "Arachnid",
    "cash_value": 1000,
    "duped_value": 1000
  },
  {
    "name": "Turbine",
    "cash_value": 1000,
    "duped_value": 1000
  },
  {
    "name": "Blade",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Cyclone",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Halo",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Star",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Live 2024",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "MCL36",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "ArmorPunk",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Hex-Bond",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Animated Obby",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Delivery",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Spawn",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Bad Omen",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Scythes",
    "cash_value": null,
    "duped_value": null
  }
];

const spoilerData = [
  [
  {
    "name": "Thrusters",
    "cash_value": 40000000,
    "duped_value": 37000000
  },
  {
    "name": "Snow Shovel",
    "cash_value": 12000000,
    "duped_value": 12000000
  },
  {
    "name": "2 Billion",
    "cash_value": 8500000,
    "duped_value": 8500000
  },
  {
    "name": "Bicycle Rack",
    "cash_value": 5500000,
    "duped_value": 5500000
  },
  {
    "name": "Clickbait",
    "cash_value": 4000000,
    "duped_value": 4000000
  },
  {
    "name": "Volt Wing",
    "cash_value": 4000000,
    "duped_value": 4000000
  },
  {
    "name": "5 Star",
    "cash_value": 3500000,
    "duped_value": 3500000
  },
  {
    "name": "Cash Spitter",
    "cash_value": 3500000,
    "duped_value": 3500000
  },
  {
    "name": "Eight Leg",
    "cash_value": 3500000,
    "duped_value": 3500000
  },
  {
    "name": "Blue Chute",
    "cash_value": 3000000,
    "duped_value": 3000000
  },
  {
    "name": "Glider",
    "cash_value": 3000000,
    "duped_value": 3000000
  },
  {
    "name": "Tiki Torch",
    "cash_value": 3000000,
    "duped_value": 3000000
  },
  {
    "name": "Velocity",
    "cash_value": 3000000,
    "duped_value": 3000000
  },
  {
    "name": "Brickset",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Dual Rockets",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "Endurance Wing",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "After Burner",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Colors Of Italy",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Death Ray",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Flamethrower",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Jetpack",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Mecha Arm",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Water Gun",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Dual Flags",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "Shell Speaker",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "Cannonfire",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "Bull",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Guitar Riff",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "JDM",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Japanese Lantern",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Orange Chute",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Snow Cannon",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Spare",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Surfboard Rack",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "UFO",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Windmill",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Arcade Racer",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Bamboo Shooters",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Bloxxer Launcher",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Glider Shop",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Robo Wing",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "SawBlade",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Skull",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Star Wing",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Triple Fin",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Tuner",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Waving Flag",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Hazards",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "3 Billion",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "5B Flags",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "6 Billion",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Death Trap",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "DoYouLift",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Leaning Wing Of Pisa",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Live Glider",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "OG Rocket Thrusters",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Overdrive",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Snow Log",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Trade Sail",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Turning Key",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Kraken Attack",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Cyberpunk",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Stacked Cyberwing",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Aerial Support",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "GTR",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "RC Antenna",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Scythes",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Ski Wing",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "T Rex Bone",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Tank Wing",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Torero",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Torii Gate",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Travel Case",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Trophy Wings",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Vintage Wings",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Rally Spotlight",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Snake Guard",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "King",
    "cash_value": 150000,
    "duped_value": 150000
  },
  {
    "name": "Spares",
    "cash_value": 150000,
    "duped_value": 150000
  },
  {
    "name": "Carbonara",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Dragon Breath",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Flame Spitter",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Laser Wire",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Nitro Tank",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Skater Wing",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Tesla",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Trouble Wing",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Yarg Cap",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Brick Kar-1",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "BatWings",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Campout",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Harpoon",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Jailbreak Hills",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Meteor Magnet",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Native",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Racer",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Terminator",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Voxel",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Roblox R",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Wingo",
    "cash_value": 37000,
    "duped_value": 37000
  },
  {
    "name": "Park Bench",
    "cash_value": 30000,
    "duped_value": 30000
  },
  {
    "name": "Mark 5",
    "cash_value": 29900,
    "duped_value": 29900
  },
  {
    "name": "Dragster",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "Police That Way",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "Shogun",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "TailFin",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "VoltLine",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "Boomerang",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Racing Wing",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Tall Arch",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Tsutek",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Dual Wingbeat",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Arch",
    "cash_value": 15000,
    "duped_value": 15000
  },
  {
    "name": "Tiny Wing",
    "cash_value": 15000,
    "duped_value": 15000
  },
  {
    "name": "Box O Cash",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Eternal Flame",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Rocket",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "3 Lives",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Rally Lights",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Parrot",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Block Wing",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "Catch Me",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Classic",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "XRK Aero",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Bleeding Edge",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Classic Jet",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Reaper",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Ghost Catcher",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "King Reaper",
    "cash_value": null,
    "duped_value": null
  }
];

const textureData = [
  [
  {
    "name": "Checker",
    "cash_value": 41000000,
    "duped_value": 38000000
  },
  {
    "name": "Drip",
    "cash_value": 20000000,
    "duped_value": 20000000
  },
  {
    "name": "Snowstorm",
    "cash_value": 8000000,
    "duped_value": 8000000
  },
  {
    "name": "Galactic Carbon",
    "cash_value": 4000000,
    "duped_value": 4000000
  },
  {
    "name": "Earthquake",
    "cash_value": 3500000,
    "duped_value": 3500000
  },
  {
    "name": "Fire",
    "cash_value": 3000000,
    "duped_value": 3000000
  },
  {
    "name": "Black Ice",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Blue Pixel",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Winter Camo",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Old Town Road",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "Armor",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Manga",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Orange Pixel",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Tiger",
    "cash_value": 1500000,
    "duped_value": 1500000
  },
  {
    "name": "Pixel",
    "cash_value": 1250000,
    "duped_value": 1250000
  },
  {
    "name": "Berlin Graffiti",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Circuits",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Crimson Racer",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Earth",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Lightning",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "White Marble",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Bacon",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Camo Radar",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Digital Confetti",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Field",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Flaming",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Glowing Yellow",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Hotdog",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Money",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Wavy",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Aquatic",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Bandana",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Gulf",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Lava",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Superstar",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Wooden Toy",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Carbon Fire",
    "cash_value": 325000,
    "duped_value": 325000
  },
  {
    "name": "Aurora",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Comic Convict",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Ogre 2017",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Retrowave",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Road Hazard",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Star Spangled",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Touchdown",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Alpine Racer",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Blue Pixel Racer",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Snake Skin",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Buccaneer",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Vibrant Hologram",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "RobloxStud",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Camo Shark",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Dragon Scales",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Electronic",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Ladybug",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Peach",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Road Warrior",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Desert Camo",
    "cash_value": 80000,
    "duped_value": 80000
  },
  {
    "name": "Camo",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Classic Var 1",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Classic Var 3",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Nuclear Waste",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Racer",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Speed",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Watermelon",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "WireFrame",
    "cash_value": 45000,
    "duped_value": 45000
  },
  {
    "name": "Candy Cane",
    "cash_value": 40000,
    "duped_value": 40000
  },
  {
    "name": "Diamond",
    "cash_value": 40000,
    "duped_value": 40000
  },
  {
    "name": "Donut",
    "cash_value": 40000,
    "duped_value": 40000
  },
  {
    "name": "Galaxy",
    "cash_value": 40000,
    "duped_value": 40000
  },
  {
    "name": "Scorch",
    "cash_value": 40000,
    "duped_value": 40000
  },
  {
    "name": "Zebra",
    "cash_value": 40000,
    "duped_value": 40000
  },
  {
    "name": "Volcano",
    "cash_value": 39000,
    "duped_value": 39000
  },
  {
    "name": "Lines",
    "cash_value": 35000,
    "duped_value": 35000
  },
  {
    "name": "Volt",
    "cash_value": 35000,
    "duped_value": 35000
  },
  {
    "name": "Patchy Jeans",
    "cash_value": 30000,
    "duped_value": 30000
  },
  {
    "name": "LeEclair",
    "cash_value": 21000,
    "duped_value": 21000
  },
  {
    "name": "Ball",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Frit",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Galaxy Wave",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Ice",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Swirl",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Two Sided",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Prehistoric",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Taxi",
    "cash_value": 15000,
    "duped_value": 15000
  },
  {
    "name": "Frost",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Paint",
    "cash_value": 10000,
    "duped_value": 10000
  },
  {
    "name": "Classic Var 2",
    "cash_value": 4000,
    "duped_value": 4000
  },
  {
    "name": "Cow",
    "cash_value": 4000,
    "duped_value": 4000
  },
  {
    "name": "Rainbow",
    "cash_value": 4000,
    "duped_value": 4000
  },
  {
    "name": "Police",
    "cash_value": 2000,
    "duped_value": 2000
  },
  {
    "name": "Creator",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Deep Purple Flame",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Nascar Hauler",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Swat Graffiti",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Cracky4",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Chilling",
    "cash_value": null,
    "duped_value": null
  }
];

const tireData = [
  [
  {
    "name": "Blue 50",
    "cash_value": 10000000,
    "duped_value": 10000000
  },
  {
    "name": "Red 50",
    "cash_value": 3000000,
    "duped_value": 3000000
  },
  {
    "name": "Jailbreak Army",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Japanese",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Blue S3",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Nascar 75th",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "3 Billion",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "80s Style",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Kanagawa",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Red S3",
    "cash_value": 750000,
    "duped_value": 750000
  },
  {
    "name": "Arch9000 Glow",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Buoy",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Champion",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Flags Of Europe",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Tokyo",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Lightning",
    "cash_value": 190000,
    "duped_value": 190000
  },
  {
    "name": "Construction",
    "cash_value": 60000,
    "duped_value": 60000
  },
  {
    "name": "Speed",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "USA",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Skull And Sails",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Badonuts",
    "cash_value": 35000,
    "duped_value": 35000
  },
  {
    "name": "Tracer",
    "cash_value": 35000,
    "duped_value": 35000
  },
  {
    "name": "Leap Year",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "Radar",
    "cash_value": 25000,
    "duped_value": 25000
  },
  {
    "name": "Crash Nation",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Criminal",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "DatBrian",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "DenisDaily",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "JBMS",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Jailbreak",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "KraoESP",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "KreekCraft",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Line",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "MyUsernamesThis",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "NoobFreak",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Phindr",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Police",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Thin",
    "cash_value": 20000,
    "duped_value": 20000
  },
  {
    "name": "Parisian",
    "cash_value": 12500,
    "duped_value": 12500
  },
  {
    "name": "Jungle Mosaic",
    "cash_value": 5000,
    "duped_value": 5000
  },
  {
    "name": "Flat Black",
    "cash_value": 1000,
    "duped_value": 1000
  },
  {
    "name": "HelloItsVG",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Nascar",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Insert Coin",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "HungrySnake",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "MCL36",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "laughability",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Jade Glow",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "SFOTH",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Thing",
    "cash_value": null,
    "duped_value": null
  }
];

const tireStyleData = [
  [
  {
    "name": "Spiked",
    "cash_value": 8000000,
    "duped_value": 8000000
  },
  {
    "name": "Brickset",
    "cash_value": 3500000,
    "duped_value": 3500000
  },
  {
    "name": "Snow Chain",
    "cash_value": 3000000,
    "duped_value": 3000000
  },
  {
    "name": "Snow Trail",
    "cash_value": 2500000,
    "duped_value": 2500000
  },
  {
    "name": "Donut",
    "cash_value": 2000000,
    "duped_value": 2000000
  },
  {
    "name": "America",
    "cash_value": 1000000,
    "duped_value": 1000000
  },
  {
    "name": "Glacier",
    "cash_value": 500000,
    "duped_value": 500000
  },
  {
    "name": "Rollerblade",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Rok",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Magmatic Glow",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "Radial Red",
    "cash_value": 250000,
    "duped_value": 250000
  },
  {
    "name": "R-Tracer",
    "cash_value": 175000,
    "duped_value": 175000
  },
  {
    "name": "Cheese Burger",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Jungle Ruins",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "R2008",
    "cash_value": 100000,
    "duped_value": 100000
  },
  {
    "name": "Safari",
    "cash_value": 75000,
    "duped_value": 75000
  },
  {
    "name": "Trail Trek",
    "cash_value": 50000,
    "duped_value": 50000
  },
  {
    "name": "Classic Sport",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Classic Thick",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Classic",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Monster",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Offroad",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Treaded Sport",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Treaded Thick",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Treaded",
    "cash_value": null,
    "duped_value": null
  },
  {
    "name": "Studded",
    "cash_value": null,
    "duped_value": null
  }
];

const db = {
    "Vehicle": vehicleData,
    "Weapon Skin": weaponSkinData,
    "Hyperchromes": hyperchromeData,
    "Body Color": bodyColorData,
    "Drift": driftData,
    "Furniture": furnitureData,
    "Horns": hornData,
    "Rims": rimData,
    "Spoilers": spoilerData,
    "Textures": textureData,
    "Tires": tireData,
    "Tire Style": tireStyleData 
};
