export const SITE = {
  name: "THE ETERNAL BLISS",
  tagline: "Creating Timeless Memories Since 2016",
  founder: "Garima Dhingra",
  phone: "+91 98100 00000",
  email: "hello@theeternalbliss.in",
  instagram: "@theeternalbliss",
};

export type Service = {
  slug: string;
  nav: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  image: string;
  features: string[];
  process: { step: string; detail: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "wedding-planning",
    nav: "Wedding Planning",
    h1: "Luxury Wedding Planning, Curated to Perfection",
    metaTitle: "Luxury Wedding Planning | The Eternal Bliss",
    metaDescription:
      "Full-service luxury wedding planning — venues, vendors, guest management, budgets, logistics and flawless execution by The Eternal Bliss.",
    eyebrow: "Planning & Curation",
    intro:
      "From the first venue walkthrough to the final vidaai, we orchestrate every detail of your celebration with editorial precision and heartfelt care. Your only responsibility is to be present in every moment.",
    image: "/10.jpg",
    features: [
      "Venue Booking",
      "Timeline Planning",
      "Guest Management",
      "Vendor Management",
      "Budget Planning",
      "Destination Wedding Planning",
      "Logistics",
      "Hospitality",
      "Entertainment Coordination",
    ],
    process: [
      { step: "Discovery", detail: "A private consultation to understand your story, taste and vision." },
      { step: "Curation", detail: "Venues, palettes, vendors and experiences hand-selected for you." },
      { step: "Design", detail: "A complete creative blueprint — decor, timelines, hospitality, flow." },
      { step: "Execution", detail: "Our team on ground, invisible yet everywhere, perfecting each moment." },
    ],
    faqs: [
      { q: "How early should we book your planning services?", a: "Ideally 8–14 months before your wedding for full-service planning, though we also take on select celebrations with shorter timelines." },
      { q: "Do you plan destination weddings?", a: "Yes — Udaipur, Jaipur, Goa, Kerala and international destinations. We manage travel, hospitality, logistics and local vendors end to end." },
      { q: "Can you work with our existing vendors?", a: "Absolutely. We integrate your chosen vendors into our production timeline and quality standards seamlessly." },
    ],
  },
  {
    slug: "wedding-photography",
    nav: "Wedding Photography",
    h1: "Wedding Photography That Feels Like Poetry",
    metaTitle: "Luxury Wedding Photography | The Eternal Bliss",
    metaDescription:
      "Editorial wedding photography — candid coverage, pre-wedding, haldi, mehendi, sangeet, reception, drone coverage and heirloom albums.",
    eyebrow: "Photography",
    intro:
      "We photograph the glances, the tears, the laughter between rituals — the moments you'll want to relive for generations. Every frame is composed like an editorial, felt like a memory.",
    image: "/11.jpg",
    features: [
      "Wedding Coverage",
      "Engagement",
      "Pre Wedding",
      "Haldi",
      "Mehendi",
      "Sangeet",
      "Reception",
      "Drone Coverage",
      "Heirloom Albums",
    ],
    process: [
      { step: "Consult", detail: "We learn your story and plan every ceremony's coverage." },
      { step: "Shoot", detail: "A discreet, editorial-trained team across all functions." },
      { step: "Curate", detail: "Hand-edited selects with a timeless, filmic grade." },
      { step: "Deliver", detail: "Online galleries, fine-art prints and heirloom albums." },
    ],
    faqs: [
      { q: "How many photographers cover a wedding?", a: "Our signature teams include two candid photographers, one traditional photographer and a drone operator, scaled to your celebration." },
      { q: "When do we receive our photographs?", a: "A curated preview within 72 hours, and the complete edited gallery within 4–6 weeks." },
      { q: "Do you travel for weddings?", a: "Yes, we photograph weddings across India and internationally." },
    ],
  },
  {
    slug: "wedding-films",
    nav: "Wedding Films",
    h1: "Cinematic Wedding Films, Crafted Frame by Frame",
    metaTitle: "Cinematic Wedding Films | The Eternal Bliss",
    metaDescription:
      "Cinematic wedding films, teasers, Instagram reels, drone films and same-day edits — luxury wedding cinematography by The Eternal Bliss.",
    eyebrow: "Cinematography",
    intro:
      "Your wedding deserves more than a video — it deserves a film. Sound design, colour grade, narrative arcs; we craft cinema from your celebration.",
    image: "/12.jpg",
    features: [
      "Cinematic Films",
      "Wedding Teasers",
      "Instagram Reels",
      "Drone Films",
      "Same Day Edit",
    ],
    process: [
      { step: "Story", detail: "We map your narrative — the people, rituals and emotions that matter." },
      { step: "Film", detail: "Cinema cameras, primes and drones capture every function." },
      { step: "Edit", detail: "Narrative editing, licensed music, cinematic colour grade." },
      { step: "Premiere", detail: "Teaser in days, feature film in weeks — made for the big screen." },
    ],
    faqs: [
      { q: "What is a same-day edit?", a: "A short film of your morning rituals, edited on-site and premiered at your reception the same evening." },
      { q: "How long is a cinematic film?", a: "Feature films run 15–30 minutes, with a 60–90 second teaser and vertical reels for social media." },
      { q: "Do you use drones?", a: "Yes, licensed drone pilots capture aerial cinematography wherever regulations permit." },
    ],
  },
  {
    slug: "wedding-decor",
    nav: "Wedding Decor",
    h1: "Decor That Turns Venues Into Dreamscapes",
    metaTitle: "Luxury Wedding Decor & Design | The Eternal Bliss",
    metaDescription:
      "Mandap design, floral styling, reception decor, stage design and luxury decor concepts — bespoke wedding decor by The Eternal Bliss.",
    eyebrow: "Decor & Design",
    intro:
      "Florals that breathe, light that flatters, spaces that feel like they were always meant for your love story. Our decor studio designs every celebration from a blank canvas.",
    image: "/1A7A1097.JPG",
    features: [
      "Mandap Design",
      "Floral Styling",
      "Reception Decor",
      "Stage Design",
      "Venue Styling",
      "Luxury Decor Concepts",
    ],
    process: [
      { step: "Moodboard", detail: "Palettes, textures and references tailored to your aesthetic." },
      { step: "Design", detail: "3D renders and floral plans for every function." },
      { step: "Production", detail: "In-house fabrication, florals and lighting design." },
      { step: "Styling", detail: "On-day styling with obsessive attention to detail." },
    ],
    faqs: [
      { q: "Do you design decor for all functions?", a: "Yes — haldi, mehendi, sangeet, pheras and reception, each with a distinct yet cohesive design language." },
      { q: "Can we see the design before the wedding?", a: "You approve moodboards and 3D renders before any production begins." },
      { q: "Do you use fresh flowers?", a: "We work primarily with fresh, seasonal florals, sourced locally and internationally for signature installations." },
    ],
  },
  {
    slug: "destination-weddings",
    nav: "Destination Weddings",
    h1: "Destination Weddings Beyond Imagination",
    metaTitle: "Destination Wedding Planners in India | The Eternal Bliss",
    metaDescription:
      "Destination wedding planning in Udaipur, Jaipur, Goa, Kerala and abroad — venues, travel, hospitality and production by The Eternal Bliss.",
    eyebrow: "Destinations",
    intro:
      "Palace courtyards in Udaipur. Beach pheras in Goa. Backwater sunsets in Kerala. We plan and produce destination celebrations where every guest feels like royalty.",
    image: "/1A7A1150.JPG",
    features: [
      "Palace Weddings — Udaipur & Jaipur",
      "Beach Weddings — Goa",
      "Backwater Weddings — Kerala",
      "International Destinations",
      "Guest Travel & Hospitality",
      "Complete On-Ground Production",
    ],
    process: [
      { step: "Scout", detail: "Destination and venue recommendations matched to your vision." },
      { step: "Plan", detail: "Travel, stays, hospitality and multi-day event flows." },
      { step: "Produce", detail: "Decor, entertainment and vendors mobilised on location." },
      { step: "Celebrate", detail: "A flawless multi-day experience for you and your guests." },
    ],
    faqs: [
      { q: "Which destinations do you cover?", a: "Rajasthan, Goa, Kerala, Himachal, Rishikesh and international destinations including Thailand, Dubai and Italy." },
      { q: "How far in advance should we plan?", a: "12–18 months is ideal for peak-season palace venues; 8–10 months for most other destinations." },
      { q: "Do you manage guest logistics?", a: "Yes — flights, transfers, room blocks, hampers, itineraries and concierge support for every guest." },
    ],
  },
  {
    slug: "maternity-photography",
    nav: "Maternity Photography",
    h1: "Maternity Portraits, Tender and Timeless",
    metaTitle: "Maternity Photography Studio | The Eternal Bliss",
    metaDescription:
      "Fine-art maternity photography in a luxury studio setting — elegant styling, gowns, and timeless portraits by The Eternal Bliss.",
    eyebrow: "The Studio",
    intro:
      "The months before motherhood deserve to be remembered beautifully. Our fine-art maternity sessions are styled, lit and composed like editorials — gentle, elegant, eternal.",
    image: "/1A7A1477.JPG",
    features: [
      "Studio Maternity Editorials",
      "Outdoor Golden-Hour Sessions",
      "Gown & Styling Wardrobe",
      "Couple & Family Frames",
      "Fine-Art Retouching",
      "Printed Keepsakes",
    ],
    process: [
      { step: "Plan", detail: "Styling consultation, wardrobe and concept selection." },
      { step: "Shoot", detail: "A relaxed, guided session in studio or on location." },
      { step: "Edit", detail: "Fine-art retouching with a soft, timeless grade." },
      { step: "Treasure", detail: "Galleries, prints and albums to keep forever." },
    ],
    faqs: [
      { q: "When is the best time for a maternity shoot?", a: "Between 28 and 34 weeks — the bump is beautifully visible and you're still comfortable." },
      { q: "Do you provide gowns?", a: "Yes, our studio wardrobe includes curated gowns and draping fabrics in every size." },
      { q: "Can my partner and children join?", a: "We love family frames — partners and little ones are always welcome." },
    ],
  },
  {
    slug: "newborn-photography",
    nav: "Newborn Photography",
    h1: "Newborn Photography, Safe Hands, Soft Light",
    metaTitle: "Certified Newborn Photography | The Eternal Bliss",
    metaDescription:
      "Certified, safety-first newborn photography — posed and lifestyle sessions with soft styling by certified photographer Garima Dhingra.",
    eyebrow: "The Studio",
    intro:
      "Led by certified newborn photographer Garima Dhingra, our sessions are unhurried, warm and safety-first — preserving the tiny details you'll ache to remember.",
    image: "/1A7A1555.JPG",
    features: [
      "Posed Newborn Sessions",
      "Lifestyle At-Home Sessions",
      "Certified Safe Posing",
      "Curated Props & Wraps",
      "Sibling & Family Frames",
      "Milestone Plans",
    ],
    process: [
      { step: "Book", detail: "Reserve around your due date; we keep flexible windows." },
      { step: "Prepare", detail: "We guide you on timing, feeding and what to bring." },
      { step: "Session", detail: "A calm, baby-led session in our warm studio." },
      { step: "Deliver", detail: "Hand-retouched images, prints and keepsake albums." },
    ],
    faqs: [
      { q: "When should newborns be photographed?", a: "Ideally within the first 5–14 days, when babies are sleepiest and most flexible for posing." },
      { q: "Is posing safe?", a: "Garima is a certified newborn photographer — every pose follows international safety protocols, with composites used where needed." },
      { q: "How long does a session take?", a: "2–3 unhurried hours, with time for feeds, cuddles and comfort breaks." },
    ],
  },
  {
    slug: "family-photography",
    nav: "Family Photography",
    h1: "Family Portraits That Grow More Precious With Time",
    metaTitle: "Family & Kids Photography | The Eternal Bliss",
    metaDescription:
      "Family portraits, kids photography, milestones and birthday shoots — warm, editorial family photography by The Eternal Bliss.",
    eyebrow: "The Studio",
    intro:
      "The everyday magic of your family — the giggles, the chaos, the quiet love — photographed with warmth and editorial elegance.",
    image: "/1S6A3248.JPG",
    features: [
      "Family Portraits",
      "Kids Photography",
      "Milestone Sessions",
      "Birthday Shoots",
      "Cake Smash Sessions",
      "Generational Portraits",
    ],
    process: [
      { step: "Plan", detail: "Concept, styling and location tailored to your family." },
      { step: "Play", detail: "Relaxed, candid-first sessions — no stiff posing." },
      { step: "Edit", detail: "Warm, timeless edits that age beautifully." },
      { step: "Print", detail: "Wall art, albums and prints for your home." },
    ],
    faqs: [
      { q: "Where do sessions take place?", a: "In our studio, at your home, or outdoors at golden hour — whatever suits your family best." },
      { q: "What should we wear?", a: "We share a styling guide with palettes that photograph beautifully together." },
      { q: "Do you shoot birthdays and milestones?", a: "Yes — cake smashes, first steps, annual portraits and full birthday event coverage." },
    ],
  },
];

