import React, { useState, useEffect } from 'react';
import { 
  X, 
  Phone, 
  MessageSquare, 
  Send, 
  Bike, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  CreditCard, 
  Building, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const PAYMENT_METHODS = [
  { id: 'telebirr', name: 'Telebirr SuperApp', badge: 'Instant QR' },
  { id: 'cbe', name: 'CBE Birr', badge: 'Bank Direct' },
  { id: 'card', name: 'Debit / Credit Card', badge: 'Visa/MC' },
  { id: 'cod', name: 'Cash on Hand', badge: 'Pay at Door' }
];

export default function LiveTrackerModal({ isOpen, onClose, checkoutData }) {
  const { setCart } = useCart();

  // Multi-step checkout workflow: 'payment' -> 'tracking'
  const [step, setStep] = useState('payment');
  const [paymentMethod, setPaymentMethod] = useState('telebirr');
  const [etaMinutes, setEtaMinutes] = useState(24);

  // Direct Chef/Kitchen Live Chat state
  const [chefMessages, setChefMessages] = useState([
    { sender: 'chef', text: 'Selam! Chef Dawit here. Your clay pot stew is simmering on slow flame.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Simulate ETA decrement countdown
  useEffect(() => {
    if (step !== 'tracking') return;
    const timer = setInterval(() => {
      setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 1));
    }, 60000);
    return () => clearInterval(timer);
  }, [step]);

  if (!isOpen) return null;

  const handleConfirmOrder = () => {
    setStep('tracking');
    setCart([]); // Clear cart items upon successful order confirmation
  };

  const handleSendChefMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChefMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    // Kitchen auto-acknowledgment simulation
    setTimeout(() => {
      setChefMessages((prev) => [
        ...prev,
        { sender: 'chef', text: 'Noted! We have packed extra berbere and teff injera as requested.' }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Dimmed backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="relative w-full max-w-5xl bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Header & Step Breadcrumbs */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/50">
          <div className="flex items-center gap-4">
            <h2 className="text-base font-bold text-zinc-950">Addis-Eats Hub</h2>
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-zinc-400">
              <span className={step === 'payment' ? 'text-[#BE123C]' : 'text-emerald-600'}>
                1. Settlement
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className={step === 'tracking' ? 'text-[#BE123C]' : 'text-zinc-400'}>
                2. Live Rider & Kitchen
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: PAYMENT GATEWAYS & ADDRESS */}
        {step === 'payment' && (
          <div className="p-6 md:p-8 overflow-y-auto space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-zinc-900">Choose Settlement Method</h3>
              <p className="text-xs text-zinc-500">Fast, encrypted payment processing for Addis Ababa orders.</p>
            </div>

            {/* Payment Method Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAYMENT_METHODS.map((pm) => (
                <div
                  key={pm.id}
                  onClick={() => setPaymentMethod(pm.id)}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === pm.id
                      ? 'border-[#BE123C] bg-rose-50/30 ring-1 ring-[#BE123C]'
                      : 'border-zinc-200 bg-white hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${paymentMethod === pm.id ? 'bg-[#BE123C] text-white' : 'bg-zinc-100 text-zinc-700'}`}>
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-zinc-900 block">{pm.name}</span>
                      <span className="text-[10px] text-zinc-400">{pm.badge}</span>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === pm.id ? 'border-[#BE123C]' : 'border-zinc-300'}`}>
                    {paymentMethod === pm.id && <div className="w-2 h-2 rounded-full bg-[#BE123C]" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Destination */}
            <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                <MapPin className="w-4 h-4 text-[#BE123C]" />
                <span>Drop-off Destination</span>
              </div>
              <p className="text-xs text-zinc-600">Bole Atlas, Cameroon Street, Near Edna Mall, Addis Ababa</p>
              <p className="text-[11px] text-zinc-400">Recipient: +251 91 123 4567</p>
            </div>

            {/* Pay and Confirm CTA */}
            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-500 block">Total Due</span>
                <span className="text-lg font-bold text-zinc-950">
                  {checkoutData?.totalPayable ? `${checkoutData.totalPayable.toLocaleString()} ETB` : '952.00 ETB'}
                </span>
              </div>

              <button
                type="button"
                onClick={handleConfirmOrder}
                className="px-8 py-3 rounded-full bg-zinc-950 hover:bg-[#BE123C] text-white text-xs font-bold transition-all shadow-md"
              >
                Authorize & Track Courier
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: LIVE TRACKER & CHEF INTERACTION (Screen 3 Mockup) */}
        {step === 'tracking' && (
          <div className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
            
            {/* Left Column: Live Map & Rider Panel */}
            <div className="lg:col-span-7 p-6 space-y-5">
              
              {/* ETA Status Bar */}
              <div className="p-4 rounded-xl bg-zinc-950 text-white flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Courier is en-route with hot order</span>
                  </div>
                  <h4 className="text-sm font-bold text-zinc-200">Estimated Delivery: Bole District</h4>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-400 font-mono">
                    {etaMinutes}:18
                  </span>
                  <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Minutes Left</span>
                </div>
              </div>

              {/* Graphical Simulated Route Map */}
              <div className="relative w-full h-56 bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
                  alt="City Route Map"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/40" />

                {/* Animated Dispatch Marker */}
                <div className="absolute flex flex-col items-center animate-bounce">
                  <div className="p-2.5 rounded-full bg-[#BE123C] text-white shadow-lg ring-4 ring-white">
                    <Bike className="w-5 h-5" />
                  </div>
                  <span className="mt-1 px-2 py-0.5 rounded bg-zinc-900 text-white text-[9px] font-bold">
                    Rider Haile
                  </span>
                </div>
              </div>

              {/* Rider Identity Card */}
              <div className="p-4 rounded-xl border border-zinc-200 bg-white shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-sm">
                    HA
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-zinc-900">Haile Tadesse</h5>
                    <p className="text-[11px] text-zinc-500">TVS Apache 160 • Plate AA-3-49102</p>
                    <span className="inline-block mt-0.5 text-[10px] font-semibold text-emerald-600">
                      ⭐ 4.9 (420+ successful trips)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => alert("Calling courier at +251 91 199 8877...")}
                    className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors" 
                    title="Call Courier"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => alert("Direct SMS to rider opened.")}
                    className="px-3.5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Live Chat with Kitchen & Chef */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-zinc-50/40">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-zinc-900">Kitchen & Chef Live Line</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-medium">Bole Central Kitchen</span>
                </div>

                {/* Chat History Box */}
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {chefMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#BE123C] text-white rounded-br-none'
                            : 'bg-white border border-zinc-200 text-zinc-800 rounded-bl-none shadow-2xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendChefMessage} className="mt-4 pt-3 border-t border-zinc-200 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask chef for extra awaze, sauce..."
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-full border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:border-zinc-400"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-full bg-zinc-950 text-white hover:bg-[#BE123C] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}