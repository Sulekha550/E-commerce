import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Footer from "../components/Footer";

export default function Register() {
  const { register } = useApp();
  const nav = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setLoading(true);
    try {
      await register(form);
      nav("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Email might already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="auth-page">
        <div className="auth-card">
          <div className="auth-mark">☕</div>
          <span className="eyebrow">JOIN BREWCART</span>
          <h1>Create Your Account</h1>
          <p>Sign up to place orders, save your wishlist, and track your fresh coffee deliveries.</p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label>
              Full Name
              <input
                required
                placeholder="e.g. Rahul Sharma"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>

            <label>
              Email Address
              <input
                type="email"
                required
                placeholder="rahul@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>

            <label>
              Password (Min 6 characters)
              <input
                type="password"
                required
                minLength="6"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </label>

            <button className="primary-btn wide" type="submit" disabled={loading} style={{ marginTop: "20px" }}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="auth-switch" style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "var(--muted)" }}>
            Already have an account? <Link to="/login" style={{ fontWeight: 700, color: "var(--primary)" }}>Sign in</Link>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
