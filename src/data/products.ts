export interface ProductItem {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  hoverImage?: string;
  category: string;
  badge?: string;
  badgeType?: 'top-rated' | 'best-seller' | 'sale' | 'new';
  rating: number;
  reviewsCount: number;
  sku: string;
  description: string;
  variants?: string[];
}

export interface CategoryItem {
  id: string;
  name: string;
  iconName: string;
  count: number;
  image: string;
}

export const CATEGORIES: CategoryItem[] = [
  { id: 'cat-1', name: 'Furniture', iconName: 'Armchair', count: 48, image: '/assets/images/velora/accent_chair_1792238568666.jpg' },
  { id: 'cat-2', name: 'Decor', iconName: 'Flower2', count: 32, image: '/assets/images/velora/table_lamp_1792238629678.jpg' },
  { id: 'cat-3', name: 'Lighting', iconName: 'Lamp', count: 24, image: '/assets/images/velora/pendant_light_1792238706731.jpg' },
  { id: 'cat-4', name: 'Kitchen', iconName: 'CookingPot', count: 19, image: '/assets/images/velora/wooden_dining_table_1792238585288.jpg' },
  { id: 'cat-5', name: 'Textiles', iconName: 'Layers', count: 27, image: '/assets/images/velora/bed_frame_1792238726426.jpg' },
  { id: 'cat-6', name: 'Storage', iconName: 'Archive', count: 18, image: '/assets/images/velora/storage_cabinet_1792238766282.jpg' },
  { id: 'cat-7', name: 'Outdoor', iconName: 'Sun', count: 15, image: '/assets/images/velora/outdoor_collection_1792238855472.jpg' },
  { id: 'cat-8', name: 'More', iconName: 'LayoutGrid', count: 64, image: '/assets/images/velora/coffee_table_1792238692878.jpg' },
];

