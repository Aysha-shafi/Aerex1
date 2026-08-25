import { useState } from "react";
import Sweep from "../components/Sweep.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = encodeURIComponent(
      `Hello AEREX, I have an enquiry:\n\n` +
      `Name: ${form.name}\n` +
      `Company: ${form.company || "N/A"}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone || "N/A"}\n\n` +
      `Message:\n${form.message}`
    );

    window.open(
      `https://wa.me/971545253697?text=${message}`,
      "_blank"
    );
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px", border: "1px solid var(--line)",
    borderRadius: "var(--radius)", fontSize: 14, fontFamily: "inherit",
    outline: "none", background: "#fff"
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
      url("/contact.png")
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
            padding: "130px 32px 110px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            className="eyebrow"
            style={{ color: "var(--blue-light)" }}
          >
            Contact
          </div>

          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(32px,4vw,46px)",
              marginTop: 16,
            }}
          >
            Let's build better solutions together.
          </h1>

          <p
            style={{
              color: "#d1d9e6",
              marginTop: 12,
              maxWidth: 500,
            }}
          >
            Whether you need engineering, refrigeration solutions, maintenance
            services, or technical support, our team is ready to assist you.
          </p>
        </div>

        {/* Bottom decorative lines */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <Sweep variant="dark" />
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">

          {/* LEFT — Contact Info */}
          <div>
            <h2 style={{ fontSize: 22 }}>Reach us directly</h2>
            <p style={{ color: "var(--ink-soft)", marginTop: 12, lineHeight: 1.8 }}>
              For quotations, technical questions or stock availability, contact our sales team using any of the channels below.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 32 }}>

              {/* Both phones in one box */}
              <div className="card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
                <Icon name="phone" />
                <div>
                  <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 4 }}>Phone</div>
                  <a href="tel:+971545253697" style={{ display: "block", fontWeight: 600, fontSize: 15 }}>+971 54 525 3697</a>
                  <a href="tel:+971545087262" style={{ display: "block", fontWeight: 600, fontSize: 15, marginTop: 4 }}>+971 54 508 7262</a>
                </div>
              </div>

              {/* Sales email */}
              <a href="mailto:sales@aerexgroup.com" className="card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
                <Icon name="mail" />
                <div>
                  <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>Sales Enquiries</div>
                  <div style={{ fontWeight: 600 }}>sales@aerexgroup.com</div>
                </div>
              </a>

              {/* Management email */}
              <a href="mailto:mohammed@aerexgroup.com" className="card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
                <Icon name="mail" />
                <div>
                  <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>Management</div>
                  <div style={{ fontWeight: 600 }}>mohammed@aerexgroup.com</div>
                </div>
              </a>

              {/* Address */}
              <div className="card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
                <Icon name="location" />
                <div>
                  <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>Office</div>
                  <div style={{ fontWeight: 600 }}>G Floor, Shams Business Center,<br />Sharjah, UAE</div>
                </div>
              </div>

            </div>
          </div>
          {/* RIGHT — Enquiry Form */}
          <div className="card" style={{ padding: 36 }}>
            <h3 style={{ fontSize: 18, marginBottom: 6 }}>
              Send an Enquiry
            </h3>

            <p
              style={{
                fontSize: 13.5,
                color: "var(--ink-soft)",
                marginBottom: 24,
              }}
            >
              Fill in the form and send your enquiry directly to our WhatsApp team.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div className="grid-2" style={{ gap: 14 }}>
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Full Name *
                  </label>

                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Your name"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Company
                  </label>

                  <input
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                    placeholder="Company name"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Email Address *
                </label>

                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="your@email.com"
                  style={inputStyle}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Phone Number
                </label>

                <input
                  value={form.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9+\s]/g, "");
                    setForm({ ...form, phone: val });
                  }}
                  placeholder="+971 xx xxx xxxx"
                  inputMode="numeric"
                  style={inputStyle}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Message *
                </label>

                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tell us about your requirement — product, quantity, project details..."
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  justifyContent: "center",
                  marginTop: 4,
                }}
              >
                Send Enquiry
              </button>
            </form>
          </div>

        </div>
      </section>
    </>
  );
}

function Icon({ name }) {
  const p = { width: 22, height: 22, fill: "none", stroke: "var(--blue)", strokeWidth: 1.8, flexShrink: 0 };
  if (name === "mail") return <svg viewBox="0 0 24 24" {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
  if (name === "phone") return <svg viewBox="0 0 24 24" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.37a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.7-1.11a2 2 0 0 1 2.11-.45c.77.24 1.56.42 2.37.54A2 2 0 0 1 22 16.92z" /></svg>;
  return <svg viewBox="0 0 24 24" {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
}