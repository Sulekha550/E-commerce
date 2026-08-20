import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Heart, Star, Flame, Globe, Sparkles, Plus, Minus, Check } from "lucide-react";
import { api } from "../api";
import { useApp, FALLBACK_PRODUCTS } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

export default function ProductDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const loadData = async () => {
      let found = null;
      try {
        const res = await api.get(`/products/${id}`);
        found = res.data;
      } catch {
        found = FALLBACK_PRODUCTS.find(p => p._id === id) || FALLBACK_PRODUCTS[0];
      }

      if (isMounted) {
        setProduct(found);
        // Load related products
        try {
          const relRes = await api.get("/products", { params: { category: found.category } });
          const relList = relRes.data.filter(p => p._id !== found._id);
          setRelated(relList.length ? relList.slice(0, 3) : FALLBACK_PRODUCTS.filter(p => p._id !== found._id).slice(0, 3));
        } catch {
          setRelated(FALLBACK_PRODUCTS.filter(p => p._id !== found._id).slice(0, 3));
        }
        setLoading(false);
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, [id]);

  if (loading || !product) {
    return (
      <div className="content-page" style={{ padding: "80px 0" }}>
        <div className="skeleton" style={{ height: "450px", borderRadius: "28px" }} />
      </div>
    );
  }

  const inWish = isInWishlist(product._id);

  return (
    <>
      <section className="details-page">
        <button className="back-btn" onClick={() => nav(-1)}>
          <ArrowLeft size={18} /> Back to Products
        </button>

        <div className="detail-card">
          <div className="detail-image-wrap">
            {product.isBestseller && <span className="badge">Best Seller</span>}
            <img
              src={(!product.image || product.image.includes("photo-1534687524002-3c2243d46f56")) ? "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80" : product.image}
              alt={product.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80";
              }}
            />
          </div>

          <div className="detail-copy">
            <div className="detail-header">
              <span className="eyebrow">{product.category}</span>
              <h1>{product.name}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
                <div className="rating">
                  <Star size={16} fill="#f59e0b" color="#f59e0b" />
                  <span style={{ fontSize: "15px" }}>{product.rating || 4.8}</span>
                </div>
                <span style={{ color: "var(--muted)", fontSize: "14px" }}>
                  ({product.numReviews || 34} Customer Reviews)
                </span>
              </div>
            </div>

            <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.7 }}>
              {product.description}
            </p>

            <div className="detail-meta-grid">
              <div className="meta-box">
                <span>Roast Level</span>
                <b>{product.roastLevel || "Medium"}</b>
              </div>
              <div className="meta-box">
                <span>Origin</span>
                <b>{product.origin || "Single Origin"}</b>
              </div>
              <div className="meta-box">
                <span>Ingredients</span>
                <b>{product.ingredients || "100% Arabica"}</b>
              </div>
            </div>

            <div className="detail-price-row">
              <div className="detail-price">₹{Number(product.price).toLocaleString("en-IN")}</div>
              <span className={`stock-tag ${product.stock <= 0 ? "out" : ""}`}>
                {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
              </span>
            </div>

            {/* QTY & ACTION BUTTONS */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "10px" }}>
              <div className="qty-picker">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                  <Minus size={16} />
                </button>
                <b style={{ minWidth: "24px", textAlign: "center" }}>{quantity}</b>
                <button onClick={() => setQuantity(q => q + 1)}>
                  <Plus size={16} />
                </button>
              </div>

              <button
                className={`wishlist-heart-btn ${inWish ? "active" : ""}`}
                style={{ position: "static", width: "44px", height: "44px", borderRadius: "12px", border: "1px solid var(--line)" }}
                onClick={() => toggleWishlist(product)}
                title="Wishlist"
              >
                <Heart size={20} fill={inWish ? "#e63946" : "none"} color={inWish ? "#e63946" : "currentColor"} />
              </button>
            </div>

            <div className="action-buttons">
              <button
                className="primary-btn"
                style={{ flex: 1 }}
                disabled={product.stock <= 0}
                onClick={() => addToCart(product, quantity)}
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>

              <button
                className="secondary-btn"
                style={{ flex: 1, color: "var(--text)", borderColor: "var(--line)" }}
                disabled={product.stock <= 0}
                onClick={() => {
                  addToCart(product, quantity);
                  nav("/checkout");
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {related.length > 0 && (
          <div style={{ marginTop: "60px" }}>
            <div className="section-heading">
              <div>
                <span className="eyebrow">YOU MIGHT ALSO LIKE</span>
                <h2>Related Products</h2>
              </div>
            </div>

            <div className="product-grid">
              {related.map(p => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
