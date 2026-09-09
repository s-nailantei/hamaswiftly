// Database
const DB = {
    get: (key) => JSON.parse(localStorage.getItem(key)) || null,
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    users: () => DB.get('hs_users') || [],
    properties: () => DB.get('hs_properties') || [],
    currentUser: () => DB.get('hs_current_user'),
    favorites: () => DB.get('hs_favorites') || [],
    addUser: (user) => {
        const users = DB.users();
        users.push(user);
        DB.set('hs_users', users);
    },
    addProperty: (property) => {
        const props = DB.properties();
        props.push(property);
        DB.set('hs_properties', props);
    },
    deleteProperty: (id) => {
        const props = DB.properties().filter(p => p.id !== id);
        DB.set('hs_properties', props);
    },
    setCurrentUser: (user) => DB.set('hs_current_user', user),
    setFavorites: (favs) => DB.set('hs_favorites', favs)
};

// Default Nairobi properties - comprehensive coverage
const defaultProperties = [
    // WESTLANDS & UPPERMOUNTAIN
    {
        id: 1,
        title: "Modern 2BR Apartment in Westlands",
        address: "Westlands, Nairobi",
        area: "westlands",
        price: 65000,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        type: "apartment",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
        description: "Modern apartment near Sarit Centre. Features fitted kitchen, spacious living room, and 24/7 security. Walking distance to Westgate Mall and restaurants.",
        amenities: ["24/7 Security", "Parking", "Gym", "Swimming Pool", "CCTV", "Lift"],
        lat: -1.2673,
        lng: 36.8041,
        available: "Now",
        phone: "+254700100100",
        whatsapp: "+254700100100",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    // KAREN
    {
        id: 2,
        title: "Luxury 3BR House in Karen",
        address: "Karen, Nairobi",
        area: "karen",
        price: 150000,
        bedrooms: 3,
        bathrooms: 3,
        sqft: 3500,
        type: "house",
        lease: "annually",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
        images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"],
        description: "Beautiful family home in Karen with large compound. Features servant quarter, domestic staff rooms, perimeter wall, and borehole water.",
        amenities: ["Servant Quarter", "Borehole", "Perimeter Wall", "Garden", "Garage", "Fireplace"],
        lat: -1.3260,
        lng: 36.7025,
        available: "Now",
        phone: "+254700200200",
        whatsapp: "+254700200200",
        ownerId: "demo2",
        isPremium: true,
        createdAt: Date.now()
    },
    // KILIMANI
    {
        id: 3,
        title: "Cozy Bedsitter in Kilimani",
        address: "Kilimani, Nairobi",
        area: "kilimani",
        price: 18000,
        bedrooms: 0,
        bathrooms: 1,
        sqft: 300,
        type: "bedsitter",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
        images: ["https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800", "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800", "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800"],
        description: "Affordable bedsitter in prime Kilimani location. Near Yaya Centre, water and electricity included. Perfect for students and young professionals.",
        amenities: ["Water Included", "Electricity Included", "Security", "Close to Mall", "Public Transport"],
        lat: -1.2920,
        lng: 36.7860,
        available: "Now",
        phone: "+254700300300",
        whatsapp: "+254700300300",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    // LAVINGTON
    {
        id: 4,
        title: "Executive 1BR in Lavington",
        address: "Lavington, Nairobi",
        area: "lavington",
        price: 45000,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 800,
        type: "apartment",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
        description: "Executive apartment in quiet Lavington neighborhood. Fitted kitchen, spacious bedroom, and modern bathroom. Near Valley Arcade and schools.",
        amenities: ["Fitted Kitchen", "Parking", "Gated", "Near Schools", "Quiet Area", "Backup Water"],
        lat: -1.2833,
        lng: 36.7667,
        available: "Now",
        phone: "+254700400400",
        whatsapp: "+254700400400",
        ownerId: "demo2",
        isPremium: true,
        createdAt: Date.now()
    },
    // KITENGELA (OUTSKIRTS)
    {
        id: 5,
        title: "Spacious 4BR Maisonette in Kitengela",
        address: "Kitengela, Outskirts",
        area: "kitengela",
        price: 55000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2500,
        type: "maisonette",
        lease: "annually",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
        images: ["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"],
        description: "Beautiful maisonette in Kitengela with large compound. Perfect for families. Near Acacia Mall and schools. Affordable compared to city center.",
        amenities: ["Large Compound", "DSQ", "Parking", "Perimeter Wall", "Near Mall", "Schools Nearby"],
        lat: -1.4500,
        lng: 36.8500,
        available: "Next Month",
        phone: "+254700500500",
        whatsapp: "+254700500500",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    // CBD
    {
        id: 6,
        title: "Furnished Studio in CBD",
        address: "CBD, Nairobi",
        area: "cbd",
        price: 25000,
        bedrooms: 0,
        bathrooms: 1,
        sqft: 350,
        type: "studio",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800", "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"],
        description: "Fully furnished studio in the heart of Nairobi CBD. Ideal for business travelers. Near Nairobi Railway Station and City Market.",
        amenities: ["Furnished", "WiFi", "City Views", "Near Transport", "Shops Below", "24/7 Security"],
        lat: -1.2864,
        lng: 36.8172,
        available: "Now",
        phone: "+254700600600",
        whatsapp: "+254700600600",
        ownerId: "demo2",
        isPremium: true,
        createdAt: Date.now()
    },
    // RUIRU (OUTSKIRTS - THIKA ROAD)
    {
        id: 7,
        title: "3BR House in Ruiru",
        address: "Ruiru, Outskirts",
        area: "ruiru",
        price: 35000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1800,
        type: "house",
        lease: "annually",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800"],
        description: "Newly built house in Ruiru. Near Thika Superhighway for easy commute to Nairobi. Perfect for families looking for affordable housing.",
        amenities: ["New Construction", "Near Highway", "Parking", "Garden", "Schools Nearby", "Shopping Center"],
        lat: -1.1200,
        lng: 36.9300,
        available: "Now",
        phone: "+254700700700",
        whatsapp: "+254700700700",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    // HURLINGHAM
    {
        id: 8,
        title: "2BR Penthouse in Hurlingham",
        address: "Hurlingham, Nairobi",
        area: "hurlingham",
        price: 85000,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1500,
        type: "apartment",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"],
        description: "Luxury penthouse apartment with panoramic views. Near Nairobi CBD and Ngong Road. Premium finishes and smart home features.",
        amenities: ["City Views", "Smart Home", "Concierge", "Gym", "Rooftop", "Valet Parking"],
        lat: -1.2900,
        lng: 36.8000,
        available: "Now",
        phone: "+254700800800",
        whatsapp: "+254700800800",
        ownerId: "demo2",
        isPremium: true,
        createdAt: Date.now()
    },
    // PARKLANDS
    {
        id: 9,
        title: "1BR Apartment in Parklands",
        address: "Parklands, Nairobi",
        area: "parklands",
        price: 35000,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 700,
        type: "apartment",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
        images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
        description: "Well-maintained apartment in Parklands near Aga Khan Hospital. Close to Westlands and city center. Good transport links.",
        amenities: ["Near Hospital", "Parking", "Security", "Garden", "Near Shops", "Public Transport"],
        lat: -1.2650,
        lng: 36.8100,
        available: "Now",
        phone: "+254700900900",
        whatsapp: "+254700900900",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    // RUNDA
    {
        id: 10,
        title: "4BR Villa in Runda",
        address: "Runda, Nairobi",
        area: "runda",
        price: 250000,
        bedrooms: 4,
        bathrooms: 5,
        sqft: 5000,
        type: "house",
        lease: "annually",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"],
        description: "Exquisite villa in exclusive Runda estate. Diplomatic area with 24/7 security. Features swimming pool, tennis court, and large garden.",
        amenities: ["Swimming Pool", "Tennis Court", "Large Garden", "DSQ", "Electric Fence", "Borehole"],
        lat: -1.2200,
        lng: 36.8100,
        available: "Now",
        phone: "+254701000001",
        whatsapp: "+254701000001",
        ownerId: "demo2",
        isPremium: true,
        createdAt: Date.now()
    },
    // === AFFORDABLE HOUSING - EASTLANDS ===
    {
        id: 11,
        title: "Bedsitter in Umoja",
        address: "Umoja Estate, Nairobi",
        area: "eastlands",
        price: 8000,
        bedrooms: 0,
        bathrooms: 1,
        sqft: 250,
        type: "bedsitter",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
        images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800", "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800"],
        description: "Affordable bedsitter in Umoja Estate. Near Umoja Shopping Center and public transport. Water and electricity separate. Perfect for students.",
        amenities: ["Security", "Near Shops", "Public Transport", "Water Meter", "Schools Nearby"],
        lat: -1.2800,
        lng: 36.8800,
        available: "Now",
        phone: "+254701100110",
        whatsapp: "+254701100110",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    {
        id: 12,
        title: "1BR Apartment in Donholm",
        address: "Donholm, Nairobi",
        area: "eastlands",
        price: 12000,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 400,
        type: "apartment",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
        description: "Spacious 1BR in Donholm Phase 5. Near Jogoo Road, shopping centers, and matatu stage. Good for commuters working in CBD.",
        amenities: ["Near Matatu Stage", "Shopping Center", "Security", "Parking", "Schools Nearby"],
        lat: -1.2850,
        lng: 36.8750,
        available: "Now",
        phone: "+254701200120",
        whatsapp: "+254701200120",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    {
        id: 13,
        title: "2BR in Buruburu Phase 3",
        address: "Buruburu, Nairobi",
        area: "eastlands",
        price: 18000,
        bedrooms: 2,
        bathrooms: 1,
        sqft: 600,
        type: "apartment",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
        description: "Well-maintained 2BR in Buruburu Phase 3. Quiet residential area near Jogoo Road. Close to schools and shopping centers.",
        amenities: ["Quiet Area", "Near Schools", "Parking", "Security", "Garden"],
        lat: -1.2750,
        lng: 36.8700,
        available: "Now",
        phone: "+254701300130",
        whatsapp: "+254701300130",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    {
        id: 14,
        title: "Bedsitter in Kayole",
        address: "Kayole, Nairobi",
        area: "eastlands",
        price: 6500,
        bedrooms: 0,
        bathrooms: 1,
        sqft: 200,
        type: "bedsitter",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
        images: ["https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800"],
        description: "Budget-friendly bedsitter in Kayole. Near Kayole Junction shopping area. Public transport accessible. Great for those on a budget.",
        amenities: ["Budget Friendly", "Near Shops", "Public Transport", "Water Included"],
        lat: -1.2700,
        lng: 36.9000,
        available: "Now",
        phone: "+254701400140",
        whatsapp: "+254701400140",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    // === SOUTH B/C & HURUMA ===
    {
        id: 15,
        title: "2BR in South B",
        address: "South B, Nairobi",
        area: "southb",
        price: 20000,
        bedrooms: 2,
        bathrooms: 1,
        sqft: 650,
        type: "apartment",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
        description: "Spacious 2BR in South B near City Cabanas. Close to Mombasa Road for easy access to Industrial Area and CBD. Family-friendly neighborhood.",
        amenities: ["Near Transport", "Shopping Center", "Schools", "Parking", "Security"],
        lat: -1.3100,
        lng: 36.8600,
        available: "Now",
        phone: "+254701500150",
        whatsapp: "+254701500150",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    {
        id: 16,
        title: "Bedsitter in Huruma",
        address: "Huruma, Nairobi",
        area: "eastlands",
        price: 7000,
        bedrooms: 0,
        bathrooms: 1,
        sqft: 220,
        type: "bedsitter",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
        images: ["https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800"],
        description: "Affordable bedsitter in Huruma Estate. Near沈阳 Road and public transport. Close to schools and health centers.",
        amenities: ["Affordable", "Near Transport", "Schools Nearby", "Health Center"],
        lat: -1.2600,
        lng: 36.8550,
        available: "Now",
        phone: "+254701600160",
        whatsapp: "+254701600160",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    // === KABETE & UPPERHILL ===
    {
        id: 17,
        title: "3BR House in Kabete",
        address: "Kabete, Nairobi",
        area: "kabete",
        price: 40000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1500,
        type: "house",
        lease: "annually",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800"],
        description: "Family house in Kabete near Uthiru. Peaceful neighborhood with good road network. Near Kabete Campus and shopping centers.",
        amenities: ["Quiet Area", "Parking", "Garden", "Schools Nearby", "Near Highway"],
        lat: -1.2500,
        lng: 36.7500,
        available: "Now",
        phone: "+254701700170",
        whatsapp: "+254701700170",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    {
        id: 18,
        title: "1BR in Kileleshwa",
        address: "Kileleshwa, Nairobi",
        area: "kileleshwa",
        price: 30000,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 600,
        type: "apartment",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
        description: "Quiet apartment in Kileleshwa near Lavington. Tree-lined streets, good security. Close to Valley Arcade and Nairobi School.",
        amenities: ["Quiet Area", "Security", "Parking", "Near Schools", "Garden"],
        lat: -1.2780,
        lng: 36.7750,
        available: "Now",
        phone: "+254701800180",
        whatsapp: "+254701800180",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    // === THIKA ROAD AREAS ===
    {
        id: 19,
        title: "2BR near Garden City Mall",
        address: "Garden City, Thika Road",
        area: "thika",
        price: 28000,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 800,
        type: "apartment",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
        description: "Modern apartment near Garden City Mall on Thika Road. Easy access to CBD via superhighway. Near schools and shopping.",
        amenities: ["Near Mall", "Highway Access", "Security", "Parking", "Gym"],
        lat: -1.2100,
        lng: 36.8700,
        available: "Now",
        phone: "+254701900190",
        whatsapp: "+254701900190",
        ownerId: "demo2",
        isPremium: false,
        createdAt: Date.now()
    },
    {
        id: 20,
        title: "Bedsitter in Kahawa",
        address: "Kahawa Sukari, Nairobi",
        area: "ruiru",
        price: 10000,
        bedrooms: 0,
        bathrooms: 1,
        sqft: 300,
        type: "bedsitter",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
        images: ["https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800"],
        description: "Affordable bedsitter in Kahawa Sukari along Thika Road. Near Kenyatta University and shopping centers. Student-friendly area.",
        amenities: ["Near University", "Affordable", "Shopping Center", "Public Transport"],
        lat: -1.1800,
        lng: 36.9200,
        available: "Now",
        phone: "+254702000200",
        whatsapp: "+254702000200",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    {
        id: 21,
        title: "1BR in Roysambu",
        address: "Roysambu, Nairobi",
        area: "ruiru",
        price: 15000,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 450,
        type: "apartment",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
        description: "Clean 1BR apartment in Roysambu along Thika Road. Near Kasarani and Two Rivers Mall. Good for young professionals.",
        amenities: ["Near Mall", "Security", "Parking", "Public Transport", "Schools Nearby"],
        lat: -1.2000,
        lng: 36.8900,
        available: "Now",
        phone: "+254702100210",
        whatsapp: "+254702100210",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    // === LANGATA ===
    {
        id: 22,
        title: "2BR Apartment in Langata",
        address: "Langata, Nairobi",
        area: "langata",
        price: 45000,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 900,
        type: "apartment",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
        description: "Spacious apartment in Langata near Nairobi National Park. Quiet residential area with good schools nearby. Family-friendly.",
        amenities: ["Quiet Area", "Near Park", "Schools", "Security", "Parking"],
        lat: -1.3200,
        lng: 36.7500,
        available: "Now",
        phone: "+254702200220",
        whatsapp: "+254702200220",
        ownerId: "demo2",
        isPremium: false,
        createdAt: Date.now()
    },
    // === KASARANI ===
    {
        id: 23,
        title: "2BR in Kasarani",
        address: "Kasarani, Nairobi",
        area: "ruiru",
        price: 18000,
        bedrooms: 2,
        bathrooms: 1,
        sqft: 600,
        type: "apartment",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
        description: "Affordable 2BR in Kasarani Mwiki area. Near Thika Superhighway and two major shopping malls. Great for families.",
        amenities: ["Near Highway", "Shopping Malls", "Schools", "Security", "Parking"],
        lat: -1.2200,
        lng: 36.9000,
        available: "Now",
        phone: "+254702300230",
        whatsapp: "+254702300230",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    // === KAJIADO (OUTSKIRTS) ===
    {
        id: 24,
        title: "3BR House in Kajiado",
        address: "Kajiado Town",
        area: "kajiado",
        price: 30000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1400,
        type: "house",
        lease: "annually",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"],
        description: "Affordable family home in Kajiado. Peaceful environment with Nairobi CBD accessible via Namanga Road. Large compound.",
        amenities: ["Large Compound", "Quiet Area", "Parking", "Schools Nearby", "Affordable"],
        lat: -1.4800,
        lng: 36.7500,
        available: "Now",
        phone: "+254702400240",
        whatsapp: "+254702400240",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    // === THIKA TOWN ===
    {
        id: 25,
        title: "2BR Apartment in Thika Town",
        address: "Thika Town",
        area: "thika",
        price: 15000,
        bedrooms: 2,
        bathrooms: 1,
        sqft: 550,
        type: "apartment",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
        description: "Affordable 2BR in Thika town center. Near Thika Superhighway entrance. Perfect for those working in Thika or commuting to Nairobi.",
        amenities: ["Town Center", "Near Highway", "Shopping", "Schools", "Public Transport"],
        lat: -1.0400,
        lng: 37.0700,
        available: "Now",
        phone: "+254702500250",
        whatsapp: "+254702500250",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    // === UTHIRU / KABETE ===
    {
        id: 26,
        title: "Bedsitter in Uthiru",
        address: "Uthiru, Nairobi",
        area: "kabete",
        price: 8000,
        bedrooms: 0,
        bathrooms: 1,
        sqft: 280,
        type: "bedsitter",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
        images: ["https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800"],
        description: "Budget bedsitter in Uthiru near Kabete. Quiet area with matatu access to CBD. Near KU and Kabete Campus.",
        amenities: ["Budget Friendly", "Near Transport", "Quiet Area", "Schools Nearby"],
        lat: -1.2450,
        lng: 36.7550,
        available: "Now",
        phone: "+254702600260",
        whatsapp: "+254702600260",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    // === SOUTH C ===
    {
        id: 27,
        title: "1BR in South C",
        address: "South C, Nairobi",
        area: "southb",
        price: 15000,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 450,
        type: "apartment",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
        description: "Clean 1BR apartment in South C near Wilson Airport. Quiet neighborhood with shopping centers and schools nearby.",
        amenities: ["Quiet Area", "Shopping Center", "Schools", "Security", "Near Airport"],
        lat: -1.3150,
        lng: 36.8550,
        available: "Now",
        phone: "+254702700270",
        whatsapp: "+254702700270",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    // === EMBAKASI ===
    {
        id: 28,
        title: "2BR in Embakasi",
        address: "Embakasi, Nairobi",
        area: "eastlands",
        price: 14000,
        bedrooms: 2,
        bathrooms: 1,
        sqft: 550,
        type: "apartment",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
        description: "Spacious 2BR in Embakasi near JKIA. Great for airport staff and frequent travelers. Near shopping centers and public transport.",
        amenities: ["Near Airport", "Shopping", "Public Transport", "Security", "Parking"],
        lat: -1.3100,
        lng: 36.8900,
        available: "Now",
        phone: "+254702800280",
        whatsapp: "+254702800280",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    // === KARIBANGA ===
    {
        id: 29,
        title: "Bedsitter in Kariobangi",
        address: "Kariobangi, Nairobi",
        area: "eastlands",
        price: 7500,
        bedrooms: 0,
        bathrooms: 1,
        sqft: 230,
        type: "bedsitter",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
        images: ["https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800"],
        description: "Affordable bedsitter in Kariobangi near Kariobangi South market. Budget-friendly with public transport access to CBD.",
        amenities: ["Affordable", "Near Market", "Public Transport", "Water Included"],
        lat: -1.2500,
        lng: 36.8800,
        available: "Now",
        phone: "+254702900290",
        whatsapp: "+254702900290",
        ownerId: "demo",
        isPremium: false,
        createdAt: Date.now()
    },
    // === GARDEN CITY / THIKA ROAD ===
    {
        id: 30,
        title: "1BR near Two Rivers Mall",
        address: "Ruiru, Thika Road",
        area: "ruiru",
        price: 20000,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 500,
        type: "apartment",
        lease: "monthly",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
        description: "Modern 1BR near Two Rivers Mall. Premium location with easy highway access. Near international schools and shopping.",
        amenities: ["Near Mall", "Highway Access", "Security", "Gym", "Swimming Pool"],
        lat: -1.1900,
        lng: 36.8800,
        available: "Now",
        phone: "+254703000300",
        whatsapp: "+254703000300",
        ownerId: "demo2",
        isPremium: true,
        createdAt: Date.now()
    }
];

let currentView = 'grid';
let map = null;
let markers = [];
let allProperties = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    initEventListeners();
    checkAuthState();
    renderProperties(allProperties);
});

function initDatabase() {
    const stored = DB.properties();
    if (stored.length === 0) {
        DB.set('hs_properties', defaultProperties);
        allProperties = [...defaultProperties];
    } else {
        allProperties = stored;
    }
}

function initEventListeners() {
    // Search & Filters
    document.getElementById('search-btn').addEventListener('click', filterProperties);
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') filterProperties();
    });
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterProperties();
        });
    });
    
    document.getElementById('property-type').addEventListener('change', filterProperties);
    document.getElementById('lease-duration').addEventListener('change', filterProperties);
    document.getElementById('area-filter').addEventListener('change', filterProperties);
    document.getElementById('min-price').addEventListener('input', filterProperties);
    document.getElementById('max-price').addEventListener('input', filterProperties);
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
    
    // View Toggle
    document.getElementById('grid-view').addEventListener('click', () => switchView('grid'));
    document.getElementById('list-view').addEventListener('click', () => switchView('list'));
    document.getElementById('map-view').addEventListener('click', () => switchView('map'));
    
    // Auth
    document.getElementById('login-btn').addEventListener('click', () => openModal('login-modal'));
    document.getElementById('register-btn').addEventListener('click', () => openModal('register-modal'));
    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('switch-to-register').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('login-modal');
        openModal('register-modal');
    });
    document.getElementById('switch-to-login').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('register-modal');
        openModal('login-modal');
    });
    
    // Forms
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    document.getElementById('add-property-form').addEventListener('submit', handleAddProperty);
    
    // Navigation
    document.getElementById('favorites-nav').addEventListener('click', (e) => {
        e.preventDefault();
        showFavorites();
    });
    document.getElementById('search-nav').addEventListener('click', (e) => {
        e.preventDefault();
        renderProperties(allProperties);
    });
    document.getElementById('my-listings-nav').addEventListener('click', (e) => {
        e.preventDefault();
        showMyListings();
    });
    
    // Premium
    document.getElementById('upgrade-btn').addEventListener('click', () => openModal('upgrade-modal'));
    document.getElementById('subscribe-premium').addEventListener('click', handleSubscribePremium);
    
    // Close modals on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    });
}

// Auth Functions
function checkAuthState() {
    const user = DB.currentUser();
    if (user) {
        showLoggedInState(user);
    } else {
        showLoggedOutState();
    }
}

function showLoggedInState(user) {
    document.getElementById('auth-buttons').style.display = 'none';
    document.getElementById('user-menu').style.display = 'flex';
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('my-listings-nav').style.display = user.role === 'landlord' ? 'block' : 'none';
    document.getElementById('upgrade-btn').style.display = user.isPremium ? 'none' : 'block';
    document.getElementById('premium-badge').style.display = user.isPremium ? 'inline' : 'none';
}

function showLoggedOutState() {
    document.getElementById('auth-buttons').style.display = 'flex';
    document.getElementById('user-menu').style.display = 'none';
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const users = DB.users();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        DB.setCurrentUser(user);
        showLoggedInState(user);
        closeModal('login-modal');
        renderProperties(allProperties);
        alert('Welcome back, ' + user.name + '!');
    } else {
        alert('Invalid email or password');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const user = {
        id: Date.now(),
        name: document.getElementById('register-name').value,
        email: document.getElementById('register-email').value,
        phone: document.getElementById('register-phone').value,
        role: document.getElementById('register-role').value,
        password: document.getElementById('register-password').value,
        isPremium: false,
        createdAt: Date.now()
    };
    
    const users = DB.users();
    if (users.find(u => u.email === user.email)) {
        alert('Email already registered');
        return;
    }
    
    DB.addUser(user);
    DB.setCurrentUser(user);
    showLoggedInState(user);
    closeModal('register-modal');
    alert('Account created! Welcome to HamaSwiftly, ' + user.name + '!');
}

function logout() {
    localStorage.removeItem('hs_current_user');
    showLoggedOutState();
    renderProperties(allProperties);
}

// Property Functions
function filterProperties() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const minPrice = parseInt(document.getElementById('min-price').value) || 0;
    const maxPrice = parseInt(document.getElementById('max-price').value) || Infinity;
    const bedrooms = document.querySelector('.filter-btn.active')?.dataset.bedrooms || 'any';
    const propertyType = document.getElementById('property-type').value;
    const area = document.getElementById('area-filter').value;
    const leaseDuration = document.getElementById('lease-duration').value;
    
    const filtered = allProperties.filter(property => {
        const matchesSearch = property.address.toLowerCase().includes(searchQuery) || 
                            property.title.toLowerCase().includes(searchQuery);
        const matchesPrice = property.price >= minPrice && property.price <= maxPrice;
        const matchesBedrooms = bedrooms === 'any' || 
                               (bedrooms === '4' ? property.bedrooms >= 4 : 
                                bedrooms === '0' ? property.bedrooms === 0 :
                                property.bedrooms === parseInt(bedrooms));
        const matchesType = propertyType === 'any' || property.type === propertyType;
        const matchesArea = area === 'any' || property.area === area;
        const matchesLease = leaseDuration === 'any' || property.lease === leaseDuration;
        
        return matchesSearch && matchesPrice && matchesBedrooms && matchesType && matchesArea && matchesLease;
    });
    
    renderProperties(filtered);
}

function resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    document.querySelector('.filter-btn[data-bedrooms="any"]').click();
    document.getElementById('property-type').value = 'any';
    document.getElementById('area-filter').value = 'any';
    document.getElementById('lease-duration').value = 'any';
    renderProperties(allProperties);
}

function renderProperties(props) {
    const container = document.getElementById('properties-grid');
    container.innerHTML = props.map(property => createPropertyCard(property)).join('');
    document.getElementById('results-count').textContent = `${props.length} properties found`;
    
    container.querySelectorAll('.property-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.favorite-btn')) {
                openPropertyModal(parseInt(card.dataset.id));
            }
        });
    });
    
    container.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(parseInt(btn.dataset.id));
        });
    });
    
    if (currentView === 'map' && map) {
        updateMapMarkers(props);
    }
}