export const highlights = [
  { label: "Wedding", image: "/1S6A3355.JPG", href: "/wedding-photography" },
  { label: "Pre Wedding", image: "/6.jpg", href: "/wedding-photography" },
  { label: "Films", image: "/7.jpg", href: "/wedding-films" },
  { label: "Decor", image: "/8.jpg", href: "/wedding-decor" },
  { label: "Planning", image: "/9.jpg", href: "/wedding-planning" },
  { label: "Invitations", image: "/DSC-1288-Original Final copy.jpg", href: "/wedding-planning" },
  { label: "Entertainment", image: "/DSC_0227.jpg", href: "/wedding-planning" },
  { label: "Destination", image: "/DSC_0273 copy 2.png", href: "/destination-weddings" },
  { label: "Maternity", image: "/DSC_0504.jpg", href: "/maternity-photography" },
  { label: "Newborn", image: "/DSC_0506.jpg", href: "/newborn-photography" },
  { label: "Family", image: "/DSC_0508.JPG", href: "/family-photography" },
  { label: "Birthday", image: "/DSC_0548 (1).JPG", href: "/family-photography" },
  { label: "Milestones", image: "/DSC_0548.JPG", href: "/family-photography" },
];

export const portfolio = [
{ title: "Aisha & Veer", place: "Udaipur Palace Wedding", image: "/DSC_0603.JPG", tag: "Wedding" },
  { title: "Meera & Kabir", place: "Goa Sunset Pheras", image: "/DSC_0635 copy.jpg", tag: "Destination" },
  { title: "The Redveil Editorial", place: "Bridal Fine Art", image: "/DSC_0640.jpg", tag: "Photography" },
  { title: "A Thousand Roses", place: "Reception Design, Delhi", image: "/DSC_0724.jpg", tag: "Decor" },
  { title: "Sangeet Under Stars", place: "Jaipur", image: "/DSC_0726.jpg", tag: "Films" },
  { title: "Waiting for You", place: "Maternity Editorial", image: "/DSC_0838.JPG", tag: "Maternity" },
  { title: "Fourteen Days Old", place: "Newborn Session", image: "/DSC_0865.JPG", tag: "Newborn" },
  { title: "The Dhingra Family", place: "Family Portraits", image: "/DSC_0868.JPG", tag: "Family" },,
  { title: "Beautiful Memory 1", place: "Celebration", image: "/DSC_1679.JPG", tag: "Wedding" },
  { title: "Beautiful Memory 2", place: "Celebration", image: "/DSC_1682.JPG", tag: "Destination" },
  { title: "Beautiful Memory 3", place: "Celebration", image: "/DSC_1725.JPG", tag: "Photography" },
  { title: "Beautiful Memory 4", place: "Celebration", image: "/DSC_1770 copy.jpg", tag: "Decor" },
  { title: "Beautiful Memory 5", place: "Celebration", image: "/DSC_2076 copy.jpg", tag: "Films" },
  { title: "Beautiful Memory 6", place: "Celebration", image: "/DSC_2463.JPG", tag: "Maternity" },
  { title: "Beautiful Memory 7", place: "Celebration", image: "/DSC_2467.JPG", tag: "Newborn" },
  { title: "Beautiful Memory 8", place: "Celebration", image: "/DSC_3808 copy.jpg", tag: "Family" },
  { title: "Beautiful Memory 9", place: "Celebration", image: "/DSC_4268.jpg", tag: "Wedding" },
  { title: "Beautiful Memory 10", place: "Celebration", image: "/DSC_4305.jpg", tag: "Destination" },
  { title: "Beautiful Memory 11", place: "Celebration", image: "/DSC_4316.jpg", tag: "Photography" },
  { title: "Beautiful Memory 12", place: "Celebration", image: "/DSC_4440.jpg", tag: "Decor" },
  { title: "Beautiful Memory 13", place: "Celebration", image: "/DSC_5332.JPG", tag: "Films" },
  { title: "Beautiful Memory 14", place: "Celebration", image: "/DSC_5334.JPG", tag: "Maternity" },
  { title: "Beautiful Memory 15", place: "Celebration", image: "/DSC_5504.JPG", tag: "Newborn" },
  { title: "Beautiful Memory 16", place: "Celebration", image: "/DSC_5894.JPG", tag: "Family" },
  { title: "Beautiful Memory 17", place: "Celebration", image: "/DSC_6093.JPG", tag: "Wedding" },
  { title: "Beautiful Memory 18", place: "Celebration", image: "/DSC_6117.JPG", tag: "Destination" },
  { title: "Beautiful Memory 19", place: "Celebration", image: "/DSC_6453.JPG", tag: "Photography" },
  { title: "Beautiful Memory 20", place: "Celebration", image: "/DSC_6630.JPG", tag: "Decor" },
  { title: "Beautiful Memory 21", place: "Celebration", image: "/DSC_6633.JPG", tag: "Films" },
  { title: "Beautiful Memory 22", place: "Celebration", image: "/DSC_6661.JPG", tag: "Maternity" },
  { title: "Beautiful Memory 23", place: "Celebration", image: "/DSC_6744.JPG", tag: "Newborn" },
  { title: "Beautiful Memory 24", place: "Celebration", image: "/DSC_7190.JPG", tag: "Family" },
  { title: "Beautiful Memory 25", place: "Celebration", image: "/DSC_7204.JPG", tag: "Wedding" },
  { title: "Beautiful Memory 26", place: "Celebration", image: "/DSC_7989.JPG", tag: "Destination" },
  { title: "Beautiful Memory 27", place: "Celebration", image: "/DSC_8671.JPG", tag: "Photography" },
  { title: "Beautiful Memory 28", place: "Celebration", image: "/DSC_8744.JPG", tag: "Decor" },
  { title: "Beautiful Memory 29", place: "Celebration", image: "/DSC_8979.JPG", tag: "Films" },
  { title: "Beautiful Memory 30", place: "Celebration", image: "/DSC_9961 copy.jpg", tag: "Maternity" },
  { title: "Beautiful Memory 31", place: "Celebration", image: "/DSC_9976 copy Final.jpg", tag: "Newborn" },
  { title: "Beautiful Memory 32", place: "Celebration", image: "/IMG_0765.jpg", tag: "Family" },
  { title: "Beautiful Memory 33", place: "Celebration", image: "/palak1.2.jpeg", tag: "Wedding" },
  { title: "Beautiful Memory 34", place: "Celebration", image: "/renuka.jpg", tag: "Destination" },
  { title: "Beautiful Memory 35", place: "Celebration", image: "/_S6A0257 copy.jpeg", tag: "Photography" },
  { title: "Beautiful Memory 36", place: "Celebration", image: "/_S6A7702.jpg", tag: "Decor" },
  { title: "Beautiful Memory 37", place: "Celebration", image: "/_S6A7785.jpg", tag: "Films" },
];