export const ALL_PRODUCTS: Record<string, ProductItem> = {
  'prd-accent-chair': {
    id: 'prd-accent-chair',
    name: 'Accent Chair',
    price: 299,
    image: '/assets/images/velora/accent_chair_1792238568666.jpg',
    category: 'Furniture',
    badge: 'Top Rated',
    badgeType: 'top-rated',
    rating: 4.6,
    reviewsCount: 124,
    sku: 'VEL-AC-101',
    description:
      'Ergonomic handcrafted accent armchair featuring warm caramel tan upholstery and kiln-dried solid walnut frame designed for supreme comfort.',
    variants: ['Caramel Tan / Walnut', 'Oatmeal Linen / Oak', 'Charcoal Velvet / Black'],
  },
  'prd-dining-table': {
    id: 'prd-dining-table',
    name: 'Wooden Dining Table',
    price: 499,
    image: '/assets/images/velora/wooden_dining_table_1792238585288.jpg',
    category: 'Furniture',
    badge: 'Best Seller',
    badgeType: 'best-seller',
    rating: 4.7,
    reviewsCount: 98,
    sku: 'VEL-DT-102',
    description:
      'Substantial solid natural oak dining table with rounded soften edges and tapered legs. Seats up to 6 people comfortably.',
    variants: ['Natural Oak 72"', 'Smoked Oak 84"', 'Walnut 72"'],
  },
  'prd-table-lamp': {
    id: 'prd-table-lamp',
    name: 'Table Lamp',
    price: 89,
    oldPrice: 129,
    image: '/assets/images/velora/table_lamp_1792238629678.jpg',
    category: 'Lighting',
    badge: 'Sale',
    badgeType: 'sale',
    rating: 4.6,
    reviewsCount: 87,
    sku: 'VEL-TL-103',
    description:
      'Artisanal speckled ceramic pottery lamp with warm textured finish and tailored natural linen drum shade with brass pull chain.',
    variants: ['Speckled Sand Ceramic', 'Matte Terracotta', 'Chalk White'],
  },
  'prd-wall-shelf': {
    id: 'prd-wall-shelf',
    name: 'Wall Shelf',
    price: 199,
    image: '/assets/images/velora/wall_shelf_1792238646916.jpg',
    category: 'Storage',
    badge: 'New',
    badgeType: 'new',
    rating: 4.5,
    reviewsCount: 76,
    sku: 'VEL-WS-104',
    description:
      'Multi-tier modular solid oak wall shelving system for modern display of books, greenery, and ceramics.',
    variants: ['Natural White Oak', 'Walnut', 'Bleached Ash'],
  },
  'prd-modern-sofa': {
    id: 'prd-modern-sofa',
    name: 'Modern Sofa',
    price: 799,
    image: '/assets/images/velora/modern_sofa_1792238665081.jpg',
    category: 'Furniture',
    rating: 4.6,
    reviewsCount: 52,
    sku: 'VEL-SF-201',
    description:
      'Clean-lined 3-seater living room couch with durable performance tweed fabric, high-resilience foam cushioning, and solid wooden legs.',
    variants: ['Heather Grey', 'Warm Oatmeal', 'Forest Olive'],
  },
  'prd-lounge-chair': {
    id: 'prd-lounge-chair',
    name: 'Lounge Chair',
    price: 349,
    image: '/assets/images/velora/accent_chair_1792238568666.jpg',
    category: 'Furniture',
    rating: 4.5,
    reviewsCount: 41,
    sku: 'VEL-LC-202',
    description:
      'Sculptural low-slung lounge armchair tailored with supple saddle leather and solid hand-finished timber.',
    variants: ['Cognac Leather / Oak', 'Boucle Ivory / Walnut'],
  },
  'prd-coffee-table': {
    id: 'prd-coffee-table',
    name: 'Coffee Table',
    price: 279,
    image: '/assets/images/velora/coffee_table_1792238692878.jpg',
    category: 'Furniture',
    rating: 4.7,
    reviewsCount: 68,
    sku: 'VEL-CT-203',
    description:
      'Minimalist circular coffee table with three rounded pillar legs crafted from FSC-certified solid oak.',
    variants: ['Natural Oak 36"', 'Smoked Ash 36"', 'Walnut 42"'],
  },
  'prd-pendant-light': {
    id: 'prd-pendant-light',
    name: 'Pendant Light',
    price: 129,
    image: '/assets/images/velora/pendant_light_1792238706731.jpg',
    category: 'Lighting',
    rating: 4.8,
    reviewsCount: 93,
    sku: 'VEL-PL-204',
    description:
      'Spun brass dome pendant light fixture with warm ambient downward illumination for kitchen islands and dining nooks.',
    variants: ['Brushed Brass', 'Matte Black', 'Warm White'],
  },
  'prd-bed-frame': {
    id: 'prd-bed-frame',
    name: 'Bed Frame',
    price: 599,
    image: '/assets/images/velora/bed_frame_1792238726426.jpg',
    category: 'Furniture',
    rating: 4.6,
    reviewsCount: 77,
    sku: 'VEL-BF-205',
    description:
      'Upholstered platform bed frame with gentle curved headboard in natural linen weave and reinforced hardwood slat foundation.',
    variants: ['Queen / Sand Linen', 'King / Sand Linen', 'Queen / Slate Grey'],
  },
  'prd-storage-cabinet': {
    id: 'prd-storage-cabinet',
    name: 'Storage Cabinet',
    price: 449,
    image: '/assets/images/velora/storage_cabinet_1792238766282.jpg',
    category: 'Storage',
    rating: 4.5,
    reviewsCount: 60,
    sku: 'VEL-SC-206',
    description:
      'Two-door Scandinavian credenza with natural woven cane door panels, soft-close hinges, and adjustable interior shelving.',
    variants: ['Natural Oak & Cane', 'Ebonized Black & Cane'],
  },
};

// Map legacy numeric IDs (prd-1 through prd-12) to valid products to guarantee no undefined lookups
ALL_PRODUCTS['prd-1'] = ALL_PRODUCTS['prd-accent-chair'];
ALL_PRODUCTS['prd-2'] = ALL_PRODUCTS['prd-dining-table'];
ALL_PRODUCTS['prd-3'] = ALL_PRODUCTS['prd-table-lamp'];
ALL_PRODUCTS['prd-4'] = ALL_PRODUCTS['prd-wall-shelf'];
ALL_PRODUCTS['prd-5'] = ALL_PRODUCTS['prd-coffee-table'];
ALL_PRODUCTS['prd-6'] = ALL_PRODUCTS['prd-pendant-light'];
ALL_PRODUCTS['prd-7'] = ALL_PRODUCTS['prd-bed-frame'];
ALL_PRODUCTS['prd-8'] = ALL_PRODUCTS['prd-storage-cabinet'];
ALL_PRODUCTS['prd-9'] = ALL_PRODUCTS['prd-lounge-chair'];
ALL_PRODUCTS['prd-10'] = ALL_PRODUCTS['prd-modern-sofa'];
ALL_PRODUCTS['prd-11'] = ALL_PRODUCTS['prd-accent-chair'];
ALL_PRODUCTS['prd-12'] = ALL_PRODUCTS['prd-dining-table'];

