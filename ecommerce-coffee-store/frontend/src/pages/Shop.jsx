import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, SlidersHorizontal, RotateCcw } from "lucide-react";
import { api } from "../api";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { FALLBACK_PRODUCTS } from "../context/AppContext";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(600);
  const [sort, setSort] = useState("newest");
  const [bestsellerOnly, setBestsellerOnly] = useState(false);

  const categories = ["All", "Coffee", "Espresso", "Latte", "Cappuccino", "Cold Coffee", "Coffee Beans"];

  useEffect(() => {
    setCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products", {
        params: {
          search,
          category: category !== "All" ? category : undefined,
          maxPrice,
          bestseller: bestsellerOnly ? "true" : undefined,
          sort
        }
      });
      if (res.data && res.data.length > 0) {
        setProducts(res.data);
      } else {
        // Fallback filter locally if DB returns empty
        setProducts(filterFallback());
      }
    } catch {
      setProducts(filterFallback());
    } finally {
      setLoading(false);
    }
  };

  const filterFallback = () => {
    return FALLBACK_PRODUCTS.filter(p => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || p.category === category;
      const matchPrice = p.price <= maxPrice;
      const matchBest = !bestsellerOnly || p.isBestseller;
      return matchSearch && matchCat && matchPrice && matchBest;
    }).sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  };

  useEffect(() => {
    loadProducts();
  }, [category, maxPrice, sort, bestsellerOnly]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setMaxPrice(600);
    setSort("newest");
    setBestsellerOnly(false);
    setSearchParams({});
  };

  return (
    <>
      <section className="content-page">
        <div className="page-title">
          <span className="eyebrow">THE BREWCART COLLECTION</span>
          <h1>Explore Coffee Catalog</h1>
          <p>Find your perfect brew from our hand-picked selection of specialty coffees and beans.</p>
        </div>

        <div className="shop-layout">
          {/* SIDEBAR FILTERS */}
          <aside className="filters-sidebar">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px", fontSize: "18px", fontFamily: "'Playfair Display', serif" }}>
                <Filter size={18} /> Filters
              </h3>
              <button onClick={resetFilters} style={{ border: 0, background: "none", color: "var(--muted)", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
                <RotateCcw size={13} /> Reset
              </button>
            </div>

            <div className="filter-group">
              <h4>Category</h4>
              <div className="filter-list">
                {categories.map((c) => (
                  <div
                    key={c}
                    className={`filter-item ${category === c ? "active" : ""}`}
                    onClick={() => {
                      setCategory(c);
                      if (c === "All") searchParams.delete("category");
                      else searchParams.set("category", c);
                      setSearchParams(searchParams);
                    }}
                  >
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h4>Max Price: ₹{maxPrice}</h4>
              <input
                type="range"
                className="price-slider"
                min="100"
                max="600"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--muted)", marginTop: "4px" }}>
                <span>₹100</span>
                <span>₹600</span>
              </div>
            </div>

            <div className="filter-group">
              <h4>Badges</h4>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", color: "var(--muted)" }}>
                <input
                  type="checkbox"
                  checked={bestsellerOnly}
                  onChange={(e) => setBestsellerOnly(e.target.checked)}
                />
                <span>Best Sellers Only</span>
              </label>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main>
            <div className="shop-topbar">
              <form className="search-box" onSubmit={(e) => { e.preventDefault(); loadProducts(); }}>
                <Search size={18} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products by name or ingredient..."
                />
              </form>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <SlidersHorizontal size={16} color="var(--muted)" />
                <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="newest">Sort by: Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="product-grid">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="skeleton" style={{ height: "350px" }} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="product-grid">
                {products.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            ) : (
              <div className="empty-card" style={{ padding: "80px 20px" }}>
                <div className="big-icon">☕</div>
                <h2>No products found</h2>
                <p>Try clearing filters or adjusting your search keyword.</p>
                <button className="primary-btn" onClick={resetFilters} style={{ marginTop: "16px" }}>
                  Reset Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </section>
      <Footer />
    </>
  );
}
