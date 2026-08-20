import { Link, useLocation, useParams } from "react-router-dom";
import { CheckCircle2, ArrowRight, Package, MapPin } from "lucide-react";
import OrderTracker from "../components/OrderTracker";
import Footer from "../components/Footer";

export default function OrderConfirmation() {
  const { id } = useParams();
  const location = useLocation();
  const order = location.state?.order;

  return (
    <>
      <section className="content-page">
        <div className="empty-card" style={{ maxWidth: "800px", margin: "30px auto", padding: "40px 30px", textAlign: "left" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ display: "inline-grid", placeItems: "center", width: "70px", height: "70px", borderRadius: "50%", background: "#dcfce7", color: "#166534", margin: "0 auto 16px" }}>
              <CheckCircle2 size={36} />
            </div>
            <span className="eyebrow">ORDER CONFIRMED</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", margin: "6px 0" }}>
              Thank You for Your Order!
            </h1>
            <p style={{ color: "var(--muted)", margin: 0 }}>
              Order ID: <b style={{ color: "var(--text)" }}>#{id ? id.slice(-8).toUpperCase() : "BREW9821"}</b>
            </p>
          </div>

          {/* VISUAL ORDER TRACKER */}
          <div style={{ margin: "30px 0" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", marginBottom: "8px" }}>Live Order Status</h3>
            <OrderTracker status={order?.status || "Placed"} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", margin: "30px 0", padding: "20px", background: "var(--surface-alt)", borderRadius: "16px" }}>
            <div>
              <span className="eyebrow">SHIPPING TO</span>
              <h4 style={{ margin: "4px 0 8px" }}>{order?.shippingAddress?.fullName || "Valued Customer"}</h4>
              <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>
                {order?.shippingAddress?.address}<br />
                {order?.shippingAddress?.city}, {order?.shippingAddress?.postalCode}<br />
                Phone: {order?.shippingAddress?.phone}
              </p>
            </div>

            <div>
              <span className="eyebrow">PAYMENT SUMMARY</span>
              <h4 style={{ margin: "4px 0 8px" }}>Method: {order?.paymentMethod || "Credit Card"}</h4>
              <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>
                Items Total: ₹{order?.subtotal?.toLocaleString("en-IN") || order?.totalAmount?.toLocaleString("en-IN")}<br />
                Shipping: {order?.shippingFee === 0 ? "FREE" : `₹${order?.shippingFee || 0}`}<br />
                <b style={{ color: "var(--text)", fontSize: "15px" }}>
                  Grand Total Paid: ₹{order?.totalAmount?.toLocaleString("en-IN")}
                </b>
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "30px" }}>
            <Link className="primary-btn" to="/orders">
              Track Order History
            </Link>
            <Link className="secondary-btn" to="/shop" style={{ color: "var(--text)", borderColor: "var(--line)" }}>
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
