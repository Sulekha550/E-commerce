import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight, Tag, Heart, ShoppingBag } from "lucide-react";
import { useApp } from "../context/AppContext";
import Footer from "../components/Footer";

export default function Cart() {
  const { cart, cartTotal, updateQty, removeFromCart, user, toggleWishlist, showToast } = useApp();
  const nav = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "BREW20") {
      setDiscountPercent(20);
      setAppliedCoupon("BREW20");
      showToast("Coupon BREW20 applied! 20% discount added 🎉", "success");
    } else {
      showToast("Invalid coupon code. Try BREW20", "error");
    }
  };

  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const shippingFee = cartTotal > 500 || cartTotal === 0 ? 0 : 50;
  const grandTotal = Math.max(0, cartTotal - discountAmount + shippingFee);

  return (
    <>
      <section className="content-page">
        <div className="page-title">
          <span className="eyebrow">YOUR SHOPPING BAG</span>
          <h1>Shopping Cart</h1>
          <p>{cart.length ? "Review your items and proceed to checkout." : "Your cart is currently empty."}</p>
        </div>

        {!cart.length ? (
          <div className="empty-card" style={{ padding: "80px 20px" }}>
            <div className="big-icon">☕</div>
            <h2>Your cart is empty</h2>
            <p>Your bag is waiting for something fresh and delicious.</p>
            <Link className="primary-btn" to="/shop" style={{ marginTop: "16px" }}>
              Browse Coffee Catalog
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.product}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <span>₹{Number(item.price).toLocaleString("en-IN")} each</span>
                    <div className="qty-controls">
                      <button onClick={() => updateQty(item.product, item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <b>{item.quantity}</b>
                      <button onClick={() => updateQty(item.product, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <strong style={{ fontSize: "16px" }}>
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </strong>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <button
                      className="delete-btn"
                      onClick={() => removeFromCart(item.product)}
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <b>₹{cartTotal.toLocaleString("en-IN")}</b>
              </div>

              {discountAmount > 0 && (
                <div className="summary-row" style={{ color: "#166534", fontWeight: 600 }}>
                  <span>Discount ({appliedCoupon})</span>
                  <b>-₹{discountAmount.toLocaleString("en-IN")}</b>
                </div>
              )}

              <div className="summary-row">
                <span>Shipping Fee</span>
                <b>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</b>
              </div>

              <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "16px 0" }} />

              {/* COUPON CODE FORM */}
              <form className="coupon-field" onSubmit={handleApplyCoupon}>
                <input
                  type="text"
                  placeholder="Coupon code (e.g. BREW20)"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button className="primary-btn" type="submit" style={{ padding: "10px 14px", fontSize: "13px" }}>
                  Apply
                </button>
              </form>

              <div className="grand-total">
                <span>Grand Total</span>
                <b>₹{grandTotal.toLocaleString("en-IN")}</b>
              </div>

              <button
                className="primary-btn wide"
                style={{ marginTop: "16px" }}
                onClick={() => {
                  if (!user) nav("/login?next=checkout");
                  else nav("/checkout", { state: { couponCode: appliedCoupon } });
                }}
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <small style={{ display: "block", textAlign: "center", color: "var(--muted)", marginTop: "14px", fontSize: "12px" }}>
                🔒 Safe & 100% Encrypted Checkout
              </small>
            </aside>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