export const packages = [
  {
    name: "The Signature",
    price: "₹1,95,000",
    unit: "onwards",
    tagline: "For intimate celebrations",
    features: [
      "Wedding day photography (2 candid photographers)",
      "Traditional photo & video coverage",
      "Cinematic teaser film",
      "Online gallery — 500+ edited images",
      "One premium album (30 sheets)",
    ],
    featured: false,
  },
  {
    name: "The Eternal",
    price: "₹4,50,000",
    unit: "onwards",
    tagline: "Our most-loved collection",
    features: [
      "3-day coverage — haldi, mehendi, sangeet, wedding",
      "Candid + traditional photo & film teams",
      "Cinematic feature film + teaser + reels",
      "Drone coverage",
      "Pre-wedding shoot included",
      "Two luxury albums + fine-art prints",
    ],
    featured: true,
  },
  {
    name: "The Bliss Affair",
    price: "₹12,00,000",
    unit: "onwards",
    tagline: "Complete wedding experience",
    features: [
      "Full-service wedding planning & design",
      "Decor concepts, mandap & venue styling",
      "Complete photo + film coverage, all functions",
      "Entertainment & artist management",
      "Invitations & wedding stationery",
      "Dedicated experience curator on ground",
    ],
    featured: false,
  },
];

export const journal = [
  {
    slug: "planning-a-palace-wedding-in-udaipur",
    title: "Planning a Palace Wedding in Udaipur",
    excerpt:
      "Everything we've learned producing celebrations on the shores of Lake Pichola — venues, seasons, logistics and the magic hour.",
    image: "/DSC_0878.JPG",
    date: "January 12, 2026",
    category: "Destinations",
    body: [
      "Udaipur remains the crown jewel of Indian destination weddings. Between the marble jharokhas of its palaces and the still mirror of Lake Pichola, every hour of light feels designed for celebration.",
      "The season matters more than most couples realise. October to March offers the gentlest weather, but it is the shoulder weeks — late September, early April — where venues breathe easier and sunsets last longer.",
      "Our advice is always the same: arrive two days early. Let the city slow you down before the celebrations begin. The best photographs of your wedding week are often taken before the wedding itself.",
    ],
  },
  {
    slug: "how-to-plan-your-wedding-timeline",
    title: "The Art of the Wedding Timeline",
    excerpt:
      "A well-designed timeline is invisible — guests simply feel that everything flows. Here is how we build yours.",
    image: "/DSC_1451.JPG",
    date: "December 3, 2025",
    category: "Planning",
    body: [
      "A luxury wedding is a production, and every production runs on a timeline. Ours begin with light: we place the pheras, the couple portraits and the entries where the light will be most beautiful.",
      "We then design buffers — quiet pockets of fifteen minutes that absorb the inevitable. A timeline without buffers is a promise waiting to be broken.",
      "Finally, we choreograph the emotional arc of the day, so energy rises exactly when it should — at the entries, the varmala, the first dance — and softens for the rituals that deserve stillness.",
    ],
  },
  {
    slug: "why-newborn-sessions-are-worth-it",
    title: "Fourteen Days of Forever",
    excerpt:
      "Newborns change by the hour. A certified newborn session preserves the tiny details that vanish before you notice.",
    image: "/DSC_1672.JPG",
    date: "November 8, 2025",
    category: "The Studio",
    body: [
      "The curl of a two-week-old's fingers. The impossibly small eyelashes. The way they fold into themselves as they did for nine months. These details soften and vanish within days.",
      "A certified newborn session is unhurried by design. We work around feeds and moods; the baby leads, always. Safety training governs every pose — many of the classic images you see are careful composites.",
      "Years later, parents rarely remember the sleepless blur of those first weeks. The photographs remember for them.",
    ],
  },
];

