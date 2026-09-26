import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CheckCircle, MapPin, Phone, User, Utensils } from 'lucide-react';
import { useCart, OrderReceipt } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    gst,
    deliveryFee,
    discount,
    couponCode,
    setCouponCode,
    applyCoupon,
    couponApplied,
    total,
    orderType,
    setOrderType,
    placedOrder,
    setPlacedOrder,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [paymentChoice, setPaymentChoice] = useState<'cod' | 'upi' | 'card'>('cod');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const success = applyCoupon();
    if (!success) {
      setCouponError('Invalid code. Use ROYALKING for 10% off.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const receipt: OrderReceipt = {
      orderId: 'TMK-' + Math.floor(100000 + Math.random() * 900000),
      customerName,
      customerPhone,
      orderType,
      address: orderType === 'delivery' ? customerAddress : undefined,
      tableNumber: orderType === 'dine_in' ? tableNumber : undefined,
      items: [...cart],
      subtotal,
      gst,
      deliveryFee,
      discount,
      total,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentMethod:
        paymentChoice === 'cod'
          ? 'Cash on Delivery / Table Pay'
          : paymentChoice === 'upi'
          ? 'UPI at Counter / Delivery'
          : 'Card Payment',
      status: 'Received',
    };

    setPlacedOrder(receipt);
    setCheckoutStep('success');
    clearCart();
  };

  const closeAndReset = () => {
    setIsCartOpen(false);
    setCheckoutStep('cart');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end"
      onClick={closeAndReset}
    >
      <div
        className="w-full max-w-md bg-[#190305] border-l border-[#d4af37]/40 h-full flex flex-col justify-between shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#d4af37]/25 bg-[#230408] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ffd700]" />
            <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
              {checkoutStep === 'success'
                ? 'Order Confirmed'
                : checkoutStep === 'details'
                ? 'Checkout Details'
                : 'Your Royal Cart'}
            </h3>
          </div>
          <button
            onClick={closeAndReset}
            className="p-1.5 text-[#cfc2b2] hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* STEP 1: CART ITEMS */}
          {checkoutStep === 'cart' && (
            <>
              {/* Order Mode Toggle */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-[#120203] border border-[#d4af37]/20 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-2 px-1 rounded transition-colors text-center ${
                    orderType === 'delivery'
                      ? 'bg-[#d4af37] text-[#1a0305] font-bold shadow-xs'
                      : 'text-[#cfc2b2] hover:text-white'
                  }`}
                >
                  Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`py-2 px-1 rounded transition-colors text-center ${
                    orderType === 'takeaway'
                      ? 'bg-[#d4af37] text-[#1a0305] font-bold shadow-xs'
                      : 'text-[#cfc2b2] hover:text-white'
                  }`}
                >
                  Takeaway
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('dine_in')}
                  className={`py-2 px-1 rounded transition-colors text-center ${
                    orderType === 'dine_in'
                      ? 'bg-[#d4af37] text-[#1a0305] font-bold shadow-xs'
                      : 'text-[#cfc2b2] hover:text-white'
                  }`}
                >
                  Dine-In
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#260509] border border-[#d4af37]/30 flex items-center justify-center text-[#ffd700] mx-auto">
                    <Utensils className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white">Your cart is empty</h4>
                  <p className="text-xs text-[#cfc2b2] max-w-xs mx-auto">
                    Explore our royal menu of tandoori kababs, biryanis, curries, and Chinese dishes.
                  </p>
                  <button
                    onClick={closeAndReset}
                    className="mt-4 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1a0305] bg-[#d4af37] hover:bg-[#ffd700] rounded"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((cartItem) => (
                    <div
                      key={cartItem.id}
                      className="p-3.5 rounded-lg bg-[#220407] border border-[#d4af37]/20 flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {cartItem.item.isVeg ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                          ) : (
                            <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" />
                          )}
                          <span className="text-xs font-bold text-white">
                            {cartItem.item.name}
                          </span>
                        </div>
                        {cartItem.selectedPortion && (
                          <span className="text-[10px] text-[#ffd700] block">
                            Portion: {cartItem.selectedPortion}
                          </span>
                        )}
                        <span className="text-xs font-bold text-[#ffd700] tabular-nums">
                          ₹{cartItem.unitPrice * cartItem.quantity}
                        </span>
                      </div>

                      {/* Stepper controls */}
                      <div className="flex items-center bg-[#150204] border border-[#d4af37]/30 rounded">
                        <button
                          onClick={() => updateQuantity(cartItem.id, -1)}
                          className="px-2 py-1 text-[#d4af37] hover:bg-[#d4af37]/20"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 py-1 text-xs font-bold text-white tabular-nums">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(cartItem.id, 1)}
                          className="px-2 py-1 text-[#d4af37] hover:bg-[#d4af37]/20"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(cartItem.id)}
                        className="text-red-400/80 hover:text-red-300 p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Coupon Code Input */}
                  <form onSubmit={handleApplyCoupon} className="pt-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Discount code (try ROYALKING)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-[#120203] border border-[#d4af37]/30 rounded px-3 py-2 text-xs text-white uppercase placeholder-[#d9ccbe]/40 focus:outline-none focus:border-[#ffd700]"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#1a0305] bg-[#d4af37] hover:bg-[#ffd700] rounded"
                      >
                        Apply
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="text-[11px] text-emerald-400 mt-1">
                        10% Royal King discount applied!
                      </p>
                    )}
                    {couponError && (
                      <p className="text-[11px] text-red-400 mt-1">{couponError}</p>
                    )}
                  </form>
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT DETAILS */}
          {checkoutStep === 'details' && (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#ffd700] uppercase mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#d4af37]" />
                  <input
                    type="text"
                    required
                    placeholder="Enter recipient name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#120203] border border-[#d4af37]/30 rounded pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#ffd700] uppercase mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#d4af37]" />
                  <input
                    type="tel"
                    required
                    placeholder="Enter mobile number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#120203] border border-[#d4af37]/30 rounded pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                  />
                </div>
              </div>

              {orderType === 'delivery' && (
                <div>
                  <label className="block text-xs font-semibold text-[#ffd700] uppercase mb-1">
                    Delivery Address *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-[#d4af37]" />
                    <textarea
                      required
                      rows={2}
                      placeholder="Building, street, flat number, landmark"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full bg-[#120203] border border-[#d4af37]/30 rounded pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                    />
                  </div>
                </div>
              )}

              {orderType === 'dine_in' && (
                <div>
                  <label className="block text-xs font-semibold text-[#ffd700] uppercase mb-1">
                    Table Number (Optional if already seated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Table 4"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full bg-[#120203] border border-[#d4af37]/30 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ffd700]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#ffd700] uppercase mb-1">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentChoice('cod')}
                    className={`p-2 rounded border text-xs font-medium text-center ${
                      paymentChoice === 'cod'
                        ? 'border-[#ffd700] bg-[#3a080e] text-white'
                        : 'border-[#d4af37]/20 bg-[#120203] text-[#cfc2b2]'
                    }`}
                  >
                    Cash / Table Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentChoice('upi')}
                    className={`p-2 rounded border text-xs font-medium text-center ${
                      paymentChoice === 'upi'
                        ? 'border-[#ffd700] bg-[#3a080e] text-white'
                        : 'border-[#d4af37]/20 bg-[#120203] text-[#cfc2b2]'
                    }`}
                  >
                    UPI / QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentChoice('card')}
                    className={`p-2 rounded border text-xs font-medium text-center ${
                      paymentChoice === 'card'
                        ? 'border-[#ffd700] bg-[#3a080e] text-white'
                        : 'border-[#d4af37]/20 bg-[#120203] text-[#cfc2b2]'
                    }`}
                  >
                    Card
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER CONFIRMATION RECEIPT */}
          {checkoutStep === 'success' && placedOrder && (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-900 border border-emerald-500 text-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-white">
                Order Placed Successfully!
              </h4>
              <p className="text-xs text-[#cfc2b2]">
                Our kitchen at <strong className="text-white">{RESTAURANT_INFO.name}</strong> has received your order and started preparations.
              </p>

              <div className="bg-[#120203] border border-[#d4af37]/30 rounded-lg p-4 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[#d4af37]">Order ID:</span>
                  <span className="font-mono font-bold text-white">{placedOrder.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#cfc2b2]">Customer:</span>
                  <span className="text-white">{placedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#cfc2b2]">Order Type:</span>
                  <span className="capitalize text-[#ffd700]">{placedOrder.orderType.replace('_', ' ')}</span>
                </div>
                {placedOrder.address && (
                  <div className="flex justify-between">
                    <span className="text-[#cfc2b2]">Address:</span>
                    <span className="text-white text-right max-w-[200px]">{placedOrder.address}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-white/5 pt-2">
                  <span className="text-[#cfc2b2]">Total Amount:</span>
                  <span className="text-white font-bold font-sans text-sm">₹{placedOrder.total}</span>
                </div>
                <div className="flex justify-between text-[11px] text-emerald-400">
                  <span>Payment:</span>
                  <span>{placedOrder.paymentMethod}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={closeAndReset}
                  className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-[#1a0305] bg-[#d4af37] hover:bg-[#ffd700] rounded"
                >
                  Back to Restaurant
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Billing Breakdown */}
        {checkoutStep !== 'success' && cart.length > 0 && (
          <div className="p-5 border-t border-[#d4af37]/25 bg-[#230408] space-y-3">
            <div className="space-y-1.5 text-xs text-[#cfc2b2]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white tabular-nums">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span className="tabular-nums">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="text-white tabular-nums">₹{gst}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="text-white tabular-nums">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white">
                <span className="font-serif">Total Payable</span>
                <span className="text-[#ffd700] text-base tabular-nums font-sans">
                  ₹{total}
                </span>
              </div>
            </div>

            {checkoutStep === 'cart' ? (
              <button
                onClick={() => setCheckoutStep('details')}
                className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-[#1a0305] bg-gradient-to-r from-[#ffd700] via-[#e5c158] to-[#d4af37] hover:from-[#fff0ad] hover:to-[#ffd700] rounded flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.99] cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-4 py-3 text-xs text-[#cfc2b2] hover:text-white border border-[#d4af37]/30 rounded cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-[#1a0305] bg-[#d4af37] hover:bg-[#ffd700] rounded shadow-md cursor-pointer"
                >
                  CONFIRM & PLACE ORDER
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
