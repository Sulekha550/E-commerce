import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, ShieldCheck, CreditCard, Smartphone, Banknote, Truck } from "lucide-react";
import { api } from "../api";
import { useApp } from "../context/AppContext";
import Footer from "../components/Footer";

export default function Checkout() {
  const { cart, cartTotal, clearCart, user, showToast } = useApp();
  const nav = useNavigate();
  const location = useLocation();

  const passedCoupon = location.state?.couponCode || "";
  const [couponCode, setCouponCode] = useState(passedCoupon);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [shippingSpeed, setShippingSpeed] = useState("standard");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    postalCode: user?.postalCode || ""
  });
  const [error, setError] = useState("");

  const discountPercent = couponCode.trim().toUpperCase() === "BREW20" ? 20 : 0;
  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const baseShipping = cartTotal > 500 ? 0 : 50;
  const shippingFee = shippingSpeed === "express" ? baseShipping + 60 : baseShipping;
  const grandTotal = Math.max(0, cartTotal - discountAmount + shippingFee);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cart.length) {
      showToast("Your cart is empty", "error");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/orders", {
        items: cart,
        shippingAddress: form,
        couponCode,
        paymentMethod
      });

      clearCart();
      showToast("Order placed successfully! ☕", "success");
      nav(`/order-confirmation/${res.data._id}`, { state: { order: res.data } });
    } catch (err) {
      // Demo fallback if backend database is offline
      const mockOrder = {
        _id: "demo-ord-" + Math.floor(100000 + Math.random() * 900000),
        items: cart,
        totalAmount: grandTotal,
        subtotal: cartTotal,
        discount: discountAmount,
        shippingFee,
        couponCode,
        paymentMethod,
        shippingAddress: form,
        status: "Placed",
        createdAt: new Date().toISOString()
      };
      clearCart();
      showToast("Order placed in demo mode! ☕", "success");
      nav(`/order-confirmation/${mockOrder._id}`, { state: { order: mockOrder } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="content-page">
        <div className="page-title">
          <span className="eyebrow">CHECKOUT</span>
          <h1>Shipping & Payment</h1>
          <p>Please enter your delivery address and choose your payment method.</p>
        </div>

        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="form-card">
            <h2>Shipping Details</h2>
            {error && <div className="error">{error}</div>}

            <label>
              Full Name
              <input
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="e.g. Rahul Sharma"
              />
            </label>

            <label>
              Phone Number
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="e.g. +91 98765 43210"
              />
            </label>

            <label>
              Street Address
              <input
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="e.g. 42 Coffee Lane, Apt 4B"
              />
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <label>
                City
                <input
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="e.g. Bangalore"
                />
              </label>

              <label>
                Postal Code
                <input
                  required
                  value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  placeholder="e.g. 560001"
                />
              </label>
            </div>

            <h2 style={{ marginTop: "32px" }}>Shipping Method</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px", border: "1px solid var(--line)", borderRadius: "12px", cursor: "pointer", background: shippingSpeed === "standard" ? "var(--soft)" : "transparent" }}>
                <input
                  type="radio"
                  name="speed"
                  checked={shippingSpeed === "standard"}
                  onChange={() => setShippingSpeed("standard")}
                />
                <div style={{ flex: 1 }}>
                  <b style={{ display: "block" }}>Standard Ground Delivery (2-3 Days)</b>
                  <span style={{ fontSize: "12px", color: "var(--muted)" }}>{baseShipping === 0 ? "FREE" : "₹50"}</span>
                </div>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px", border: "1px solid var(--line)", borderRadius: "12px", cursor: "pointer", background: shippingSpeed === "express" ? "var(--soft)" : "transparent" }}>
                <input
                  type="radio"
                  name="speed"
                  checked={shippingSpeed === "express"}
                  onChange={() => setShippingSpeed("express")}
                />
                <div style={{ flex: 1 }}>
                  <b style={{ display: "block" }}>Express Morning Delivery (Next Day)</b>
                  <span style={{ fontSize: "12px", color: "var(--muted)" }}>₹{baseShipping + 60}</span>
                </div>
              </label>
            </div>

            <h2 style={{ marginTop: "32px" }}>Payment Method UI</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginTop: "12px" }}>
              {[
                { id: "Credit Card", label: "Credit/Debit", icon: CreditCard },
                { id: "UPI", label: "UPI / QR", icon: Smartphone },
                { id: "COD", label: "Cash on Delivery", icon: Banknote }
              ].map((m) => {
                const Icon = m.icon;
                const active = paymentMethod === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    style={{
                      padding: "16px 12px",
                      border: `2px solid ${active ? "var(--primary)" : "var(--line)"}`,
                      borderRadius: "14px",
                      textAlign: "center",
                      cursor: "pointer",
                      background: active ? "var(--soft)" : "var(--surface)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <Icon size={22} color={active ? "var(--primary)" : "var(--muted)"} />
                    <span style={{ display: "block", fontSize: "12px", fontWeight: 700, marginTop: "6px" }}>{m.label}</span>
                  </div>
                );
              })}
            </div>

            <button
              className="primary-btn wide"
              type="submit"
              disabled={loading}
              style={{ marginTop: "32px" }}
            >
              {loading ? "Processing Order..." : `Place Order (₹${grandTotal.toLocaleString("en-IN")})`} <CheckCircle2 size={18} />
            </button>
          </div>

          <aside className="summary">
            <h2>Order Summary</h2>
            {cart.map((item) => (
              <div className="summary-row" key={item.product}>
                <span>{item.name} × {item.quantity}</span>
                <b>₹{(item.price * item.quantity).toLocaleString("en-IN")}</b>
              </div>
            ))}

            <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "16px 0" }} />

            <div className="summary-row">
              <span>Subtotal</span>
              <b>₹{cartTotal.toLocaleString("en-IN")}</b>
            </div>

            {discountAmount > 0 && (
              <div className="summary-row" style={{ color: "#166534", fontWeight: 600 }}>
                <span>Discount</span>
                <b>-₹{discountAmount.toLocaleString("en-IN")}</b>
              </div>
            )}

            <div className="summary-row">
              <span>Shipping Fee</span>
              <b>₹{shippingFee}</b>
            </div>

            <div className="grand-total">
              <span>Total</span>
              <b>₹{grandTotal.toLocaleString("en-IN")}</b>
            </div>
          </aside>
        </form>
      </section>
      <Footer />
    </>
  );
}