function createPropertyCard(property) {
    const favorites = DB.favorites();
    const isFavorite = favorites.includes(property.id);
    return `
        <div class="property-card" data-id="${property.id}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                <span class="property-badge ${property.isPremium ? 'premium' : ''}">${property.isPremium ? 'PREMIUM' : property.type}</span>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${property.id}">
                    <svg viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div class="property-info">
                <div class="property-price">KES ${property.price.toLocaleString()}<span>/${property.lease}</span></div>
                <div class="property-address">${property.address}</div>
                <div class="property-features">
                    <div class="feature">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 22V8l9-6 9 6v14"></path>
                        </svg>
                        ${property.bedrooms === 0 ? 'Studio' : property.bedrooms + ' bed'}
                    </div>
                    <div class="feature">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 12h16v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6z"></path>
                            <path d="M6 12V5a2 2 0 012-2h2a2 2 0 012 2v7"></path>
                        </svg>
                        ${property.bathrooms} bath
                    </div>
                    <div class="feature">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                        </svg>
                        ${property.sqft} sqft
                    </div>
                </div>
            </div>
        </div>
    `;
}

function openPropertyModal(propertyId) {
    const property = allProperties.find(p => p.id === propertyId);
    if (!property) return;
    
    const user = DB.currentUser();
    const isPremium = user && user.isPremium;
    const favorites = DB.favorites();
    const isFavorite = favorites.includes(property.id);
    
    let contactHtml = '';
    
    if (isPremium) {
        contactHtml = `
            <div class="contact-options">
                <h3>Contact Landlord Directly</h3>
                <div class="contact-buttons">
                    <a href="tel:${property.phone}" class="contact-btn">
                        <div class="icon">📞</div>
                        <div class="label">Call Now</div>
                        <div class="sublabel">${property.phone}</div>
                    </a>
                    <a href="https://wa.me/${property.whatsapp.replace(/[^0-9]/g, '')}" target="_blank" class="contact-btn">
                        <div class="icon">💬</div>
                        <div class="label">WhatsApp</div>
                        <div class="sublabel">Send Message</div>
                    </a>
                </div>
            </div>
        `;
    } else {
        contactHtml = `
            <div class="contact-options premium-required">
                <h3>Want Direct Contact?</h3>
                <p>Upgrade to Premium to get the landlord's phone and WhatsApp for instant communication.</p>
                <button class="btn btn-primary" onclick="closeModal('property-modal'); openModal('upgrade-modal');">
                    Upgrade to Premium - KES 999/month
                </button>
            </div>
        `;
    }
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="modal-gallery">
            ${property.images.map(img => `<img src="${img}" alt="${property.title}">`).join('')}
        </div>
        <div class="modal-title">${property.title}</div>
        <div class="modal-price">KES ${property.price.toLocaleString()}<span>/${property.lease}</span></div>
        <div class="modal-details">
            <div class="modal-detail">
                <span class="modal-detail-label">Type</span>
                <span class="modal-detail-value">${property.type}</span>
            </div>
            <div class="modal-detail">
                <span class="modal-detail-label">Bedrooms</span>
                <span class="modal-detail-value">${property.bedrooms === 0 ? 'Studio' : property.bedrooms}</span>
            </div>
            <div class="modal-detail">
                <span class="modal-detail-label">Bathrooms</span>
                <span class="modal-detail-value">${property.bathrooms}</span>
            </div>
            <div class="modal-detail">
                <span class="modal-detail-label">Area</span>
                <span class="modal-detail-value">${property.sqft} sqft</span>
            </div>
            <div class="modal-detail">
                <span class="modal-detail-label">Available</span>
                <span class="modal-detail-value">${property.available}</span>
            </div>
        </div>
        <div class="modal-description">${property.description}</div>
        <div class="modal-amenities">
            <h3>Amenities</h3>
            <div class="amenities-grid">
                ${property.amenities.map(a => `<div class="amenity">${a}</div>`).join('')}
            </div>
        </div>
        ${contactHtml}
    `;
    
    openModal('property-modal');
}

function toggleFavorite(propertyId) {
    let favorites = DB.favorites();
    if (favorites.includes(propertyId)) {
        favorites = favorites.filter(id => id !== propertyId);
    } else {
        favorites.push(propertyId);
    }
    DB.setFavorites(favorites);
    filterProperties();
}

function showFavorites() {
    const favorites = DB.favorites();
    const favoriteProperties = allProperties.filter(p => favorites.includes(p.id));
    renderProperties(favoriteProperties);
}

function showMyListings() {
    const user = DB.currentUser();
    if (!user) return;
    
    const myListings = allProperties.filter(p => p.ownerId === user.id);
    const container = document.getElementById('my-listings-container');
    
    if (myListings.length === 0) {
        container.innerHTML = '<p>You have no listings yet.</p>';
    } else {
        container.innerHTML = myListings.map(p => `
            <div class="listing-card">
                <img src="${p.image}" alt="${p.title}">
                <div class="listing-info">
                    <h3>${p.title}</h3>
                    <p>KES ${p.price.toLocaleString()}/${p.lease}</p>
                    <p>${p.address}</p>
                    <div class="listing-actions">
                        <button class="btn btn-danger btn-sm" onclick="deleteListing(${p.id})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    openModal('my-listings-modal');
}

