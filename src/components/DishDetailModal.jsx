import React, { useState } from 'react';
import { X, Star, Clock, Flame, ShieldCheck, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const SPICE_OPTIONS = [
  { id: 'mild', label: 'Mild (Alicha style)', heat: '🌶️' },
  { id: 'medium', label: 'Medium Berbere', heat: '🌶️🌶️' },
  { id: 'extra', label: 'Flaming Hot (Mitmita kick)', heat: '🌶️🌶️🌶️' },
];

const EXTRA_ACCOMPANIMENTS = [
  { id: 'injera', name: 'Extra Wood-Fired Teff Injera (2 pcs)', price: 45 },
  { id: 'ayib', name: 'Fresh House Ayib (Spiced Cottage Cheese)', price: 65 },
  { id: 'salad', name: 'Timatim Salata (Tomato & Jalapeño mix)', price: 50 },
  { id: 'boiled_egg', name: 'Organic Hard-Boiled Egg', price: 35 },
];

export default function DishDetailModal({ dish, onClose }) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedSpice, setSelectedSpice] = useState('medium');
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!dish) return null;

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) =>
      prev.some((item) => item.id === extra.id)
        ? prev.filter((item) => item.id !== extra.id)
        : [...prev, extra]
    );
  };

  const extrasTotalPrice = selectedExtras.reduce((sum, item) => sum + item.price, 0);
  const finalItemPrice = (dish.price + extrasTotalPrice) * quantity;

  const handleConfirmAdd = () => {
    addToCart(dish, {
      qty: quantity,
      selectedSpice: SPICE_OPTIONS.find((s) => s.id === selectedSpice)?.label,
      extras: selectedExtras,
      notes: specialInstructions,
      calculatedItemPrice: dish.price + extrasTotalPrice
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Dim Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Main Modal Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-xs border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-white shadow-xs transition-all"
          aria-label="Close details"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
          
          {/* Left Side: Large Visuals & Chef Info */}
          <div className="md:col-span-6 flex flex-col bg-zinc-50/50">
            <div className="relative w-full h-72 md:h-84 bg-zinc-100 overflow-hidden">
              <img
                src={dish.image}
                alt={dish.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 flex gap-2">
                <span className="inline-flex items-center gap-1 bg-zinc-950/80 text-white text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {dish.rating}
                </span>
                <span className="inline-flex items-center gap-1 bg-white/90 text-zinc-800 text-xs font-semibold px-2.5 py-1 rounded-md border border-zinc-200 backdrop-blur-xs">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  {dish.prepTime}
                </span>
              </div>
            </div>

            {/* Chef Verification Card */}
            <div className="p-5 flex items-center justify-between border-t border-zinc-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center font-bold text-amber-900 text-sm">
                  {dish.chef.replace('Chef ', '').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm text-zinc-900">{dish.chef}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-xs text-zinc-500">Master of Authentic Spices & Stews</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Verified Kitchen
              </span>
            </div>

            <div className="p-5 text-xs text-zinc-500 leading-relaxed space-y-2">
              <p className="font-semibold text-zinc-700 uppercase tracking-wider text-[10px]">
                Culinary Background & Notes
              </p>
              <p>
                Each serving is prepared using slow-caramelized red onions, seasoned purified butter (Niter Kibbeh), and hand-selected sun-dried spices. 100% locally sourced grains and livestock.
              </p>
            </div>
          </div>

          {/* Right Side: Options & Customization Engine */}
          <div className="md:col-span-6 p-6 flex flex-col justify-between space-y-6">
            
            {/* Title & Base Price Header */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 leading-tight">
                    {dish.title}
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">Special Gourmet Plate</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-zinc-950 block">
                    {dish.price.toLocaleString()} ETB
                  </span>
                  <span className="text-[10px] text-zinc-400">Base portion</span>
                </div>
              </div>

              {/* Spice Selection Radios */}
              <div className="mt-6">
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5">
                  Choose Spice Intensity <span className="text-[#BE123C]">*</span>
                </label>
                <div className="space-y-2">
                  {SPICE_OPTIONS.map((spice) => (
                    <label
                      key={spice.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedSpice === spice.id
                          ? 'border-[#BE123C] bg-rose-50/40 text-zinc-950 ring-1 ring-[#BE123C]'
                          : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="spice"
                          value={spice.id}
                          checked={selectedSpice === spice.id}
                          onChange={() => setSelectedSpice(spice.id)}
                          className="accent-[#BE123C] w-4 h-4"
                        />
                        <span className="text-xs font-semibold">{spice.label}</span>
                      </div>
                      <span className="text-xs">{spice.heat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Accompaniments & Add-ons */}
              <div className="mt-6">
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5">
                  Extra Accompaniments
                </label>
                <div className="space-y-2">
                  {EXTRA_ACCOMPANIMENTS.map((extra) => {
                    const isChecked = selectedExtras.some((item) => item.id === extra.id);
                    return (
                      <label
                        key={extra.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          isChecked
                            ? 'border-zinc-950 bg-zinc-50 text-zinc-950'
                            : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleExtra(extra)}
                            className="accent-zinc-900 w-4 h-4 rounded"
                          />
                          <span className="text-xs font-medium">{extra.name}</span>
                        </div>
                        <span className="text-xs font-bold text-zinc-800">
                          +{extra.price} ETB
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Kitchen Instructions */}
              <div className="mt-6">
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                  Special Kitchen Note
                </label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g., Please make the sauce slightly thicker..."
                  className="w-full text-xs p-3 rounded-xl border border-zinc-200 bg-zinc-50 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white resize-none"
                />
              </div>

            </div>

            {/* Sticky Action Footer */}
            <div className="pt-4 border-t border-zinc-200 flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-zinc-200 rounded-full bg-zinc-50 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-600 hover:bg-white hover:shadow-2xs transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-bold text-zinc-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-600 hover:bg-white hover:shadow-2xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Order Button */}
              <button
                type="button"
                onClick={handleConfirmAdd}
                className={`flex-1 h-11 rounded-full text-xs font-bold flex items-center justify-between px-5 transition-all shadow-sm ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-950 hover:bg-[#BE123C] text-white'
                }`}
              >
                <span>{isAdded ? 'Added to Bag!' : 'Add to Order'}</span>
                <span>{finalItemPrice.toLocaleString()} ETB</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}