import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Coffee, Truck, ShieldCheck, Sparkles, ArrowRight, Award, Star, Flame, PackageCheck, Zap } from "lucide-react";
import { api } from "../api";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { useApp, FALLBACK_PRODUCTS } from "../context/AppContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useApp();
  const nav = useNavigate();

  const categories = [
    { name: "Coffee", icon: "☕" },
    { name: "Espresso", icon: "⚡" },
    { name: "Latte", icon: "🥛" },
    { name: "Cappuccino", icon: "🍫" },
    { name: "Cold Coffee", icon: "🧊" },
    { name: "Coffee Beans", icon: "🫘" }
  ];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    api.get("/products")
      .then(res => {
        if (isMounted && res.data && res.data.length > 0) {
          setProducts(res.data);
        } else if (isMounted) {
          setProducts(FALLBACK_PRODUCTS);
        }
      })
      .catch(() => {
        if (isMounted) setProducts(FALLBACK_PRODUCTS);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const bestSellers = products.slice(0, 6);
  const newArrivals = products.slice(6, 12).length >= 3 ? products.slice(6, 12) : products.slice(0, 4);

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="hero-copy">
          <span className="pill">
            <Sparkles size={14} /> Freshly Roasted Small-Batch Coffee
          </span>
          <h1>
            Good coffee.<br />
            <em>Better moments.</em>
          </h1>
          <p>
            Experience artisanal single-origin beans and signature espresso drinks crafted with passion and delivered straight to your doorstep.
          </p>

          <div className="hero-ctas">
            <Link className="primary-btn hero-btn" to="/shop">
              Shop Collection <ArrowRight size={18} />
            </Link>
            <a className="secondary-btn" href="#story">
              Our Story
            </a>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <Star size={15} fill="#f59e0b" color="#f59e0b" />
              <span><b>4.9/5</b> (2,500+ Reviews)</span>
            </div>
            <div className="trust-item">
              <Award size={15} />
              <span>100% Organic Arabica</span>
            </div>
            <div className="trust-item">
              <Truck size={15} />
              <span>Fast 2-Day Delivery</span>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <div className="steam s1" />
          <div className="steam s2" />
          <div className="coffee-cup">
            <div className="coffee-liquid" />
            <div className="cup-handle" />
          </div>
          <div className="bean bean1">●</div>
          <div className="bean bean2">●</div>
        </div>
      </section>

      {/* 2. CATEGORY SECTION */}
      <section style={{ marginBottom: "60px" }}>
        <div className="section-heading">
          <div>
            <span className="eyebrow">EXPLORE OUR SPECIALTIES</span>
            <h2>Browse by Category</h2>
          </div>
          <Link to="/shop" style={{ fontWeight: 700, color: "var(--primary)", fontSize: "14px" }}>
            View All Categories →
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="category-card"
              onClick={() => nav(`/shop?category=${encodeURIComponent(cat.name)}`)}
            >
              <div className="cat-icon" style={{ fontSize: "22px" }}>
                {cat.icon}
              </div>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS */}
      <section style={{ marginBottom: "70px" }}>
        <div className="section-heading">
          <div>
            <span className="eyebrow">MOST LOVED BEVERAGES</span>
            <h2>BrewCart Best Sellers</h2>
          </div>
          <Link to="/shop" style={{ fontWeight: 700, color: "var(--primary)", fontSize: "14px" }}>
            Explore Shop →
          </Link>
        </div>

        {loading ? (
          <div className="product-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton" style={{ height: "360px" }} />
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {bestSellers.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* 4. NEW ARRIVALS */}
      <section style={{ marginBottom: "70px" }}>
        <div className="section-heading">
          <div>
            <span className="eyebrow">FRESH FROM THE ROASTERY</span>
            <h2>New Arrivals</h2>
          </div>
        </div>

        <div className="product-grid">
          {newArrivals.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>

      {/* 5. SPECIAL OFFERS / DISCOUNT BANNER */}
      <section className="discount-banner">
        <div className="discount-copy">
          <span className="pill" style={{ background: "rgba(255,255,255,0.2)" }}>
            <Zap size={14} /> Limited Time Special Offer
          </span>
          <h2>Get 20% Off Your First Coffee Order</h2>
          <p>Treat yourself to premium roast beans, creamy lattes, and refreshing cold brews.</p>
        </div>
        <div>
          <div className="coupon-box">
            <span>CODE:</span>
            <span>BREW20</span>
          </div>
          <div style={{ textAlign: "center", marginTop: "12px" }}>
            <Link className="primary-btn hero-btn" to="/shop">
              Claim Offer Now
            </Link>
          </div>
        </div>
      </section>

      {/* 6. COFFEE BRAND STORY SECTION */}
      <section id="story" className="story-section">
        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80"
            alt="Coffee Roasting Process"
          />
        </div>
        <div className="story-copy">
          <span className="eyebrow">OUR CRAFT & PASSION</span>
          <h2>Freshly Roasted, Ethically Sourced</h2>
          <p>
            At BrewCart, we believe coffee is not just a drink — it’s a morning ritual and an evening solace. We source 100% Arabica beans directly from sustainable shade-grown farms in Ethiopia, Colombia, and Sumatra.
          </p>
          <p>
            Every single batch is precision-roasted to unlock intricate tasting notes of jasmine, dark chocolate, caramel, and citrus zest.
          </p>
          <div style={{ marginTop: "24px" }}>
            <Link className="primary-btn" to="/shop">
              Experience the Taste
            </Link>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE BREWCART */}
      <section style={{ marginBottom: "70px" }}>
        <div className="section-heading" style={{ textAlign: "center", display: "block" }}>
          <span className="eyebrow">THE BREWCART PROMISE</span>
          <h2>Why Coffee Lovers Choose Us</h2>
        </div>

        <div className="benefits">
          <div className="benefit-card">
            <div className="benefit-icon"><Flame size={24} /></div>
            <div className="benefit-info">
              <b>Freshly Roasted</b>
              <span>Roast-to-order small batches for peak flavor depth.</span>
            </div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon"><Truck size={24} /></div>
            <div className="benefit-info">
              <b>Express Delivery</b>
              <span>Free doorstep shipping on orders over ₹500.</span>
            </div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon"><ShieldCheck size={24} /></div>
            <div className="benefit-info">
              <b>Secure Payment</b>
              <span>100% encrypted checkout with UPI & Card support.</span>
            </div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon"><Award size={24} /></div>
            <div className="benefit-info">
              <b>Premium Quality</b>
              <span>Handpicked 100% Arabica shade-grown beans.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS */}
      <section className="reviews-section">
        <div className="section-heading" style={{ textAlign: "center", display: "block" }}>
          <span className="eyebrow">COMMUNITY LOVERS</span>
          <h2>What Our Customers Say</h2>
        </div>

        <div className="reviews-grid">
          <div className="review-card">
            <div className="review-stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p>"The Ethiopian Yirgacheffe is genuinely the cleanest, most fragrant coffee I've had at home. Ordering monthly now!"</p>
            <div className="review-author">— Ananya Sharma</div>
          </div>

          <div className="review-card">
            <div className="review-stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p>"The Artisanal Caramel Latte syrup balance is absolute perfection. Plus the dark mode website looks gorgeous."</p>
            <div className="review-author">— Rohan Malhotra</div>
          </div>

          <div className="review-card">
            <div className="review-stars">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p>"Super fast delivery and live order tracking! The cold brew stays fresh for days. BrewCart is my daily go-to."</p>
            <div className="review-author">— Priya Nair</div>
          </div>
        </div>
      </section>

      {/* 9. NEWSLETTER & 10. FOOTER */}
      <Footer />
    </>
  );
}
