// Comprehensive Routes and Data Models for Velora Luxury Furniture Storefront

export type PageRoute =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'collections'
  | 'blog'
  | 'blog-single'
  | 'about'
  | 'our-store'
  | 'contact'
  | 'faq'
  | 'shipping'
  | 'returns'
  | 'privacy'
  | 'terms'
  | 'wishlist'
  | 'compare'
  | 'view-cart'
  | 'checkout'
  | 'thank-you'
  | 'invoice'
  | 'track-order'
  | 'account-dashboard'
  | 'account-orders'
  | 'account-addresses'
  | 'account-settings'
  | '404';

export interface HomeDemoConfig {
  id: string;
  label: string;
  badge?: 'Hot' | 'New' | 'Trend';
  heroTitle: string;
  heroSubtitle: string;
  accentColor: string;
}

export const HOME_DEMOS: HomeDemoConfig[] = [
  {
    id: 'home-living',
    label: 'Modern Living Spaces',
    badge: 'Hot',
    heroTitle: 'Timeless Style for Modern Living',
    heroSubtitle: 'Discover handcrafted furniture that brings elegance, warmth, and enduring functionality to your everyday life.',
    accentColor: '#18181B',
  },
  {
    id: 'home-bedroom',
    label: 'Bedroom Sanctuaries',
    badge: 'Hot',
    heroTitle: 'Minimal Beauty, Natural Solid Wood',
    heroSubtitle: 'Thoughtfully constructed with sustainable solid oak, organic linens, and peaceful silhouettes.',
    accentColor: '#C88D66',
  },
  {
    id: 'home-dining',
    label: 'Dining & Entertaining',
    badge: 'New',
    heroTitle: 'Gather Around Handcrafted Warmth',
    heroSubtitle: 'Sculptural dining tables, tailored leather seating, and artisanal sideboard buffets built to last generations.',
    accentColor: '#18181B',
  },
  {
    id: 'home-lighting',
    label: 'Architectural Lighting',
    badge: 'Trend',
    heroTitle: 'Sculptural Glow for Every Room',
    heroSubtitle: 'Ceramic table lamps, minimalist brass pendants, and warm ambient floor fixtures.',
    accentColor: '#C88D66',
  },
  {
    id: 'home-outdoor',
    label: 'Nordic Outdoor Living',
    badge: 'New',
    heroTitle: 'Seamless Indoor-Outdoor Comfort',
    heroSubtitle: 'Weatherproof teak seating, sun-drenched daybeds, and concrete fire features.',
    accentColor: '#18181B',
  },
  {
    id: 'home-decor',
    label: 'Artisanal Decor & Textiles',
    heroTitle: 'Organic Textures & Mindful Objects',
    heroSubtitle: 'Hand-thrown pottery, boucle throws, sculptural mirrors, and textured woven wool rugs.',
    accentColor: '#70857A',
  },
];

export const SHOP_MEGA_MENU = {
  layouts: [
    { label: 'Default Catalog Grid', layout: 'default' as const },
    { label: 'Left Filter Sidebar', layout: 'left-sidebar' as const },
    { label: 'Right Filter Sidebar', layout: 'right-sidebar' as const },
    { label: 'Full Width Showcase', layout: 'full-width' as const },
    { label: 'Featured Collections', route: 'collections' as PageRoute, badge: 'Hot' as const },
    { label: 'Curated Room Sets', layout: 'sub-collection' as const, badge: 'New' as const },
  ],
  features: [
    { label: 'Living Room Essentials', feature: 'pagination', badge: 'Trend' as const },
    { label: 'Dining Sets & Tables', feature: 'loadmore', badge: 'Hot' as const },
    { label: 'Bedroom Furniture', feature: 'infinite', badge: 'New' as const },
    { label: 'Ambient Lighting', layout: 'left-sidebar' as const },
    { label: 'Storage & Credenzas', feature: 'filter-drawer', badge: 'Hot' as const },
    { label: 'Outdoor Living', feature: 'filter-dropdown', badge: 'Trend' as const },
  ],
  hoverStyles: [
    { label: 'Solid Oak Collection', style: 1, badge: 'Hot' as const },
    { label: 'Walnut & Leather', style: 2 },
    { label: 'Bouclé Seating', style: 3, badge: 'New' as const },
    { label: 'Cast Brass Accents', style: 4, badge: 'Trend' as const },
    { label: 'Natural Cane & Weave', style: 5 },
    { label: 'Handcrafted Ceramics', style: 6, badge: 'Hot' as const },
  ],
  myPages: [
    { label: 'My Saved Wishlist', route: 'wishlist' as PageRoute },
    { label: 'Shopping Bag', route: 'view-cart' as PageRoute },
    { label: 'Compare Designs', route: 'compare' as PageRoute },
    { label: 'Track Delivery', route: 'track-order' as PageRoute },
    { label: 'Customer Support', route: 'contact' as PageRoute },
  ],
};

