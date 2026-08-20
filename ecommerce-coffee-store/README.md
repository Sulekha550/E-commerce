# BrewCart — Premium Coffee E-Commerce Web Application

**BrewCart** is a complete, production-grade coffee e-commerce web application crafted with an elegant espresso brown aesthetic, responsive design, dark/light theme persistence, visual 6-stage order tracking, wishlist, admin analytics, and complete backend REST APIs.

---

## ☕ Key Features & Brand Highlights

- **Sophisticated Coffee Palette & Theme Switching**:
  - Light mode: Warm beige, soft cream, and roasted espresso accents.
  - Dark mode: Deep espresso & roast coffee shades (never plain black).
  - Persistent theme selection using `localStorage`.

- **10-Section Homepage**:
  1. Hero section ("Good coffee. Better moments.") with CTA buttons, floating steam visual, and trust indicators.
  2. Specialties Category Grid (Coffee, Espresso, Latte, Cappuccino, Cold Coffee, Coffee Beans).
  3. Best Sellers (6+ curated coffee products with quick Add-to-Cart & Wishlist heart toggle).
  4. New Arrivals section.
  5. Special Offers / Discount Banner (Coupon `BREW20` for 20% off).
  6. Coffee Brand Story section ("Freshly Roasted, Ethically Sourced").
  7. Why Choose BrewCart promise (Freshly roasted, Fast delivery, Secure payment, Premium quality).
  8. Customer reviews & testimonials.
  9. Newsletter subscription with toast feedback.
  10. Comprehensive footer with quick links, social icons, and copyright.

- **Product Catalog & Shop Page**:
  - Search bar across product names, descriptions, and categories.
  - Interactive Category filter chips.
  - Price range slider filter (₹100 – ₹600).
  - Sorting options (Price Low/High, Rating, Name).
  - Skeleton loaders and empty filter state recovery.

- **Rich Product Details Page**:
  - Large photo layout, rating stars, and review counts.
  - Roast level (Light, Medium, Dark), Origin, and Ingredients metadata.
  - In-stock availability tag and quantity selector.
  - Add to Cart, Buy Now, and Wishlist toggle.
  - Related products grid based on category.

- **Wishlist & Cart**:
  - Dedicated Wishlist page (`/wishlist`) with item management.
  - Cart with +/- quantity controls, item removal, and coupon code input (`BREW20` for 20% off).
  - Dynamic Subtotal, Discount, Shipping fee (Free over ₹500), and Grand Total calculation.

- **Checkout & Order Confirmation**:
  - Shipping address form & contact phone number.
  - Delivery speed selector (Standard vs Express).
  - Payment method UI selector (Credit/Debit Card, UPI / QR, Cash on Delivery).
  - Order success screen (`/order-confirmation/:id`) with live tracker.

- **Visual Order Tracking**:
  - Interactive 6-stage progress timeline stepper:
    `Order Placed` → `Confirmed` → `Preparing` → `Shipped` → `Out for Delivery` → `Delivered`

- **Role-Based Access & Admin Dashboard**:
  - User: Browse catalog, Wishlist, Cart, Checkout, Profile, and track personal orders.
  - Admin: Full Admin Console (`/admin`) featuring:
    - Analytics KPI Stat Cards: Revenue, Total Orders, Total Products, Total Users.
    - Product Management: Add, Edit pre-filled form, Delete, Stock management, Roast levels.
    - Order Management: Filter orders, view customer info, update 6-stage order status.
    - User Management: View registered accounts and assigned roles.

- **Database Offline Fallback**:
  - Built-in fallback product dataset guarantees the homepage and shop never render blank even if MongoDB is offline or disconnected during development.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), React Router v6, Lucide React Icons
- **Styling**: Modern CSS with CSS variables, Flexbox/Grid, and media queries
- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose ORM
- **Authentication**: JSON Web Tokens (JWT) + bcryptjs password hashing

---

## 🚀 Setup & Installation Instructions

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Seed database with 12 coffee products, admin, and demo user
npm run seed

# Start development server
npm run dev
```

The backend server runs on `http://localhost:5000`.

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Build for production
npm run build

# Start development preview
npm run dev
```

The frontend app runs on `http://localhost:5173` (or Vite assigned port).

---

## 🔑 Demo Accounts & Credentials

Running `npm run seed` in the `backend` populates the database with:

- **Admin Account**:
  - Email: `admin@brewcart.com`
  - Password: `Admin@123`

- **Demo User Account**:
  - Email: `user@brewcart.com`
  - Password: `User@123`

- **Discount Coupon**:
  - Code: `BREW20` (gives 20% discount at checkout)
