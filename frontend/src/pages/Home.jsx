import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import Sweep from "../components/Sweep.jsx";
import ProductCard from "../components/ProductCard.jsx";
import "../index.css";

const services = [
  {
    slug: "hvac-engineering-maintenance",
    title: "HVAC Engineering & Maintenance",
    text: "Complete HVAC solutions ensuring efficiency, performance and reliability — preventive maintenance, AHU servicing, refrigerant charging and more.",
    image: "/images/services/hvac.png",
  },
  {
    slug: "kitchen-exhaust-cleaning",
    title: "Kitchen Exhaust Cleaning",
    text: "Professional cleaning to improve fire safety, maintain hygiene and ensure compliance with industry standards.",
    image: "/images/services/kitchen.png",
  },
  {
    slug: "drainage-specialised-services",
    title: "Drainage & Specialised Services",
    text: "Efficient solutions preventing blockages and ensuring effective wastewater management across commercial and industrial facilities.",
    image: "/images/services/drainage.png",
  },
];

const coreValues = [
  { title: "Integrity & Customer Focus", text: "Building lasting relationships through honesty, transparency, and a commitment to customer satisfaction." },
  { title: "Quality & Excellence", text: "Delivering reliable, high-quality solutions that consistently meet the highest standards." },
  { title: "Innovation & Sustainability", text: "Embracing innovative technologies and sustainable practices to create efficient, future-ready solutions." },
  { title: "Safety & Responsibility", text: "Prioritizing safety, accountability, and responsible practices in every project and operation." },
];
const brands = [
  { name: "Honeywell", logo: "/images/brands/honeywell.png" },
  { name: "Vaultex", logo: "/images/brands/vaultex.png" },
  { name: "Miller", logo: "/images/brands/miller.png" },
  { name: "Armstrong", logo: "/images/brands/armstrong.png" },
  { name: "WD-40", logo: "/images/brands/wd-40.jpg" },
  { name: "Uken", logo: "/images/brands/uken.png" },
  { name: "Steelpro Safety", logo: "/images/brands/steelpro.png" },
  { name: "Workland", logo: "/images/brands/workland.png" },
  { name: "M2 Safety", logo: "/images/brands/m2-safety.png" },
  { name: "BOS Safety", logo: "/images/brands/bos.png" },
];