export const PRODUCT_MEGA_MENU = {
  layouts: [
    { label: 'Accent Handcrafted Armchair', productId: 'prd-accent-chair' },
    { label: 'Solid White Oak Dining Table', productId: 'prd-dining-table' },
    { label: 'Ceramic Speckled Table Lamp', productId: 'prd-table-lamp' },
    { label: 'Sculptural Minimal Wall Shelf', productId: 'prd-wall-shelf' },
    { label: 'Cloud Linen Modern Sofa', productId: 'prd-modern-sofa' },
    { label: 'Scandinavian Lounge Chair', productId: 'prd-lounge-chair', badge: 'New' as const },
    { label: 'Handcrafted Oak Coffee Table', productId: 'prd-coffee-table', badge: 'Trend' as const },
  ],
  details: [
    { label: '360° Material Inspection', productId: 'prd-accent-chair' },
    { label: 'Wood Grain Zoom', productId: 'prd-dining-table', badge: 'Trend' as const },
    { label: 'Fabric Swatch Lightbox', productId: 'prd-modern-sofa', badge: 'New' as const },
    { label: 'Artisan Workshop Video', productId: 'prd-lounge-chair' },
    { label: 'Room Placement AR Preview', productId: 'prd-coffee-table', badge: 'Hot' as const },
    { label: 'White-Glove Assembly Delivery', productId: 'prd-table-lamp', badge: 'New' as const },
  ],
  features: [
    { label: 'Living Room Bundle Set', productId: 'prd-accent-chair', badge: 'New' as const },
    { label: 'Dining Table & Chairs Pair', productId: 'prd-dining-table' },
    { label: 'Volume Interior Discount', productId: 'prd-bed-frame', badge: 'New' as const },
    { label: 'In-Store Pickup Available', productId: 'prd-accent-chair' },
    { label: 'Made-To-Order Custom Wood', productId: 'prd-dining-table', badge: 'Trend' as const },
    { label: 'Buy 2 Get 15% On Lamps', productId: 'prd-table-lamp', badge: 'Hot' as const },
    { label: 'Handcrafted in Small Batches', productId: 'prd-storage-cabinet' },
  ],
  swatches: [
    { label: 'Caramel Tan Leather', productId: 'prd-accent-chair' },
    { label: 'Natural Solid White Oak', productId: 'prd-dining-table', badge: 'New' as const },
    { label: 'Warm Oatmeal Linen', productId: 'prd-modern-sofa' },
    { label: 'Speckled Sand Ceramic', productId: 'prd-table-lamp', badge: 'Hot' as const },
    { label: 'Smoked Walnut Finish', productId: 'prd-coffee-table' },
    { label: 'Velora Trade Program', productId: 'prd-bed-frame', badge: 'Hot' as const },
  ],
};

