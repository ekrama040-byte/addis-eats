# Addis-Eats 🇪🇹🍽️

> **Haute Ethiopian Dining & Cultural Food Delivery Platform**  
> A modern, data-driven food discovery and ordering web application celebrating the Gursha tradition with contemporary haute cuisine aesthetics.

---

## 🌟 Key Features

* **Live Data Integration:** Fetches dishes dynamically using public meal APIs (TheMealDB) decorated with cultural Ethiopian pricing, spice scales, chef profiles, and preparation details.
* **Smart Search & Filtering:**
  * Real-time keyboard-indexed search bar (supports `⌘K`).
  * Instant **Fasting Mode (Vegan/Tsom)** toggle catering to Orthodox fasting customs.
  * Category strips for stews (wat), grilled dishes (tibs), breakfasts, and side accompaniments.
  * Curated **Today's Specials** high-rating filter with smooth-scroll anchoring.
* **Location Selector:** Interactive dropdown covering major Addis Ababa neighborhoods (Bole, Sarbet, Kazanchis, Piassa, CMC, etc.).
* **Auto-Cycling Visual Showcase:** An animated hero banner cycling through high-resolution cultural delicacies every 4 seconds.
* **Single Dish Customization Engine:**
  * Dedicated split-view modal with verified chef attribution badges.
  * Interactive spice intensity levels (Mild Alicha to Flaming Mitmita).
  * Custom add-ons with automatic price recalculation (Extra Teff Injera, Ayib Cheese, Salata).
* **Slide-over Tray & Bag (Cart Drawer):**
  * Line-item review with custom option badges and quantity steppers.
  * "Save for later" quick toggling directly to your favorites list.
  * Dynamic delivery tip selector (0%, 5%, 10%, 15%) and promotional code support (`GURSHA15`).
* **Saved Wishlist Drawer:** Dedicated side panel to view, track, or quickly order favorite dishes.
* **Live Courier Tracker & Kitchen Chat Hub:**
  * Multi-step settlement supporting Ethiopian payment gateways (Telebirr, CBE Birr, Cards, Cash).
  * Simulated live courier dispatch with route visualizer, real-time ETA countdown, and driver call/message actions.
  * Live direct chat box connected to the kitchen/chef for real-time order instructions.

---

## 🛠️ Tech Stack

* **Framework:** React 19 (Vite)
* **Styling:** Tailwind CSS (Modern minimal light-mode aesthetic with crisp borders)
* **Icons:** Lucide React
* **State Management:** React Context API (`CartContext`)
* **API / Data:** TheMealDB REST API + Local Ethiopian Data Decorators

---

## 🚀 Getting Started Locally

### Prerequisites

* Node.js (v18 or higher recommended)
* npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/ekrama040-byte/addis-eats.git](https://github.com/ekrama040-byte/addis-eats.git)
   cd addis-eats