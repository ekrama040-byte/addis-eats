import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  Heart, 
  ShieldCheck, 
  Sparkles,
  Utensils
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const TIP_OPTIONS = [0, 5, 10, 15];

export default function CartDrawer({ isOpen, onClose, onProceedToCheckout }) {
  const { cart, updateQty, toggleFavorite, favorites, subtotal } = useCart();
  const [selectedTip, setSelectedTip] = useState(10); // Default 10%
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  if (!isOpen) return null;

  const deliveryFee = cart.length > 0 ? 80 : 0; // 80 ETB standard local delivery
  const packagingFee = cart.length > 0 ? 30 : 0;
  const tipAmount = Math.round((subtotal * selectedTip) / 100);
  const discountAmount = promoApplied ? Math.round(subtotal * 0.15) : 0; // 15% Gursha promo
  const totalPayable = subtotal + deliveryFee + packagingFee + tipAmount - discountAmount;

  const handleSaveForLater = (item) => {
    toggleFavorite(item);
    updateQty(item.id, -item.qty); // remove from active cart
  };

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'GURSHA15') {
      setPromoApplied(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-zinc-950/50 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-zinc-200">
        
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-zinc-900 text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-950">Your Bag & Tray</h2>
              <p className="text-[11px] text-zinc-500">
                {cart.reduce((s, i) => s + i.qty, 0)} items selected for delivery
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Threshold Pill */}
        <div className="bg-amber-50/60 border-b border-amber-100 px-5 py-2 flex items-center gap-2 text-xs text-amber-900">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Add <b>{(Math.max(0, 1200 - subtotal)).toLocaleString()} ETB</b> more for complimentary shipping!</span>
        </div>

        {/* Cart Line Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                <Utensils className="w-7 h-7" />
              </div>
              <p className="text-sm font-semibold text-zinc-900">Your bag is currently empty</p>
              <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                Discover mouth-watering stews, freshly grilled tibs, and vegan delights from Bole district kitchens.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 rounded-full bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemTotal = (item.calculatedItemPrice || item.price) * item.qty;
              return (
                <div 
                  key={item.id}
                  className="p-3.5 rounded-xl border border-zinc-200 bg-white shadow-2xs space-y-3"
                >
                  {/* Top row: Thumb + Title + Delete */}
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded-lg object-cover bg-zinc-100 shrink-0 border border-zinc-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-zinc-900 truncate">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => updateQty(item.id, -item.qty)}
                          className="text-zinc-400 hover:text-rose-600 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <p className="text-[11px] text-zinc-500 font-medium">
                        {item.chef || "Kitchen Special"}
                      </p>

                      {/* Customization Badges */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.selectedSpice && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 font-medium border border-rose-100">
                            {item.selectedSpice}
                          </span>
                        )}
                        {item.extras?.map((ex) => (
                          <span key={ex.id} className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 font-medium">
                            + {ex.name.split(' ')[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom row: Stepper + Save for Later + Line Total */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs">
                    <div className="flex items-center gap-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-zinc-200 rounded-full bg-zinc-50 px-1 py-0.5">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center text-zinc-600 hover:text-zinc-950"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-zinc-900 text-[11px]">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-zinc-600 hover:text-zinc-950"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Save for later trigger */}
                      <button
                        onClick={() => handleSaveForLater(item)}
                        className="text-[10px] text-zinc-500 hover:text-[#BE123C] flex items-center gap-1 font-medium transition-colors"
                      >
                        <Heart className="w-3 h-3" />
                        <span>Save</span>
                      </button>
                    </div>

                    <span className="font-bold text-zinc-900">
                      {itemTotal.toLocaleString()} ETB
                    </span>
                  </div>
                </div>
              );
            })
          )}

          {/* Quick Promo Code Input */}
          {cart.length > 0 && (
            <form onSubmit={applyPromo} className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (try GURSHA15)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 placeholder-zinc-400 uppercase tracking-wider focus:outline-none focus:border-zinc-400"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-zinc-900 text-white rounded-lg text-xs font-semibold hover:bg-zinc-800 transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                  ✓ 15% Gursha Discount Applied!
                </p>
              )}
            </form>
          )}

          {/* Courier Tip Selector */}
          {cart.length > 0 && (
            <div className="pt-3 border-t border-zinc-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-zinc-800">Support the Courier Rider</span>
                <span className="text-xs text-zinc-500 font-medium">+{tipAmount} ETB</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {TIP_OPTIONS.map((tip) => (
                  <button
                    key={tip}
                    type="button"
                    onClick={() => setSelectedTip(tip)}
                    className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      selectedTip === tip
                        ? 'bg-zinc-950 text-white border-zinc-950'
                        : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    {tip === 0 ? 'None' : `${tip}%`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Sticky Footer with Cost Breakdown */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-zinc-200 bg-zinc-50/70 space-y-3">
            <div className="space-y-1.5 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900">{subtotal.toLocaleString()} ETB</span>
              </div>
              <div className="flex justify-between">
                <span>Doorstep Delivery (Bole)</span>
                <span>{deliveryFee} ETB</span>
              </div>
              <div className="flex justify-between">
                <span>Eco Thermal Packaging</span>
                <span>{packagingFee} ETB</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Promo Discount</span>
                  <span>-{discountAmount.toLocaleString()} ETB</span>
                </div>
              )}
              <div className="pt-2 border-t border-zinc-200 flex justify-between text-sm font-bold text-zinc-950">
                <span>Total Amount</span>
                <span className="text-base text-[#BE123C]">{totalPayable.toLocaleString()} ETB</span>
              </div>
            </div>

            {/* Primary Checkout CTA */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout({ totalPayable, items: cart });
              }}
              className="w-full h-12 rounded-full bg-zinc-950 hover:bg-[#BE123C] text-white font-semibold text-xs flex items-center justify-between px-6 shadow-md transition-colors"
            >
              <span>Proceed to Checkout</span>
              <div className="flex items-center gap-1.5 font-bold">
                <span>{totalPayable.toLocaleString()} ETB</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <div className="flex items-center justify-center gap-1 text-[10px] text-zinc-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Encrypted Checkout • Telebirr, CBE & Card supported</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}