import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Clock3, Truck, CheckCircle2, XCircle, ShoppingBag } from "lucide-react";
import { api } from "../api";
import OrderTracker from "../components/OrderTracker";
import Footer from "../components/Footer";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api.get("/orders/my-orders")
      .then((r) => {
        if (isMounted) {
          setOrders(r.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setOrders([]);
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <section className="content-page">
        <div className="page-title">
          <span className="eyebrow">YOUR ACCOUNT</span>
          <h1>My Orders & Tracking</h1>
          <p>Keep an eye on every coffee package making its way to your doorstep.</p>
        </div>

        {loading ? (
          <div style={{ display: "grid", gap: "20px" }}>
            <div className="skeleton" style={{ height: "200px" }} />
            <div className="skeleton" style={{ height: "200px" }} />
          </div>
        ) : orders.length ? (
          <div className="orders-list">
            {orders.map((o) => (
              <article className="order-card" key={o._id}>
                <div className="order-head">
                  <div>
                    <span className="eyebrow">ORDER #{o._id.slice(-8).toUpperCase()}</span>
                    <h3>
                      {new Date(o.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })}
                    </h3>
                  </div>

                  <span className={`status-badge ${o.status.toLowerCase().replace(/\s+/g, "")}`}>
                    {o.status}
                  </span>
                </div>

                {/* VISUAL STEP PROGRESS TIMELINE */}
                <OrderTracker status={o.status} />

                <div className="order-products">
                  {o.items.map((i, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                      <img src={i.image} alt={i.name} style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover" }} />
                      <div>
                        <b style={{ display: "block", fontSize: "14px" }}>{i.name}</b>
                        <span style={{ fontSize: "12px", color: "var(--muted)" }}>Qty: {i.quantity} × ₹{i.price}</span>
                      </div>
                      <b style={{ marginLeft: "auto", fontSize: "14px" }}>₹{(i.price * i.quantity).toLocaleString("en-IN")}</b>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
                  <span style={{ fontSize: "13px", color: "var(--muted)" }}>
                    Payment: {o.paymentMethod || "Credit Card"}
                  </span>
                  <div>
                    <span style={{ fontSize: "14px", marginRight: "10px", color: "var(--muted)" }}>Order Total:</span>
                    <strong style={{ fontSize: "20px" }}>₹{o.totalAmount.toLocaleString("en-IN")}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-card" style={{ padding: "80px 20px" }}>
            <div className="big-icon">📦</div>
            <h2>No orders yet</h2>
            <p>You haven't placed any orders yet. Start your coffee journey today!</p>
            <Link className="primary-btn" to="/shop" style={{ marginTop: "16px" }}>
              Explore Coffee Catalog
            </Link>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