function deleteListing(id) {
    if (confirm('Are you sure you want to delete this listing?')) {
        DB.deleteProperty(id);
        allProperties = DB.properties();
        showMyListings();
        renderProperties(allProperties);
    }
}

function handleAddProperty(e) {
    e.preventDefault();
    const user = DB.currentUser();
    if (!user || user.role !== 'landlord') {
        alert('Only landlords can list properties');
        return;
    }
    
    const imagesInput = document.getElementById('prop-images').value;
    const defaultImages = [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ];
    
    const property = {
        id: Date.now(),
        title: document.getElementById('prop-title').value,
        address: document.getElementById('prop-address').value,
        area: document.getElementById('prop-area').value,
        price: parseInt(document.getElementById('prop-price').value),
        bedrooms: parseInt(document.getElementById('prop-bedrooms').value),
        bathrooms: parseInt(document.getElementById('prop-bathrooms').value),
        sqft: parseInt(document.getElementById('prop-sqft').value) || 0,
        type: document.getElementById('prop-type').value,
        lease: document.getElementById('prop-lease').value,
        image: imagesInput ? imagesInput.split(',')[0].trim() : defaultImages[0],
        images: imagesInput ? imagesInput.split(',').map(i => i.trim()) : defaultImages,
        description: document.getElementById('prop-description').value,
        amenities: document.getElementById('prop-amenities').value.split(',').map(a => a.trim()).filter(a => a),
        lat: parseFloat(document.getElementById('prop-lat').value) || -1.2921,
        lng: parseFloat(document.getElementById('prop-lng').value) || 36.8219,
        available: "Now",
        phone: document.getElementById('prop-phone').value,
        whatsapp: document.getElementById('prop-whatsapp').value || document.getElementById('prop-phone').value,
        ownerId: user.id,
        isPremium: user.isPremium,
        createdAt: Date.now()
    };
    
    DB.addProperty(property);
    allProperties = DB.properties();
    closeModal('add-property-modal');
    document.getElementById('add-property-form').reset();
    renderProperties(allProperties);
    alert('Property listed successfully!');
}

