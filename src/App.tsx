import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  ChevronDown,
  ArrowRight,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Globe,
  Sparkles,
  Users,
  Armchair,
  Flower2,
  Lamp,
  CookingPot,
  Layers,
  Archive,
  Sun,
  LayoutGrid,
  ChevronLeft,
  X,
  Menu,
} from 'lucide-react';
import {
  CATEGORIES,
  ALL_PRODUCTS,
  BEST_SELLERS_PRODUCTS,
  NEW_ARRIVALS_PRODUCTS,
  FEATURED_COLLECTIONS,
  LATEST_BLOG_POSTS,
  VELORA_TESTIMONIALS,
  ProductItem,
} from './data/products';
import { PageRoute, INITIAL_ORDERS, OrderRecord } from './data/siteRoutes';
import { ProductCard } from './components/ProductCard';
import { DrawersAndModals, CartItem } from './components/DrawersAndModals';
import { ShopCatalogPage } from './components/ShopCatalogPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CommercePages } from './components/CommercePages';
import { AccountAndUtilityPages } from './components/AccountAndUtilityPages';
import { ContentPages } from './components/ContentPages';

function getInitialDesktopMode(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    // 1. Google AI Studio preview iframe check:
    // When previewed inside Google AI Studio (window.self !== window.top), default to Desktop Storefront!
    const isInsideIframe = window.self !== window.top;
    if (isInsideIframe) {
      return true;
    }

    // 2. Pre-hydration script in index.html detected desktop mode:
    if (document.documentElement.classList.contains('velora-desktop-mode')) {
      return true;
    }

    const ua = navigator.userAgent || '';
    const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    // 3. Mobile browser "Desktop site" mode:
    // @ts-ignore
    const isClientHintDesktop = Boolean(navigator.userAgentData && navigator.userAgentData.mobile === false);
    const isSafariDesktop = /Macintosh/i.test(ua) && hasTouch;
    const isAndroidDesktop = hasTouch && !/Mobile/i.test(ua) && (/Android|Linux|X11/i.test(ua));

    if (hasTouch && (isClientHintDesktop || isSafariDesktop || isAndroidDesktop)) {
      return true;
    }

    // 4. Screen width check (tablets / laptops / desktops >= 768px):
    if (window.innerWidth >= 768) {
      return true;
    }
  } catch {}
  return true;
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Pure automatic desktop mode: true if on PC/laptop or if mobile browser has "Desktop site" enabled
  const [isDesktopForced, setIsDesktopForced] = useState<boolean>(getInitialDesktopMode);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopForced(getInitialDesktopMode());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation Route State
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [shopInitialCategory, setShopInitialCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(
    ALL_PRODUCTS['prd-accent-chair']
  );
  const [selectedBlogId, setSelectedBlogId] = useState<string>('blog-1');

  // Hero Slider State (01 / 03)
  const [heroSlideIdx, setHeroSlideIdx] = useState<number>(0);
  const heroSlides = [
    {
      subtitle: 'PREMIUM COLLECTION',
      title: 'Timeless Style\nModern Living',
      desc: 'Discover our handcrafted furniture that brings elegance, comfort and functionality to your everyday life.',
      image: '/assets/images/velora/velora_hero_living_1792220991225.jpg',
      badge: '01 / 03',
    },
    {
      subtitle: 'SCANDINAVIAN DESIGN',
      title: 'Minimal Beauty\nNatural Wood',
      desc: 'Thoughtfully constructed with sustainable solid oak and organic textures for peaceful sanctuaries.',
      image: '/assets/images/velora/bedroom_collection_1792238800369.jpg',
      badge: '02 / 03',
    },
    {
      subtitle: 'CURATED ESSENTIALS',
      title: 'Elevate Every Room\nWith Purpose',
      desc: 'Architectural lighting, sculptural tables, and tailored seating made to endure generation after generation.',
      image: '/assets/images/velora/velora_elevate_space_banner_1792220993953.jpg',
      badge: '03 / 03',
    },
  ];

  // Best Sellers Filter Tab State
  const [activeBestSellerTab, setActiveBestSellerTab] = useState<string>('All');

  // Search Query
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');

  // Cart, Wishlist, Modals State
  const [cart, setCart] = useState<CartItem[]>([
    { product: ALL_PRODUCTS['prd-accent-chair'], quantity: 1, selectedVariant: 'Caramel Tan / Walnut' },
    { product: ALL_PRODUCTS['prd-table-lamp'], quantity: 1, selectedVariant: 'Speckled Sand Ceramic' },
    { product: ALL_PRODUCTS['prd-coffee-table'], quantity: 1, selectedVariant: 'Natural Oak 36"' },
  ]);

  const [wishlist, setWishlist] = useState<ProductItem[]>([
    ALL_PRODUCTS['prd-accent-chair'],
    ALL_PRODUCTS['prd-dining-table'],
  ]);

  const [compareList, setCompareList] = useState<ProductItem[]>([
    ALL_PRODUCTS['prd-accent-chair'],
    ALL_PRODUCTS['prd-lounge-chair'],
  ]);

  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);
  const [activeOrderForInvoice, setActiveOrderForInvoice] = useState<OrderRecord>(INITIAL_ORDERS[0]);

  // Modal open states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot' | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<'store' | 'contact' | 'offers' | null>(null);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    setCategoriesDropdownOpen(false);
    setPagesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductPage = (product: ProductItem) => {
    setSelectedProduct(product);
    navigateTo('product-detail');
  };

  const handleOpenShopWithCategory = (catName: string) => {
    setShopInitialCategory(catName);
    navigateTo('shop');
  };

  const handleAddToCart = (product: ProductItem, qty = 1, variant?: string) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [...prev, { product, quantity: qty, selectedVariant: variant || product.variants?.[0] }];
    });
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (product: ProductItem) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleToggleCompare = (product: ProductItem) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, product];
    });
    setIsCompareOpen(true);
  };

  // Filtered Best Sellers
  const filteredBestSellers = BEST_SELLERS_PRODUCTS.filter((product) => {
    if (activeBestSellerTab === 'All') return true;
    return product.category.toLowerCase() === activeBestSellerTab.toLowerCase();
  });

  // Category Icon Renderer
  const renderCategoryIcon = (iconName: string) => {
    const props = { className: 'h-6 w-6 stroke-[1.5]' };
    switch (iconName) {
      case 'Armchair':
        return <Armchair {...props} />;
      case 'Flower2':
        return <Flower2 {...props} />;
      case 'Lamp':
        return <Lamp {...props} />;
      case 'CookingPot':
        return <CookingPot {...props} />;
      case 'Layers':
        return <Layers {...props} />;
      case 'Archive':
        return <Archive {...props} />;
      case 'Sun':
        return <Sun {...props} />;
      case 'LayoutGrid':
      default:
        return <LayoutGrid {...props} />;
    }
  };

  const currentHero = heroSlides[heroSlideIdx];

  return (
    <div
      className={`min-h-screen bg-white text-[#18181B] antialiased selection:bg-[#18181B] selection:text-white flex flex-col ${
        isDesktopForced ? 'w-[1280px] min-w-[1280px]' : 'w-full'
      }`}
    >
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#18181B] text-white text-[11px] py-2 px-4 sm:px-8 border-b border-white/10">
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => setInfoModal('offers')}
            className="font-normal tracking-wide text-neutral-300 truncate hover:text-white transition-colors text-left"
          >
            Complimentary White Glove Delivery on orders over $150 · Use Code <span className="font-semibold text-[#C88D66] underline">VELORA20</span> for 20% Off
          </button>
          <div className="hidden sm:flex items-center gap-4 text-neutral-400 shrink-0 ml-4">
            <button
              type="button"
              onClick={() => setInfoModal('contact')}
              className="hover:text-white transition-colors"
            >
              Concierge: +1 (800) 555-0199
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setInfoModal('store')}
              className="hover:text-white transition-colors"
            >
              Our Showrooms
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================
          1. HEADER NAVIGATION (PC Desktop: Logo, Full Links, Search, User, Heart, Cart)
         =================================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E4E4E7]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-4 lg:gap-6">
          {/* Logo + Mobile Hamburger + Navigation Links */}
          <div className="flex items-center gap-4 sm:gap-8 lg:gap-10">
            {/* Mobile Hamburger toggle (hidden when desktop site is active or on screens >= 768px) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className={`${
                isDesktopForced ? 'hidden' : 'md:hidden'
              } p-1.5 -ml-1 text-[#18181B] hover:text-[#71717A] transition-colors`}
              aria-label="Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateTo('home');
              }}
              className="text-left font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#18181B] hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Velora
            </button>

            {/* Desktop Nav Items (visible on desktop or when desktop site is forced) */}
            <nav
              className={`${
                isDesktopForced ? 'flex' : 'hidden md:flex'
              } items-center gap-6 lg:gap-7 text-sm font-medium text-[#71717A] whitespace-nowrap`}
            >
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className={`transition-colors hover:text-[#18181B] ${
                  currentRoute === 'home' ? 'text-[#18181B] font-semibold' : ''
                }`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => handleOpenShopWithCategory('')}
                className={`transition-colors hover:text-[#18181B] ${
                  currentRoute === 'shop' ? 'text-[#18181B] font-semibold' : ''
                }`}
              >
                Shop
              </button>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCategoriesDropdownOpen((v) => !v)}
                  className="inline-flex items-center gap-1 transition-colors hover:text-[#18181B]"
                >
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {categoriesDropdownOpen && (
                  <div
                    onMouseLeave={() => setCategoriesDropdownOpen(false)}
                    className="absolute top-full left-0 mt-2 w-52 rounded-xl border border-[#E4E4E7] bg-white p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-1"
                  >
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setCategoriesDropdownOpen(false);
                          handleOpenShopWithCategory(cat.name === 'More' ? '' : cat.name);
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-medium text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#18181B] transition-colors"
                      >
                        {renderCategoryIcon(cat.iconName)}
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Pages Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setPagesDropdownOpen((v) => !v)}
                  className="inline-flex items-center gap-1 transition-colors hover:text-[#18181B]"
                >
                  <span>Pages</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {pagesDropdownOpen && (
                  <div
                    onMouseLeave={() => setPagesDropdownOpen(false)}
                    className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-[#E4E4E7] bg-white p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-1"
                  >
                    {[
                      { label: 'About Us', route: 'about' as PageRoute },
                      { label: 'Featured Collections', route: 'collections' as PageRoute },
                      { label: 'Our Stores', route: 'our-store' as PageRoute },
                      { label: 'FAQs & Help', route: 'faq' as PageRoute },
                      { label: 'My Orders', route: 'account-orders' as PageRoute },
                      { label: 'Order Tracking', route: 'track-order' as PageRoute },
                      { label: 'Compare Products', route: 'compare' as PageRoute },
                    ].map((pg) => (
                      <button
                        key={pg.route}
                        type="button"
                        onClick={() => {
                          setPagesDropdownOpen(false);
                          navigateTo(pg.route);
                        }}
                        className="block w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#18181B] transition-colors"
                      >
                        {pg.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => navigateTo('blog')}
                className={`transition-colors hover:text-[#18181B] ${
                  currentRoute === 'blog' || currentRoute === 'blog-single'
                    ? 'text-[#18181B] font-semibold'
                    : ''
                }`}
              >
                Blog
              </button>

              <button
                type="button"
                onClick={() => navigateTo('contact')}
                className={`transition-colors hover:text-[#18181B] ${
                  currentRoute === 'contact' ? 'text-[#18181B] font-semibold' : ''
                }`}
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Right Header: Search Pill + User + Wishlist + Cart */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Desktop Pill Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (headerSearchQuery.trim()) {
                  handleOpenShopWithCategory(headerSearchQuery);
                }
              }}
              className={`relative ${
                isDesktopForced ? 'flex' : 'hidden md:flex'
              } items-center w-52 md:w-64 lg:w-80`}
            >
              <Search className="absolute left-3.5 h-3.5 w-3.5 text-[#A1A1AA] pointer-events-none" />
              <input
                type="text"
                value={headerSearchQuery}
                onChange={(e) => setHeaderSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-full border border-[#E4E4E7] bg-[#F4F4F5]/70 pl-9 pr-4 py-2 text-xs text-[#18181B] placeholder-[#A1A1AA] transition-colors focus:bg-white focus:border-[#18181B] focus:outline-none"
              />
            </form>

            {/* User Account */}
            <button
              type="button"
              onClick={() => setAuthModalMode('login')}
              className="p-1.5 text-[#18181B] hover:text-[#71717A] transition-colors"
              aria-label="Account"
            >
              <User className="h-5 w-5" strokeWidth={1.75} />
            </button>

            {/* Wishlist Button with Badge */}
            <button
              type="button"
              onClick={() => navigateTo('wishlist')}
              className="relative p-1.5 text-[#18181B] hover:text-[#71717A] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" strokeWidth={1.75} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#18181B] text-[10px] font-medium text-white tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button with Badge */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-[#18181B] hover:text-[#71717A] transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#18181B] text-[10px] font-medium text-white tabular-nums">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {!isDesktopForced && isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#E4E4E7] bg-white px-6 py-4 space-y-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (headerSearchQuery.trim()) {
                  setIsMobileMenuOpen(false);
                  handleOpenShopWithCategory(headerSearchQuery);
                }
              }}
              className="relative flex items-center w-full mb-3"
            >
              <Search className="absolute left-3.5 h-3.5 w-3.5 text-[#A1A1AA] pointer-events-none" />
              <input
                type="text"
                value={headerSearchQuery}
                onChange={(e) => setHeaderSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-full border border-[#E4E4E7] bg-[#F4F4F5] pl-9 pr-4 py-2 text-xs text-[#18181B] placeholder-[#A1A1AA]"
              />
            </form>
            <div className="grid grid-cols-2 gap-2 text-sm font-medium text-[#18181B]">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigateTo('home');
                }}
                className="text-left py-1.5 hover:text-[#71717A]"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigateTo('shop');
                }}
                className="text-left py-1.5 hover:text-[#71717A]"
              >
                Shop
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigateTo('collections');
                }}
                className="text-left py-1.5 hover:text-[#71717A]"
              >
                Collections
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigateTo('blog');
                }}
                className="text-left py-1.5 hover:text-[#71717A]"
              >
                Blog
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigateTo('contact');
                }}
                className="text-left py-1.5 hover:text-[#71717A]"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigateTo('track-order');
                }}
                className="text-left py-1.5 hover:text-[#71717A]"
              >
                Track Order
              </button>
            </div>
          </div>
        )}
      </header>

        {/* ===================================================================
            MAIN BODY CONTENT
           =================================================================== */}
        <main>
          {currentRoute === 'home' && (
            <div className="w-full px-8 lg:px-12 py-8 space-y-14">
              {/* -------------------------------------------------------------
                  2. HERO BANNER ("Timeless Style Modern Living")
                 ------------------------------------------------------------- */}
              <section className="relative overflow-hidden rounded-3xl bg-[#EBE7DF] h-[540px] flex items-center">
                <img
                  src={currentHero.image}
                  alt="Velora Modern Living"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/35 to-transparent" />

                <div className="relative z-10 max-w-xl p-14 lg:p-16">
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#71717A] mb-3">
                    {currentHero.subtitle}
                  </p>
                  <h1 className="font-serif-display text-5xl lg:text-[56px] leading-[1.08] font-normal text-[#18181B] whitespace-pre-line">
                    {currentHero.title}
                  </h1>
                  <p className="mt-4 text-sm sm:text-base text-[#52525B] leading-relaxed max-w-md">
                    {currentHero.desc}
                  </p>

                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => handleOpenShopWithCategory('')}
                      className="inline-flex items-center gap-2 rounded-full bg-[#18181B] px-8 py-3.5 text-xs sm:text-sm font-medium text-white transition-all duration-200 hover:bg-[#27272A] hover:gap-3"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Slider Controls Bottom Right (< > 01 / 03) */}
                <div className="absolute right-10 bottom-10 z-10 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setHeroSlideIdx((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
                    }
                    aria-label="Previous Slide"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-xs text-[#18181B] hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroSlideIdx((prev) => (prev + 1) % heroSlides.length)}
                    aria-label="Next Slide"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-xs text-[#18181B] hover:bg-white transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <span className="ml-2 font-medium text-xs sm:text-sm text-[#18181B] tabular-nums">
                    {currentHero.badge}
                  </span>
                </div>
              </section>

              {/* -------------------------------------------------------------
                  3. 8-CATEGORY STRIP (All 8 in ONE Row)
                 ------------------------------------------------------------- */}
              <section>
                <div
                  className={
                    isDesktopForced
                      ? 'grid grid-cols-8 gap-4'
                      : 'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4'
                  }
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleOpenShopWithCategory(cat.name === 'More' ? '' : cat.name)}
                      className="group flex flex-col items-center justify-center rounded-2xl border border-[#E4E4E7] bg-white py-5 px-3 text-center transition-all duration-200 hover:border-[#18181B] hover:shadow-sm"
                    >
                      <div className="text-[#18181B] transition-transform duration-200 group-hover:-translate-y-1">
                        {renderCategoryIcon(cat.iconName)}
                      </div>
                      <span className="mt-3 text-xs font-medium text-[#18181B]">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* -------------------------------------------------------------
                  4. MAIN ROW: Modern Living Spaces (Left) + Best Sellers (Center) + Trust & Blog (Right)
                 ------------------------------------------------------------- */}
              <section
                className={
                  isDesktopForced
                    ? 'grid grid-cols-12 gap-6 items-stretch'
                    : 'grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch'
                }
              >
                {/* Left Column: Modern Living Spaces (3 cols) */}
                <div className={isDesktopForced ? 'col-span-3' : 'md:col-span-4 lg:col-span-3'}>
                  <div className="relative overflow-hidden rounded-3xl bg-[#1C1917] h-full min-h-[420px] lg:min-h-[580px] flex flex-col justify-between p-7 text-white group">
                    <img
                      src="/assets/images/velora/velora_modern_living_vertical_1792220992751.jpg"
                      alt="Modern Living Spaces"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

                    <div className="relative z-10">
                      <h3 className="font-serif-display text-3xl font-medium leading-tight text-white">
                        Modern <br /> Living Spaces
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-neutral-300">
                        Quality Furniture for a Better Tomorrow.
                      </p>
                    </div>

                    <div className="relative z-10 pt-4">
                      <button
                        type="button"
                        onClick={() => handleOpenShopWithCategory('Furniture')}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-medium text-[#18181B] shadow-sm transition-all hover:bg-neutral-100"
                      >
                        <span>Shop Furniture</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Center Column: Best Sellers Grid (6 cols, 4 Products across) */}
                <div
                  className={
                    isDesktopForced
                      ? 'col-span-6 flex flex-col justify-between'
                      : 'md:col-span-8 lg:col-span-6 flex flex-col justify-between'
                  }
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <h2 className="font-serif-display text-3xl font-medium text-[#18181B]">
                        Best Sellers
                      </h2>

                      {/* Filter Tabs */}
                      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                        {['All', 'Furniture', 'Lighting', 'Kitchen', 'Textiles', 'Storage', 'Outdoor'].map(
                          (tab) => {
                            const active = activeBestSellerTab === tab;
                            return (
                              <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveBestSellerTab(tab)}
                                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                                  active
                                    ? 'bg-[#18181B] text-white'
                                    : 'text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5]'
                                }`}
                              >
                                {tab}
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>

                    {/* 4 Products in One Desktop Grid Row */}
                    <div
                      className={
                        isDesktopForced
                          ? 'grid grid-cols-4 gap-3.5'
                          : 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5'
                      }
                    >
                      {filteredBestSellers.slice(0, 4).map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          isWishlisted={wishlist.some((w) => w.id === product.id)}
                          onToggleWishlist={handleToggleWishlist}
                          onAddToCart={(p) => handleAddToCart(p, 1)}
                          onQuickView={handleOpenProductPage}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: 2 Stacked Cards (Trust Bar + Latest Blog) (3 cols) */}
                <div
                  className={
                    isDesktopForced
                      ? 'col-span-3 flex flex-col justify-between space-y-4'
                      : 'md:col-span-12 lg:col-span-3 flex flex-col justify-between space-y-4'
                  }
                >
                  {/* Trust Services Card */}
                  <div className="rounded-2xl border border-[#E4E4E7] bg-white p-5 space-y-4">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4F4F5] text-[#18181B]">
                        <Truck className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#18181B]">Free Shipping</h4>
                        <p className="text-[11px] text-[#71717A]">On orders over $100</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4F4F5] text-[#18181B]">
                        <RotateCcw className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#18181B]">Easy Returns</h4>
                        <p className="text-[11px] text-[#71717A]">30 days policy</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4F4F5] text-[#18181B]">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#18181B]">Secure Payment</h4>
                        <p className="text-[11px] text-[#71717A]">100% secure checkout</p>
                      </div>
                    </div>
                  </div>

                  {/* Latest Blog Card */}
                  <div className="rounded-2xl border border-[#E4E4E7] bg-white p-5">
                    <h4 className="font-serif-display text-base font-medium text-[#18181B] mb-3">
                      Latest Blog
                    </h4>
                    <div className="space-y-3">
                      {LATEST_BLOG_POSTS.map((post) => (
                        <button
                          key={post.id}
                          type="button"
                          onClick={() => {
                            setSelectedBlogId(post.id);
                            navigateTo('blog-single');
                          }}
                          className="group flex items-center gap-3 text-left w-full"
                        >
                          <img
                            src={post.image}
                            alt={post.title}
                            className="h-12 w-12 shrink-0 rounded-lg object-cover bg-[#F4F4F5]"
                          />
                          <div className="min-w-0">
                            <h5 className="text-xs font-medium text-[#18181B] line-clamp-1 group-hover:text-[#C88D66] transition-colors">
                              {post.title}
                            </h5>
                            <p className="text-[11px] text-[#A1A1AA] mt-0.5">{post.date}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* -------------------------------------------------------------
                  5. ELEVATE YOUR SPACE (Horizontal Mid-Banner)
                 ------------------------------------------------------------- */}
              <section className="relative overflow-hidden rounded-3xl bg-[#292524] h-[260px] flex items-center p-14 text-white group">
                <img
                  src="/assets/images/velora/velora_elevate_space_banner_1792220993953.jpg"
                  alt="Elevate Your Space"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                <div className="relative z-10 max-w-md">
                  <h3 className="font-serif-display text-4xl font-medium text-white">
                    Elevate Your Space
                  </h3>
                  <p className="mt-1.5 text-sm text-neutral-300">
                    Modern. Minimal. Timeless.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => handleOpenShopWithCategory('')}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-medium text-[#18181B] transition-all hover:bg-neutral-100"
                    >
                      <span>Shop Now</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </section>

              {/* -------------------------------------------------------------
                  6. FOUR TRUST PILLARS BAR (All 4 in ONE Row)
                 ------------------------------------------------------------- */}
              {/* -------------------------------------------------------------
                  6. FOUR TRUST PILLARS BAR (All 4 in ONE Row)
                 ------------------------------------------------------------- */}
              <section className="rounded-2xl border border-[#E4E4E7] bg-[#FAF9F6] py-6 px-6 sm:px-8">
                <div
                  className={
                    isDesktopForced
                      ? 'grid grid-cols-4 gap-4 sm:gap-6 text-left'
                      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left'
                  }
                >
                  <div className="flex items-center gap-3.5">
                    <Sparkles className="h-5 w-5 text-[#18181B] shrink-0 stroke-[1.5]" />
                    <div>
                      <h5 className="text-xs font-semibold text-[#18181B]">Premium Quality</h5>
                      <p className="text-[11px] text-[#71717A]">Crafted to last</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <Users className="h-5 w-5 text-[#18181B] shrink-0 stroke-[1.5]" />
                    <div>
                      <h5 className="text-xs font-semibold text-[#18181B]">Trusted Brand</h5>
                      <p className="text-[11px] text-[#71717A]">Over 10K+ happy customers</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <RotateCcw className="h-5 w-5 text-[#18181B] shrink-0 stroke-[1.5]" />
                    <div>
                      <h5 className="text-xs font-semibold text-[#18181B]">Easy Returns</h5>
                      <p className="text-[11px] text-[#71717A]">30 days hassle-free</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <Globe className="h-5 w-5 text-[#18181B] shrink-0 stroke-[1.5]" />
                    <div>
                      <h5 className="text-xs font-semibold text-[#18181B]">Global Shipping</h5>
                      <p className="text-[11px] text-[#71717A]">We ship worldwide</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* -------------------------------------------------------------
                  7. FEATURED COLLECTIONS (All 4 in ONE Row)
                 ------------------------------------------------------------- */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif-display text-3xl font-medium text-[#18181B]">
                    Featured Collections
                  </h2>
                  <button
                    type="button"
                    onClick={() => navigateTo('collections')}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#18181B] hover:gap-2 transition-all"
                  >
                    <span>View All Collections</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div
                  className={
                    isDesktopForced
                      ? 'grid grid-cols-4 gap-4'
                      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
                  }
                >
                  {FEATURED_COLLECTIONS.map((col) => (
                    <div
                      key={col.id}
                      className="group relative overflow-hidden rounded-2xl bg-neutral-100 aspect-[4/3] flex flex-col justify-end p-5 text-white"
                    >
                      <img
                        src={col.image}
                        alt={col.title}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      <div className="relative z-10">
                        <h4 className="font-serif-display text-xl font-medium text-white">
                          {col.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => handleOpenShopWithCategory(col.linkCategory)}
                          className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-white/90 hover:text-white group-hover:gap-1.5 transition-all"
                        >
                          <span>Shop Now</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* -------------------------------------------------------------
                  8. NEW ARRIVALS (All 6 in ONE Row)
                 ------------------------------------------------------------- */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif-display text-3xl font-medium text-[#18181B]">
                    New Arrivals
                  </h2>
                  <button
                    type="button"
                    onClick={() => handleOpenShopWithCategory('')}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#18181B] hover:gap-2 transition-all"
                  >
                    <span>View All</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div
                  className={
                    isDesktopForced
                      ? 'grid grid-cols-6 gap-3.5'
                      : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5'
                  }
                >
                  {NEW_ARRIVALS_PRODUCTS.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={wishlist.some((w) => w.id === product.id)}
                      onToggleWishlist={handleToggleWishlist}
                      onAddToCart={(p) => handleAddToCart(p, 1)}
                      onQuickView={handleOpenProductPage}
                    />
                  ))}
                </div>
              </section>

              {/* -------------------------------------------------------------
                  9. WHAT OUR CUSTOMERS SAY (Testimonials in Desktop Row)
                 ------------------------------------------------------------- */}
              <section className="rounded-3xl border border-[#E4E4E7] bg-[#FAF9F6] p-6 sm:p-10">
                <div
                  className={
                    isDesktopForced
                      ? 'grid grid-cols-12 gap-6 lg:gap-8 items-center'
                      : 'grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center'
                  }
                >
                  <div
                    className={
                      isDesktopForced
                        ? 'col-span-4 flex items-center gap-5'
                        : 'lg:col-span-4 flex items-center gap-5'
                    }
                  >
                    <img
                      src="/assets/images/velora/velora_featured_living_room_1792220994104.jpg"
                      alt="Happy home"
                      className="h-24 w-24 shrink-0 rounded-2xl object-cover"
                    />
                    <div>
                      <h3 className="font-serif-display text-2xl font-medium text-[#18181B]">
                        What Our Customers Say
                      </h3>
                      <p className="mt-1 text-xs text-[#71717A] leading-relaxed">
                        Real stories from real homes. See why thousands love Velora.
                      </p>
                    </div>
                  </div>

                  <div
                    className={
                      isDesktopForced
                        ? 'col-span-8 grid grid-cols-3 gap-4'
                        : 'lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4'
                    }
                  >
                    {VELORA_TESTIMONIALS.map((tes) => (
                      <div
                        key={tes.id}
                        className="rounded-2xl border border-[#E4E4E7] bg-white p-5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <img
                              src={tes.avatar}
                              alt={tes.author}
                              className="h-9 w-9 rounded-full object-cover"
                            />
                            <div>
                              <h5 className="text-xs font-semibold text-[#18181B]">{tes.author}</h5>
                              <div className="flex items-center text-[#F59E0B] text-xs">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-current" />
                                ))}
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-[#52525B] leading-relaxed italic">
                            "{tes.quote}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* -------------------------------------------------------------
                  10. JOIN OUR NEWSLETTER BANNER
                 ------------------------------------------------------------- */}
              <section className="relative overflow-hidden rounded-3xl bg-[#1C1917] py-12 px-14 text-white">
                <img
                  src="/assets/images/velora/velora_hero_living_1792220991225.jpg"
                  alt="Velora newsletter"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
                />
                <div className="relative z-10 max-w-xl">
                  <h3 className="font-serif-display text-3xl font-medium text-white">
                    Join Our Newsletter
                  </h3>
                  <p className="mt-1.5 text-sm text-neutral-300">
                    Get exclusive offers, new arrivals and inspiration straight to your inbox.
                  </p>

                  {newsletterSubmitted ? (
                    <div className="mt-5 rounded-full bg-emerald-950/80 border border-emerald-500/30 px-5 py-3 text-xs text-emerald-300">
                      Thank you for subscribing to Velora inspiration!
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (newsletterEmail.trim()) {
                          setNewsletterSubmitted(true);
                          setNewsletterEmail('');
                        }
                      }}
                      className="mt-6 flex items-center gap-3 max-w-md"
                    >
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full rounded-full bg-white px-5 py-3 text-xs text-[#18181B] placeholder-[#A1A1AA] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#18181B] border border-white/20 px-6 py-3 text-xs font-medium text-white hover:bg-neutral-800 transition-colors whitespace-nowrap"
                      >
                        <span>Subscribe</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </form>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* Subpages: Shop, Product Detail, Cart, Checkout, Account, etc. */}
          {currentRoute === 'shop' && (
            <ShopCatalogPage
              initialCategory={shopInitialCategory}
              wishlist={wishlist}
              compareList={compareList}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onToggleWishlist={handleToggleWishlist}
              onToggleCompare={handleToggleCompare}
              onQuickView={handleOpenProductPage}
              onOpenProductDetail={handleOpenProductPage}
              formatPrice={(p) => `$${p}`}
              onNavigate={navigateTo}
            />
          )}

          {currentRoute === 'product-detail' && (
            <ProductDetailPage
              product={selectedProduct}
              wishlist={wishlist}
              compareList={compareList}
              onAddToCart={(p, qty, v) => handleAddToCart(p, qty, v)}
              onBuyNow={(p, qty, v) => {
                handleAddToCart(p, qty, v);
                navigateTo('checkout');
              }}
              onToggleWishlist={handleToggleWishlist}
              onToggleCompare={handleToggleCompare}
              onQuickView={handleOpenProductPage}
              onSelectProduct={handleOpenProductPage}
              formatPrice={(p) => `$${p}`}
              onNavigate={navigateTo}
              onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
              onOpenAskQuestion={() => setInfoModal('contact')}
              onOpenShare={() => setIsShareModalOpen(true)}
            />
          )}

          {['view-cart', 'checkout', 'thank-you', 'invoice'].includes(currentRoute) && (
            <CommercePages
              route={currentRoute as 'view-cart' | 'checkout' | 'thank-you' | 'invoice'}
              cart={cart}
              wishlist={wishlist}
              compareList={compareList}
              onUpdateCartQty={(id, delta) => {
                setCart((prev) =>
                  prev
                    .map((item) =>
                      item.product.id === id
                        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                        : item
                    )
                    .filter((item) => item.quantity > 0)
                );
              }}
              onRemoveFromCart={(id) => setCart((prev) => prev.filter((i) => i.product.id !== id))}
              onAddToCart={(p, qty = 1, v) => handleAddToCart(p, qty, v)}
              onToggleWishlist={handleToggleWishlist}
              onToggleCompare={handleToggleCompare}
              onQuickView={handleOpenProductPage}
              onPlaceOrder={(order) => {
                setOrders((prev) => [order, ...prev]);
                setActiveOrderForInvoice(order);
                setCart([]);
                navigateTo('thank-you');
              }}
              activeOrder={activeOrderForInvoice}
              onNavigate={navigateTo}
              formatPrice={(p) => `$${p}`}
            />
          )}

          {['wishlist', 'compare', 'track-order', 'account-dashboard', 'account-orders', 'account-addresses', 'account-settings'].includes(
            currentRoute
          ) && (
            <AccountAndUtilityPages
              route={currentRoute as any}
              wishlist={wishlist}
              compareList={compareList}
              orders={orders}
              onToggleWishlist={handleToggleWishlist}
              onToggleCompare={handleToggleCompare}
              onRemoveCompare={(id) => setCompareList((prev) => prev.filter((p) => p.id !== id))}
              onQuickView={handleOpenProductPage}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onOpenProductDetail={handleOpenProductPage}
              onSelectOrderForInvoice={(ord) => {
                setActiveOrderForInvoice(ord);
                navigateTo('invoice');
              }}
              onNavigate={navigateTo}
              formatPrice={(p) => `$${p}`}
            />
          )}

          {['collections', 'blog', 'blog-single', 'about', 'our-store', 'contact', 'faq', 'shipping', 'returns', 'privacy', 'terms', '404'].includes(
            currentRoute
          ) && (
            <ContentPages
              route={currentRoute as any}
              selectedBlogId={selectedBlogId}
              onSelectBlog={(id) => {
                setSelectedBlogId(id);
                navigateTo('blog-single');
              }}
              onSelectCategoryForShop={(cat) => handleOpenShopWithCategory(cat)}
              onNavigate={navigateTo}
            />
          )}
        </main>

        {/* ===================================================================
            11. FOOTER (Velora Dark Luxury Desktop 4-Column Footer)
           =================================================================== */}
        <footer className="bg-[#111113] text-white pt-16 pb-12 border-t border-white/10 mt-16">
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
            <div
              className={
                isDesktopForced
                  ? 'grid grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10'
                  : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10'
              }
            >
              {/* Brand column (4 cols) */}
              <div className={isDesktopForced ? 'col-span-4' : 'col-span-1 sm:col-span-2 lg:col-span-4'}>
                <h3 className="font-serif-display text-3xl font-medium tracking-tight text-white">
                  Velora
                </h3>
                <p className="mt-2 text-sm text-neutral-400">Better Homes. Happier Lives.</p>
                <p className="mt-8 text-xs text-neutral-500">
                  © 2025 Velora. All rights reserved.
                </p>
              </div>

              {/* Quick Links (2 cols) */}
              <div className={isDesktopForced ? 'col-span-2' : 'col-span-1 lg:col-span-2'}>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
                  Quick Links
                </h5>
                <ul className="space-y-2.5 text-xs text-neutral-400">
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateTo('home')}
                      className="hover:text-white transition-colors"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateTo('shop')}
                      className="hover:text-white transition-colors"
                    >
                      Shop
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateTo('collections')}
                      className="hover:text-white transition-colors"
                    >
                      Categories
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateTo('about')}
                      className="hover:text-white transition-colors"
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateTo('contact')}
                      className="hover:text-white transition-colors"
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </div>

              {/* Help (2 cols) */}
              <div className={isDesktopForced ? 'col-span-2' : 'col-span-1 lg:col-span-2'}>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
                  Help
                </h5>
                <ul className="space-y-2.5 text-xs text-neutral-400">
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateTo('faq')}
                      className="hover:text-white transition-colors"
                    >
                      FAQs
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateTo('shipping')}
                      className="hover:text-white transition-colors"
                    >
                      Shipping & Returns
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateTo('track-order')}
                      className="hover:text-white transition-colors"
                    >
                      Track Order
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateTo('faq')}
                      className="hover:text-white transition-colors"
                    >
                      Size Guide
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => navigateTo('contact')}
                      className="hover:text-white transition-colors"
                    >
                      Customer Support
                    </button>
                  </li>
                </ul>
              </div>

              {/* Follow Us & Payment Methods (4 cols) */}
              <div className={isDesktopForced ? 'col-span-4 space-y-6' : 'col-span-1 sm:col-span-2 lg:col-span-4 space-y-6'}>
                <div>
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
                    Follow Us
                  </h5>
                  <div className="flex items-center gap-4 text-neutral-400 text-xs">
                    <span className="hover:text-white cursor-pointer">Facebook</span>
                    <span className="hover:text-white cursor-pointer">Instagram</span>
                    <span className="hover:text-white cursor-pointer">Pinterest</span>
                    <span className="hover:text-white cursor-pointer">YouTube</span>
                    <span className="hover:text-white cursor-pointer">X</span>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
                    Payment Methods
                  </h5>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-white/10 text-[11px] font-semibold text-white">
                      VISA
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white/10 text-[11px] font-semibold text-white">
                      MC
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white/10 text-[11px] font-semibold text-white">
                      PayPal
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white/10 text-[11px] font-semibold text-white">
                      ApplePay
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
              <p>© 2025 Velora. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigateTo('privacy')}
                  className="hover:text-neutral-300"
                >
                  Privacy Policy
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => navigateTo('terms')}
                  className="hover:text-neutral-300"
                >
                  Terms & Conditions
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => navigateTo('privacy')}
                  className="hover:text-neutral-300"
                >
                  Cookies
                </button>
              </div>
            </div>
          </div>
        </footer>

      {/* =====================================================================
          12. DRAWERS AND MODALS
         ===================================================================== */}
      <DrawersAndModals
        isCartOpen={isCartOpen}
        onCloseCart={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateCartQty={(productId, delta) => {
          setCart((prev) =>
            prev
              .map((item) =>
                item.product.id === productId
                  ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                  : item
              )
              .filter((item) => item.quantity > 0)
          );
        }}
        onRemoveFromCart={(productId) =>
          setCart((prev) => prev.filter((item) => item.product.id !== productId))
        }
        onClearCart={() => setCart([])}
        quickViewProduct={quickViewProduct}
        onCloseQuickView={() => setQuickViewProduct(null)}
        onAddToCartWithQty={handleAddToCart}
        onOpenFullProductPage={handleOpenProductPage}
        isCompareOpen={isCompareOpen}
        onCloseCompare={() => setIsCompareOpen(false)}
        compareList={compareList}
        onRemoveCompare={(id) => setCompareList((prev) => prev.filter((p) => p.id !== id))}
        onClearCompare={() => setCompareList([])}
        isWishlistOpen={isWishlistOpen}
        onCloseWishlist={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        isSearchOpen={isSearchOpen}
        onCloseSearch={() => setIsSearchOpen(false)}
        onSelectProduct={handleOpenProductPage}
        authModalMode={authModalMode}
        onSetAuthModalMode={setAuthModalMode}
        isSizeGuideOpen={isSizeGuideOpen}
        onCloseSizeGuide={() => setIsSizeGuideOpen(false)}
        isShareModalOpen={isShareModalOpen}
        onCloseShareModal={() => setIsShareModalOpen(false)}
        infoModal={infoModal}
        onCloseInfoModal={() => setInfoModal(null)}
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        formatPrice={(p) => `$${p}`}
      />
    </div>
  );
}
