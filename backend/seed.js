import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Admin from "./models/Admin.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import mongoose from "mongoose";
dotenv.config();

const toSlug = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")+"-"+Math.random().toString(36).slice(2,7);

const run = async () => {
  await connectDB();

  // Admin
  const email = process.env.ADMIN_EMAIL || "admin@aerexgroup.com";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const existing = await Admin.findOne({ email });
  if (!existing) { await Admin.create({ name:"AEREX Admin", email, password }); console.log(`Admin: ${email} / ${password}`); }
  else {
    existing.password = password;
    await existing.save();
    console.log(`Admin credentials updated: ${email}`);
  }

  // Categories
  const categoryData = [
    { name:"HVAC Equipment", slug:"hvac-equipment" },
    { name:"HVAC Spare Parts", slug:"hvac-spare-parts" },
    { name:"Air Filtration Solutions", slug:"air-filtration-solutions" },
    { name:"Industrial Consumables", slug:"industrial-consumables" },
    { name:"Industrial Safety Products (PPE)", slug:"industrial-safety-products-ppe" },
    { name:"Tools & Maintenance Equipment", slug:"tools-maintenance-equipment" },
    { name:"Ventilation Products", slug:"ventilation-products" },
    { name:"Fire Protection Systems", slug:"fire-protection-systems" },
    { name:"Electrical Solutions", slug:"electrical-solutions" },
    { name:"Rope Access & Height Safety", slug:"rope-access-height-safety" },
  ];
  for (const c of categoryData) {
    const exists = await Category.findOne({ slug: c.slug });
    if (!exists) await Category.create(c);
  }
  console.log("10 categories seeded.");

  // Fetch category IDs
  const cats = {};
  for (const c of categoryData) {
    const doc = await Category.findOne({ slug: c.slug });
    cats[c.slug] = doc._id;
  }

  // Products
  const products = [
    // HVAC Equipment
    { name:"Air Handling Unit (AHU)", brand:"Carrier", category:cats["hvac-equipment"], shortDescription:"High-performance air handling unit for commercial and industrial HVAC systems.", description:"Designed for large commercial and industrial applications, this AHU delivers efficient air conditioning, ventilation, and filtration. Built to perform reliably in Gulf climate conditions.", specifications:[{key:"Type",value:"Central AHU"},{key:"Capacity",value:"5,000 – 50,000 CFM"},{key:"Application",value:"Commercial / Industrial"},{key:"Drive Type",value:"Variable Speed Drive"}], featured:true, inStock:true },
    { name:"Fan Coil Unit (FCU)", brand:"Daikin", category:cats["hvac-equipment"], shortDescription:"Compact fan coil unit for efficient room-level temperature control.", description:"Fan coil units provide precise temperature control in individual rooms or zones. Suitable for hotels, offices, hospitals, and residential projects.", specifications:[{key:"Capacity",value:"200 – 2,000 CFM"},{key:"Type",value:"Horizontal / Vertical"},{key:"Coil",value:"2-Pipe / 4-Pipe"}], featured:true, inStock:true },
    { name:"Cassette Air Conditioner", brand:"Mitsubishi Electric", category:cats["hvac-equipment"], shortDescription:"Ceiling cassette AC unit for even air distribution across large spaces.", description:"The cassette unit is installed in the ceiling and provides 360° air distribution. Ideal for retail, offices, and commercial spaces.", specifications:[{key:"Capacity",value:"1.5 Ton – 5 Ton"},{key:"Type",value:"4-Way Cassette"},{key:"Refrigerant",value:"R410A"}], featured:true, inStock:true },
    { name:"Floor Standing Unit", brand:"Carrier", category:cats["hvac-equipment"], shortDescription:"Floor-mounted AC unit for powerful cooling in large commercial areas.", description:"Floor standing units are ideal where ceiling space is limited. Delivers high cooling capacity with quiet operation, suitable for showrooms, server rooms, and commercial spaces.", specifications:[{key:"Capacity",value:"2 Ton – 10 Ton"},{key:"Mounting",value:"Floor Standing"},{key:"Refrigerant",value:"R410A"}], inStock:true },
    { name:"Window Air Conditioner", brand:"General", category:cats["hvac-equipment"], shortDescription:"Self-contained window AC for residential and light commercial use.", description:"Easy to install and maintain, window AC units are ideal for single rooms and small commercial spaces. Energy efficient with quiet operation.", specifications:[{key:"Capacity",value:"1 Ton – 2.5 Ton"},{key:"Type",value:"Window Mounted"},{key:"Voltage",value:"220V / 50Hz"}], inStock:true },
    { name:"Portable Air Conditioner", brand:"Honeywell", category:cats["hvac-equipment"], shortDescription:"Mobile AC unit requiring no permanent installation.", description:"Portable AC units can be moved from room to room with no installation required. Perfect for spot cooling, temporary setups, and spaces where fixed units aren't possible.", specifications:[{key:"Capacity",value:"1 Ton – 2 Ton"},{key:"Type",value:"Portable / Freestanding"}], inStock:true },
    { name:"DX Split Unit", brand:"Daikin", category:cats["hvac-equipment"], shortDescription:"Direct expansion split system for residential and commercial cooling.", description:"Split system DX units offer high efficiency cooling with easy installation. Available in wall-mounted, cassette, and ducted configurations.", specifications:[{key:"Capacity",value:"1 Ton – 5 Ton"},{key:"Type",value:"Wall Split / Multi-Split"},{key:"Refrigerant",value:"R32 / R410A"}], featured:true, inStock:true },
    { name:"Air Curtain", brand:"Systemair", category:cats["hvac-equipment"], shortDescription:"High-velocity air curtain for entrances to maintain indoor climate.", description:"Air curtains create an invisible barrier of air over doorways, preventing insects, dust, and temperature transfer between indoor and outdoor environments.", specifications:[{key:"Width",value:"1m – 3m"},{key:"Air Velocity",value:"High / Medium"},{key:"Mounting",value:"Ceiling / Recessed"}], inStock:true },
    { name:"Evaporative Air Cooler", brand:"General", category:cats["hvac-equipment"], shortDescription:"Energy-efficient evaporative cooler for large industrial spaces.", description:"Evaporative coolers use water evaporation to cool air, consuming up to 80% less energy than traditional AC. Ideal for warehouses, factories, and outdoor areas.", specifications:[{key:"Capacity",value:"10,000 – 30,000 CFM"},{key:"Power",value:"Low Energy"},{key:"Water Tank",value:"60 – 200 Liters"}], inStock:true },

    // HVAC Spare Parts
    { name:"Compressor (Scroll Type)", brand:"Copeland", category:cats["hvac-spare-parts"], shortDescription:"Scroll compressor for residential and commercial air conditioning systems.", description:"Copeland scroll compressors are the industry standard for reliability and efficiency. Compatible with R22, R410A, and R32 refrigerant systems.", specifications:[{key:"Type",value:"Scroll Compressor"},{key:"Capacity",value:"1 HP – 20 HP"},{key:"Refrigerant",value:"R22 / R410A / R32"}], featured:true, inStock:true },
    { name:"Refrigerant R410A", brand:"Honeywell", category:cats["hvac-spare-parts"], shortDescription:"R410A refrigerant cylinder for AC charging and leak top-up.", description:"R410A is the most widely used refrigerant for modern split and VRF systems. Supplied in standard cylinders, suitable for all major AC brands.", specifications:[{key:"Type",value:"HFC Refrigerant"},{key:"Cylinder Size",value:"11.3 kg"},{key:"ODP",value:"Zero"}], inStock:true },
    { name:"Refrigerant R32", brand:"Honeywell", category:cats["hvac-spare-parts"], shortDescription:"R32 next-generation refrigerant — lower GWP, higher efficiency.", description:"R32 is increasingly used in new generation AC systems due to its lower global warming potential compared to R410A, while delivering improved efficiency.", specifications:[{key:"Type",value:"HFC Refrigerant"},{key:"Cylinder Size",value:"10 kg"},{key:"GWP",value:"675 (vs 2088 for R410A)"}], inStock:true },
    { name:"Refrigerant R134a", brand:"Honeywell", category:cats["hvac-spare-parts"], shortDescription:"R134a refrigerant for automotive and commercial refrigeration systems.", description:"R134a is widely used in automotive AC systems, refrigeration, and some older commercial AC units. Available in standard service cylinders.", specifications:[{key:"Type",value:"HFC Refrigerant"},{key:"Cylinder Size",value:"13.6 kg"}], inStock:true },
    { name:"Condenser Fan Motor", brand:"Carrier", category:cats["hvac-spare-parts"], shortDescription:"Replacement condenser fan motor for outdoor AC units.", description:"High-quality replacement motors for condenser coil fans. Compatible with most major brands. Thermal overload protection included.", specifications:[{key:"Power",value:"1/5 HP – 1 HP"},{key:"Speed",value:"1000 – 1500 RPM"},{key:"Voltage",value:"220V / 380V"}], inStock:true },
    { name:"Copper Pipe & Fittings", brand:"Armstrong", category:cats["hvac-spare-parts"], shortDescription:"Refrigeration-grade copper pipe and fittings for AC installation.", description:"High-purity dehydrated copper pipes and fittings for refrigerant lines. Available in various diameters for all AC system sizes.", specifications:[{key:"Diameter",value:"1/4\" – 1.5\""},{key:"Grade",value:"Refrigeration Grade"},{key:"Standard",value:"ASTM B280"}], inStock:true },

    // Air Filtration
    { name:"General HVAC Filter", brand:"Systemair", category:cats["air-filtration-solutions"], shortDescription:"Standard panel filter for AHU and FCU units — G4 grade.", description:"Standard disposable filters for air handling units and fan coil units. Effective against dust, pollen, and coarse particles.", specifications:[{key:"Grade",value:"G4 (Coarse)"},{key:"Sizes",value:"Custom / Standard"},{key:"Frame",value:"Cardboard / Galvanized"}], inStock:true },
    { name:"Activated Carbon Filter", brand:"Honeywell", category:cats["air-filtration-solutions"], shortDescription:"Activated carbon filter for odour and VOC removal in HVAC systems.", description:"Activated carbon filters remove odours, VOCs, and chemical contaminants from air streams. Essential for kitchens, hospitals, labs, and industrial facilities.", specifications:[{key:"Grade",value:"Carbon / Molecular"},{key:"Application",value:"Odour & VOC Removal"},{key:"Media",value:"Granular Activated Carbon"}], inStock:true },

    // PPE
    { name:"Full Body Safety Harness", brand:"Vaultex", category:cats["industrial-safety-products-ppe"], shortDescription:"EN361 full body harness for fall arrest and work positioning.", description:"Designed for work at height, this full body harness meets EN361 standards. Features padded shoulder and leg straps, multiple attachment points, and quick-release buckles.", specifications:[{key:"Standard",value:"EN361 / ANSI Z359"},{key:"Material",value:"Polyester Webbing"},{key:"Size",value:"Universal (S-XL)"}], featured:true, inStock:true },
    { name:"Hard Hat Safety Helmet", brand:"Vaultex", category:cats["industrial-safety-products-ppe"], shortDescription:"Class A & E rated safety helmet for construction and industrial use.", description:"Lightweight HDPE hard hat with 6-point suspension system. Provides protection against falling objects, electrical hazards, and lateral impact.", specifications:[{key:"Standard",value:"EN397 / ANSI Z89.1"},{key:"Material",value:"HDPE"},{key:"Class",value:"A & E"}], inStock:true },
    { name:"Safety Gloves (Cut Resistant)", brand:"Vaultex", category:cats["industrial-safety-products-ppe"], shortDescription:"Level 5 cut-resistant gloves for handling sharp materials.", description:"High-performance cut-resistant gloves with HPPE liner and foam nitrile coating. Provides excellent grip in wet and dry conditions.", specifications:[{key:"Cut Level",value:"Level 5 (EN388)"},{key:"Coating",value:"Foam Nitrile"},{key:"Sizes",value:"S / M / L / XL"}], inStock:true },
    { name:"Safety Boots (Steel Toe)", brand:"Workland", category:cats["industrial-safety-products-ppe"], shortDescription:"S3-rated steel toe safety boots with anti-slip sole.", description:"Durable leather safety boots with steel toe cap, midsole protection, and energy-absorbing heel. Anti-static and oil-resistant sole.", specifications:[{key:"Standard",value:"EN ISO 20345 S3"},{key:"Toe Cap",value:"Steel"},{key:"Sole",value:"Anti-Slip / Oil Resistant"}], inStock:true },
    { name:"Safety Glasses", brand:"M2 Safety", category:cats["industrial-safety-products-ppe"], shortDescription:"Wrap-around safety glasses with UV protection.", description:"Lightweight polycarbonate safety glasses with wraparound frame for maximum eye protection. Anti-scratch and anti-fog coated lens.", specifications:[{key:"Standard",value:"EN166 / ANSI Z87.1"},{key:"Lens",value:"Polycarbonate / Anti-Fog"}], inStock:true },
    { name:"N95 Respirator Mask", brand:"M2 Safety", category:cats["industrial-safety-products-ppe"], shortDescription:"N95 / FFP2 particulate respirator for dust and aerosol protection.", description:"Foldable N95 respirator with exhalation valve. Filters at least 95% of airborne particles. Suitable for construction, painting, and industrial environments.", specifications:[{key:"Standard",value:"N95 / FFP2"},{key:"Filter Efficiency",value:"≥95%"},{key:"Type",value:"Foldable with Valve"}], inStock:true },
    { name:"Hi-Vis Safety Vest", brand:"Vaultex", category:cats["industrial-safety-products-ppe"], shortDescription:"EN ISO 20471 Class 2 high visibility vest.", description:"Bright yellow/orange safety vest with retroreflective tape strips for visibility in low-light conditions. Lightweight mesh construction for breathability.", specifications:[{key:"Standard",value:"EN ISO 20471 Class 2"},{key:"Material",value:"Polyester Mesh"},{key:"Reflective Tape",value:"50mm wide"}], inStock:true },

    // Tools
    { name:"Pressure Washer", brand:"Uken", category:cats["tools-maintenance-equipment"], shortDescription:"High-pressure washer for HVAC coil cleaning and maintenance.", description:"Electric pressure washer ideal for cleaning condenser coils, AHU components, kitchen exhaust fans, and general industrial surfaces.", specifications:[{key:"Pressure",value:"100 – 150 Bar"},{key:"Flow Rate",value:"6 – 10 L/min"},{key:"Power",value:"1500W – 2200W"}], featured:true, inStock:true },
    { name:"Industrial Wet & Dry Vacuum", brand:"Uken", category:cats["tools-maintenance-equipment"], shortDescription:"Heavy-duty vacuum for water and debris collection.", description:"Industrial-grade vacuum cleaner for collecting water, dust, and debris during maintenance and cleaning operations. Suitable for HVAC, drainage, and kitchen exhaust work.", specifications:[{key:"Tank Capacity",value:"20 – 50 Liters"},{key:"Suction Power",value:"1200W – 2000W"},{key:"Type",value:"Wet & Dry"}], inStock:true },
    { name:"Power Tool Set", brand:"Uken", category:cats["tools-maintenance-equipment"], shortDescription:"Complete professional power tool kit for HVAC and maintenance work.", description:"Includes cordless drill, jigsaw, circular saw, and grinder. All tools feature ergonomic handles, overload protection, and long battery life.", specifications:[{key:"Voltage",value:"18V / 20V Cordless"},{key:"Battery",value:"Li-Ion 4.0Ah"},{key:"Pieces",value:"5-Tool Combo Kit"}], inStock:true },
    { name:"Aluminium Step Ladder", brand:"Uken", category:cats["tools-maintenance-equipment"], shortDescription:"Lightweight aluminium ladder for maintenance and installation work.", description:"Non-conductive aluminium step ladder with anti-slip rubber feet and safety lock mechanism. Suitable for HVAC installation, maintenance, and electrical work.", specifications:[{key:"Height",value:"4ft – 12ft"},{key:"Material",value:"Aluminium"},{key:"Load Capacity",value:"150 kg"}], inStock:true },

    // Ventilation
    { name:"Flexible Duct", brand:"Systemair", category:cats["ventilation-products"], shortDescription:"Insulated flexible duct for HVAC air distribution.", description:"Aluminium wire helix flexible duct with fibreglass insulation and mylar outer jacket. For connecting AHU outlets to diffusers and grilles.", specifications:[{key:"Diameter",value:"4\" – 20\""},{key:"Insulation",value:"R-4.2 / R-6"},{key:"Length",value:"5m / 10m rolls"}], inStock:true },
    { name:"Air Diffuser", brand:"Systemair", category:cats["ventilation-products"], shortDescription:"Ceiling supply air diffuser for uniform air distribution.", description:"Square and round ceiling diffusers for supply air in commercial buildings. Adjustable core for directional airflow control.", specifications:[{key:"Type",value:"Square / Round"},{key:"Sizes",value:"150mm – 600mm"},{key:"Material",value:"Aluminium / Steel"}], inStock:true },
    { name:"Linear Bar Grille", brand:"Systemair", category:cats["ventilation-products"], shortDescription:"Linear bar grilles for supply and return air applications.", description:"Fixed and adjustable bar grilles for wall or ceiling installation. Powder-coated aluminium construction for durability.", specifications:[{key:"Type",value:"Fixed / Adjustable"},{key:"Material",value:"Aluminium"},{key:"Finish",value:"Powder Coated"}], inStock:true },
    { name:"Access Panel", brand:"Systemair", category:cats["ventilation-products"], shortDescription:"Steel access panel for maintenance access to concealed HVAC components.", description:"Flush-mounted steel access panels for walls and ceilings. Provides quick access to valves, dampers, and other concealed services.", specifications:[{key:"Sizes",value:"300x300 to 600x600mm"},{key:"Material",value:"Galvanised Steel"},{key:"Insulation",value:"Optional"}], inStock:true },

    // Fire Protection
    { name:"Portable Fire Extinguisher (CO2)", brand:"BOS Safety", category:cats["fire-protection-systems"], shortDescription:"CO2 fire extinguisher for electrical and Class B fires.", description:"Carbon dioxide extinguishers are effective on electrical fires and flammable liquid fires without leaving residue. Suitable for server rooms, control panels, and laboratories.", specifications:[{key:"Type",value:"CO2"},{key:"Capacity",value:"2 kg / 5 kg"},{key:"Class",value:"B & Electrical"}], featured:true, inStock:true },
    { name:"Smoke Detector", brand:"Honeywell", category:cats["fire-protection-systems"], shortDescription:"Addressable photoelectric smoke detector for fire detection systems.", description:"Addressable photoelectric smoke detector compatible with all major fire alarm control panels. Low standby current and built-in short circuit isolator.", specifications:[{key:"Type",value:"Photoelectric / Addressable"},{key:"Standard",value:"EN54-7"},{key:"Operating Voltage",value:"17-28V DC"}], inStock:true },
    { name:"Sprinkler Head", brand:"BOS Safety", category:cats["fire-protection-systems"], shortDescription:"Pendant and upright sprinkler heads for fire suppression systems.", description:"Standard response and quick response sprinkler heads for commercial and industrial fire suppression systems. Available in multiple temperature ratings.", specifications:[{key:"Type",value:"Pendant / Upright"},{key:"Temperature",value:"68°C / 93°C / 141°C"},{key:"Standard",value:"EN12259 / UL"}], inStock:true },

    // Electrical
    { name:"Fire Rated Cable (FRC)", brand:"Armstrong", category:cats["electrical-solutions"], shortDescription:"Fire resistant cable maintaining circuit integrity in fire conditions.", description:"Fire rated cables maintain circuit integrity for a minimum of 60/120 minutes in fire conditions. Essential for fire alarms, emergency lighting, and smoke control systems.", specifications:[{key:"Standard",value:"BS6387 / IEC60332"},{key:"Core",value:"2C / 3C / 4C"},{key:"Size",value:"1.5mm² – 6mm²"}], inStock:true },
    { name:"Junction Box (Weatherproof)", brand:"Armstrong", category:cats["electrical-solutions"], shortDescription:"IP65-rated weatherproof junction box for outdoor and industrial wiring.", description:"Polycarbonate junction boxes with IP65 rating for outdoor electrical connections. UV-resistant and corrosion-proof, suitable for UAE climate conditions.", specifications:[{key:"IP Rating",value:"IP65"},{key:"Material",value:"Polycarbonate"},{key:"Sizes",value:"100x100 – 300x300mm"}], inStock:true },

    // Rope Access
    { name:"Full Body Harness (Rope Access)", brand:"Miller", category:cats["rope-access-height-safety"], shortDescription:"EN361/EN358 harness for rope access and work positioning.", description:"Purpose-designed rope access harness with front, rear, and sternal attachment points. Padded construction for comfort during extended use at height.", specifications:[{key:"Standard",value:"EN361 / EN358 / IRATA"},{key:"Attachments",value:"Chest, Dorsal, Side"},{key:"Material",value:"Polyester Webbing"}], featured:true, inStock:true },
    { name:"Static Rope 11mm", brand:"Miller", category:cats["rope-access-height-safety"], shortDescription:"11mm low-stretch kernmantle rope for rope access work lines.", description:"Static low-elongation kernmantle rope for rope access main and safety lines. Excellent abrasion resistance and UV stability.", specifications:[{key:"Diameter",value:"11mm"},{key:"Type",value:"Static / Low Stretch"},{key:"Standard",value:"EN1891 Type A"},{key:"MBS",value:">30 kN"}], inStock:true },
    { name:"Descender (Stop Device)", brand:"Miller", category:cats["rope-access-height-safety"], shortDescription:"Self-braking descender for controlled descent on ropes.", description:"Anti-panic function descender with handle for controlled descent. Simple one-hand operation with automatic braking when handle is released.", specifications:[{key:"Standard",value:"EN341 Class A"},{key:"Rope Compatibility",value:"10.5mm – 11mm"},{key:"MBS",value:">15 kN"}], inStock:true },
    { name:"Carabiner (Locking Screw Gate)", brand:"BOS Safety", category:cats["rope-access-height-safety"], shortDescription:"Aluminium screw gate carabiner for rope access connections.", description:"Oval and D-shape aluminium carabiners with manual screw gate locking. Suitable for connecting lanyards, pulleys, and rope access equipment.", specifications:[{key:"Standard",value:"EN362 / EN12275"},{key:"Material",value:"Aluminium Alloy"},{key:"Gate Opening",value:"18mm"},{key:"MBS",value:">25 kN"}], inStock:true },

    // Industrial Consumables
    { name:"WD-40 Maintenance Spray", brand:"WD-40", category:cats["industrial-consumables"], shortDescription:"Multi-use maintenance spray — lubricates, cleans, and protects.", description:"The original WD-40 formula displaces moisture, prevents rust, lubricates moving parts, and cleans grease. Essential for HVAC maintenance and industrial use.", specifications:[{key:"Volume",value:"300ml / 450ml / 5L"},{key:"Use",value:"Lubrication / Rust Prevention"},{key:"Application",value:"Spray / Bulk"}], inStock:true },
    { name:"Industrial Degreaser", brand:"WD-40", category:cats["industrial-consumables"], shortDescription:"Heavy-duty degreaser for HVAC coils, motors, and industrial equipment.", description:"Fast-acting non-flammable degreaser that removes oil, grease, and grime from HVAC components, condenser coils, and mechanical equipment.", specifications:[{key:"Volume",value:"500ml / 5L / 20L"},{key:"Type",value:"Non-Flammable / Water-Based"},{key:"Use",value:"HVAC & Industrial Cleaning"}], inStock:true },
  ];

  let created = 0;
  for (const p of products) {
    const exists = await Product.findOne({ name: p.name, category: p.category });
    if (!exists) {
      await Product.create({ ...p, slug: toSlug(p.name) });
      created++;
    }
  }
  console.log(`${created} products seeded (${products.length - created} already existed).`);

  await mongoose.disconnect();
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
