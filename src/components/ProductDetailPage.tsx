import React, { useState } from 'react';
import {
  ChevronRight,
  Star,
  Heart,
  ArrowLeftRight,
  Share2,
  HelpCircle,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Plus,
  Minus,
  Eye,
  Flame,
  CheckCircle2,
  ShoppingBag,
} from 'lucide-react';
import { ALL_PRODUCTS, ProductItem } from '../data/products';
import { ProductCard } from './ProductCard';
import { PageRoute } from '../data/siteRoutes';

interface ProductDetailPageProps {
  product: ProductItem;
  wishlist: ProductItem[];
  compareList: ProductItem[];
  onToggleWishlist: (p: ProductItem) => void;
  onToggleCompare: (p: ProductItem) => void;
  onQuickView: (p: ProductItem) => void;
  onAddToCart: (p: ProductItem, qty: number, variant?: string) => void;
  onBuyNow: (p: ProductItem, qty: number, variant?: string) => void;
  onSelectProduct: (p: ProductItem) => void;
  onNavigate: (route: PageRoute) => void;
  onOpenSizeGuide: () => void;
  onOpenAskQuestion: () => void;
  onOpenShare: () => void;
  formatPrice: (price: number) => string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  wishlist,
  compareList,
  onToggleWishlist,
  onToggleCompare,
  onQuickView,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  onNavigate,
  onOpenSizeGuide,
  onOpenAskQuestion,
  onOpenShare,
  formatPrice,
}) => {
  const currentProduct = product || ALL_PRODUCTS['prd-accent-chair'] || Object.values(ALL_PRODUCTS)[0];

  const galleryImages = [
    currentProduct.image,
    '/assets/images/velora/velora_hero_living_1792220991225.jpg',
    '/assets/images/velora/bedroom_collection_1792238800369.jpg',
    '/assets/images/velora/dining_collection_1792238838818.jpg',
  ];

  const [activeImage, setActiveImage] = useState<string>(currentProduct.image);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    currentProduct.variants?.[0] || 'Standard Edition'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [customerNote, setCustomerNote] = useState<string>('');
  const [activeDescTab, setActiveDescTab] = useState<
    'description' | 'reviews' | 'shipping' | 'returns'
  >('description');
  const [bundleChecked, setBundleChecked] = useState<Record<string, boolean>>({
    'prd-table-lamp': true,
    'prd-coffee-table': true,
  });

  // Reviews State
  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      author: 'Sophia Ramirez',
      date: 'October 02, 2026',
      rating: 5,
      title: 'Unmatched build quality and acoustic precision',
      comment:
        'Everything about this piece feels thoughtfully handcrafted. Solid wood joinery is exceptional and it elevated our living space instantly.',
    },
    {
      id: 'rev-2',
      author: 'Marcus Vance',
      date: 'September 21, 2026',
      rating: 5,
      title: 'Worth every penny — fast white-glove delivery',
      comment:
        'Packaging was pristine and finish verified immediately. The natural oak texture looks even better in person.',
    },
    {
      id: 'rev-3',
      author: 'Elena Rostova',
      date: 'September 14, 2026',
      rating: 5,
      title: 'Best upgrade I have made this year',
      comment:
        'Super comfortable and designed for timeless modern living. Truly exceptional quality.',
    },
  ]);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Sync activeImage when product changes
  React.useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedVariant(product.variants?.[0] || 'Standard Edition');
      setQuantity(1);
    }
  }, [product]);

  const isWishlisted = currentProduct ? wishlist.some((w) => w?.id === currentProduct.id) : false;
  const isCompared = currentProduct ? compareList.some((c) => c?.id === currentProduct.id) : false;

  const companionProducts = [
    ALL_PRODUCTS['prd-table-lamp'] || Object.values(ALL_PRODUCTS)[2],
    ALL_PRODUCTS['prd-coffee-table'] || Object.values(ALL_PRODUCTS)[3],
  ].filter((p): p is ProductItem => Boolean(p && p.id));

  const relatedProducts = Object.values(ALL_PRODUCTS)
    .filter((p, index, self): p is ProductItem =>
      Boolean(p && p.id && p.id !== currentProduct.id && self.findIndex((x) => x?.id === p.id) === index)
    )
    .slice(0, 4);

  const handleAddFrequentlyBoughtTogether = () => {
    onAddToCart(currentProduct, 1, selectedVariant);
    companionProducts.forEach((cp) => {
      if (cp && cp.id && bundleChecked[cp.id]) {
        onAddToCart(cp, 1, cp.variants?.[0]);
      }
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;
    setReviews((prev) => [
      {
        id: `rev-${Date.now()}`,
        author: newReviewName,
        date: 'Just now',
        rating: 5,
        title: newReviewTitle || 'Verified Purchase Review',
        comment: newReviewComment,
      },
      ...prev,
    ]);
    setNewReviewName('');
    setNewReviewTitle('');
    setNewReviewComment('');
    setReviewSubmitted(true);
  };

  return (
    <div className="pb-24">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[#E9E9E9] bg-[#F7F7F7] py-3.5">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#696E73]">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-[#101010]"
            >
              Home
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-[#B1B2B7]" />
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="hover:text-[#101010]"
            >
              {product.category}
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-[#B1B2B7]" />
            <span className="text-[#101010] font-medium line-clamp-1">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Product Section (Sticky Gallery Left + Contiguous Purchase Module Right) */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Sticky Gallery (6 cols) */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails Strip */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto no-scrollbar">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(imgUrl)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-[#F7F7F7] transition-all ${
                    activeImage === imgUrl
                      ? 'border-[#101010] scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} view ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Primary Zoomable Image */}
            <div className="relative flex-1 aspect-square overflow-hidden rounded-2xl bg-[#F7F7F7] group">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 rounded bg-[#DC4646] px-3 py-1 text-xs font-semibold text-white">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Right Contiguous Purchase Module (6 cols) */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#696E73]">
              <span>{product.category}</span>
              <span>·</span>
              <span className="text-[#3DAB25] inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> In Stock & Ready to Ship
              </span>
            </div>

            <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#101010] leading-tight">
              {product.name}
            </h1>

            {/* Rating & Sold Counter */}
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 text-[#FDB900]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="ml-1.5 text-xs font-medium text-[#696E73]">
                  ({product.reviewsCount} Reviews)
                </span>
              </div>
              <span className="h-3.5 w-px bg-[#E9E9E9]" />
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#DC4646]">
                <Flame className="h-4 w-4" />
                <span>18 sold in last 24 hours</span>
              </div>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3 tabular-nums">
              <span className="text-3xl font-bold text-[#DC4646]">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-[#B1B2B7] line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span className="rounded bg-[#DC4646]/10 px-2.5 py-0.5 text-xs font-semibold text-[#DC4646]">
                    Save {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Real-time Visitor Indicator */}
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#F7F7F7] px-3.5 py-2 text-xs text-[#696E73]">
              <Eye className="h-4 w-4 text-[#101010]" />
              <span>
                <strong className="text-[#101010]">24 people</strong> are viewing this handcrafted piece
                right now.
              </span>
            </div>

            <p className="mt-4 text-sm sm:text-base text-[#696E73] leading-relaxed">
              {product.description}
            </p>

            {/* Variant Swatches */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#101010]">
                    Option: <span className="text-[#696E73] font-normal">{selectedVariant}</span>
                  </label>
                  <button
                    type="button"
                    onClick={onOpenSizeGuide}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#101010] underline hover:text-[#DC4646]"
                  >
                    <Ruler className="h-3.5 w-3.5" />
                    <span>Specs & Size Guide</span>
                  </button>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {product.variants.map((v) => {
                    const active = selectedVariant === v;
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`rounded-lg border px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                          active
                            ? 'border-[#101010] bg-[#101010] text-white shadow-xs'
                            : 'border-[#E9E9E9] bg-white text-[#101010] hover:border-[#101010]'
                        }`}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Volume Discount Tiers */}
            <div className="mt-6 rounded-xl border border-[#E9E9E9] bg-[#F7F7F7]/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#101010]">
                Volume Bundle Pricing
              </p>
              <div className="mt-2.5 grid grid-cols-3 gap-2.5 text-center">
                {[
                  { qty: 1, label: 'Buy 1', discount: 'Standard' },
                  { qty: 2, label: 'Buy 2', discount: 'Save 10%' },
                  { qty: 3, label: 'Buy 3+', discount: 'Save 20%' },
                ].map((tier) => (
                  <button
                    key={tier.qty}
                    type="button"
                    onClick={() => setQuantity(tier.qty)}
                    className={`rounded-lg border p-2 text-xs transition-colors ${
                      quantity >= tier.qty
                        ? 'border-[#DC4646] bg-white font-semibold text-[#101010]'
                        : 'border-[#E9E9E9] bg-white text-[#696E73]'
                    }`}
                  >
                    <div className="font-bold text-[#101010]">{tier.label}</div>
                    <div className="text-[11px] text-[#DC4646]">{tier.discount}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper + Add to Cart + Wishlist + Compare */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-[#E9E9E9] bg-[#F7F7F7] px-3 py-2.5">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 text-[#696E73] hover:text-[#101010]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 text-sm font-semibold tabular-nums">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 text-[#696E73] hover:text-[#101010]"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onAddToCart(product, quantity, selectedVariant)}
                className="flex-1 rounded-full bg-[#101010] py-3.5 px-8 text-sm font-semibold text-white transition-colors hover:bg-[#DC4646] whitespace-nowrap"
              >
                Add to Cart — {formatPrice(product.price * quantity)}
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${
                  isWishlisted
                    ? 'border-[#DC4646] bg-[#DC4646] text-white'
                    : 'border-[#E9E9E9] text-[#101010] hover:border-[#101010]'
                }`}
                title="Add to Wishlist"
              >
                <Heart className="h-5 w-5" fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>

              <button
                type="button"
                onClick={() => onToggleCompare(product)}
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${
                  isCompared
                    ? 'border-[#DC4646] bg-[#DC4646] text-white'
                    : 'border-[#E9E9E9] text-[#101010] hover:border-[#101010]'
                }`}
                title="Compare"
              >
                <ArrowLeftRight className="h-5 w-5" />
              </button>
            </div>

            {/* Buy It Now Express Button */}
            <div className="mt-3">
              <button
                type="button"
                onClick={() => onBuyNow(product, quantity, selectedVariant)}
                className="w-full rounded-full bg-[#DC4646] py-3.5 px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Buy It Now — Instant Express Checkout
              </button>
            </div>

            {/* Extra Action Links: Ask a Question, Share, Size Chart */}
            <div className="mt-5 flex flex-wrap items-center gap-6 border-b border-[#E9E9E9] pb-5 text-xs font-medium text-[#696E73]">
              <button
                type="button"
                onClick={onOpenAskQuestion}
                className="inline-flex items-center gap-1.5 hover:text-[#101010]"
              >
                <HelpCircle className="h-4 w-4" />
                <span>Ask a Question</span>
              </button>
              <button
                type="button"
                onClick={onOpenSizeGuide}
                className="inline-flex items-center gap-1.5 hover:text-[#101010]"
              >
                <Ruler className="h-4 w-4" />
                <span>Technical Dimensions</span>
              </button>
              <button
                type="button"
                onClick={onOpenShare}
                className="inline-flex items-center gap-1.5 hover:text-[#101010]"
              >
                <Share2 className="h-4 w-4" />
                <span>Share Product</span>
              </button>
            </div>

            {/* Delivery & Trust Metadata */}
            <div className="mt-5 space-y-2.5 text-xs text-[#696E73]">
              <p className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#101010] shrink-0" />
                <span>
                  <strong className="text-[#101010]">Estimated Delivery:</strong> 2–4 Business Days
                  (Free Express Shipping over $150)
                </span>
              </p>
              <p className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-[#101010] shrink-0" />
                <span>
                  <strong className="text-[#101010]">Return Policy:</strong> 14-Day risk-free return
                  & exchange guarantee
                </span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#101010] shrink-0" />
                <span>
                  <strong className="text-[#101010]">SKU:</strong> {product.sku} · 2-Year Official
                  Manufacturer Warranty
                </span>
              </p>
            </div>

            {/* Frequently Bought Together Module (product-together.html feature) */}
            <div className="mt-8 rounded-2xl border border-[#E9E9E9] p-5">
              <h4 className="text-base font-semibold text-[#101010]">
                Frequently Bought Together
              </h4>
              <div className="mt-4 space-y-3">
                {companionProducts.filter((cp): cp is ProductItem => Boolean(cp && cp.id)).map((cp) => (
                  <label
                    key={cp.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-[#F7F7F7] p-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!bundleChecked[cp.id]}
                        onChange={(e) =>
                          setBundleChecked((prev) => ({ ...prev, [cp.id]: e.target.checked }))
                        }
                        className="h-4 w-4 rounded accent-[#18181B]"
                      />
                      <img
                        src={cp.image}
                        alt={cp.name}
                        referrerPolicy="no-referrer"
                        className="h-12 w-12 rounded-lg bg-white object-cover"
                      />
                      <div>
                        <p className="text-xs font-medium text-[#101010] line-clamp-1">
                          {cp.name}
                        </p>
                        <p className="text-xs font-semibold text-[#18181B] tabular-nums">
                          {formatPrice(cp.price)}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddFrequentlyBoughtTogether}
                className="mt-4 w-full rounded-lg bg-[#18181B] py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
              >
                Add Selected Bundle Items to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Description, Reviews & Policies Tabs */}
      <section className="border-t border-[#E9E9E9] bg-[#F7F7F7]/50 py-12 lg:py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          {/* Tab Headers */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 border-b border-[#E9E9E9] pb-4">
            {(
              [
                { id: 'description', label: 'Description & Specifications' },
                { id: 'reviews', label: `Customer Reviews (${reviews.length})` },
                { id: 'shipping', label: 'Shipping & Delivery' },
                { id: 'returns', label: 'Return Policies' },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveDescTab(t.id)}
                className={`pb-2 text-base sm:text-lg font-semibold transition-colors ${
                  activeDescTab === t.id
                    ? 'border-b-2 border-[#DC4646] text-[#101010]'
                    : 'text-[#696E73] hover:text-[#101010]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-8 max-w-4xl mx-auto">
            {activeDescTab === 'description' && (
              <div className="space-y-6 text-sm sm:text-base text-[#696E73] leading-relaxed">
                <p>{product.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-xl bg-white p-5 border border-[#E9E9E9]">
                    <h5 className="font-semibold text-[#101010] mb-2">
                      Artisan Woodcraft & Joinery Details
                    </h5>
                    <ul className="list-disc pl-5 space-y-1.5 text-sm">
                      <li>Solid FSC®-certified North American white oak & organic wax finish</li>
                      <li>Traditional mortise-and-tenon interlocking precision joinery</li>
                      <li>Natural linen / bouclé upholstery with stain-resistant weave</li>
                      <li>Architecturally balanced ergonomic slope for deep living comfort</li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-white p-5 border border-[#E9E9E9]">
                    <h5 className="font-semibold text-[#101010] mb-2">Included with Delivery</h5>
                    <ul className="list-disc pl-5 space-y-1.5 text-sm">
                      <li>1× Handcrafted {product.name}</li>
                      <li>Complimentary White Glove in-home placement & packaging removal</li>
                      <li>Organic natural wood maintenance wax & care cloth kit</li>
                      <li>10-Year Velora Structural Woodcraft Guarantee Card</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeDescTab === 'reviews' && (
              <div className="space-y-8">
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="rounded-xl border border-[#E9E9E9] bg-white p-5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#101010]">{rev.author}</span>
                          <span className="text-xs text-[#3DAB25] font-medium">
                            · Verified Buyer
                          </span>
                        </div>
                        <span className="text-xs text-[#B1B2B7]">{rev.date}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-0.5 text-[#FDB900]">
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <h6 className="mt-2 font-semibold text-sm text-[#101010]">{rev.title}</h6>
                      <p className="mt-1 text-sm text-[#696E73]">{rev.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Write a review form */}
                <form
                  onSubmit={handleReviewSubmit}
                  className="rounded-2xl border border-[#E9E9E9] bg-white p-6 space-y-4"
                >
                  <h5 className="text-lg font-semibold text-[#101010]">Write a Review</h5>
                  {reviewSubmitted && (
                    <p className="text-xs font-semibold text-[#3DAB25]">
                      Thank you! Your review has been published above.
                    </p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder="Your Name *"
                      className="rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                    />
                    <input
                      type="text"
                      value={newReviewTitle}
                      onChange={(e) => setNewReviewTitle(e.target.value)}
                      placeholder="Review Headline"
                      className="rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                    />
                  </div>
                  <textarea
                    rows={3}
                    required
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Share your experience with this product *"
                    className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-[#101010] px-7 py-2.5 text-xs font-semibold text-white hover:bg-[#DC4646] transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            )}

            {activeDescTab === 'shipping' && (
              <div className="rounded-xl border border-[#E9E9E9] bg-white p-6 space-y-3 text-sm text-[#696E73] leading-relaxed">
                <h5 className="text-base font-semibold text-[#101010]">
                  Fast Insured Worldwide Dispatch
                </h5>
                <p>
                  All orders placed before 3:00 PM CST are dispatched the same business day from our
                  Chicago, New York, or London fulfillment centers.
                </p>
                <p>
                  Complimentary Express Shipping is automatically unlocked on orders over $150.00.
                  Full real-time tracking is emailed immediately upon carrier pickup.
                </p>
              </div>
            )}

            {activeDescTab === 'returns' && (
              <div className="rounded-xl border border-[#E9E9E9] bg-white p-6 space-y-3 text-sm text-[#696E73] leading-relaxed">
                <h5 className="text-base font-semibold text-[#101010]">
                  14-Day Risk-Free Return & 2-Year Warranty
                </h5>
                <p>
                  If you are not 100% satisfied with your purchase, return it within 14 days for a
                  full refund to your original payment method or instant store credit.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products Carousel */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-14">
        <h3 className="font-serif-display text-2xl font-medium text-[#18181B] mb-8">Related Furniture & Decor</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.filter((rel): rel is ProductItem => Boolean(rel && rel.id)).map((rel) => (
            <div key={rel.id} className="flex flex-col">
              <ProductCard
                product={rel}
                isWishlisted={wishlist.some((w) => w?.id === rel.id)}
                isCompared={compareList.some((c) => c?.id === rel.id)}
                onToggleWishlist={onToggleWishlist}
                onToggleCompare={onToggleCompare}
                onQuickView={onQuickView}
                onAddToCart={(p) => onAddToCart(p, 1)}
                formatPrice={formatPrice}
              />
              <button
                type="button"
                onClick={() => onSelectProduct(rel)}
                className="mt-1.5 text-left text-xs font-semibold text-[#71717A] hover:text-[#18181B] underline"
              >
                View Details →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Bottom Add-to-Cart Bar */}
      <div className="fixed right-0 bottom-0 left-0 z-30 border-t border-[#E9E9E9] bg-white/95 py-3 px-4 shadow-lg backdrop-blur-xs">
        <div className="mx-auto max-w-[1440px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="h-11 w-11 rounded-lg bg-[#F7F7F7] object-cover"
            />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#101010] line-clamp-1">
                {product.name}
              </p>
              <p className="text-xs font-semibold text-[#DC4646] tabular-nums">
                {formatPrice(product.price)} · {selectedVariant}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onAddToCart(product, quantity, selectedVariant)}
              className="inline-flex items-center gap-2 rounded-full bg-[#101010] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#DC4646] transition-colors whitespace-nowrap"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
