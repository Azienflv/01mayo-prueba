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
    child: 55,
    times: ["7:00 AM", "8:00 AM"],
    file: "excursions/saona/saona-vip.html"
  },
  {
    family: "saona",
    id: "saona-luxury",
    name: "Saona Luxury",
    adult: 139,
    child: 70,
    times: ["7:00 AM", "8:00 AM"],
    file: "excursions/saona/saona-luxury.html"
  },

  // BUGGIES
  {
    family: "buggies",
    id: "buggies-classic",
    name: "Buggies Classic",
    adult: 65,
    child: 40,
    times: ["8:00 AM", "10:00 AM", "2:00 PM"],
    file: "excursions/buggies/buggies-classic.html"
  },
  {
    family: "buggies",
    id: "buggies-prime",
    name: "Buggies Prime",
    adult: 79,
    child: 45,
    times: ["8:00 AM", "10:00 AM", "2:00 PM"],
    file: "excursions/buggies/buggies-prime.html"
  },
  {
    family: "buggies",
    id: "buggies-night",
    name: "Buggies Night",
    adult: 89,
    child: 50,
    times: ["6:00 PM", "7:00 PM"],
    file: "excursions/buggies/buggies-night.html"
  },
  {
    family: "buggies",
    id: "buggies-blast",
    name: "Buggies Blast",
    adult: 95,
    child: 55,
    times: ["8:00 AM", "11:00 AM", "3:00 PM"],
    file: "excursions/buggies/buggies-blast.html"
  },

  // SAMANA
  {
    family: "samana",
    id: "samana-cayo-levantado",
    name: "Samaná & Cayo Levantado",
    adult: 110,
    child: 65,
    times: ["6:30 AM", "7:00 AM"],
    file: "excursions/samana/samana-cayo-levantado.html"
  },
  {
    family: "samana",
    id: "samana-cayo-limon",
    name: "Samaná + Cayo + El Limón",
    adult: 125,
    child: 75,
    times: ["6:30 AM", "7:00 AM"],
    file: "excursions/samana/samana-cayo-limon.html"
  },
  {
    family: "samana",
    id: "samana-cayo-ballenas",
    name: "Samaná + Whale Watching",
    adult: 135,
    child: 80,
    times: ["6:00 AM", "6:30 AM"],
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

  // MONKEYLAND
  {
    family: "monkeyland",
    id: "monkey-land",
    name: "Monkey Land",
    adult: 75,
    child: 45,
    times: ["8:00 AM", "1:00 PM"],
    file: "excursions/monkeyland/monkey-land.html"
  },
  {
    family: "monkeyland",
    id: "double-adventure",
    name: "Double Adventure",
    adult: 99,
    child: 60,
    times: ["8:00 AM", "1:00 PM"],
    file: "excursions/monkeyland/double-adventure.html"
  },
  {
    family: "monkeyland",
    id: "triple-adventure",
    name: "Triple Adventure",
    adult: 129,
    child: 75,
    times: ["8:00 AM", "1:00 PM"],
    file: "excursions/monkeyland/triple-adventure.html"
  },

  // COCO BONGO
  {
    family: "cocobongo",
    id: "cocobongo-regular",
    name: "Coco Bongo Regular",
    adult: 75,
    child: 75,
    times: ["8:00 PM", "9:00 PM"],
    file: "excursions/cocobongo/regular.html"
  },
  {
    family: "cocobongo",
    id: "cocobongo-gold-member",
    name: "Coco Bongo Gold Member",
    adult: 95,
    child: 95,
    times: ["8:00 PM", "9:00 PM"],
    file: "excursions/cocobongo/gold-member.html"
  },
  {
    family: "cocobongo",
    id: "cocobongo-front-row",
    name: "Coco Bongo Front Row",
    adult: 130,
    child: 130,
    times: ["8:00 PM", "9:00 PM"],
    file: "excursions/cocobongo/front-row.html"
  },

  // BAVARO ADVENTURE
  {
    family: "bavaro-adventure",
    id: "full-pack-buggies",
    name: "Full Pack Buggies",
    adult: 109,
    child: 65,
    times: ["8:00 AM", "10:00 AM", "2:00 PM"],
    file: "excursions/bavaro-adventure/full-pack-buggies.html"
  },
  {
    family: "bavaro-adventure",
    id: "full-pack-terracota",
    name: "Full Pack Terracota",
    adult: 119,
    child: 70,
    times: ["8:00 AM", "10:00 AM", "2:00 PM"],
    file: "excursions/bavaro-adventure/full-pack-terracota.html"
  },
  {
    family: "bavaro-adventure",
    id: "splash-emotion",
    name: "Splash Emotion",
    adult: 89,
    child: 55,
    times: ["9:00 AM", "11:00 AM", "2:00 PM"],
    file: "excursions/bavaro-adventure/splash-emotion.html"
  },
  {
    family: "bavaro-adventure",
    id: "buggies-splash-emotion",
    name: "Buggies + Splash Emotion",
    adult: 129,
    child: 75,
    times: ["8:00 AM", "11:00 AM", "2:00 PM"],
    file: "excursions/bavaro-adventure/buggies-splash-emotion.html"
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

  // TOURS INDIVIDUALES
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
