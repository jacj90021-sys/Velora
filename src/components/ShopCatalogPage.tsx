import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  SlidersHorizontal,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  List,
  Star,
  Heart,
  ArrowLeftRight,
  Eye,
  X,
  Check,
  RotateCcw,
} from 'lucide-react';
import { ALL_PRODUCTS, CATEGORIES, ProductItem } from '../data/products';
import { ProductCard } from './ProductCard';
import { PageRoute } from '../data/siteRoutes';

interface ShopCatalogPageProps {
  initialCategory?: string;
  initialLayout?: 'default' | 'left-sidebar' | 'right-sidebar' | 'full-width' | 'sub-collection';
  initialHoverStyle?: number;
  wishlist: ProductItem[];
  compareList: ProductItem[];
  onToggleWishlist: (p: ProductItem) => void;
  onToggleCompare: (p: ProductItem) => void;
  onQuickView: (p: ProductItem) => void;
  onAddToCart: (p: ProductItem) => void;
  onOpenProductDetail: (p: ProductItem) => void;
  onNavigate: (route: PageRoute) => void;
  formatPrice: (price: number) => string;
}

export const ShopCatalogPage: React.FC<ShopCatalogPageProps> = ({
  initialCategory = '',
  initialLayout = 'left-sidebar',
  wishlist,
  compareList,
  onToggleWishlist,
  onToggleCompare,
  onQuickView,
  onAddToCart,
  onOpenProductDetail,
  onNavigate,
  formatPrice,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [layoutMode, setLayoutMode] = useState<
    'default' | 'left-sidebar' | 'right-sidebar' | 'full-width' | 'sub-collection'
  >(initialLayout);
  const [gridCols, setGridCols] = useState<2 | 3 | 4 | 'list'>(3);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>(
    'featured'
  );
  const [maxPrice, setMaxPrice] = useState<number>(120);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyOnSale, setOnlyOnSale] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const allProducts = useMemo(() => Object.values(ALL_PRODUCTS), []);

  const brands = ['Velora Studio', 'Nordic Atelier', 'Maison Oak', 'Aalto Craft', 'Fritz Living', 'Lumina'];
  const colors = [
    { name: 'Natural White Oak', hex: '#D8C5A8' },
    { name: 'Smoked Charcoal Oak', hex: '#1E1E22' },
    { name: 'Cognac Saddle Leather', hex: '#C88D66' },
    { name: 'Organic Oatmeal Linen', hex: '#E6E2D8' },
    { name: 'Forest Moss Wool', hex: '#4A5B47' },
  ];

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        if (selectedCategory) {
          const catMatch =
            p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            p.name.toLowerCase().includes(selectedCategory.toLowerCase());
          if (!catMatch) return false;
        }
        if (p.price > maxPrice) return false;
        if (onlyOnSale && !p.oldPrice && !p.badge) return false;
        if (selectedBrand && !p.name.toLowerCase().includes(selectedBrand.toLowerCase())) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [allProducts, selectedCategory, maxPrice, onlyOnSale, selectedBrand, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('');
    setMaxPrice(120);
    setOnlyInStock(false);
    setOnlyOnSale(false);
    setSelectedColor('');
    setSelectedBrand('');
    setSortBy('featured');
  };

  const renderFilterPanel = () => (
    <div className="space-y-7">
      {/* Categories Filter */}
      <div className="border-b border-[#E9E9E9] pb-6">
        <h5 className="text-base font-semibold text-[#101010] mb-3.5">Product Categories</h5>
        <ul className="space-y-2.5 text-sm">
          <li>
            <button
              type="button"
              onClick={() => setSelectedCategory('')}
              className={`flex w-full items-center justify-between text-left transition-colors ${
                selectedCategory === ''
                  ? 'font-semibold text-[#18181B]'
                  : 'text-[#696E73] hover:text-[#18181B]'
              }`}
            >
              <span>All Furniture & Living</span>
              <span className="text-xs tabular-nums">({allProducts.length})</span>
            </button>
          </li>
          {[
            { label: 'Living Room Furniture', key: 'Furniture', count: 48 },
            { label: 'Ambient Lighting', key: 'Lighting', count: 24 },
            { label: 'Dining & Kitchen', key: 'Kitchen', count: 19 },
            { label: 'Artisan Decor & Vases', key: 'Decor', count: 32 },
            { label: 'Organic Textiles & Rugs', key: 'Textiles', count: 27 },
            { label: 'Credenzas & Storage', key: 'Storage', count: 18 },
            { label: 'Outdoor Living', key: 'Outdoor', count: 15 },
          ].map((c) => (
            <li key={c.key}>
              <button
                type="button"
                onClick={() => setSelectedCategory(c.key)}
                className={`flex w-full items-center justify-between text-left transition-colors ${
                  selectedCategory === c.key
                    ? 'font-semibold text-[#18181B]'
                    : 'text-[#696E73] hover:text-[#18181B]'
                }`}
              >
                <span>{c.label}</span>
                <span className="text-xs tabular-nums">({c.count})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Availability & Sale Status */}
      <div className="border-b border-[#E9E9E9] pb-6">
        <h5 className="text-base font-semibold text-[#101010] mb-3.5">Availability</h5>
        <div className="space-y-2.5 text-sm">
          <label className="flex items-center justify-between cursor-pointer text-[#696E73] hover:text-[#101010]">
            <span className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="h-4 w-4 rounded border-[#E9E9E9] accent-[#101010]"
              />
              <span>In Stock Only</span>
            </span>
            <span className="text-xs tabular-nums">(10)</span>
          </label>
          <label className="flex items-center justify-between cursor-pointer text-[#696E73] hover:text-[#101010]">
            <span className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={onlyOnSale}
                onChange={(e) => setOnlyOnSale(e.target.checked)}
                className="h-4 w-4 rounded border-[#E9E9E9] accent-[#18181B]"
              />
              <span>On Sale / Discounted</span>
            </span>
            <span className="text-xs tabular-nums">(8)</span>
          </label>
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="border-b border-[#E9E9E9] pb-6">
        <h5 className="text-base font-semibold text-[#101010] mb-3.5">Filter by Price</h5>
        <input
          type="range"
          min={25}
          max={120}
          step={5}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#18181B] cursor-pointer"
        />
        <div className="mt-2 flex items-center justify-between text-xs font-medium text-[#696E73] tabular-nums">
          <span>Price: {formatPrice(0)}</span>
          <span className="text-[#101010] font-semibold">Up to {formatPrice(maxPrice)}</span>
        </div>
      </div>

      {/* Color Swatch Filter */}
      <div className="border-b border-[#E9E9E9] pb-6">
        <h5 className="text-base font-semibold text-[#101010] mb-3.5">Color Finish</h5>
        <div className="flex flex-wrap gap-2.5">
          {colors.map((c) => {
            const active = selectedColor === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(active ? '' : c.name)}
                title={c.name}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all ${
                  active
                    ? 'border-[#101010] bg-[#101010] text-white'
                    : 'border-[#E9E9E9] bg-white text-[#101010] hover:border-[#101010]'
                }`}
              >
                <span
                  className="h-3 w-3 rounded-full border border-black/15"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="pb-2">
        <h5 className="text-base font-semibold text-[#101010] mb-3.5">Makers & Studios</h5>
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => {
            const active = selectedBrand === b;
            return (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBrand(active ? '' : b)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? 'border-[#18181B] bg-[#18181B] text-white'
                    : 'border-[#E9E9E9] bg-[#F7F7F7] text-[#101010] hover:border-[#101010]'
                }`}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={handleResetFilters}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#71717A] hover:text-[#18181B] hover:underline"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        <span>Reset All Filters</span>
      </button>
    </div>
  );

  return (
    <div className="pb-16">
      {/* Page Title & Breadcrumb Banner (section-page-title) */}
      <section className="bg-[#F7F7F7] py-10 lg:py-14 text-center border-b border-[#E9E9E9]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-center gap-2 text-xs text-[#696E73] mb-2">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-[#101010] transition-colors"
            >
              Home
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-[#B1B2B7]" />
            <span className="text-[#101010] font-medium">
              {selectedCategory || 'Shop All Living'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#101010]">
            {selectedCategory ? `${selectedCategory} Collection` : 'Handcrafted Living & Architectural Lighting'}
          </h1>
          <p className="mt-2 text-sm text-[#696E73] max-w-xl mx-auto">
            Explore our curated catalog of solid white oak furniture, sculptural lighting,
            organic textured rugs, and artisanal home vessels designed for enduring tranquility.
          </p>

          {/* Sub-Collection Circular Strip if enabled */}
          <div className="mt-8 flex items-center justify-start sm:justify-center gap-5 overflow-x-auto no-scrollbar py-2">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  setSelectedCategory(cat.name === 'Learn More' ? '' : cat.name)
                }
                className="group flex flex-col items-center shrink-0"
              >
                <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white bg-white shadow-xs transition-transform group-hover:scale-105">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="mt-1.5 text-xs font-medium text-[#101010] group-hover:text-[#DC4646]">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Shop Controls & Layout */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-8 lg:pt-12">
        {/* Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E9E9E9] pb-5 mb-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-[#E9E9E9] bg-white px-4 py-2 text-xs font-semibold text-[#101010] hover:border-[#101010] transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filter</span>
            </button>

            {/* Layout Switcher Buttons */}
            <div className="hidden md:flex items-center gap-1 rounded-lg bg-[#F7F7F7] p-1">
              {(
                [
                  { id: 'left-sidebar', label: 'Left Sidebar' },
                  { id: 'default', label: 'No Sidebar' },
                  { id: 'right-sidebar', label: 'Right Sidebar' },
                ] as const
              ).map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLayoutMode(l.id)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                    layoutMode === l.id
                      ? 'bg-white text-[#101010] shadow-xs'
                      : 'text-[#696E73] hover:text-[#101010]'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <span className="text-xs text-[#696E73] tabular-nums">
              Showing <strong className="text-[#101010]">{filteredProducts.length}</strong> results
            </span>
          </div>

          {/* Right Grid Density & Sort Dropdown */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setGridCols(2)}
                title="2 Columns"
                className={`p-2 rounded-md border ${
                  gridCols === 2
                    ? 'border-[#101010] bg-[#101010] text-white'
                    : 'border-[#E9E9E9] text-[#696E73] hover:text-[#101010]'
                }`}
              >
                <Grid2X2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setGridCols(3)}
                title="3 Columns"
                className={`p-2 rounded-md border ${
                  gridCols === 3
                    ? 'border-[#101010] bg-[#101010] text-white'
                    : 'border-[#E9E9E9] text-[#696E73] hover:text-[#101010]'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setGridCols(4)}
                title="4 Columns"
                className={`p-2 rounded-md border ${
                  gridCols === 4
                    ? 'border-[#101010] bg-[#101010] text-white'
                    : 'border-[#E9E9E9] text-[#696E73] hover:text-[#101010]'
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setGridCols('list')}
                title="List View"
                className={`p-2 rounded-md border ${
                  gridCols === 'list'
                    ? 'border-[#101010] bg-[#101010] text-white'
                    : 'border-[#E9E9E9] text-[#696E73] hover:text-[#101010]'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <select
              aria-label="Sort products"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-lg border border-[#E9E9E9] bg-white px-3.5 py-2 text-xs font-medium text-[#101010] focus:border-[#101010] focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetically, A-Z</option>
            </select>
          </div>
        </div>

        {/* Active Filter Tags */}
        {(selectedCategory || selectedBrand || selectedColor || onlyOnSale || maxPrice < 120) && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#696E73]">Active Filters:</span>
            {selectedCategory && (
              <button
                type="button"
                onClick={() => setSelectedCategory('')}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F7F7] px-3 py-1 text-xs font-medium text-[#101010] hover:bg-[#DC4646] hover:text-white"
              >
                <span>Category: {selectedCategory}</span>
                <X className="h-3 w-3" />
              </button>
            )}
            {selectedBrand && (
              <button
                type="button"
                onClick={() => setSelectedBrand('')}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F7F7] px-3 py-1 text-xs font-medium text-[#101010] hover:bg-[#DC4646] hover:text-white"
              >
                <span>Brand: {selectedBrand}</span>
                <X className="h-3 w-3" />
              </button>
            )}
            {selectedColor && (
              <button
                type="button"
                onClick={() => setSelectedColor('')}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F7F7] px-3 py-1 text-xs font-medium text-[#101010] hover:bg-[#DC4646] hover:text-white"
              >
                <span>Color: {selectedColor}</span>
                <X className="h-3 w-3" />
              </button>
            )}
            {onlyOnSale && (
              <button
                type="button"
                onClick={() => setOnlyOnSale(false)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F7F7] px-3 py-1 text-xs font-medium text-[#101010] hover:bg-[#DC4646] hover:text-white"
              >
                <span>On Sale</span>
                <X className="h-3 w-3" />
              </button>
            )}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-semibold text-[#DC4646] underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Area with Optional Left or Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {layoutMode === 'left-sidebar' && (
            <aside className="hidden lg:block lg:col-span-3 pr-4">
              {renderFilterPanel()}
            </aside>
          )}

          <div
            className={
              layoutMode === 'left-sidebar' || layoutMode === 'right-sidebar'
                ? 'lg:col-span-9'
                : 'lg:col-span-12'
            }
          >
            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-[#E9E9E9] p-12 text-center">
                <p className="text-lg font-semibold text-[#101010]">
                  No products match your selected filters
                </p>
                <p className="mt-1 text-sm text-[#696E73]">
                  Try adjusting your price range or clearing active category filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-5 rounded-full bg-[#101010] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#DC4646] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : gridCols === 'list' ? (
              <div className="space-y-6">
                {filteredProducts.map((p) => {
                  const isWishlisted = wishlist.some((w) => w.id === p.id);
                  const isCompared = compareList.some((c) => c.id === p.id);
                  return (
                    <div
                      key={p.id}
                      className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-[#E9E9E9] p-4 sm:p-6 transition-shadow hover:shadow-md"
                    >
                      <button
                        type="button"
                        onClick={() => onOpenProductDetail(p)}
                        className="relative h-52 w-52 shrink-0 overflow-hidden rounded-xl bg-[#F7F7F7]"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      </button>

                      <div className="flex-1">
                        <p className="text-xs font-medium text-[#696E73]">
                          {p.category} · SKU: {p.sku}
                        </p>
                        <button
                          type="button"
                          onClick={() => onOpenProductDetail(p)}
                          className="mt-1 text-left text-lg font-semibold text-[#101010] hover:text-[#DC4646]"
                        >
                          {p.name}
                        </button>
                        <div className="mt-1.5 flex items-center gap-1 text-[#FDB900]">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-current" />
                          ))}
                          <span className="ml-1 text-xs text-[#696E73]">
                            ({p.reviewsCount} reviews)
                          </span>
                        </div>
                        <div className="mt-2.5 flex items-center gap-2 tabular-nums">
                          <span className="text-xl font-bold text-[#101010]">
                            {formatPrice(p.price)}
                          </span>
                          {p.oldPrice && (
                            <span className="text-sm text-[#B1B2B7] line-through">
                              {formatPrice(p.oldPrice)}
                            </span>
                          )}
                        </div>
                        <p className="mt-3 text-sm text-[#696E73] leading-relaxed">
                          {p.description}
                        </p>
                        <div className="mt-5 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => onAddToCart(p)}
                            className="rounded-lg bg-[#101010] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#27272A] transition-colors"
                          >
                            Add to Cart
                          </button>
                          <button
                            type="button"
                            onClick={() => onOpenProductDetail(p)}
                            className="rounded-lg border border-[#E9E9E9] px-4 py-2.5 text-xs font-semibold text-[#101010] hover:border-[#101010] transition-colors"
                          >
                            View Full Details
                          </button>
                          <button
                            type="button"
                            onClick={() => onToggleWishlist(p)}
                            className={`p-2.5 rounded-lg border ${
                              isWishlisted
                                ? 'border-[#101010] bg-[#101010] text-white'
                                : 'border-[#E9E9E9] text-[#101010] hover:border-[#101010]'
                            }`}
                            aria-label="Wishlist"
                          >
                            <Heart className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onToggleCompare(p)}
                            className={`p-2.5 rounded-lg border ${
                              isCompared
                                ? 'border-[#101010] bg-[#101010] text-white'
                                : 'border-[#E9E9E9] text-[#101010] hover:border-[#101010]'
                            }`}
                            aria-label="Compare"
                          >
                            <ArrowLeftRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  gridCols === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : gridCols === 4
                    ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-2 md:grid-cols-3'
                }`}
              >
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex flex-col">
                    <ProductCard
                      product={product}
                      isWishlisted={wishlist.some((w) => w.id === product.id)}
                      isCompared={compareList.some((c) => c.id === product.id)}
                      onToggleWishlist={onToggleWishlist}
                      onToggleCompare={onToggleCompare}
                      onQuickView={onQuickView}
                      onAddToCart={onAddToCart}
                      formatPrice={formatPrice}
                    />
                    <button
                      type="button"
                      onClick={() => onOpenProductDetail(product)}
                      className="mt-1.5 text-left text-xs font-semibold text-[#696E73] hover:text-[#C88D66] underline"
                    >
                      View Full Product Page →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {layoutMode === 'right-sidebar' && (
            <aside className="hidden lg:block lg:col-span-3 pl-4">
              {renderFilterPanel()}
            </aside>
          )}
        </div>
      </div>

      {/* Offcanvas Filter Drawer for Mobile / Filter Button */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-xs">
          <div className="flex h-full w-80 max-w-full flex-col bg-white p-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E9E9E9] pb-4 mb-5">
              <h4 className="text-lg font-semibold text-[#101010]">Filter Products</h4>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="rounded-full p-1 text-[#696E73] hover:text-[#101010]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {renderFilterPanel()}
          </div>
        </div>
      )}
    </div>
  );
};
