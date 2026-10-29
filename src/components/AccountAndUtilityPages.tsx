import React, { useState } from 'react';
import {
  ChevronRight,
  Heart,
  ArrowLeftRight,
  Trash2,
  Star,
  CheckCircle2,
  Truck,
  Package,
  MapPin,
  Settings,
  LogOut,
  LayoutDashboard,
  Clock,
  FileText,
  ShoppingBag,
} from 'lucide-react';
import { ProductItem, ALL_PRODUCTS } from '../data/products';
import { PageRoute, OrderRecord } from '../data/siteRoutes';
import { ProductCard } from './ProductCard';

interface AccountAndUtilityPagesProps {
  route:
    | 'wishlist'
    | 'compare'
    | 'track-order'
    | 'account-dashboard'
    | 'account-orders'
    | 'account-addresses'
    | 'account-settings';
  wishlist: ProductItem[];
  compareList: ProductItem[];
  orders: OrderRecord[];
  onToggleWishlist: (p: ProductItem) => void;
  onToggleCompare: (p: ProductItem) => void;
  onRemoveCompare: (id: string) => void;
  onQuickView: (p: ProductItem) => void;
  onAddToCart: (p: ProductItem) => void;
  onOpenProductDetail: (p: ProductItem) => void;
  onSelectOrderForInvoice: (order: OrderRecord) => void;
  onNavigate: (route: PageRoute) => void;
  formatPrice: (price: number) => string;
}

