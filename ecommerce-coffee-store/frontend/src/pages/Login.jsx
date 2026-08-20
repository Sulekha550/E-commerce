import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Footer from "../components/Footer";

export default function Login() {
  const { login } = useApp();
  const nav = useNavigate();
  const loc = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      const next = new URLSearchParams(loc.search).get("next");
      nav(next === "checkout" ? "/checkout" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="auth-page">
        <div className="auth-card">
          <div className="auth-mark">☕</div>
          <span className="eyebrow">WELCOME BACK</span>
          <h1>Sign in to BrewCart</h1>
          <p>Access your saved cart, track orders and enjoy personalized coffee recommendations.</p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label>
              Email Address
              <input
                type="email"
                required
                placeholder="user@brewcart.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </label>

            <button className="primary-btn wide" type="submit" disabled={loading} style={{ marginTop: "20px" }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="auth-switch" style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "var(--muted)" }}>
            New to BrewCart? <Link to="/register" style={{ fontWeight: 700, color: "var(--primary)" }}>Create an account</Link>
          </p>

          <div style={{ margin: "20px 0 0", padding: "14px", background: "var(--surface-alt)", borderRadius: "12px", fontSize: "12px", color: "var(--muted)" }}>
            <b>Demo Credentials:</b><br />
            Admin: <code>admin@brewcart.com</code> / <code>Admin@123</code><br />
            User: <code>user@brewcart.com</code> / <code>User@123</code>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