export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    api.get("/products?featured=true&limit=4").then((r) => setFeatured(r.data.products || []));
    api.get("/categories").then((r) => setCategories(r.data || []));
  }, []);

  return (
    <>
      {/* HERO */}
      <section
        style={{
          backgroundImage: `
          linear-gradient(
    135deg,
    rgba(5, 18, 40, 0.72),
    rgba(19, 39, 80, 0.48),
    rgba(24, 42, 78, 0.28)
  ),
      
      url("/home-bg.png")
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dark overlay for better text visibility */}
<div
  style={{
    position: "absolute",
    inset: 0,
    background: "rgba(0, 4, 10, 0.28)",
    zIndex: 1,
  }}
/>
        <div
          className="container"
          style={{
            padding: "120px 32px 80px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            className="eyebrow"
            style={{ color: "var(--blue-light)" }}
          >
            AEREX — Engineering Solutions & Trading
          </div>

          <h1
            style={{
              fontSize: "clamp(36px,5vw,60px)",
              color: "#fff",
              marginTop: 18,
              maxWidth: 760,
              lineHeight: 1.08,
            }}
          >
            Engineering solutions built for the UAE and GCC.
          </h1>

          <p
            style={{
              fontSize: 17,
              color: "#f1f4f9",
              maxWidth: 580,
              marginTop: 22,
              lineHeight: 1.7,
            }}
          >
            Every product we supply reflects our commitment to excellence,
            safety, and innovation — providing reliable engineering solutions
            that support success across every industry.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 36,
              flexWrap: "wrap",
            }}
          >
            <Link to="/products" className="btn btn-light">
              Browse Products
            </Link>

            <Link
              to="/services"
              className="btn btn-outline"
              style={{
                borderColor: "#3fa9f5",
                color: "#fff",
              }}
            >
              Our Services
            </Link>
          </div>
        </div>

        {/* Sweep overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.35,
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <Sweep variant="dark" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">What We Do</div>
          <h2 style={{ fontSize: 32, marginTop: 14, maxWidth: 600 }}>Reliable, efficient and high-quality solutions.</h2>
          <div className="grid-3" style={{ marginTop: 48 }}>
            {services.map((s, i) => (
              <Link
                key={s.title}
                to={`/services#${s.slug}`}
                className="service-card"
                style={{
                  backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(5, 20, 40, 0.15),
            rgba(5, 20, 40, 0.75)
          ),
          url("${s.image}")
        `,
                }}
              >
                <div className="service-card-content">
                  <div className="service-number">
                    0{i + 1}
                  </div>

                  <h3>
                    {s.title}
                  </h3>

                  <p>
                    {s.text}
                  </p>


                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <Link to="/services" className="btn btn-outline">View All Services</Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      {categories.length > 0 && (
        <section className="category-section">
          <div className="container">

            <div className="category-section-header">
              <div>
                <div className="eyebrow">Products</div>
                <h2>Browse by Category</h2>
                <p>
                  Explore our range of engineering products and industrial solutions.
                </p>
              </div>

              <Link to="/products" className="category-view-all">
                View all products →
              </Link>
            </div>

            <div className="category-grid">
              {categories.slice(0, 10).map((c) => {

                const categoryImages = {
                  "air-filtration-solutions":
                    "/images/categories/air-filtration.png",

                  "electrical-solutions":
                    "/images/categories/electrical.png",

                  "fire-protection-systems":
                    "/images/categories/fire-protection.png",

                  "hvac-equipment":
                    "/images/categories/hvac-equipment.png",

                  "hvac-spare-parts":
                    "/images/categories/hvac-spareparts.png",

                  "industrial-consumables":
                    "/images/categories/hvac-cons.png",

                  "industrial-safety-products-ppe":
                    "/images/categories/safety.png",

                  "rope-access-height-safety":
                    "/images/categories/rope-access.png",

                  "tools-maintenance-equipment":
                    "/images/categories/tools.png",

                  "ventilation-products":
                    "/images/categories/ventilation.png",
                };
                return (
                  <Link
                    key={c._id}
                    to={`/products?category=${c.slug}`}
                    className="category-card"
                  >
                    <img
                      src={
                        categoryImages[c.slug] ||
                        "/images/categories/default.png"
                      }
                      alt={c.name}
                      className="category-card-image"
                    />

                    <div className="category-card-overlay"></div>

                    <div className="category-card-content">

                      <div className="category-icon">
                        <span>⚙</span>
                      </div>

                      <div className="category-card-text">
                        <h3>{c.name}</h3>

                        <span className="category-link">
                          Explore products
                          <span className="category-arrow">→</span>
                        </span>
                      </div>

                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* FEATURED PRODUCTS */}
      {featured.length > 0 && (
        <section className="section">
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div><div className="eyebrow">Featured</div><h2 style={{ fontSize: 28, marginTop: 12 }}>Popular equipment right now</h2></div>
              <Link to="/products" style={{ fontSize: 14, fontWeight: 600, color: "var(--blue)" }}>View all &rarr;</Link>
            </div>
            <div className="grid-4" style={{ marginTop: 36 }}>
              {featured.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* CORE VALUES */}
      <section className="section" style={{ background: "var(--navy-deep)" }}>
        <div className="container">
          <div className="eyebrow" style={{ color: "var(--blue-light)" }}>Our Core Values</div>
          <h2 style={{ color: "#fff", fontSize: 32, marginTop: 14 }}>What drives everything we do.</h2>
          <div className="grid-4" style={{ marginTop: 48 }}>
            {coreValues.map((v) => (
              <div key={v.title} style={{ borderTop: "2px solid var(--blue)", paddingTop: 20 }}>
                <h3 style={{ color: "#fff", fontSize: 16 }}>{v.title}</h3>
                <p style={{ fontSize: 13.5, color: "#aab6c9", marginTop: 10, lineHeight: 1.7 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="section-tight" style={{ background: "var(--paper)", borderTop: "1px solid var(--line)" }}>
        <div className="container" style={{ textAlign: "center", overflow: "hidden" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>Our Business Network</div>
          <h2 style={{ fontSize: 22, marginTop: 12 }}>Trusted manufacturer partnerships</h2>
          
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {/* [...brands, ...brands] duplicates the list for a continuous seamless loop */}
              {[...brands, ...brands].map((b, index) => (
                <div key={`${b.name}-${index}`} className="brand-card">
                  <img src={b.logo} alt={b.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--navy)" }}>
        <div className="container" style={{ padding: "72px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h2 style={{ color: "#fff", fontSize: 28 }}>Need a quotation or technical spec sheet?</h2>
            <p style={{ color: "#aab6c9", marginTop: 8 }}>Our team replies within one business day.</p>
          </div>
          <Link to="/contact" className="btn btn-light">Contact Sales</Link>
        </div>
      </section>
    </>
  );
}