export interface OrderRecord {
  id: string;
  date: string;
  status: 'Processing' | 'In Transit' | 'Delivered';
  total: number;
  itemsCount: number;
  trackingNumber: string;
  shippingAddress: string;
  paymentMethod: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    variant?: string;
    image: string;
  }>;
}

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'VEL-2084',
    date: 'October 18, 2026',
    status: 'In Transit',
    total: 798.0,
    itemsCount: 2,
    trackingNumber: 'VEL-99284102-US',
    shippingAddress: '452 Broadway, SoHo, New York, NY 10013, USA',
    paymentMethod: 'Visa Ending in 4242',
    items: [
      {
        productId: 'prd-accent-chair',
        name: 'Accent Handcrafted Armchair',
        price: 299.0,
        quantity: 1,
        variant: 'Caramel Tan / Walnut',
        image: '/assets/images/velora/accent_chair_1792238568666.jpg',
      },
      {
        productId: 'prd-dining-table',
        name: 'Wooden Dining Table',
        price: 499.0,
        quantity: 1,
        variant: 'Solid White Oak 72"',
        image: '/assets/images/velora/wooden_dining_table_1792238585288.jpg',
      },
    ],
  },
  {
    id: 'VEL-2042',
    date: 'September 24, 2026',
    status: 'Delivered',
    total: 368.0,
    itemsCount: 2,
    trackingNumber: 'VEL-88412099-US',
    shippingAddress: '8420 Melrose Place, West Hollywood, CA 90069, USA',
    paymentMethod: 'PayPal Express',
    items: [
      {
        productId: 'prd-table-lamp',
        name: 'Ceramic Table Lamp',
        price: 119.0,
        quantity: 1,
        variant: 'Speckled Sand Ceramic',
        image: '/assets/images/velora/table_lamp_1792238629678.jpg',
      },
      {
        productId: 'prd-coffee-table',
        name: 'Solid Wood Coffee Table',
        price: 249.0,
        quantity: 1,
        variant: 'Natural Oak 36"',
        image: '/assets/images/velora/coffee_table_1792238692878.jpg',
      },
    ],
  },
  {
    id: 'VEL-2019',
    date: 'September 02, 2026',
    status: 'Delivered',
    total: 389.0,
    itemsCount: 1,
    trackingNumber: 'VEL-77104921-US',
    shippingAddress: '198 Regent St, Mayfair, London W1B 5TW, UK',
    paymentMethod: 'Apple Pay',
    items: [
      {
        productId: 'prd-lounge-chair',
        name: 'Nordic Minimalist Lounge Chair',
        price: 389.0,
        quantity: 1,
        variant: 'Oatmeal Wool / Natural Oak',
        image: '/assets/images/velora/lounge_chair_1792238676231.jpg',
      },
    ],
  },
];