export const BEST_SELLERS_PRODUCTS: ProductItem[] = [
  ALL_PRODUCTS['prd-accent-chair'],
  ALL_PRODUCTS['prd-dining-table'],
  ALL_PRODUCTS['prd-table-lamp'],
  ALL_PRODUCTS['prd-wall-shelf'],
];

export const NEW_ARRIVALS_PRODUCTS: ProductItem[] = [
  ALL_PRODUCTS['prd-modern-sofa'],
  ALL_PRODUCTS['prd-lounge-chair'],
  ALL_PRODUCTS['prd-coffee-table'],
  ALL_PRODUCTS['prd-pendant-light'],
  ALL_PRODUCTS['prd-bed-frame'],
  ALL_PRODUCTS['prd-storage-cabinet'],
];

export const FEATURED_COLLECTIONS = [
  {
    id: 'col-living',
    title: 'Living Room',
    image: '/assets/images/velora/velora_featured_living_room_1792220994104.jpg',
    linkCategory: 'Furniture',
  },
  {
    id: 'col-bedroom',
    title: 'Bedroom',
    image: '/assets/images/velora/bedroom_collection_1792238800369.jpg',
    linkCategory: 'Furniture',
  },
  {
    id: 'col-dining',
    title: 'Dining Room',
    image: '/assets/images/velora/dining_collection_1792238838818.jpg',
    linkCategory: 'Furniture',
  },
  {
    id: 'col-outdoor',
    title: 'Outdoor',
    image: '/assets/images/velora/outdoor_collection_1792238855472.jpg',
    linkCategory: 'Outdoor',
  },
];

export const LATEST_BLOG_POSTS = [
  {
    id: 'blog-1',
    title: 'Interior Design Trends 2025',
    date: 'Apr 12, 2025',
    author: 'Elena Rostova',
    image: '/assets/images/blog/blog-1.jpg',
    excerpt: 'Explore warm minimalism, rich natural wood grain, and curved sculptural furniture shaping modern spaces.',
    content:
      'Explore warm minimalism, rich natural wood grain, and curved sculptural furniture shaping modern spaces. Embracing biophilic textures and earthy tones transforms modern homes into peaceful sanctuaries.',
  },
  {
    id: 'blog-2',
    title: 'Small Space Living Tips',
    date: 'Mar 28, 2025',
    author: 'Marcus Vance',
    image: '/assets/images/blog/blog-2.jpg',
    excerpt: 'Smart layouts and multi-functional statement pieces that maximize light and tranquility in compact homes.',
    content:
      'Smart layouts and multi-functional statement pieces that maximize light and tranquility in compact homes. Prioritizing vertical shelving and rounded silhouettes creates effortless flow.',
  },
  {
    id: 'blog-3',
    title: 'The Power of Natural Elements',
    date: 'Mar 15, 2025',
    author: 'Clara Hayes',
    image: '/assets/images/blog/blog-3.jpg',
    excerpt: 'Bringing organic textures, pottery, linen, and sustainable oak into your sanctuary for mindful everyday living.',
    content:
      'Bringing organic textures, pottery, linen, and sustainable oak into your sanctuary for mindful everyday living. Handcrafted ceramics and breathable linens provide timeless warmth.',
  },
];

export const BLOG_POSTS = LATEST_BLOG_POSTS;

export const VELORA_TESTIMONIALS = [
  {
    id: 'tes-1',
    author: 'Sarah Mitchell',
    avatar: '/assets/images/avatar/avatar-1.jpg',
    rating: 5,
    quote:
      'Absolutely love my new sofa! The quality is outstanding and it looks even better in person.',
  },
  {
    id: 'tes-2',
    author: 'James Carter',
    avatar: '/assets/images/avatar/avatar-2.jpg',
    rating: 5,
    quote:
      'Great customer service and fast delivery. The dining table is perfect for our home.',
  },
  {
    id: 'tes-3',
    author: 'Emily Roberts',
    avatar: '/assets/images/avatar/avatar-3.jpg',
    rating: 5,
    quote:
      'Velora has completely transformed my living space. Highly recommend!',
  },
];