export const AccountAndUtilityPages: React.FC<AccountAndUtilityPagesProps> = ({
  route,
  wishlist,
  compareList,
  orders,
  onToggleWishlist,
  onToggleCompare,
  onRemoveCompare,
  onQuickView,
  onAddToCart,
  onOpenProductDetail,
  onSelectOrderForInvoice,
  onNavigate,
  formatPrice,
}) => {
  // Order Tracking State
  const [trackOrderId, setTrackOrderId] = useState('ORD-1084');
  const [trackEmail, setTrackEmail] = useState('sophia.ramirez@example.com');
  const [trackedOrderResult, setTrackedOrderResult] = useState<OrderRecord | null>(orders[0]);

  // Account Addresses State
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      label: 'Default Billing & Shipping',
      name: 'Sophia Ramirez',
      street: '600 N Michigan Ave, Suite 400',
      cityStateZip: 'Chicago, IL 60611, USA',
      phone: '(+01) 312 555 0199',
    },
    {
      id: 'addr-2',
      label: 'Work / Studio Office',
      name: 'Sophia Ramirez',
      street: '452 Broadway, Floor 3',
      cityStateZip: 'New York, NY 10013, USA',
      phone: '(+01) 212 555 0192',
    },
  ]);
  const [profileSaved, setProfileSaved] = useState(false);

  // =====================================================================
  // 1. WISHLIST PAGE (wishlist.html)
  // =====================================================================
  if (route === 'wishlist') {
    return (
      <div className="pb-20">
        <section className="bg-[#F7F7F7] py-10 text-center border-b border-[#E9E9E9]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-center gap-2 text-xs text-[#696E73] mb-2">
              <button type="button" onClick={() => onNavigate('home')}>
                Home
              </button>
              <ChevronRight className="h-3.5 w-3.5 text-[#B1B2B7]" />
              <span className="text-[#101010] font-medium">Your Wishlist</span>
            </div>
            <h1 className="text-3xl font-semibold text-[#101010]">Your Wishlist</h1>
          </div>
        </section>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-10">
          {wishlist.length === 0 ? (
            <div className="rounded-2xl border border-[#E9E9E9] p-12 text-center">
              <Heart className="mx-auto h-12 w-12 text-[#B1B2B7]" />
              <h3 className="mt-4 text-xl font-semibold text-[#101010]">Your wishlist is empty</h3>
              <p className="mt-1 text-sm text-[#696E73]">
                Save your favorite headphones, smartwatches, and gear here.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('shop')}
                className="mt-6 rounded-full bg-[#101010] px-8 py-3 text-xs font-semibold text-white hover:bg-[#DC4646]"
              >
                Explore Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <div key={product.id} className="flex flex-col">
                  <ProductCard
                    product={product}
                    isWishlisted={true}
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
                    className="mt-1.5 text-left text-xs font-semibold text-[#696E73] hover:text-[#DC4646] underline"
                  >
                    View Full Details →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // =====================================================================
  // 2. COMPARE PRODUCTS PAGE (compare.html)
  // =====================================================================
  if (route === 'compare') {
    const itemsToCompare =
      compareList.length > 0
        ? compareList.filter((p): p is ProductItem => Boolean(p && p.id))
        : [
            ALL_PRODUCTS['prd-accent-chair'],
            ALL_PRODUCTS['prd-dining-table'],
            ALL_PRODUCTS['prd-coffee-table'],
          ].filter((p): p is ProductItem => Boolean(p && p.id));

    return (
      <div className="pb-20">
        <section className="bg-[#F7F7F7] py-10 text-center border-b border-[#E9E9E9]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-center gap-2 text-xs text-[#696E73] mb-2">
              <button type="button" onClick={() => onNavigate('home')}>
                Home
              </button>
              <ChevronRight className="h-3.5 w-3.5 text-[#B1B2B7]" />
              <span className="text-[#101010] font-medium">Compare Products</span>
            </div>
            <h1 className="text-3xl font-semibold text-[#101010]">Compare Products</h1>
          </div>
        </section>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-10 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse rounded-2xl border border-[#E9E9E9] text-left text-sm">
            <thead>
              <tr className="border-b border-[#E9E9E9]">
                <th className="w-48 bg-[#F7F7F7] p-5 font-semibold text-[#101010]">
                  Product Overview
                </th>
                {itemsToCompare.map((item) => (
                  <th key={item.id} className="p-5 text-center align-top border-l border-[#E9E9E9]">
                    <div className="relative mx-auto w-44">
                      <button
                        type="button"
                        onClick={() => onRemoveCompare(item.id)}
                        className="absolute -top-2 -right-2 rounded-full bg-white p-1.5 text-[#696E73] shadow-xs hover:text-[#DC4646]"
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="mx-auto h-40 w-40 rounded-xl bg-[#F7F7F7] object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenProductDetail(item)}
                      className="mt-3 font-semibold text-[#101010] hover:text-[#DC4646] line-clamp-2"
                    >
                      {item.name}
                    </button>
                    <p className="mt-1 text-xs text-[#696E73]">{item.category}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E9E9]">
              <tr>
                <td className="bg-[#F7F7F7] p-4 font-semibold text-[#101010]">Price</td>
                {itemsToCompare.map((item) => (
                  <td
                    key={item.id}
                    className="p-4 text-center font-bold text-[#DC4646] border-l border-[#E9E9E9] tabular-nums"
                  >
                    {formatPrice(item.price)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="bg-[#F7F7F7] p-4 font-semibold text-[#101010]">Customer Rating</td>
                {itemsToCompare.map((item) => (
                  <td key={item.id} className="p-4 text-center border-l border-[#E9E9E9]">
                    <div className="inline-flex items-center gap-1 text-[#FDB900]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                      <span className="ml-1 text-xs text-[#696E73]">({item.reviewsCount})</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="bg-[#F7F7F7] p-4 font-semibold text-[#101010]">Availability</td>
                {itemsToCompare.map((item) => (
                  <td
                    key={item.id}
                    className="p-4 text-center text-xs font-semibold text-[#3DAB25] border-l border-[#E9E9E9]"
                  >
                    In Stock · Ready to Ship
                  </td>
                ))}
              </tr>
              <tr>
                <td className="bg-[#F7F7F7] p-4 font-semibold text-[#101010]">SKU</td>
                {itemsToCompare.map((item) => (
                  <td
                    key={item.id}
                    className="p-4 text-center text-xs text-[#696E73] border-l border-[#E9E9E9]"
                  >
                    {item.sku}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="bg-[#F7F7F7] p-4 font-semibold text-[#101010]">Key Highlights</td>
                {itemsToCompare.map((item) => (
                  <td
                    key={item.id}
                    className="p-4 text-center text-xs text-[#696E73] border-l border-[#E9E9E9] max-w-xs"
                  >
                    {item.description}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="bg-[#F7F7F7] p-4 font-semibold text-[#101010]">Action</td>
                {itemsToCompare.map((item) => (
                  <td key={item.id} className="p-4 text-center border-l border-[#E9E9E9]">
                    <button
                      type="button"
                      onClick={() => onAddToCart(item)}
                      className="rounded-full bg-[#101010] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#DC4646] transition-colors"
                    >
                      Add to Cart
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // =====================================================================
  // 3. ORDER TRACKING PAGE (track-order.html)
  // =====================================================================
  if (route === 'track-order') {
    const handleTrackSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const found =
        orders.find((o) => o.id.toLowerCase() === trackOrderId.trim().toLowerCase()) || orders[0];
      setTrackedOrderResult(found);
    };

    return (
      <div className="pb-20">
        <section className="bg-[#F7F7F7] py-10 text-center border-b border-[#E9E9E9]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-center gap-2 text-xs text-[#696E73] mb-2">
              <button type="button" onClick={() => onNavigate('home')}>
                Home
              </button>
              <ChevronRight className="h-3.5 w-3.5 text-[#B1B2B7]" />
              <span className="text-[#101010] font-medium">Order Tracking</span>
            </div>
            <h1 className="text-3xl font-semibold text-[#101010]">Order Tracking</h1>
            <p className="mt-2 text-sm text-[#696E73] max-w-lg mx-auto">
              To track your order please enter your Order ID in the box below and press the "Track
              Order" button.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-10">
          <form
            onSubmit={handleTrackSubmit}
            className="rounded-2xl border border-[#E9E9E9] bg-white p-6 sm:p-8 space-y-4 shadow-xs"
          >
            <div>
              <label className="block text-xs font-semibold text-[#101010] mb-1">
                Order ID *
              </label>
              <input
                type="text"
                required
                value={trackOrderId}
                onChange={(e) => setTrackOrderId(e.target.value)}
                placeholder="Found in your order confirmation email (e.g. ORD-1084)"
                className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#101010] mb-1">
                Billing Email *
              </label>
              <input
                type="email"
                required
                value={trackEmail}
                onChange={(e) => setTrackEmail(e.target.value)}
                placeholder="Email you used during checkout"
                className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[#101010] py-3.5 text-sm font-semibold text-white hover:bg-[#DC4646] transition-colors"
            >
              Track Order
            </button>
          </form>

          {trackedOrderResult && (
            <div className="mt-8 rounded-2xl border border-[#E9E9E9] bg-[#F7F7F7] p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E9E9E9] pb-4">
                <div>
                  <h4 className="text-lg font-semibold text-[#101010]">
                    Shipment Status: {trackedOrderResult.id}
                  </h4>
                  <p className="text-xs text-[#696E73]">
                    Carrier Tracking: <strong className="text-[#101010]">{trackedOrderResult.trackingNumber}</strong>
                  </p>
                </div>
                <span className="rounded-full bg-[#3DAB25]/15 px-3.5 py-1 text-xs font-semibold text-[#3DAB25]">
                  {trackedOrderResult.status}
                </span>
              </div>

              {/* 4-Step Progress Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                {[
                  { step: '1. Order Confirmed', time: 'Oct 08, 09:14 AM', done: true },
                  { step: '2. Quality Inspected', time: 'Oct 08, 02:30 PM', done: true },
                  { step: '3. In Transit (Express)', time: 'Current Stage', done: true },
                  {
                    step: '4. Out for Delivery',
                    time: 'Est. Tomorrow',
                    done: trackedOrderResult.status === 'Delivered',
                  },
                ].map((st, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border p-3.5 ${
                      st.done
                        ? 'border-[#101010] bg-white text-[#101010]'
                        : 'border-[#E9E9E9] bg-white/50 text-[#B1B2B7]'
                    }`}
                  >
                    <CheckCircle2
                      className={`h-4 w-4 mb-1.5 ${
                        st.done ? 'text-[#3DAB25]' : 'text-[#B1B2B7]'
                      }`}
                    />
                    <p className="font-semibold">{st.step}</p>
                    <p className="mt-0.5 text-[11px] text-[#696E73]">{st.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =====================================================================
  // 4. MY ACCOUNT PAGES (Dashboard / Orders / Addresses / Settings)
  // =====================================================================
  const accountNavItems = [
    { id: 'account-dashboard' as PageRoute, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'account-orders' as PageRoute, label: 'Your Orders', icon: Package },
    { id: 'account-addresses' as PageRoute, label: 'My Address', icon: MapPin },
    { id: 'account-settings' as PageRoute, label: 'Setting', icon: Settings },
  ];

  return (
    <div className="pb-20">
      <section className="bg-[#F7F7F7] py-10 text-center border-b border-[#E9E9E9]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-center gap-2 text-xs text-[#696E73] mb-2">
            <button type="button" onClick={() => onNavigate('home')}>
              Home
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-[#B1B2B7]" />
            <span className="text-[#101010] font-medium">My Account</span>
          </div>
          <h1 className="text-3xl font-semibold text-[#101010]">My Account</h1>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Account Sidebar (3 cols) */}
          <aside className="lg:col-span-3 rounded-2xl border border-[#E9E9E9] bg-[#F7F7F7] p-4 space-y-1">
            {accountNavItems.map((nav) => {
              const Icon = nav.icon;
              const active = route === nav.id;
              return (
                <button
                  key={nav.id}
                  type="button"
                  onClick={() => onNavigate(nav.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#101010] text-white'
                      : 'text-[#101010] hover:bg-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{nav.label}</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#DC4646] hover:bg-white transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </aside>

          {/* Right Account Content Area (9 cols) */}
          <div className="lg:col-span-9">
            {route === 'account-dashboard' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-[#101010]">
                    Hello, Sophia Ramirez!
                  </h3>
                  <p className="mt-1 text-sm text-[#696E73]">
                    From your account dashboard you can view your recent orders, manage your
                    shipping and billing addresses, and edit your password and account details.
                  </p>
                </div>

                {/* 3 Stat Boxes matching account-page.html */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="flex items-center justify-between rounded-2xl border border-[#E9E9E9] p-6">
                    <div>
                      <p className="text-xs text-[#696E73]">Awaiting Pickup / Transit</p>
                      <h4 className="mt-1 text-3xl font-bold text-[#101010] tabular-nums">4</h4>
                    </div>
                    <Clock className="h-8 w-8 text-[#DC4646]" />
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-[#E9E9E9] p-6">
                    <div>
                      <p className="text-xs text-[#696E73]">Completed Orders</p>
                      <h4 className="mt-1 text-3xl font-bold text-[#101010] tabular-nums">12</h4>
                    </div>
                    <ShoppingBag className="h-8 w-8 text-[#3DAB25]" />
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-[#E9E9E9] p-6">
                    <div>
                      <p className="text-xs text-[#696E73]">Total Rewards Points</p>
                      <h4 className="mt-1 text-3xl font-bold text-[#101010] tabular-nums">200</h4>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-[#101010]" />
                  </div>
                </div>

                {/* Recent Orders Table */}
                <div className="rounded-2xl border border-[#E9E9E9] overflow-hidden">
                  <div className="flex items-center justify-between border-b border-[#E9E9E9] bg-[#F7F7F7] px-6 py-4">
                    <h5 className="font-semibold text-[#101010]">Recent Orders</h5>
                    <button
                      type="button"
                      onClick={() => onNavigate('account-orders')}
                      className="text-xs font-semibold text-[#DC4646] hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-[#E9E9E9] text-xs font-semibold uppercase text-[#696E73]">
                          <th className="py-3.5 px-6">Order ID</th>
                          <th className="py-3.5 px-4">Date</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4">Total</th>
                          <th className="py-3.5 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E9E9E9]">
                        {orders.map((ord) => (
                          <tr key={ord.id}>
                            <td className="py-4 px-6 font-semibold text-[#101010]">{ord.id}</td>
                            <td className="py-4 px-4 text-[#696E73]">{ord.date}</td>
                            <td className="py-4 px-4">
                              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-[#3DAB25]">
                                {ord.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-semibold text-[#DC4646] tabular-nums">
                              {formatPrice(ord.total)} for {ord.itemsCount} items
                            </td>
                            <td className="py-4 px-6 text-right space-x-3">
                              <button
                                type="button"
                                onClick={() => onSelectOrderForInvoice(ord)}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-[#101010] underline hover:text-[#DC4646]"
                              >
                                <FileText className="h-3.5 w-3.5" />
                                <span>Invoice</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => onNavigate('track-order')}
                                className="text-xs font-semibold text-[#696E73] hover:text-[#101010]"
                              >
                                Track
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {route === 'account-orders' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-[#101010]">Your Order History</h3>
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="rounded-2xl border border-[#E9E9E9] p-6 space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E9E9E9] pb-4">
                        <div>
                          <span className="text-base font-bold text-[#101010]">{ord.id}</span>
                          <span className="ml-3 text-xs text-[#696E73]">Placed on {ord.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-[#3DAB25]">
                            {ord.status}
                          </span>
                          <button
                            type="button"
                            onClick={() => onSelectOrderForInvoice(ord)}
                            className="rounded-lg border border-[#E9E9E9] px-3.5 py-1.5 text-xs font-semibold text-[#101010] hover:border-[#101010]"
                          >
                            View Invoice
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="h-14 w-14 rounded-lg bg-[#F7F7F7] object-cover"
                            />
                            <div>
                              <p className="text-xs font-semibold text-[#101010] line-clamp-1">
                                {item.name}
                              </p>
                              <p className="text-xs text-[#696E73]">
                                Qty: {item.quantity} · {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {route === 'account-addresses' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-[#101010]">Saved Addresses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="rounded-2xl border border-[#E9E9E9] p-6 space-y-2"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#DC4646]">
                        {addr.label}
                      </span>
                      <h5 className="text-base font-semibold text-[#101010]">{addr.name}</h5>
                      <p className="text-sm text-[#696E73]">{addr.street}</p>
                      <p className="text-sm text-[#696E73]">{addr.cityStateZip}</p>
                      <p className="text-sm text-[#696E73]">{addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {route === 'account-settings' && (
              <div className="rounded-2xl border border-[#E9E9E9] p-6 sm:p-8 space-y-5">
                <h3 className="text-2xl font-semibold text-[#101010]">Account Settings</h3>
                {profileSaved && (
                  <div className="rounded-xl bg-emerald-50 p-3.5 text-xs font-semibold text-[#3DAB25]">
                    Your profile settings have been updated!
                  </div>
                )}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setProfileSaved(true);
                  }}
                  className="space-y-4 max-w-xl"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#101010] mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Sophia"
                        className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#101010] mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Ramirez"
                        className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#101010] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="sophia.ramirez@example.com"
                      className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-full bg-[#101010] px-7 py-3 text-xs font-semibold text-white hover:bg-[#DC4646] transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
