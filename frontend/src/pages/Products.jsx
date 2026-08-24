import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios.js";
import ProductCard from "../components/ProductCard.jsx";
import Sweep from "../components/Sweep.jsx";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(search);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => { api.get("/categories").then((r) => setCategories(r.data || [])); }, []);
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    params.set("limit", "24");
    api.get(`/products?${params}`).then((r) => { setProducts(r.data.products || []); setLoading(false); });
  }, [category, search]);

  const setCategory = (slug) => {
    const n = new URLSearchParams(searchParams);
    if (slug) n.set("category", slug); else n.delete("category");
    setSearchParams(n);
    setShowFilter(false);
  };

  const onSearch = (e) => {
    e.preventDefault();
    const n = new URLSearchParams(searchParams);
    if (searchInput) n.set("search", searchInput); else n.delete("search");
    setSearchParams(n);
  };

  return (
    <>
      <section
        style={{
          position: "relative",
          backgroundImage: `
  linear-gradient(
    90deg,
    rgba(5, 18, 40, 0.82),
    rgba(5, 18, 40, 0.70)
  ),
  url("/products.png")
`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "#fff",
          overflow: "hidden",
        }}
      >
        <div
          className="container"
          style={{
            padding: "180px 32px 90px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            className="eyebrow"
            style={{ color: "var(--blue-light)" }}
          >
            Catalog
          </div>

          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(28px,3.5vw,42px)",
              marginTop: 14,
            }}
          >
            Our Products
          </h1>

          <p
            style={{
              color: "#d1d9e6",
              marginTop: 10,
            }}
          >
            High-quality products sourced from trusted manufacturers.
          </p>
        </div>

        <Sweep variant="dark" />
      </section>

      <section className="section">
        <div className="container">
          {/* Search bar */}
          <form onSubmit={onSearch} style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              style={{ flex: 1, padding: "11px 14px", border: "1px solid var(--line)", borderRadius: "var(--radius)", fontSize: 14 }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: "11px 20px" }}>Search</button>
          </form>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="mobile-filter-btn"
            style={{ display: "none", width: "100%", padding: "11px", marginBottom: 16, background: "var(--navy)", color: "#fff", border: "none", borderRadius: 4, fontWeight: 600, fontSize: 14 }}
          >
            {showFilter ? "Hide Categories ▲" : "Filter by Category ▼"}
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 40, alignItems: "start" }}>
            {/* Sidebar */}
            <aside className={showFilter ? "filter-open" : "filter-sidebar"}>
              <h4 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ink-soft)", marginBottom: 14 }}>Categories</h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <li>
                  <button onClick={() => setCategory("")}
                    style={{ background: "none", border: "none", padding: "8px 0", fontSize: 14, fontWeight: !category ? 700 : 500, color: !category ? "var(--blue)" : "var(--ink)", cursor: "pointer", textAlign: "left" }}>
                    All Products
                  </button>
                </li>
                {categories.map((c) => (
                  <li key={c._id}>
                    <button onClick={() => setCategory(c.slug)}
                      style={{ background: "none", border: "none", padding: "8px 0", fontSize: 13.5, textAlign: "left", fontWeight: category === c.slug ? 700 : 500, color: category === c.slug ? "var(--blue)" : "var(--ink)", cursor: "pointer", width: "100%" }}>
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Products grid */}
            <div>
              {category && (
                <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 14, color: "var(--ink-soft)" }}>
                    {categories.find(c => c.slug === category)?.name}
                  </span>
                  <button onClick={() => setCategory("")} style={{ fontSize: 12, color: "var(--blue)", background: "none", border: "1px solid var(--blue)", borderRadius: 20, padding: "2px 10px", cursor: "pointer" }}>✕ Clear</button>
                </div>
              )}
              {loading ? (
                <p style={{ color: "var(--ink-soft)" }}>Loading products...</p>
              ) : products.length === 0 ? (
                <div className="card" style={{ padding: 40, textAlign: "center" }}>
                  <p style={{ color: "var(--ink-soft)" }}>No products found. Try a different category or search.</p>
                </div>
              ) : (
                <>
                  <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 16 }}>{products.length} products</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                    {products.map((p) => <ProductCard key={p._id} product={p} />)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .mobile-filter-btn { display: block !important; }
          .filter-sidebar { display: none; }
          .filter-open { display: block; background: var(--paper); border: 1px solid var(--line); border-radius: 4px; padding: 16px; margin-bottom: 16px; }
          div[style*="grid-template-columns: 220px"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="repeat(3, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 500px) {
          div[style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}