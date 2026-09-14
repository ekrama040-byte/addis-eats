import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function WishlistDrawer({ isOpen, onClose, onSelectDish }) {
  const { favorites, toggleFavorite, addToCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-zinc-950/50 backdrop-blur-xs transition-opacity" 
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-zinc-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-50 text-[#BE123C] border border-rose-200">
              <Heart className="w-4 h-4 fill-[#BE123C]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-950">Favorite Delicacies</h2>
              <p className="text-[11px] text-zinc-500">{favorites.length} items saved</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {favorites.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-2 py-16">
              <Heart className="w-12 h-12 text-zinc-300" />
              <p className="text-sm font-semibold text-zinc-900">No favorite dishes yet</p>
              <p className="text-xs text-zinc-400 max-w-xs">
                Tap the heart icon on any dish card to save it for your next craving.
              </p>
            </div>
          ) : (
            favorites.map((dish) => (
              <div 
                key={dish.id} 
                className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 bg-white shadow-2xs hover:border-zinc-300 transition-all"
              >
                <img
                  src={dish.image}
                  alt={dish.title}
                  onClick={() => {
                    onSelectDish(dish);
                    onClose();
                  }}
                  className="w-16 h-16 rounded-lg object-cover bg-zinc-100 cursor-pointer"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 
                    onClick={() => {
                      onSelectDish(dish);
                      onClose();
                    }}
                    className="text-xs font-bold text-zinc-900 truncate cursor-pointer hover:text-[#BE123C]"
                  >
                    {dish.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500">{dish.chef}</p>
                  <p className="text-xs font-bold text-zinc-950 mt-1">
                    {dish.price?.toLocaleString()} ETB
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 items-end">
                  <button
                    onClick={() => addToCart(dish)}
                    className="p-2 rounded-full bg-zinc-900 hover:bg-[#BE123C] text-white transition-colors"
                    title="Move to Cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => toggleFavorite(dish)}
                    className="p-1.5 text-zinc-400 hover:text-rose-600 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}