import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Sun, Moon, UserRound, LogOut, LayoutDashboard, Heart, Coffee, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { user, logout, cartCount, wishlistCount, theme, toggleTheme } = useApp();
  const nav = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link className="brand" to="/">
          <span className="brand-cup">☕</span>
          <span>Brew<span>Cart</span></span>
        </Link>

        <nav>
          <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
          <Link to="/shop" className={isActive("/shop") ? "active" : ""}>Shop</Link>
          <Link to="/wishlist" className={isActive("/wishlist") ? "active" : ""}>Wishlist</Link>
          {user && <Link to="/orders" className={isActive("/orders") ? "active" : ""}>Orders</Link>}
          {user?.role === "admin" && (
            <Link to="/admin" className={isActive("/admin") ? "active" : ""}>
              <LayoutDashboard size={15} /> Admin
            </Link>
          )}
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={toggleTheme}
            title={theme === "light" ? "Switch to Dark Coffee Theme" : "Switch to Light Cream Theme"}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Link className="wishlist-btn icon-btn" to="/wishlist" title="Wishlist">
            <Heart size={18} />
            {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
          </Link>

          <Link className="cart-btn" to="/cart" title="Shopping Cart">
            <ShoppingBag size={18} />
            <span>Cart</span>
            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="user-menu">
              <button
                className="user-btn"
                onClick={() => nav("/profile")}
                title="Profile Settings"
              >
                <UserRound size={16} />
                <span>{user.name.split(" ")[0]}</span>
              </button>

              <button
                className="icon-btn"
                onClick={() => {
                  logout();
                  nav("/");
                }}
                title="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link className="login-link" to="/login">Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
}