export const fallbackTestimonials = [
  {
    id: 1,
    couple: "Aisha & Veer",
    event: "Palace Wedding",
    location: "Udaipur",
    quote:
      "Garima and her team didn't just plan our wedding — they understood it before we could articulate it. Every corner of the venue felt like it was designed from our memories.",
    rating: 5,
  },
  {
    id: 2,
    couple: "Meera & Kabir",
    event: "Destination Wedding",
    location: "Goa",
    quote:
      "Our film made my father cry — twice. The Eternal Bliss captured moments we didn't even know had happened. Watching it feels like living the day again.",
    rating: 5,
  },
  {
    id: 3,
    couple: "The Kapoor Family",
    event: "Newborn Session",
    location: "New Delhi",
    quote:
      "As nervous first-time parents, the patience and gentleness in the studio meant everything. The photographs are the most precious thing we own.",
    rating: 5,
  },
];

export const processSteps = [
  { n: "01", title: "The Conversation", detail: "A private consultation over coffee or a call — your story, your people, your vision." },
  { n: "02", title: "The Blueprint", detail: "Venues, palettes, timelines and collections curated into a complete experience design." },
  { n: "03", title: "The Craft", detail: "Months of design, production and rehearsal condensed into flawless celebration days." },
  { n: "04", title: "The Legacy", detail: "Films, albums and prints delivered as heirlooms — memories built to outlive us all." },
];
