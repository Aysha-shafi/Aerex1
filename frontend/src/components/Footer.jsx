import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#ffffff",
        color: "var(--ink-soft)",
        marginTop: 96,
        borderTop: "1px solid var(--line)",
      }}
    >
      <div
        className="container footer-grid"
        style={{ padding: "64px 32px 32px" }}
      >
        {/* LOGO + DESCRIPTION */}
        <div>
          <Logo />

          <p
            style={{
              marginTop: 16,
              fontSize: 14,
              lineHeight: 1.8,
              color: "var(--ink-soft)",
              maxWidth: 280,
            }}
          >
            Engineering Solutions & Trading — delivering reliable, efficient
            and high-quality solutions for commercial, industrial, and
            residential applications across the UAE and GCC.
          </p>
        </div>

        {/* COMPANY + PRODUCTS */}
        <div className="footer-links-mobile">
          {/* COMPANY */}
          <div>
            <h4
              style={{
                color: "var(--navy)",
                fontSize: 14,
                marginBottom: 16,
              }}
            >
              Company
            </h4>

            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {[
                ["About", "/about"],
                ["Services", "/services"],
                ["Products", "/products"],
                ["Careers", "/careers"],
                ["Contact", "/contact"],
              ].map(([l, t]) => (
                <li key={t}>
                  <Link
                    to={t}
                    style={{
                      fontSize: 14,
                      color: "var(--ink-soft)",
                    }}
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PRODUCTS */}
          <div>
            <h4
              style={{
                color: "var(--navy)",
                fontSize: 14,
                marginBottom: 16,
              }}
            >
              Products
            </h4>

            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {[
                ["HVAC Equipment", "hvac-equipment"],
                ["HVAC Spare Parts", "hvac-spare-parts"],
                ["Ventilation Products", "ventilation-products"],
                ["Fire Protection", "fire-protection-systems"],
                [
                  "Safety Products (PPE)",
                  "industrial-safety-products-ppe",
                ],
              ].map(([l, s]) => (
                <li key={s}>
                  <Link
                    to={`/products?category=${s}`}
                    style={{
                      fontSize: 14,
                      color: "var(--ink-soft)",
                    }}
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h4
            style={{
              color: "var(--navy)",
              fontSize: 14,
              marginBottom: 16,
            }}
          >
            Contact
          </h4>

          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              fontSize: 14,
              color: "var(--ink-soft)",
            }}
          >
            {/* LOCATION */}
            <li
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <MapPin
                size={18}
                strokeWidth={1.8}
                style={{
                  color: "var(--blue)",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              />

              <span>
                G Floor, Shams Business Center,
                <br />
                Sharjah, UAE
              </span>
            </li>

            {/* PHONE 1 */}
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Phone
                size={17}
                strokeWidth={1.8}
                style={{
                  color: "var(--blue)",
                  flexShrink: 0,
                }}
              />

              <a
                href="tel:+971545253697"
                style={{ color: "var(--ink-soft)" }}
              >
                +971 54 525 3697
              </a>
            </li>

            {/* PHONE 2 */}
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Phone
                size={17}
                strokeWidth={1.8}
                style={{
                  color: "var(--blue)",
                  flexShrink: 0,
                }}
              />

              <a
                href="tel:+971545087262"
                style={{ color: "var(--ink-soft)" }}
              >
                +971 54 508 7262
              </a>
            </li>

            {/* EMAIL 1 */}
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Mail
                size={17}
                strokeWidth={1.8}
                style={{
                  color: "var(--blue)",
                  flexShrink: 0,
                }}
              />

              <a
                href="mailto:sales@aerexgroup.com"
                style={{ color: "var(--ink-soft)" }}
              >
                sales@aerexgroup.com
              </a>
            </li>

            {/* EMAIL 2 */}
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Mail
                size={17}
                strokeWidth={1.8}
                style={{
                  color: "var(--blue)",
                  flexShrink: 0,
                }}
              />

              <a
                href="mailto:mohammed@aerexgroup.com"
                style={{ color: "var(--ink-soft)" }}
              >
                mohammed@aerexgroup.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        style={{
          borderTop: "1px solid var(--line)",
          padding: "20px 32px",
          fontSize: 12.5,
          color: "var(--ink-soft)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span>
          © {new Date().getFullYear()} AEREX LLC. All rights reserved.
        </span>

        <span>
          Engineering Solutions & Trading — Sharjah, UAE
        </span>
      </div>
    </footer>
  );
}