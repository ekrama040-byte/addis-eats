import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import DishCard from './components/DishCard';
import DishDetailModal from './components/DishDetailModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import LiveTrackerModal from './components/LiveTrackerModal';
import { fetchDishes } from './services/mealApi';
import { Sparkles, SlidersHorizontal, Loader2 } from 'lucide-react';

const CATEGORIES = [
  { id: 'All', label: 'All Delicacies', apiCategory: 'Beef' },
  { id: 'Wat', label: 'Traditional Stews', apiCategory: 'Chicken' },
  { id: 'Tibs', label: 'Grilled / Tibs', apiCategory: 'Beef' },
  { id: 'Fasting', label: 'Fasting / Vegan (Tsom)', apiCategory: 'Vegetarian' },
  { id: 'Breakfast', label: 'Breakfast', apiCategory: 'Breakfast' },
  { id: 'Dessert', label: 'Sides & Sweets', apiCategory: 'Dessert' }
];

const HERO_SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    tag: 'Signature Sizzling Tibs'
  },
  {
    url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
    tag: 'Spicy Doro Wat with Hard-Boiled Egg'
  },
  {
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    tag: 'Beyaynetu Fasting Platter'
  },
  {
    url: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    tag: 'Shiro Tegabino Claypot'
  }
];

export default function App() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFastingOnly, setIsFastingOnly] = useState(false);
  const [showSpecialsOnly, setShowSpecialsOnly] = useState(false);

  // Overlay & Modal states
  const [selectedDish, setSelectedDish] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  // Slideshow & DOM refs
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const menuGridRef = useRef(null);

  // Auto-rotate hero images every 4 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(slideTimer);
  }, []);

  // Fetch live dishes on category/dietary change
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const activeCat = CATEGORIES.find((c) => c.id === selectedCategory);
      const categoryToFetch = isFastingOnly ? 'Vegetarian' : (activeCat?.apiCategory || 'Beef');
      
      const data = await fetchDishes(categoryToFetch);
      setDishes(data);
      setLoading(false);
    }
    loadData();
  }, [selectedCategory, isFastingOnly]);

  // "Explore Today's Specials" button handler
  const handleExploreSpecials = () => {
    setSelectedCategory('All');
    setIsFastingOnly(false);
    setShowSpecialsOnly(true);
    if (menuGridRef.current) {
      menuGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Search, Fasting Mode, and Specials client filtering
  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.chef.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFasting = isFastingOnly ? dish.isFasting : true;
    const matchesSpecials = showSpecialsOnly ? parseFloat(dish.rating) >= 4.7 : true;
    return matchesSearch && matchesFasting && matchesSpecials;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex flex-col font-sans">
      {/* 1. Global Navigation Bar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isFastingOnly={isFastingOnly}
        setIsFastingOnly={setIsFastingOnly}
        setIsCartOpen={setIsCartOpen}
        setIsWishlistOpen={setIsWishlistOpen}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-8">
        
        {/* 2. Haute Cuisine Hero Banner with Slideshow */}
        <section className="relative overflow-hidden rounded-2xl bg-zinc-950 text-white border border-zinc-800 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            
            <div className="p-8 md:p-12 md:col-span-7 space-y-4 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-medium text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Culinary Heritage & High Dining</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                The Gursha Tradition meets <span className="italic font-serif text-amber-400">Haute Cuisine</span>
              </h1>
              
              <p className="text-zinc-400 text-sm max-w-lg leading-relaxed">
                Addis Ababa’s finest chefs assemble daily to craft rich, slow-simmered wats, flame-seared tibs, and pure fasting vegan spreads on wood-fired injera.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button 
                  onClick={handleExploreSpecials}
                  className="px-5 py-2.5 rounded-full bg-[#BE123C] hover:bg-[#a10e32] active:scale-95 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explore Today's Specials</span>
                </button>
                <span className="text-xs text-zinc-400 font-medium tracking-wide">
                  Average delivery: 25–35 min
                </span>
              </div>
            </div>

            {/* Slideshow Display */}
            <div className="relative h-72 md:h-full min-h-[300px] md:col-span-5 bg-zinc-900 overflow-hidden">
              {HERO_SLIDES.map((slide, idx) => (
                <img
                  key={slide.url}
                  src={slide.url}
                  alt={slide.tag}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-in-out ${
                    idx === heroSlideIndex ? 'opacity-90 scale-105' : 'opacity-0 scale-100'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-950 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 right-4 z-10 flex items-center gap-2 bg-zinc-950/70 backdrop-blur-xs px-3 py-1 rounded-full border border-zinc-800">
                <span className="text-[10px] text-zinc-300 font-medium">
                  {HERO_SLIDES[heroSlideIndex].tag}
                </span>
                <div className="flex gap-1">
                  {HERO_SLIDES.map((_, i) => (
                    <span 
                      key={i} 
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i === heroSlideIndex ? 'bg-[#BE123C] w-3' : 'bg-zinc-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Category & Discovery Strip */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category.id && !showSpecialsOnly;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setShowSpecialsOnly(false);
                      setSelectedCategory(category.id);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                        : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-zinc-500">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{filteredDishes.length} Items Available</span>
            </div>
          </div>
        </section>

        {/* 4. Products Grid Section */}
        <section ref={menuGridRef} className="pt-2">
          {showSpecialsOnly && (
            <div className="mb-5 flex items-center justify-between p-3.5 rounded-xl bg-rose-50 border border-rose-200 shadow-2xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#BE123C]" />
                <span className="text-xs font-bold text-rose-950">
                  Viewing Today's Chef Curated Specials (Rating 4.7+)
                </span>
              </div>
              <button 
                onClick={() => setShowSpecialsOnly(false)}
                className="text-xs font-semibold text-[#BE123C] hover:underline cursor-pointer"
              >
                Reset to Full Menu
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#BE123C]" />
              <p className="text-xs font-medium text-zinc-400">Summoning culinary creations...</p>
            </div>
          ) : filteredDishes.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border border-zinc-200 shadow-2xs space-y-2">
              <p className="font-semibold text-sm text-zinc-800">No dishes match your criteria</p>
              <p className="text-xs text-zinc-400">Try clearing your search query or turning off Fasting Mode.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  onOpenDetail={(item) => setSelectedDish(item)}
                />
              ))}
            </div>
          )}
        </section>

      </main>

      <footer className="border-t border-zinc-200 bg-white py-6 mt-12 text-center text-xs text-zinc-400">
        <p>© 2026 Addis-Eats Inc. Haute Ethiopian Dining & Fast Delivery. Bole Sub-City, Addis Ababa.</p>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={(data) => {
          setCheckoutData(data);
          setIsTrackerOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onSelectDish={(item) => setSelectedDish(item)}
      />

      {/* Dish Customization Modal */}
      {selectedDish && (
        <DishDetailModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
        />
      )}

      {/* Multi-Step Checkout & Live Tracking Modal */}
      <LiveTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        checkoutData={checkoutData}
      />
    </div>
  );
}