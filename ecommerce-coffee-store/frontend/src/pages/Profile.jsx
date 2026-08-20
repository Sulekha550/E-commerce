import { useState } from "react";
import { Link } from "react-router-dom";
import { UserRound, Mail, Phone, MapPin, Shield, Save, Package, Heart } from "lucide-react";
import { useApp } from "../context/AppContext";
import Footer from "../components/Footer";

export default function Profile() {
  const { user, showToast } = useApp();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "+91 98765 43210",
    address: user?.address || "42 Coffee Street",
    city: user?.city || "Bangalore",
    postalCode: user?.postalCode || "560001"
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast("Profile details updated successfully!", "success");
  };

  return (
    <>
      <section className="content-page">
        <div className="page-title">
          <span className="eyebrow">ACCOUNT SETTINGS</span>
          <h1>My Profile</h1>
          <p>Manage your account details and default delivery address.</p>
        </div>

        <div className="cart-layout">
          <div className="form-card">
            <h2>Personal Information</h2>
            <form onSubmit={handleSave}>
              <label>
                Full Name
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>

              <label>
                Email Address
                <input value={form.email} disabled style={{ opacity: 0.7 }} />
              </label>

              <label>
                Phone Number
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </label>

              <h2 style={{ marginTop: "28px" }}>Saved Shipping Address</h2>

              <label>
                Street Address
                <input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <label>
                  City
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </label>

                <label>
                  Postal Code
                  <input
                    value={form.postalCode}
                    onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  />
                </label>
              </div>

              <button className="primary-btn" type="submit" style={{ marginTop: "24px" }}>
                <Save size={16} /> Save Profile Changes
              </button>
            </form>
          </div>

          <aside className="summary">
            <h2>Account Details</h2>

            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "var(--soft)", color: "var(--primary)", display: "grid", placeItems: "center", margin: "0 auto 12px", fontSize: "28px" }}>
                ☕
              </div>
              <h3 style={{ margin: "0 0 4px" }}>{user?.name}</h3>
              <span className="badge" style={{ position: "static", display: "inline-block" }}>
                {user?.role === "admin" ? "ADMINISTRATOR" : "BREWCART MEMBER"}
              </span>
            </div>

            <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "16px 0" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link className="secondary-btn" to="/orders" style={{ color: "var(--text)", borderColor: "var(--line)", justifyContent: "flex-start" }}>
                <Package size={16} /> View Order History
              </Link>
              <Link className="secondary-btn" to="/wishlist" style={{ color: "var(--text)", borderColor: "var(--line)", justifyContent: "flex-start" }}>
                <Heart size={16} /> View Saved Wishlist
              </Link>
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </>
  );
}
