import React from 'react';
import { Heart, Star, Clock, Flame, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function DishCard({ dish, onOpenDetail }) {
  const { cart, favorites, toggleFavorite, addToCart } = useCart();

  const isFavorited = favorites.some((f) => f.id === dish.id);
  const cartItem = cart.find((item) => item.id === dish.id);
  const isInCart = Boolean(cartItem);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(dish);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(dish);
  };

  return (
    <div
      onClick={() => onOpenDetail(dish)}
      className="group relative flex flex-col bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all duration-200 cursor-pointer"
    >
      {/* Media & Thumbnail Area */}
      <div className="relative w-full h-48 sm:h-52 bg-zinc-100 overflow-hidden">
        <img
          src={dish.image}
          alt={dish.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
        />

        {/* Dietary / Fasting Tag Overlay */}
        {dish.isFasting && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span className="text-[11px] font-semibold tracking-wide text-emerald-800">
              Vegan / Tsom
            </span>
          </div>
        )}

        {/* Floating Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-zinc-700 shadow-2xs border border-zinc-200/80 transition-all hover:scale-110 active:scale-95"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? 'fill-[#BE123C] text-[#BE123C]' : 'text-zinc-500'
            }`}
          />
        </button>

        {/* Rating & Prep Time Bar (Bottom Overlay) */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
          <div className="flex items-center gap-1 bg-zinc-950/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{dish.rating}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xs text-zinc-800 text-[11px] font-medium px-2 py-0.5 rounded-md border border-zinc-200">
            <Clock className="w-3 h-3 text-zinc-500" />
            <span>{dish.prepTime}</span>
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Chef Attribution & Spice Level */}
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
            <span className="font-medium text-zinc-600">{dish.chef}</span>
            <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-600">
              <Flame className={`w-3 h-3 ${dish.spice === 'Flaming Hot' ? 'text-[#BE123C]' : 'text-amber-500'}`} />
              <span>{dish.spice}</span>
            </div>
          </div>

          {/* Dish Title */}
          <h3 className="font-semibold text-sm text-zinc-900 line-clamp-1 group-hover:text-[#BE123C] transition-colors">
            {dish.title}
          </h3>

          {/* Cultural Teaser Description */}
          <p className="text-xs text-zinc-500 line-clamp-2 mt-1 leading-relaxed">
            Slow-cooked traditional Ethiopian delicacy infused with seasoned niter kibbeh and house-ground berbere.
          </p>
        </div>

        {/* Price & Action Button Footer */}
        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 block">Price</span>
            <span className="text-sm font-bold text-zinc-950">
              {dish.price.toLocaleString()} <span className="text-xs font-medium text-zinc-500">ETB</span>
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 active:scale-95 ${
              isInCart
                ? 'bg-zinc-100 text-zinc-800 border border-zinc-200 hover:bg-zinc-200'
                : 'bg-zinc-900 hover:bg-[#BE123C] text-white shadow-2xs'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Added ({cartItem.qty})</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}