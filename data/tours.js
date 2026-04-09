const MASTER_TOURS = [

  // SAONA
  {
    family: "saona",
    id: "saona-classic",
    name: "Saona Classic",
    adult: 89,
    child: 45,
    times: ["7:00 AM", "8:00 AM", "9:00 AM"],
    file: "excursions/saona/saona-classic.html"
  },
  {
    family: "saona",
    id: "saona-vip",
    name: "Saona VIP",
    adult: 109,
    child: 65,
    times: ["7:00 AM", "8:00 AM"],
    file: "excursions/saona/saona-vip.html"
  },
  {
    family: "saona",
    id: "saona-luxury",
    name: "Saona Luxury",
    adult: 129,
    child: 85,
    times: ["7:00 AM"],
    file: "excursions/saona/saona-luxury.html"
  },

  // BUGGIES
  {
    family: "buggies",
    id: "buggies-full-pack",
    name: "Full Pack Buggies",
    adult: 75,
    child: 50,
    times: ["9:00 AM", "1:00 PM"],
    file: "excursions/buggies/full-pack-buggies.html"
  },
  {
    family: "buggies",
    id: "buggies-terracota",
    name: "Full Pack Terracota",
    adult: 80,
    child: 55,
    times: ["9:00 AM", "1:00 PM"],
    file: "excursions/buggies/terracota.html"
  },
  {
    family: "buggies",
    id: "buggies-splash",
    name: "Splash Emotion",
    adult: 85,
    child: 60,
    times: ["9:00 AM", "1:00 PM"],
    file: "excursions/buggies/splash-emotion.html"
  },
  {
    family: "buggies",
    id: "buggies-combo",
    name: "Buggies + Splash Emotion",
    adult: 95,
    child: 65,
    times: ["9:00 AM", "1:00 PM"],
    file: "excursions/buggies/buggies-splash.html"
  },

  // SAMANA
  {
    family: "samana",
    id: "samana-cayo",
    name: "Samaná & Cayo Levantado",
    adult: 130,
    child: 85,
    times: ["7:00 AM"],
    file: "excursions/samana/samana-cayo.html"
  },
  {
    family: "samana",
    id: "samana-limon",
    name: "Samaná + El Limón",
    adult: 140,
    child: 95,
    times: ["7:00 AM"],
    file: "excursions/samana/samana-cayo-limon.html"
  },
  {
    family: "samana",
    id: "samana-whales",
    name: "Samaná + Whales",
    adult: 150,
    child: 100,
    times: ["7:00 AM"],
    file: "excursions/samana/samana-cayo-ballenas.html"
  },

  // DOLPHIN
  {
    family: "dolphin",
    id: "dolphin-encounter",
    name: "Dolphin Encounter",
    adult: 99,
    child: 79,
    times: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
    file: "excursions/dolphin/dolphin-encounter.html"
  },
  {
    family: "dolphin",
    id: "dolphin-swim",
    name: "Dolphin Swim",
    adult: 129,
    child: 99,
    times: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
    file: "excursions/dolphin/swim.html"
  },
  {
    family: "dolphin",
    id: "dolphin-royal-swim",
    name: "Dolphin Royal Swim",
    adult: 159,
    child: 129,
    times: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
    file: "excursions/dolphin/royal-swim.html"
  },

  // DOMITAI
  {
    family: "domitai",
    id: "domitai-park",
    name: "Domitai Park",
    adult: 89,
    child: 55,
    times: ["8:00 AM", "10:00 AM", "2:00 PM"],
    file: "excursions/domitai/domitai-park.html"
  },
  {
    family: "domitai",
    id: "fusion-zipline",
    name: "Fusion Zipline",
    adult: 95,
    child: 60,
    times: ["8:00 AM", "10:00 AM", "2:00 PM"],
    file: "excursions/domitai/fusion-zipline.html"
  },
  {
    family: "domitai",
    id: "fusion-horse",
    name: "Fusion Horseback",
    adult: 85,
    child: 50,
    times: ["8:00 AM", "10:00 AM", "2:00 PM"],
    file: "excursions/domitai/fusion-horse.html"
  },

  // LAKE PARK
  {
    family: "lakepark",
    id: "aqua-adrenaline-pack",
    name: "Aqua Adrenaline Pack",
    adult: 95,
    child: 60,
    times: ["9:00 AM", "11:00 AM", "2:00 PM"],
    file: "excursions/lakepark/aqua-adrenaline-pack.html"
  },
  {
    family: "lakepark",
    id: "aqua-adventure-pack",
    name: "Aqua Adventure Pack",
    adult: 85,
    child: 55,
    times: ["9:00 AM", "11:00 AM", "2:00 PM"],
    file: "excursions/lakepark/aqua-adventure-pack.html"
  },
  {
    family: "lakepark",
    id: "aqua-splash-pack",
    name: "Aqua Splash Pack",
    adult: 75,
    child: 45,
    times: ["9:00 AM", "11:00 AM", "2:00 PM"],
    file: "excursions/lakepark/aqua-splash-pack.html"
  },

  // INDIVIDUALES
  {
    family: "single",
    id: "party-boat",
    name: "Party Boat",
    adult: 69,
    child: 49,
    times: ["10:00 AM", "1:00 PM", "4:00 PM"],
    file: "excursions/partyboat/index.html"
  },
  {
    family: "single",
    id: "safari-punta-cana",
    name: "Safari Punta Cana",
    adult: 65,
    child: 40,
    times: ["8:00 AM", "9:00 AM"],
    file: "excursions/safari/index.html"
  },
  {
    family: "single",
    id: "horseback-riding",
    name: "Horseback Riding",
    adult: 60,
    child: 40,
    times: ["8:00 AM", "10:00 AM", "2:00 PM"],
    file: "excursions/horseback/index.html"
  },
  {
    family: "single",
    id: "el-dorado-park",
    name: "El Dorado Park",
    adult: 70,
    child: 45,
    times: ["8:00 AM", "10:00 AM", "2:00 PM"],
    file: "excursions/eldorado/index.html"
  },
  {
    family: "single",
    id: "scape-park",
    name: "Scape Park",
    adult: 99,
    child: 65,
    times: ["8:00 AM", "10:00 AM"],
    file: "excursions/scape-park/index.html"
  },
  {
    family: "single",
    id: "santo-domingo-city-tour",
    name: "Santo Domingo City Tour",
    adult: 85,
    child: 55,
    times: ["7:00 AM", "8:00 AM"],
    file: "excursions/santo-domingo/index.html"
  }

];