// Premium
function handleSubscribePremium() {
    const user = DB.currentUser();
    if (!user) {
        alert('Please login first');
        return;
    }
    
    const users = DB.users();
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        users[userIndex].isPremium = true;
        DB.set('hs_users', users);
        DB.setCurrentUser(users[userIndex]);
        showLoggedInState(users[userIndex]);
        closeModal('upgrade-modal');
        alert('Welcome to HamaSwiftly Premium! You now have access to direct contact features.');
    }
}

// View Functions
function switchView(view) {
    currentView = view;
    
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${view}-view`).classList.add('active');
    
    const grid = document.getElementById('properties-grid');
    const mapContainer = document.getElementById('map-container');
    
    if (view === 'map') {
        grid.style.display = 'none';
        mapContainer.style.display = 'block';
        initMap();
    } else {
        grid.style.display = 'grid';
        mapContainer.style.display = 'none';
        if (view === 'list') {
            grid.style.gridTemplateColumns = '1fr';
        } else {
            grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
        }
    }
}

function initMap() {
    if (map) {
        map.remove();
    }
    
    // Center on Nairobi
    map = L.map('map-container').setView([-1.2864, 36.8172], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    updateMapMarkers(allProperties);
    
    setTimeout(() => map.invalidateSize(), 100);
}

function updateMapMarkers(props) {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    props.forEach(property => {
        const marker = L.marker([property.lat, property.lng])
            .addTo(map)
            .bindPopup(`
                <strong>${property.title}</strong><br>
                KES ${property.price.toLocaleString()}/${property.lease}<br>
                ${property.bedrooms === 0 ? 'Studio' : property.bedrooms + ' bed'}, ${property.bathrooms} bath
            `);
        
        marker.on('click', () => openPropertyModal(property.id));
        markers.push(marker);
    });
    
    if (props.length > 0) {
        const bounds = L.latLngBounds(props.map(p => [p.lat, p.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
    }
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}
