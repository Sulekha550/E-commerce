import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const inWish = isInWishlist(product._id);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.isBestseller && <span className="badge">Best Seller</span>}
        <button
          className={`wishlist-heart-btn ${inWish ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          title={inWish ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={inWish ? "#e63946" : "none"} color={inWish ? "#e63946" : "currentColor"} />
        </button>
        <Link to={`/product/${product._id}`}>
          <img
            src={(!product.image || product.image.includes("photo-1534687524002-3c2243d46f56")) ? "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80" : product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80";
            }}
          />
        </Link>
      </div>

      <div className="product-info">
        <div className="product-meta">
          <span className="eyebrow">{product.category}</span>
          <div className="rating">
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span>{product.rating || 4.8}</span>
            <span style={{ color: "var(--muted)", fontWeight: 400 }}>({product.numReviews || 24})</span>
          </div>
        </div>

        <Link to={`/product/${product._id}`}>
          <h3>{product.name}</h3>
        </Link>

        <p>{product.description}</p>

        <div className="product-bottom">
          <div className="product-price">₹{Number(product.price).toLocaleString("en-IN")}</div>
          <button
            className="add-btn"
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
          >
            <ShoppingCart size={15} />
            <span>{product.stock > 0 ? "Add to Cart" : "Out of Stock"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
