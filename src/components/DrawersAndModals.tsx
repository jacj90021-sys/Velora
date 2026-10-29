import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  ArrowLeftRight,
  Search,
  Star,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  FileText,
  Gift,
  Copy,
  Check,
  Store,
  Compass,
  User,
} from 'lucide-react';
import { ProductItem, ALL_PRODUCTS } from '../data/products';
import { PageRoute } from '../data/siteRoutes';

export interface CartItem {
  product: ProductItem;
  quantity: number;
  selectedVariant?: string;
}

interface DrawersAndModalsProps {
  // Cart Drawer
  isCartOpen: boolean;
  onCloseCart: () => void;
  cart: CartItem[];
  onUpdateCartQty: (productId: string, delta: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;

  // Quick View Modal
  quickViewProduct: ProductItem | null;
  onCloseQuickView: () => void;
  onAddToCartWithQty: (product: ProductItem, qty: number, variant?: string) => void;
  onOpenFullProductPage: (product: ProductItem) => void;

  // Compare Offcanvas
  isCompareOpen: boolean;
  onCloseCompare: () => void;
  compareList: ProductItem[];
  onRemoveCompare: (productId: string) => void;
  onClearCompare: () => void;

  // Wishlist Drawer
  isWishlistOpen: boolean;
  onCloseWishlist: () => void;
  wishlist: ProductItem[];
  onToggleWishlist: (product: ProductItem) => void;

  // Search Modal
  isSearchOpen: boolean;
  onCloseSearch: () => void;
  onSelectProduct: (product: ProductItem) => void;

  // Auth Modal (Login / Register / Forgot)
  authModalMode: 'login' | 'register' | 'forgot' | null;
  onSetAuthModalMode: (mode: 'login' | 'register' | 'forgot' | null) => void;

  // Size Guide / Share / Ask Question Modals
  isSizeGuideOpen: boolean;
  onCloseSizeGuide: () => void;
  isShareModalOpen: boolean;
  onCloseShareModal: () => void;

  // Store Info Modal (Our Store / Contact / Special Offers)
  infoModal: 'store' | 'contact' | 'offers' | null;
  onCloseInfoModal: () => void;

  // Navigation
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;

  formatPrice: (price: number) => string;
}

export const DrawersAndModals: React.FC<DrawersAndModalsProps> = ({
  isCartOpen,
  onCloseCart,
  cart,
  onUpdateCartQty,
  onRemoveFromCart,
  quickViewProduct,
  onCloseQuickView,
  onAddToCartWithQty,
  onOpenFullProductPage,
  isCompareOpen,
  onCloseCompare,
  compareList,
  onRemoveCompare,
  onClearCompare,
  isWishlistOpen,
  onCloseWishlist,
  wishlist,
  onToggleWishlist,
  isSearchOpen,
  onCloseSearch,
  onSelectProduct,
  authModalMode,
  onSetAuthModalMode,
  isSizeGuideOpen,
  onCloseSizeGuide,
  isShareModalOpen,
  onCloseShareModal,
  infoModal,
  onCloseInfoModal,
  currentRoute,
  onNavigate,
  formatPrice,
}) => {
  const [qvQty, setQvQty] = useState(1);
  const [qvVariant, setQvVariant] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Mini-Cart Tools State (Note / Shipping / Gift)
  const [activeCartTool, setActiveCartTool] = useState<'note' | 'shipping' | 'gift' | null>(null);
  const [cartNoteText, setCartNoteText] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  const [shippingRateMsg, setShippingRateMsg] = useState<string | null>(null);
  const [giftWrapAdded, setGiftWrapAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const subtotal =
    cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0) +
    (giftWrapAdded ? 5 : 0);
  const freeShippingThreshold = 150;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const allProductList = Object.values(ALL_PRODUCTS);
  const filteredSearchProducts = searchQuery.trim()
    ? allProductList.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allProductList.slice(0, 4);

  const recommendations = allProductList.slice(4, 7);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* =====================================================================
          1. SHOPPING CART OFFCANVAS DRAWER (with "You Might Like" & Cart Tools)
         ===================================================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
          {/* Left "You Might Like" Panel on Desktop */}
          <div className="hidden lg:flex w-64 flex-col border-r border-[#E9E9E9] bg-[#F7F7F7] p-5 overflow-y-auto">
            <h5 className="text-sm font-semibold text-[#101010] mb-4">You Might Like</h5>
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="rounded-xl bg-white p-3 shadow-xs">
                  <img
                    src={rec.image}
                    alt={rec.name}
                    referrerPolicy="no-referrer"
                    className="h-28 w-full rounded-lg bg-[#F7F7F7] object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      onCloseCart();
                      onOpenFullProductPage(rec);
                    }}
                    className="mt-2 text-left text-xs font-medium text-[#101010] hover:text-[#DC4646] line-clamp-1"
                  >
                    {rec.name}
                  </button>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#DC4646] tabular-nums">
                      {formatPrice(rec.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onAddToCartWithQty(rec, 1)}
                      className="rounded bg-[#101010] px-2 py-1 text-[10px] font-semibold text-white hover:bg-[#DC4646]"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Cart Column */}
          <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E9E9E9] px-6 py-4">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-[#101010]" />
                <h3 className="text-lg font-semibold text-[#101010]">
                  Shopping Cart ({totalCartCount})
                </h3>
              </div>
              <button
                type="button"
                onClick={onCloseCart}
                className="rounded-full p-1.5 text-[#696E73] transition-colors hover:bg-neutral-100 hover:text-[#101010]"
                aria-label="Close shopping cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="border-b border-[#E9E9E9] bg-[#F7F7F7] px-6 py-3.5">
              <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full bg-[#DC4646] transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
              <p className="text-xs text-[#696E73] tabular-nums">
                {subtotal >= freeShippingThreshold ? (
                  <span className="font-semibold text-[#3DAB25]">
                    Congratulations! You've unlocked FREE Express Shipping!
                  </span>
                ) : (
                  <>
                    Spend{' '}
                    <span className="font-semibold text-[#101010]">
                      {formatPrice(freeShippingThreshold - subtotal)}
                    </span>{' '}
                    more to enjoy <span className="font-semibold text-[#101010]">Free Shipping!</span>
                  </>
                )}
              </p>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-12 w-12 text-[#B1B2B7]" />
                  <p className="mt-3 text-base font-medium text-[#101010]">Your cart is empty</p>
                  <p className="mt-1 text-xs text-[#696E73]">
                    Explore our electronics categories and add your favorite gear.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onCloseCart();
                      onNavigate('shop');
                    }}
                    className="mt-5 rounded-full bg-[#101010] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#DC4646]"
                  >
                    Shop All Electronics
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-[#E9E9E9]">
                  {cart.map((item) => (
                    <li key={item.product.id} className="flex gap-4 py-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="h-20 w-20 shrink-0 rounded-lg bg-[#F7F7F7] object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                onCloseCart();
                                onOpenFullProductPage(item.product);
                              }}
                              className="text-left text-sm font-medium text-[#101010] hover:text-[#DC4646] line-clamp-2"
                            >
                              {item.product.name}
                            </button>
                            <button
                              type="button"
                              onClick={() => onRemoveFromCart(item.product.id)}
                              className="text-[#B1B2B7] hover:text-[#DC4646] transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          {item.selectedVariant && (
                            <p className="mt-0.5 text-xs text-[#696E73]">{item.selectedVariant}</p>
                          )}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center rounded border border-[#E9E9E9] bg-white">
                            <button
                              type="button"
                              onClick={() => onUpdateCartQty(item.product.id, -1)}
                              className="px-2 py-1 text-[#696E73] hover:text-[#101010]"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateCartQty(item.product.id, 1)}
                              className="px-2 py-1 text-[#696E73] hover:text-[#101010]"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-[#DC4646] tabular-nums">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Mini-Cart Tools (Order Note / Shipping / Gift Wrap) & Footer */}
            {cart.length > 0 && (
              <div className="border-t border-[#E9E9E9] bg-white p-6">
                {/* 3 Tool Icons Row */}
                <div className="mb-4 grid grid-cols-3 gap-2 border-b border-[#E9E9E9] pb-3">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveCartTool(activeCartTool === 'note' ? null : 'note')
                    }
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors ${
                      activeCartTool === 'note'
                        ? 'bg-[#101010] text-white'
                        : 'bg-[#F7F7F7] text-[#101010] hover:bg-neutral-200'
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Note</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveCartTool(activeCartTool === 'shipping' ? null : 'shipping')
                    }
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors ${
                      activeCartTool === 'shipping'
                        ? 'bg-[#101010] text-white'
                        : 'bg-[#F7F7F7] text-[#101010] hover:bg-neutral-200'
                    }`}
                  >
                    <Truck className="h-3.5 w-3.5" />
                    <span>Shipping</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveCartTool(activeCartTool === 'gift' ? null : 'gift')
                    }
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors ${
                      activeCartTool === 'gift'
                        ? 'bg-[#101010] text-white'
                        : 'bg-[#F7F7F7] text-[#101010] hover:bg-neutral-200'
                    }`}
                  >
                    <Gift className="h-3.5 w-3.5" />
                    <span>Gift</span>
                  </button>
                </div>

                {/* Expandable Cart Tool Panels */}
                {activeCartTool === 'note' && (
                  <div className="mb-4 rounded-xl bg-[#F7F7F7] p-3 space-y-2">
                    <textarea
                      rows={2}
                      value={cartNoteText}
                      onChange={(e) => setCartNoteText(e.target.value)}
                      placeholder="Add special instructions for your order..."
                      className="w-full rounded-lg border border-[#E9E9E9] bg-white p-2 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setActiveCartTool(null)}
                      className="w-full rounded-lg bg-[#101010] py-1.5 text-xs font-semibold text-white"
                    >
                      Save Note
                    </button>
                  </div>
                )}

                {activeCartTool === 'shipping' && (
                  <div className="mb-4 rounded-xl bg-[#F7F7F7] p-3 space-y-2">
                    <input
                      type="text"
                      value={shippingZip}
                      onChange={(e) => setShippingZip(e.target.value)}
                      placeholder="Enter Zip / Postal Code"
                      className="w-full rounded-lg border border-[#E9E9E9] bg-white px-3 py-1.5 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShippingRateMsg(
                          subtotal >= 150
                            ? 'Express Shipping: FREE ($0.00)'
                            : 'Standard Insured Shipping: $12.00'
                        )
                      }
                      className="w-full rounded-lg bg-[#101010] py-1.5 text-xs font-semibold text-white"
                    >
                      Estimate
                    </button>
                    {shippingRateMsg && (
                      <p className="text-[11px] font-semibold text-[#3DAB25]">{shippingRateMsg}</p>
                    )}
                  </div>
                )}

                {activeCartTool === 'gift' && (
                  <div className="mb-4 rounded-xl bg-[#F7F7F7] p-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#101010]">
                      Add Gift Wrap (+{formatPrice(5)})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setGiftWrapAdded(!giftWrapAdded);
                        setActiveCartTool(null);
                      }}
                      className="rounded-lg bg-[#101010] px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      {giftWrapAdded ? 'Remove' : 'Add Gift Wrap'}
                    </button>
                  </div>
                )}

                <div className="mb-4 flex items-center justify-between">
                  <span className="text-base font-medium text-[#696E73]">Subtotal</span>
                  <span className="text-xl font-bold text-[#101010] tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {/* View Cart & Checkout Full-Page Navigation Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onCloseCart();
                      onNavigate('view-cart');
                    }}
                    className="w-full rounded-full border border-[#101010] bg-white py-3 px-4 text-xs font-semibold text-[#101010] transition-colors hover:bg-[#101010] hover:text-white"
                  >
                    View Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onCloseCart();
                      onNavigate('checkout');
                    }}
                    className="w-full rounded-full bg-[#101010] py-3 px-4 text-xs font-semibold text-white transition-colors hover:bg-[#DC4646]"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          2. QUICK VIEW MODAL
         ===================================================================== */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-2">
            <button
              type="button"
              onClick={onCloseQuickView}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/90 p-2 text-[#101010] shadow-sm transition-colors hover:bg-[#101010] hover:text-white"
              aria-label="Close quick view"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center justify-center bg-[#F7F7F7] p-8">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                referrerPolicy="no-referrer"
                className="max-h-80 w-full object-contain"
              />
            </div>

            <div className="flex flex-col justify-between p-6 md:p-8">
              <div>
                <p className="text-xs font-medium text-[#696E73]">
                  {quickViewProduct.category} · SKU: {quickViewProduct.sku}
                </p>
                <h3 className="mt-1.5 text-xl font-semibold text-[#101010]">
                  {quickViewProduct.name}
                </h3>

                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-[#FDB900]">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#696E73]">
                    ({quickViewProduct.reviewsCount} Customer Reviews)
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-2.5 tabular-nums">
                  <span className="text-2xl font-bold text-[#DC4646]">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.oldPrice && (
                    <span className="text-sm text-[#B1B2B7] line-through">
                      {formatPrice(quickViewProduct.oldPrice)}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#696E73]">
                  {quickViewProduct.description}
                </p>

                {quickViewProduct.variants && quickViewProduct.variants.length > 0 && (
                  <div className="mt-5">
                    <label className="block text-xs font-semibold text-[#101010]">
                      Select Option:
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {quickViewProduct.variants.map((v) => {
                        const active = (qvVariant || quickViewProduct.variants![0]) === v;
                        return (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setQvVariant(v)}
                            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                              active
                                ? 'border-[#101010] bg-[#101010] text-white'
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
              </div>

              <div className="mt-6 pt-4 border-t border-[#E9E9E9] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center rounded-lg border border-[#E9E9E9] bg-white px-2 py-2">
                    <button
                      type="button"
                      onClick={() => setQvQty((q) => Math.max(1, q - 1))}
                      className="px-2 text-[#696E73] hover:text-[#101010]"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-3 text-sm font-semibold tabular-nums">{qvQty}</span>
                    <button
                      type="button"
                      onClick={() => setQvQty((q) => q + 1)}
                      className="px-2 text-[#696E73] hover:text-[#101010]"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onAddToCartWithQty(
                        quickViewProduct,
                        qvQty,
                        qvVariant || quickViewProduct.variants?.[0]
                      );
                      setQvQty(1);
                      onCloseQuickView();
                    }}
                    className="flex-1 rounded-lg bg-[#101010] py-3 px-5 text-sm font-semibold text-white transition-colors hover:bg-[#DC4646] whitespace-nowrap"
                  >
                    Add to Cart
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const p = quickViewProduct;
                    onCloseQuickView();
                    onOpenFullProductPage(p);
                  }}
                  className="w-full text-center text-xs font-semibold text-[#101010] underline hover:text-[#DC4646]"
                >
                  View Full Product Details →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          3. COMPARE DRAWER (BOTTOM OFFCANVAS)
         ===================================================================== */}
      {isCompareOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/50 backdrop-blur-xs">
          <div className="w-full bg-white p-6 shadow-2xl">
            <div className="mx-auto max-w-7xl">
              <div className="flex items-center justify-between border-b border-[#E9E9E9] pb-4">
                <div className="flex items-center gap-2">
                  <ArrowLeftRight className="h-5 w-5 text-[#101010]" />
                  <h4 className="text-lg font-semibold text-[#101010]">
                    Compare Products ({compareList.length})
                  </h4>
                </div>
                <div className="flex items-center gap-4">
                  {compareList.length > 0 && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          onCloseCompare();
                          onNavigate('compare');
                        }}
                        className="rounded-full bg-[#101010] px-5 py-2 text-xs font-semibold text-white hover:bg-[#DC4646]"
                      >
                        Open Compare Table
                      </button>
                      <button
                        type="button"
                        onClick={onClearCompare}
                        className="text-xs font-semibold text-[#DC4646] hover:underline"
                      >
                        Clear All
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={onCloseCompare}
                    className="rounded-full p-1 text-[#696E73] hover:text-[#101010]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {compareList.length === 0 ? (
                <p className="py-8 text-center text-sm text-[#696E73]">
                  No products added to compare. Click the compare icon on any product card to compare
                  specifications side by side.
                </p>
              ) : (
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {compareList.map((item) => (
                    <div
                      key={item.id}
                      className="relative flex items-center gap-3 rounded-xl border border-[#E9E9E9] p-3"
                    >
                      <button
                        type="button"
                        onClick={() => onRemoveCompare(item.id)}
                        className="absolute top-2 right-2 text-[#B1B2B7] hover:text-[#DC4646]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="h-16 w-16 shrink-0 rounded-lg bg-[#F7F7F7] object-cover"
                      />
                      <div className="pr-4">
                        <p className="text-xs font-medium text-[#101010] line-clamp-2">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-[#DC4646] tabular-nums">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          4. WISHLIST DRAWER
         ===================================================================== */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
          <div className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E9E9E9] px-6 py-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-[#DC4646]" />
                <h3 className="text-lg font-semibold text-[#101010]">
                  Wish List ({wishlist.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={onCloseWishlist}
                className="rounded-full p-1.5 text-[#696E73] hover:text-[#101010]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {wishlist.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Heart className="h-12 w-12 text-[#B1B2B7]" />
                  <p className="mt-3 text-base font-medium text-[#101010]">Your wishlist is empty</p>
                </div>
              ) : (
                <ul className="divide-y divide-[#E9E9E9]">
                  {wishlist.map((item) => (
                    <li key={item.id} className="flex items-center gap-4 py-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="h-16 w-16 shrink-0 rounded-lg bg-[#F7F7F7] object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="text-sm font-medium text-[#101010] line-clamp-1">
                          {item.name}
                        </h5>
                        <p className="mt-0.5 text-sm font-semibold text-[#DC4646] tabular-nums">
                          {formatPrice(item.price)}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              onAddToCartWithQty(item, 1);
                              onCloseWishlist();
                            }}
                            className="text-xs font-semibold text-[#101010] underline hover:text-[#DC4646]"
                          >
                            Move to Cart
                          </button>
                          <button
                            type="button"
                            onClick={() => onToggleWishlist(item)}
                            className="text-xs text-[#696E73] hover:text-[#DC4646]"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="border-t border-[#E9E9E9] p-6">
              <button
                type="button"
                onClick={() => {
                  onCloseWishlist();
                  onNavigate('wishlist');
                }}
                className="w-full rounded-full bg-[#101010] py-3 text-xs font-semibold text-white hover:bg-[#DC4646]"
              >
                Open Full Wishlist Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          5. SEARCH MODAL
         ===================================================================== */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-16 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E9E9E9] pb-4">
              <h4 className="text-lg font-semibold text-[#101010]">Search Velora Collections</h4>
              <button
                type="button"
                onClick={onCloseSearch}
                className="rounded-full p-1 text-[#696E73] hover:text-[#101010]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative mt-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dining tables, lounge chairs, lighting, ceramics, rugs..."
                autoFocus
                className="w-full rounded-xl border border-[#E9E9E9] bg-[#F7F7F7] py-3 pr-10 pl-4 text-sm text-[#101010] focus:border-[#101010] focus:bg-white focus:outline-none"
              />
              <Search className="absolute top-3.5 right-3.5 h-4 w-4 text-[#696E73]" />
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#696E73]">
                {searchQuery.trim() ? 'Matching Products' : 'Popular Products'}
              </p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filteredSearchProducts.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectProduct(item);
                      onCloseSearch();
                    }}
                    className="flex items-center gap-3 rounded-xl border border-[#E9E9E9] p-2.5 text-left transition-colors hover:border-[#101010]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="h-14 w-14 shrink-0 rounded-lg bg-[#F7F7F7] object-cover"
                    />
                    <div>
                      <p className="text-xs font-medium text-[#101010] line-clamp-1">{item.name}</p>
                      <p className="mt-1 text-xs font-semibold text-[#DC4646] tabular-nums">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          6. LOGIN / REGISTER / FORGOT PASSWORD MODAL
         ===================================================================== */}
      {authModalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setAuthSuccessMsg(null);
                onSetAuthModalMode(null);
              }}
              className="absolute top-4 right-4 rounded-full p-1.5 text-[#696E73] hover:text-[#101010]"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-2xl font-semibold text-[#101010]">
              {authModalMode === 'login' && 'Sign In'}
              {authModalMode === 'register' && 'Create An Account'}
              {authModalMode === 'forgot' && 'Forgot Password'}
            </h3>
            <p className="mt-1 text-sm text-[#696E73]">
              {authModalMode === 'login' && 'Welcome back! Sign in to access your orders and wishlist.'}
              {authModalMode === 'register' && 'Join Velora for member design previews and complimentary white glove delivery.'}
              {authModalMode === 'forgot' && 'Enter your email and we will send you a password reset link.'}
            </p>

            {authSuccessMsg ? (
              <div className="mt-6 space-y-4">
                <div className="rounded-xl bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-800">
                  {authSuccessMsg}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAuthSuccessMsg(null);
                    onSetAuthModalMode(null);
                    onNavigate('account-dashboard');
                  }}
                  className="w-full rounded-full bg-[#101010] py-3 text-xs font-semibold text-white hover:bg-[#27272A]"
                >
                  Go to My Account Dashboard
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setAuthSuccessMsg(
                    authModalMode === 'forgot'
                      ? 'Password reset instructions have been sent to your email.'
                      : 'Successfully signed in to your Velora account!'
                  );
                }}
                className="mt-6 space-y-4"
              >
                {authModalMode === 'register' && (
                  <div>
                    <label className="block text-xs font-medium text-[#101010]">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Sophia Ramirez"
                      className="mt-1 w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-[#101010]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                  />
                </div>
                {authModalMode !== 'forgot' && (
                  <div>
                    <label className="block text-xs font-medium text-[#101010]">Password *</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="mt-1 w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                    />
                  </div>
                )}

                {authModalMode === 'login' && (
                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-[#696E73]">
                      <input type="checkbox" className="rounded border-[#E9E9E9]" />
                      Remember me
                    </label>
                    <button
                      type="button"
                      onClick={() => onSetAuthModalMode('forgot')}
                      className="font-medium text-[#DC4646] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#101010] py-3 px-4 text-sm font-semibold text-white transition-colors hover:bg-[#DC4646]"
                >
                  {authModalMode === 'login' && 'Login'}
                  {authModalMode === 'register' && 'Register'}
                  {authModalMode === 'forgot' && 'Reset Password'}
                </button>
              </form>
            )}

            <div className="mt-6 border-t border-[#E9E9E9] pt-4 text-center text-xs text-[#696E73]">
              {authModalMode === 'login' ? (
                <>
                  New customer?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthSuccessMsg(null);
                      onSetAuthModalMode('register');
                    }}
                    className="font-semibold text-[#101010] underline hover:text-[#DC4646]"
                  >
                    Create your account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthSuccessMsg(null);
                      onSetAuthModalMode('login');
                    }}
                    className="font-semibold text-[#101010] underline hover:text-[#DC4646]"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          7. TECHNICAL DIMENSIONS / SIZE GUIDE MODAL (#findSize)
         ===================================================================== */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={onCloseSizeGuide}
              className="absolute top-4 right-4 rounded-full p-1.5 text-[#696E73] hover:text-[#101010]"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-semibold text-[#101010]">
              Furniture Dimensions & Room Clearance Guide
            </h3>
            <p className="mt-1 text-xs text-[#696E73]">
              Verify critical length, depth, and recommended space clearances for your living room or dining area.
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E9E9E9] bg-[#F7F7F7] font-semibold text-[#101010]">
                    <th className="p-3">Furniture Piece</th>
                    <th className="p-3">Dimensions (L × W × H)</th>
                    <th className="p-3">Recommended Clearance</th>
                    <th className="p-3">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E9E9] text-[#696E73]">
                  <tr>
                    <td className="p-3 font-medium text-[#101010]">4-Seater Solid Oak Dining Table</td>
                    <td className="p-3">160 × 90 × 75 cm</td>
                    <td className="p-3">Minimum 90 cm around perimeter</td>
                    <td className="p-3">48.0 kg</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-[#101010]">6–8 Seater Extendable Dining Table</td>
                    <td className="p-3">220–280 × 100 × 75 cm</td>
                    <td className="p-3">Fits 6–8 dining chairs comfortably</td>
                    <td className="p-3">68.5 kg</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-[#101010]">Nordic Bouclé Lounge Chair</td>
                    <td className="p-3">82 × 86 × 78 cm</td>
                    <td className="p-3">Seat height 44 cm · Recline slope 15°</td>
                    <td className="p-3">19.2 kg</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-[#101010]">Minimalist Low Platform Bed (Queen)</td>
                    <td className="p-3">215 × 168 × 85 cm</td>
                    <td className="p-3">Fits standard Queen (152 × 203 cm)</td>
                    <td className="p-3">62.0 kg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          8. SHARE PRODUCT MODAL (#share)
         ===================================================================== */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={onCloseShareModal}
              className="absolute top-4 right-4 rounded-full p-1.5 text-[#696E73] hover:text-[#101010]"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-semibold text-[#101010]">Share This Product</h3>
            <p className="mt-1 text-xs text-[#696E73]">
              Copy the direct link below to share with friends or colleagues.
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#E9E9E9] bg-[#F7F7F7] p-2">
              <input
                type="text"
                readOnly
                value={window.location.href}
                className="flex-1 bg-transparent px-2 text-xs text-[#101010] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="inline-flex items-center gap-1 rounded-lg bg-[#101010] px-3 py-2 text-xs font-semibold text-white hover:bg-[#DC4646]"
              >
                {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          9. STORE / CONTACT / SPECIAL OFFERS MODAL
         ===================================================================== */}
      {infoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 md:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setContactSubmitted(false);
                onCloseInfoModal();
              }}
              className="absolute top-4 right-4 rounded-full p-1.5 text-[#696E73] hover:text-[#101010]"
            >
              <X className="h-5 w-5" />
            </button>

            {infoModal === 'store' && (
              <div>
                <h3 className="text-xl font-semibold text-[#101010]">Velora Chicago Design Gallery</h3>
                <p className="mt-2 text-sm text-[#696E73]">
                  600 N Michigan Ave, Chicago, IL 60611, USA
                </p>
                <div className="mt-4 space-y-2 rounded-xl bg-[#F7F7F7] p-4 text-sm">
                  <p>
                    <strong className="text-[#101010]">Design Concierge:</strong> (+01) 1234 8888
                  </p>
                  <p>
                    <strong className="text-[#101010]">Email:</strong> chicago.velora@gmail.com
                  </p>
                  <p>
                    <strong className="text-[#101010]">Opening Hours:</strong> Mon – Sun: 9:00 AM –
                    8:00 PM CST
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onCloseInfoModal();
                    onNavigate('our-store');
                  }}
                  className="mt-5 w-full rounded-full bg-[#101010] py-3 text-xs font-semibold text-white hover:bg-[#27272A]"
                >
                  View All 6 Design Galleries
                </button>
              </div>
            )}

            {infoModal === 'offers' && (
              <div>
                <h3 className="text-xl font-semibold text-[#101010]">Special Velora Living Offers</h3>
                <p className="mt-2 text-sm text-[#696E73]">
                  Save up to 40% on our Bestselling Living Room & Lighting collections or unlock 20% off
                  your first order with our welcome promotion code.
                </p>
                <div className="mt-4 rounded-xl border border-[#C88D66]/30 bg-[#C88D66]/10 p-4">
                  <p className="text-xs font-semibold text-[#C88D66]">ACTIVE PROMO CODE</p>
                  <p className="mt-1 text-lg font-bold tracking-wider text-[#101010]">
                    VELORA20
                  </p>
                  <p className="mt-1 text-xs text-[#696E73]">
                    Enter VELORA20 at checkout or in your shopping cart for 20% off.
                  </p>
                </div>
              </div>
            )}

            {infoModal === 'contact' && (
              <div>
                <h3 className="text-xl font-semibold text-[#101010]">Inquire & Consult With An Artisan</h3>
                <p className="mt-1 text-sm text-[#696E73]">
                  Our interior architects and woodcraft specialists respond within 24 hours.
                </p>
                {contactSubmitted ? (
                  <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-800">
                    Thank you! Your message has been sent to our Chicago design advisory team.
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setContactSubmitted(true);
                    }}
                    className="mt-4 space-y-3"
                  >
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email *"
                      className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                    />
                    <textarea
                      required
                      rows={3}
                      placeholder="How can we help you?"
                      className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-[#101010] py-2.5 px-4 text-sm font-semibold text-white hover:bg-[#DC4646] transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          10. MOBILE BOTTOM TOOLBAR (tf-toolbar-bottom: Shop, Explore, Search, Wishlist, Account, Cart)
         ===================================================================== */}
      <div className="fixed right-0 bottom-0 left-0 z-40 grid grid-cols-5 border-t border-[#E9E9E9] bg-white py-2 px-2 shadow-lg xl:hidden">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${
            currentRoute === 'home' ? 'text-[#C88D66]' : 'text-[#101010]'
          }`}
        >
          <Store className="h-4 w-4" />
          <span>Home</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('shop')}
          className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${
            currentRoute === 'shop' ? 'text-[#C88D66]' : 'text-[#101010]'
          }`}
        >
          <Compass className="h-4 w-4" />
          <span>Shop</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('wishlist')}
          className={`relative flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${
            currentRoute === 'wishlist' ? 'text-[#C88D66]' : 'text-[#101010]'
          }`}
        >
          <Heart className="h-4 w-4" />
          <span>Wishlist</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('account-dashboard')}
          className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${
            currentRoute.startsWith('account') ? 'text-[#C88D66]' : 'text-[#101010]'
          }`}
        >
          <User className="h-4 w-4" />
          <span>Account</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('view-cart')}
          className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${
            currentRoute === 'view-cart' ? 'text-[#C88D66]' : 'text-[#101010]'
          }`}
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Cart ({totalCartCount})</span>
        </button>
      </div>
    </>
  );
};
