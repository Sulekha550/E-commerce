import { Link } from "react-router-dom";
import { Coffee, Instagram, Twitter, Facebook, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { showToast } = useApp();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast("Subscribed! Thank you for joining BrewCart Club ☕", "success");
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <Link className="brand" to="/">
            <span className="brand-cup">☕</span>
            <span>Brew<span>Cart</span></span>
          </Link>
          <p>
            Crafting better moments with small-batch, sustainably sourced coffee roasted fresh to perfection. Your daily ritual, elevated.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "16px", color: "var(--primary)" }}>
            <Instagram size={20} cursor="pointer" />
            <Twitter size={20} cursor="pointer" />
            <Facebook size={20} cursor="pointer" />
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Product Catalog</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Categories</h4>
          <ul className="footer-links">
            <li><Link to="/shop?category=Espresso">Espresso</Link></li>
            <li><Link to="/shop?category=Latte">Latte</Link></li>
            <li><Link to="/shop?category=Cappuccino">Cappuccino</Link></li>
            <li><Link to="/shop?category=Cold Coffee">Cold Coffee</Link></li>
            <li><Link to="/shop?category=Coffee Beans">Coffee Beans</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>BrewCart Newsletter</h4>
          <p style={{ fontSize: "13px", marginBottom: "12px" }}>
            Subscribe to get 20% off your first order and exclusive roast releases.
          </p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="primary-btn" type="submit" style={{ padding: "12px 16px" }}>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} BrewCart Inc. All rights reserved.</span>
        <div style={{ display: "flex", gap: "18px" }}>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#support">Customer Support</a>
        </div>
      </div>
    </footer>
  );
}
