import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Heart, 
  ShoppingBag, 
  Leaf, 
  ChevronDown,
  Command,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const ADDIS_NEIGHBORHOODS = [
  'Bole Sub-City, AA',
  'Bole Atlas / Cameroon St',
  'Sarbet / Old Airport',
  'Kazanchis / Intercontinental',
  'Piassa / Churchill Ave',
  'CMC / Michael',
  'Gerji / Mebrat Hail',
  'Megenagna / Lem Hotel',
  '4 Kilo / Arat Kilo',
  'Lebu / Jomo Area'
];

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  isFastingOnly, 
  setIsFastingOnly, 
  setIsCartOpen,
  setIsWishlistOpen 
}) {
  const { cart, favorites, subtotal } = useCart();
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Bole Sub-City, AA');

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200">
      <div className="bg-zinc-900 text-zinc-300 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Orthodox Fasting Season Special: 100% Pure Vegan Delicacies Available Today</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Village Dropdown */}
        <div className="flex items-center gap-4 relative">
          <a href="#" className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-zinc-950">
            <span>Addis</span>
            <span className="text-[#BE123C]">Eats</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#BE123C]"></span>
          </a>

          {/* Interactive Neighborhood/Village Selector */}
          <div className="relative">
            <button 
              type="button"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300 transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-[#BE123C] shrink-0" />
              <span className="max-w-[130px] sm:max-w-none truncate">{currentLocation}</span>
              <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLocationOpen && (
              <>
                <div 
                  className="fixed inset-0 z-20" 
                  onClick={() => setIsLocationOpen(false)} 
                />
                <div className="absolute left-0 mt-2 w-64 bg-white border border-zinc-200 rounded-xl shadow-xl z-30 py-2 divide-y divide-zinc-100">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-zinc-400">
                    Select Your Village / Area
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {ADDIS_NEIGHBORHOODS.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setCurrentLocation(loc);
                          setIsLocationOpen(false);
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs font-medium hover:bg-zinc-50 flex items-center justify-between text-zinc-700 hover:text-zinc-950"
                      >
                        <span>{loc}</span>
                        {currentLocation === loc && (
                          <Check className="w-3.5 h-3.5 text-[#BE123C]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-2">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Tibs, Shiro, Kitfo, or chefs..."
              className="w-full h-10 pl-10 pr-12 text-sm bg-zinc-50 border border-zinc-200 rounded-full placeholder-zinc-400 text-zinc-900 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all shadow-2xs"
            />
            <div className="absolute right-3 hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-zinc-200 bg-white text-[10px] font-medium text-zinc-400">
              <Command className="w-2.5 h-2.5" />
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Fasting Mode Toggle */}
          <button
            onClick={() => setIsFastingOnly(!isFastingOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              isFastingOnly
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            <Leaf className={`w-3.5 h-3.5 ${isFastingOnly ? 'text-emerald-600 fill-emerald-600' : 'text-zinc-400'}`} />
            <span className="hidden sm:inline">Fasting Mode</span>
            <span className={`w-1.5 h-1.5 rounded-full ${isFastingOnly ? 'bg-emerald-500' : 'bg-zinc-300'}`}></span>
          </button>

          {/* Favorites/Wishlist Heart Toggle */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 transition-colors shadow-2xs"
            title="Saved Favorites"
          >
            <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'text-[#BE123C] fill-[#BE123C]' : ''}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#BE123C] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Floating Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="group flex items-center gap-2.5 pl-3.5 pr-4 py-2 rounded-full bg-zinc-950 hover:bg-zinc-900 text-white shadow-xs transition-all"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-zinc-200" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 px-1 min-w-3.5 h-3.5 bg-[#BE123C] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </div>
            <div className="h-4 w-px bg-zinc-800" />
            <span className="text-xs font-semibold text-zinc-100">
              {subtotal > 0 ? `${subtotal.toLocaleString()} ETB` : '0.00 ETB'}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}