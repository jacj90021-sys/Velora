import React, { useState } from 'react';
import {
  ChevronRight,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Gift,
  FileText,
  Printer,
  ArrowRight,
} from 'lucide-react';
import { CartItem } from './DrawersAndModals';
import { ALL_PRODUCTS, ProductItem } from '../data/products';
import { PageRoute, OrderRecord } from '../data/siteRoutes';
import { ProductCard } from './ProductCard';

interface CommercePagesProps {
  route: 'view-cart' | 'checkout' | 'thank-you' | 'invoice';
  cart: CartItem[];
  wishlist: ProductItem[];
  compareList: ProductItem[];
  onUpdateCartQty: (productId: string, delta: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onAddToCart: (p: ProductItem, qty?: number, variant?: string) => void;
  onToggleWishlist: (p: ProductItem) => void;
  onToggleCompare: (p: ProductItem) => void;
  onQuickView: (p: ProductItem) => void;
  onPlaceOrder: (order: OrderRecord) => void;
  activeOrder: OrderRecord;
  onNavigate: (route: PageRoute) => void;
  formatPrice: (price: number) => string;
}

export const CommercePages: React.FC<CommercePagesProps> = ({
  route,
  cart,
  wishlist,
  compareList,
  onUpdateCartQty,
  onRemoveFromCart,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  onQuickView,
  onPlaceOrder,
  activeOrder,
  onNavigate,
  formatPrice,
}) => {
  // Cart & Checkout States
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [giftWrap, setGiftWrap] = useState<boolean>(false);
  const [orderNote, setOrderNote] = useState<string>('');
  const [shippingCountry, setShippingCountry] = useState('United States');
  const [shippingState, setShippingState] = useState('Illinois');
  const [postalCode, setPostalCode] = useState('60611');
  const [shippingEstimateMsg, setShippingEstimateMsg] = useState<string | null>(null);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);

