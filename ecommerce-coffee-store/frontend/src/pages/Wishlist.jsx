import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useApp();

  return (
    <>
      <section className="content-page">
        <div className="page-title">
          <span className="eyebrow">YOUR FAVOURITES</span>
          <h1>My Wishlist</h1>
          <p>Saved coffees you love. Move them to your cart whenever you're ready.</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="empty-card" style={{ padding: "80px 20px" }}>
            <div className="big-icon">❤️</div>
            <h2>Your wishlist is empty</h2>
            <p>Explore our coffee collection and tap the heart icon on your favorite items.</p>
            <Link className="primary-btn" to="/shop" style={{ marginTop: "16px" }}>
              Explore Coffee Catalog
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {wishlist.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
