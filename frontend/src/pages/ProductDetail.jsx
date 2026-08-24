import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios.js";

export default function ProductDetail() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    api
      .get(`/products/${slug}`)
      .then((r) => setProduct(r.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className="product-detail-section">
        <div className="container product-loading">
          Loading...
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="product-detail-section">
        <div className="container product-not-found">
          <p>Product not found.</p>

          <Link to="/products">
            ← Back to products
          </Link>
        </div>
      </section>
    );
  }

  const wa = `https://wa.me/971545087262?text=${encodeURIComponent(
    `Hello AEREX, I'm interested in the: ${product.name}. Please share more details and pricing. Thank you.`
  )}`;

  return (
    <section className="product-detail-section">

      <div className="container">

        {/* BACK */}
        <Link
          to="/products"
          className="product-back-link"
        >
          ← Back to products
        </Link>

        <div className="product-detail-layout">

          {/* =========================
              LEFT — PRODUCT IMAGES
          ========================= */}

          <div className="product-gallery">

            <div className="product-main-image">

              {product.images?.length > 0 ? (
                <img
                  src={product.images[activeImg]}
                  alt={product.name}
                />
              ) : (
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--silver)"
                  strokeWidth="1.2"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                  />
                  <path d="M3 16l5-5 4 4 5-6 4 5" />
                </svg>
              )}

            </div>

            {/* THUMBNAILS */}

            {product.images?.length > 1 && (
              <div className="product-thumbnails">

                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`product-thumbnail ${
                      i === activeImg ? "active" : ""
                    }`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                    />
                  </button>
                ))}

              </div>
            )}

          </div>


          {/* =========================
              RIGHT — PRODUCT INFO
          ========================= */}

          <div className="product-information">

            {/* BRAND */}

            {product.brand && (
              <div className="product-brand">
                {product.brand}
              </div>
            )}

            {/* TITLE */}

            <h1 className="product-detail-title">
              {product.name}
            </h1>

            {/* CATEGORY */}

            {product.category && (
              <Link
                to={`/products?category=${product.category.slug}`}
                className="product-category"
              >
                {product.category.name}
              </Link>
            )}

            {/* DESCRIPTION */}

            <p className="product-description">
              {product.description || product.shortDescription}
            </p>

            {/* STOCK */}

            <div
              className={`product-stock ${
                product.inStock ? "in-stock" : "request-stock"
              }`}
            >
              <span className="stock-dot" />
              {product.inStock
                ? "In Stock"
                : "Available on Request"}
            </div>


            {/* ACTIONS */}

            <div className="product-actions">

              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="product-whatsapp-btn"
              >
                Enquire on WhatsApp
              </a>

              <a
                href={`mailto:sales@aerexgroup.com?subject=${encodeURIComponent(
                  "Enquiry: " + product.name
                )}`}
                className="product-email-btn"
              >
                Email Enquiry
              </a>

            </div>


            {/* SPECIFICATIONS */}

            {product.specifications?.length > 0 && (
              <div className="product-specifications">

                <div className="specifications-heading">
                  <span />
                  <h3>Specifications</h3>
                </div>

                <div className="specifications-table">

                  {product.specifications.map((s, i) => (
                    <div
                      className="specification-row"
                      key={i}
                    >
                      <div className="specification-key">
                        {s.key}
                      </div>

                      <div className="specification-value">
                        {s.value}
                      </div>
                    </div>
                  ))}

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}