export const STORE_LOCATIONS = [
  {
    id: 'store-1',
    name: 'New York SoHo Studio',
    address: '452 Broadway, SoHo, New York, NY 10013, USA',
    phone: '(+01) 212 555 0192',
    email: 'soho.velora@gmail.com',
    hours: 'Mon - Sat: 10:00 AM - 08:00 PM / Sun: 11:00 AM - 06:00 PM',
    image: '/assets/images/velora/velora_featured_living_room_1792220994104.jpg',
  },
  {
    id: 'store-2',
    name: 'Los Angeles Melrose Atelier',
    address: '8420 Melrose Place, West Hollywood, CA 90069, USA',
    phone: '(+01) 310 555 0148',
    email: 'la.velora@gmail.com',
    hours: 'Mon - Sun: 10:00 AM - 08:00 PM',
    image: '/assets/images/velora/velora_modern_living_vertical_1792220992751.jpg',
  },
  {
    id: 'store-3',
    name: 'London Mayfair Gallery',
    address: '198 Regent St., Mayfair, London W1B 5TW, UK',
    phone: '(+44) 20 7946 0921',
    email: 'london.velora@gmail.com',
    hours: 'Mon - Sat: 09:30 AM - 09:00 PM / Sun: 12:00 PM - 06:00 PM',
    image: '/assets/images/velora/dining_collection_1792238838818.jpg',
  },
  {
    id: 'store-4',
    name: 'Paris Le Marais Showroom',
    address: '28 Rue des Francs-Bourgeois, 75003 Paris, France',
    phone: '(+33) 1 42 68 55 10',
    email: 'paris.velora@gmail.com',
    hours: 'Tue - Sun: 10:30 AM - 07:30 PM',
    image: '/assets/images/velora/bedroom_collection_1792238800369.jpg',
  },
  {
    id: 'store-5',
    name: 'Chicago Lincoln Park Flagship',
    address: '830 W Armitage Ave, Chicago, IL 60614, USA',
    phone: '(+01) 312 555 0188',
    email: 'chicago.velora@gmail.com',
    hours: 'Mon - Sat: 10:00 AM - 08:00 PM / Sun: 11:00 AM - 06:00 PM',
    image: '/assets/images/velora/velora_hero_living_1792220991225.jpg',
  },
  {
    id: 'store-6',
    name: 'Miami Design District Gallery',
    address: '140 NE 39th St, Miami, FL 33137, USA',
    phone: '(+01) 305 555 0177',
    email: 'miami.velora@gmail.com',
    hours: 'Mon - Sat: 10:00 AM - 09:00 PM / Sun: 11:00 AM - 07:00 PM',
    image: '/assets/images/velora/outdoor_collection_1792238855472.jpg',
  },
];

export const FULL_FAQ_CATEGORIES = [
  {
    category: 'Orders & Purchases',
    items: [
      {
        q: 'How can I place an order with Velora?',
        a: 'Browse our curated collections by room or furniture type, select your preferred dimensions and wood/fabric finish, click Add to Cart, and proceed through our encrypted checkout.',
      },
      {
        q: 'Can I request wood finish or fabric samples?',
        a: 'Yes! We offer complimentary swatch boxes containing our solid oak, walnut, boucle, and full-grain leather samples delivered in 2 business days.',
      },
      {
        q: 'Can I modify or customize my order after placing it?',
        a: 'Orders can be modified within 24 hours of placement before entering our woodworking workshop. Simply contact our concierge team at concierge@veloraliving.com or call +1 (800) 555-0199.',
      },
    ],
  },
  {
    category: 'White Glove Shipping & Assembly',
    items: [
      {
        q: 'What does Complimentary White Glove Delivery include?',
        a: 'All orders over $1,500 qualify for complimentary white glove service: scheduling appointment, scheduled room-of-choice placement, complete solid wood assembly, and full removal of all protective packaging materials.',
      },
      {
        q: 'How do I track my furniture shipment?',
        a: 'Visit our Track Order page and enter your Velora Order ID (e.g., VEL-2084) along with your billing email to view real-time carrier milestones and scheduling windows.',
      },
    ],
  },
  {
    category: '30-Day Trial, Returns & Warranty',
    items: [
      {
        q: 'What is your 30-Day In-Home Trial policy?',
        a: 'We offer a 30-day risk-free in-home trial. Live with your handcrafted piece in your space; if it does not fit your home perfectly, our team will coordinate complimentary pickup for a full refund.',
      },
      {
        q: 'What is covered under the Velora 10-Year Warranty?',
        a: 'Every piece is protected by our 10-year structural warranty covering solid wood joinery, mortise-and-tenon construction, kiln-dried timber integrity, and structural hardware.',
      },
    ],
  },
  {
    category: 'Trade Program & Materials',
    items: [
      {
        q: 'Do you offer a trade program for interior designers?',
        a: 'Yes, certified interior designers, architects, and hospitality studios receive exclusive trade discounts (up to 25%), dedicated account management, and custom dimension capabilities.',
      },
      {
        q: 'Where is your solid timber and leather sourced?',
        a: 'We sustainably harvest certified American white oak and black walnut from FSC-managed forests, and use non-toxic, vegetable-tanned full-grain leathers and Oeko-Tex certified organic linens.',
      },
    ],
  },
];