  // Checkout Billing Form States
  const [firstName, setFirstName] = useState('Sophia');
  const [lastName, setLastName] = useState('Ramirez');
  const [email, setEmail] = useState('sophia.ramirez@example.com');
  const [phone, setPhone] = useState('+1 (312) 555-0199');
  const [address, setAddress] = useState('600 N Michigan Ave, Suite 400');
  const [city, setCity] = useState('Chicago');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'cod'>('card');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 12.0;
  const giftWrapFee = giftWrap ? 5.0 : 0;
  const discountAmount = subtotal * appliedDiscount;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee + giftWrapFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = couponCode.trim().toUpperCase();
    if (normalized === 'VELORA20' || normalized === 'VELORA') {
      setAppliedDiscount(0.2);
    } else if (normalized === 'VELORA30') {
      setAppliedDiscount(0.3);
    } else if (normalized) {
      setAppliedDiscount(0.1);
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const newOrder: OrderRecord = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      }),
      status: 'Processing',
      total: finalTotal,
      itemsCount: cart.reduce((a, b) => a + b.quantity, 0),
      trackingNumber: `VEL-${Math.floor(10000000 + Math.random() * 90000000)}-US`,
      shippingAddress: `${address}, ${city}, ${shippingState} ${postalCode}, ${shippingCountry}`,
      paymentMethod:
        paymentMethod === 'card'
          ? 'Credit Card (Visa •••• 4242)'
          : paymentMethod === 'paypal'
          ? 'PayPal Express'
          : 'Cash on Delivery (COD)',
      items: cart.map((c) => ({
        productId: c.product.id,
        name: c.product.name,
        price: c.product.price,
        quantity: c.quantity,
        variant: c.selectedVariant || 'Standard',
        image: c.product.image,
      })),
    };
    onPlaceOrder(newOrder);
  };

  // =====================================================================
  // 1. INVOICE PAGE (invoice.html)
  // =====================================================================
  if (route === 'invoice') {
    return (
      <div className="bg-[#F7F7F7] py-12 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 sm:p-12 shadow-sm border border-[#E9E9E9]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E9E9E9] pb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-[#101010]">
                  VELORA<span className="text-[#C88D66]">.</span>
                </span>
              </div>
              <p className="mt-2 text-xs text-[#696E73]">
                600 N Michigan Ave, Chicago, IL 60611, USA · (+01) 1234 8888 · client@velora.com
              </p>
            </div>
            <div className="sm:text-right">
              <h1 className="text-2xl font-bold text-[#101010]">Velora Invoice</h1>
              <p className="mt-1 text-xs font-semibold text-[#18181B]">
                Invoice #{activeOrder.id}
              </p>
              <p className="text-xs text-[#696E73]">Issued: {activeOrder.date}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#696E73]">
                Billed & Shipped To
              </p>
              <p className="mt-1 font-semibold text-[#101010]">Sophia Ramirez</p>
              <p className="text-[#696E73]">{activeOrder.shippingAddress}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#696E73]">
                Payment & Carrier Info
              </p>
              <p className="mt-1 font-semibold text-[#101010]">{activeOrder.paymentMethod}</p>
              <p className="text-[#696E73]">Tracking: {activeOrder.trackingNumber}</p>
              <p className="text-xs font-semibold text-[#3DAB25] mt-1">
                Status: {activeOrder.status}
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E9E9E9] text-xs font-semibold uppercase tracking-wider text-[#696E73]">
                  <th className="py-3">Item Description</th>
                  <th className="py-3">Option</th>
                  <th className="py-3 text-center">Qty</th>
                  <th className="py-3 text-right">Unit Price</th>
                  <th className="py-3 text-right">Line Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E9E9] text-sm">
                {activeOrder.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-4 font-medium text-[#101010]">{item.name}</td>
                    <td className="py-4 text-xs text-[#696E73]">{item.variant}</td>
                    <td className="py-4 text-center tabular-nums">{item.quantity}</td>
                    <td className="py-4 text-right tabular-nums">{formatPrice(item.price)}</td>
                    <td className="py-4 text-right font-semibold text-[#101010] tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 border-t border-[#E9E9E9] pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-full bg-[#101010] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#DC4646] transition-colors"
              >
                <Printer className="h-4 w-4" />
                <span>Print / Save PDF Invoice</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('account-orders')}
                className="rounded-full border border-[#E9E9E9] px-5 py-2.5 text-xs font-semibold text-[#101010] hover:border-[#101010]"
              >
                Back to Orders
              </button>
            </div>
            <div className="text-right tabular-nums">
              <p className="text-xs text-[#696E73]">Shipping & Taxes Included</p>
              <p className="text-2xl font-bold text-[#DC4646]">
                Total Paid: {formatPrice(activeOrder.total)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================================
  // 2. THANK YOU / ORDER CONFIRMATION PAGE (thank-you.html)
  // =====================================================================
  if (route === 'thank-you') {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#E9E9E9] bg-white p-8 sm:p-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-[#3DAB25]">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="mt-5 text-3xl font-semibold text-[#101010]">
            Thank You For Your Order!
          </h1>
          <p className="mt-2 text-sm text-[#696E73]">
            Your order <strong className="text-[#101010]">{activeOrder.id}</strong> has been
            confirmed and is now being prepared for dispatch.
          </p>

          <div className="mt-8 rounded-xl bg-[#F7F7F7] p-6 text-left text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-[#696E73]">Order Number:</span>
              <span className="font-semibold text-[#101010]">{activeOrder.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#696E73]">Tracking Number:</span>
              <span className="font-semibold text-[#DC4646]">{activeOrder.trackingNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#696E73]">Shipping Address:</span>
              <span className="font-medium text-[#101010] text-right">
                {activeOrder.shippingAddress}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#696E73]">Payment Method:</span>
              <span className="font-medium text-[#101010]">{activeOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between border-t border-[#E9E9E9] pt-2 mt-2">
              <span className="font-semibold text-[#101010]">Total Amount:</span>
              <span className="text-lg font-bold text-[#DC4646] tabular-nums">
                {formatPrice(activeOrder.total)}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('track-order')}
              className="rounded-full bg-[#101010] px-7 py-3 text-xs font-semibold text-white hover:bg-[#DC4646] transition-colors"
            >
              Track Order Live
            </button>
            <button
              type="button"
              onClick={() => onNavigate('invoice')}
              className="rounded-full border border-[#E9E9E9] px-6 py-3 text-xs font-semibold text-[#101010] hover:border-[#101010] transition-colors"
            >
              View Printable Invoice
            </button>
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="rounded-full border border-[#E9E9E9] px-6 py-3 text-xs font-semibold text-[#696E73] hover:text-[#101010]"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================================
  // 3. CHECKOUT PAGE (checkout.html)
  // =====================================================================
  if (route === 'checkout') {
    return (
      <div className="pb-20">
        {/* Page Header */}
        <section className="bg-[#F7F7F7] py-10 text-center border-b border-[#E9E9E9]">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-center gap-2 text-xs text-[#696E73] mb-2">
              <button type="button" onClick={() => onNavigate('home')}>
                Home
              </button>
              <ChevronRight className="h-3.5 w-3.5 text-[#B1B2B7]" />
              <button type="button" onClick={() => onNavigate('view-cart')}>
                Shopping Cart
              </button>
              <ChevronRight className="h-3.5 w-3.5 text-[#B1B2B7]" />
              <span className="text-[#101010] font-medium">Check Out</span>
            </div>
            <h1 className="text-3xl font-semibold text-[#101010]">Check Out</h1>
          </div>
        </section>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-10">
          {/* Reservation Countdown Banner */}
          <div className="mb-8 flex items-center justify-center gap-2 rounded-xl bg-[#18181B]/5 py-3 px-4 text-xs sm:text-sm font-medium text-[#101010] border border-[#E9E9E9]">
            <Clock className="h-4 w-4 shrink-0 text-[#C88D66]" />
            <span>
              High demand handcrafted furniture in your bag! Your items are reserved for{' '}
              <strong className="underline text-[#C88D66]">04M : 48S</strong>.
            </span>
          </div>

          <form
            onSubmit={handleCheckoutSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            {/* Left Billing & Shipping Form (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="rounded-2xl border border-[#E9E9E9] p-6 sm:p-8 space-y-5">
                <h3 className="text-xl font-semibold text-[#101010]">
                  Billing & Shipping Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#101010] mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#101010] mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#101010] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#101010] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#101010] mb-1">
                      Country / Region *
                    </label>
                    <select
                      value={shippingCountry}
                      onChange={(e) => setShippingCountry(e.target.value)}
                      className="w-full rounded-lg border border-[#E9E9E9] bg-white px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Viet Nam">Viet Nam</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#101010] mb-1">
                      State / Province *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingState}
                      onChange={(e) => setShippingState(e.target.value)}
                      className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#101010] mb-1">
                      Postal / Zip Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#101010] mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#101010] mb-1">
                      Town / City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#101010] mb-1">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="Special delivery instructions or gate code..."
                    className="w-full rounded-lg border border-[#E9E9E9] px-3.5 py-2.5 text-sm focus:border-[#101010] focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Options */}
              <div className="rounded-2xl border border-[#E9E9E9] p-6 sm:p-8 space-y-4">
                <h3 className="text-xl font-semibold text-[#101010]">Choose Payment Option</h3>
                <div className="space-y-3">
                  <label
                    className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-[#101010] bg-[#F7F7F7]'
                        : 'border-[#E9E9E9]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 accent-[#101010]"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-[#101010]">
                        Credit / Debit Card (Visa, MasterCard, Amex)
                      </span>
                      {paymentMethod === 'card' && (
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <input
                            type="text"
                            defaultValue="4242 •••• •••• 4242"
                            placeholder="Card Number"
                            className="sm:col-span-2 rounded-lg border border-[#E9E9E9] bg-white px-3 py-2 text-xs"
                          />
                          <input
                            type="text"
                            defaultValue="08/29 · CVC 884"
                            placeholder="MM/YY · CVC"
                            className="rounded-lg border border-[#E9E9E9] bg-white px-3 py-2 text-xs"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
                      paymentMethod === 'paypal'
                        ? 'border-[#101010] bg-[#F7F7F7]'
                        : 'border-[#E9E9E9]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                      className="mt-1 accent-[#101010]"
                    />
                    <div>
                      <span className="text-sm font-semibold text-[#101010]">PayPal Express</span>
                      <p className="text-xs text-[#696E73]">
                        Fast, encrypted one-click payment with PayPal Buyer Protection.
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-[#101010] bg-[#F7F7F7]'
                        : 'border-[#E9E9E9]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 accent-[#101010]"
                    />
                    <div>
                      <span className="text-sm font-semibold text-[#101010]">
                        Cash on Delivery (COD)
                      </span>
                      <p className="text-xs text-[#696E73]">
                        Pay with cash or terminal upon courier inspection at your doorstep.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Order Summary Sidebar (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-[#E9E9E9] bg-[#F7F7F7] p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-semibold text-[#101010]">
                Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} items)
              </h3>

              <ul className="divide-y divide-[#E9E9E9] max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <li key={item.product.id} className="flex items-center justify-between gap-3 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="h-14 w-14 rounded-lg bg-white object-cover"
                      />
                      <div>
                        <p className="text-xs font-semibold text-[#101010] line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-[#696E73]">
                          Qty: {item.quantity} · {item.selectedVariant || 'Standard'}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#101010] tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Promo Code Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Promo code (Try VELORA20)"
                  className="flex-1 rounded-lg border border-[#E9E9E9] bg-white px-3.5 py-2 text-xs focus:border-[#101010] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="rounded-lg bg-[#101010] px-4 py-2 text-xs font-semibold text-white hover:bg-[#27272A] transition-colors"
                >
                  Apply
                </button>
              </div>

              <div className="space-y-2.5 border-t border-[#E9E9E9] pt-4 text-sm tabular-nums">
                <div className="flex justify-between text-[#696E73]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#101010]">{formatPrice(subtotal)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#3DAB25]">
                    <span>Promo Discount ({Math.round(appliedDiscount * 100)}% Off)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#696E73]">
                  <span>Insured Shipping</span>
                  <span className="font-medium text-[#101010]">
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#E9E9E9] pt-3 text-lg font-bold text-[#101010]">
                  <span>Total</span>
                  <span className="text-[#101010]">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={cart.length === 0}
                className="w-full rounded-full bg-[#101010] py-4 px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                Place Order — {formatPrice(finalTotal)}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // =====================================================================
  // 4. VIEW CART PAGE (view-cart.html)
  // =====================================================================
  const suggestedProducts = Object.values(ALL_PRODUCTS).slice(0, 4);

  return (
    <div className="pb-20">
      {/* Page Header */}
      <section className="bg-[#F7F7F7] py-10 text-center border-b border-[#E9E9E9]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-center gap-2 text-xs text-[#696E73] mb-2">
            <button type="button" onClick={() => onNavigate('home')}>
              Home
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-[#B1B2B7]" />
            <span className="text-[#101010] font-medium">Shopping Cart</span>
          </div>
          <h1 className="text-3xl font-semibold text-[#101010]">Shopping Cart</h1>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-10">
        {cart.length === 0 ? (
          <div className="rounded-2xl border border-[#E9E9E9] p-12 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-[#B1B2B7]" />
            <h3 className="mt-4 text-xl font-semibold text-[#101010]">Your cart is empty</h3>
            <p className="mt-1 text-sm text-[#696E73]">
              Discover our handcrafted furniture, sculptural lighting, and living collections to get started.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="mt-6 rounded-full bg-[#101010] px-8 py-3 text-xs font-semibold text-white hover:bg-[#27272A] transition-colors"
            >
              Explore Shop Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Table & Cart Tools (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="overflow-x-auto rounded-2xl border border-[#E9E9E9]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E9E9E9] bg-[#F7F7F7] text-xs font-semibold uppercase tracking-wider text-[#696E73]">
                      <th className="py-4 px-5">Products</th>
                      <th className="py-4 px-4">Price</th>
                      <th className="py-4 px-4">Quantity</th>
                      <th className="py-4 px-5 text-right">Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9E9E9] text-sm">
                    {cart.map((item) => (
                      <tr key={item.product.id}>
                        <td className="py-5 px-5">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="h-20 w-20 shrink-0 rounded-xl bg-[#F7F7F7] object-cover"
                            />
                            <div>
                              <h5 className="font-semibold text-[#101010] line-clamp-1">
                                {item.product.name}
                              </h5>
                              <p className="mt-1 text-xs text-[#696E73]">
                                Option: {item.selectedVariant || 'Standard'}
                              </p>
                              <button
                                type="button"
                                onClick={() => onRemoveFromCart(item.product.id)}
                                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#DC4646] hover:underline"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-4 font-medium tabular-nums">
                          {formatPrice(item.product.price)}
                        </td>
                        <td className="py-5 px-4">
                          <div className="inline-flex items-center rounded-lg border border-[#E9E9E9] bg-white px-2 py-1">
                            <button
                              type="button"
                              onClick={() => onUpdateCartQty(item.product.id, -1)}
                              className="px-2 text-[#696E73] hover:text-[#101010]"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="px-3 text-xs font-semibold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateCartQty(item.product.id, 1)}
                              className="px-2 text-[#696E73] hover:text-[#101010]"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                        <td className="py-5 px-5 text-right font-bold text-[#DC4646] tabular-nums">
                          {formatPrice(item.product.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Gift Wrap, Order Note & Coupon Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-[#E9E9E9] p-5 space-y-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="flex items-center gap-2 text-sm font-medium text-[#101010]">
                      <Gift className="h-4 w-4 text-[#DC4646]" />
                      <span>Add Gift Wrap (+{formatPrice(5)})</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                      className="h-4 w-4 rounded accent-[#DC4646]"
                    />
                  </label>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-[#101010] mb-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      <span>Add Order Note</span>
                    </label>
                    <textarea
                      rows={2}
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="Special instructions for your order..."
                      className="w-full rounded-lg border border-[#E9E9E9] px-3 py-2 text-xs focus:border-[#101010] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Shipping Rate Estimator */}
                <div className="rounded-2xl border border-[#E9E9E9] p-5 space-y-3">
                  <h5 className="text-sm font-semibold text-[#101010] flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span>Estimate Shipping Rate</span>
                  </h5>
                  <div className="grid grid-cols-2 gap-2.5">
                    <select
                      value={shippingCountry}
                      onChange={(e) => setShippingCountry(e.target.value)}
                      className="rounded-lg border border-[#E9E9E9] bg-white px-3 py-2 text-xs"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="Zip / Postal Code"
                      className="rounded-lg border border-[#E9E9E9] px-3 py-2 text-xs"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setShippingEstimateMsg(
                        subtotal >= 150
                          ? 'White Glove Furniture Placement: FREE ($0.00)'
                          : 'Insured Freight Carrier: $12.00 (3-5 business days)'
                      )
                    }
                    className="rounded-lg bg-[#101010] px-4 py-2 text-xs font-semibold text-white hover:bg-[#27272A] transition-colors"
                  >
                    Calculate Shipping
                  </button>
                  {shippingEstimateMsg && (
                    <p className="text-xs font-medium text-[#3DAB25]">{shippingEstimateMsg}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Order Summary Card (4 cols) */}
            <div className="lg:col-span-4 rounded-2xl border border-[#E9E9E9] bg-[#F7F7F7] p-6 sm:p-8 space-y-5">
              <h4 className="text-xl font-semibold text-[#101010]">Order Summary</h4>

              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Discount code (VELORA20)"
                  className="flex-1 rounded-lg border border-[#E9E9E9] bg-white px-3.5 py-2 text-xs"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#101010] px-4 py-2 text-xs font-semibold text-white hover:bg-[#27272A]"
                >
                  Apply
                </button>
              </form>

              <div className="space-y-2.5 border-t border-[#E9E9E9] pt-4 text-sm tabular-nums">
                <div className="flex justify-between text-[#696E73]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#101010]">{formatPrice(subtotal)}</span>
                </div>
                {giftWrap && (
                  <div className="flex justify-between text-[#696E73]">
                    <span>Gift Wrap</span>
                    <span>{formatPrice(giftWrapFee)}</span>
                  </div>
                )}
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#3DAB25]">
                    <span>Promo Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#696E73]">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between border-t border-[#E9E9E9] pt-3 text-lg font-bold text-[#101010]">
                  <span>Total</span>
                  <span className="text-[#DC4646]">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-[#696E73] cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded accent-[#101010]"
                />
                <span>I agree with the Terms & Conditions</span>
              </label>

              <button
                type="button"
                disabled={!agreeTerms}
                onClick={() => onNavigate('checkout')}
                className="w-full rounded-full bg-[#101010] py-3.5 px-6 text-sm font-semibold text-white hover:bg-[#DC4646] transition-colors disabled:opacity-50"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        {/* You May Be Interested In */}
        <div className="mt-16 pt-12 border-t border-[#E9E9E9]">
          <h3 className="text-2xl font-semibold text-[#101010] mb-8">
            You may be interested in…
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {suggestedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isWishlisted={wishlist.some((w) => w.id === p.id)}
                isCompared={compareList.some((c) => c.id === p.id)}
                onToggleWishlist={onToggleWishlist}
                onToggleCompare={onToggleCompare}
                onQuickView={onQuickView}
                onAddToCart={(prod) => onAddToCart(prod, 1)}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
