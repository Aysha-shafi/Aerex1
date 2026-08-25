import { Link } from "react-router-dom";
import Sweep from "../components/Sweep.jsx";

const services = [
  {
    number: "01",
    slug: "hvac-engineering-maintenance",
    title: "HVAC Engineering & Maintenance",
    subtitle: "Complete HVAC solutions ensuring efficiency, performance and reliability.",
    icon: "❄️",
    color: "#1b5fe0",
    image: "/images/services/hvac.png",
    tags: ["Expert Team", "Quality Service", "Reliable Solutions", "Safety & Compliance"],
    items: [
      "Preventive Maintenance", "Refrigerant Charging",
      "AHU Servicing", "Leak Detection",
      "Filter Replacement", "Duct Insulation",
      "Coil Cleaning", "Air Balancing",
      "Condenser Cleaning", "Thermostat Calibration",
      "Evaporator Cleaning", "Compressor Replacement",
    ],
  },
  {
    number: "02",
    slug: "kitchen-exhaust-cleaning",
    title: "Kitchen Exhaust Cleaning",
    subtitle: "Professional cleaning to improve fire safety, maintain hygiene and ensure compliance with industry standards.",
    icon: "🔧",
    color: "#0a5c8a",
    image: "/images/services/kitchen.png",
    tags: ["Fire Safety", "Hygiene Compliance", "Industry Standards"],
    items: [
      "Kitchen Hood Cleaning", "Ecology Unit Cleaning",
      "Kitchen Duct Cleaning", "Kitchen Exhaust Inspection",
      "Exhaust Fan Cleaning", "Ecology Filter Replacement",
    ],
  },
  {
    number: "03",
    slug: "drainage-specialised-services",
    title: "Drainage & Specialised Services",
    subtitle: "Efficient solutions for smooth operations by preventing blockages and ensuring effective wastewater management.",
    icon: "🌊",
    color: "#0d7a6b",
    image: "/images/services/drainage.png",
    tags: ["Preventive", "Efficient", "Compliant"],
    items: [
      "Drain Line Flushing", "Sewer Line Cleaning",
      "Drain Line Jetting", "Septic Tank Cleaning",
      "Drain Blockage Removal",
    ],
  },
];
const stats = [
  { value: "3+", label: "Core Services" },
  { value: "100%", label: "Quality Assured" },
  { value: "UAE", label: "Wide Coverage" },
  // { value: "24/7", label: "Support Available" },
];

export default function Services() {
  return (
    <>
     
     {/* HERO */}
<section
  style={{
    position: "relative",
    backgroundImage: `
      linear-gradient(
    90deg,
    rgba(5, 18, 40, 0.82),
    rgba(5, 18, 40, 0.70)
  ),
      url("/service.png")
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
      padding: "75px 32px 55px",
      position: "relative",
      zIndex: 2,
    }}
  >
    <div
      className="eyebrow"
      style={{ color: "var(--blue-light)" }}
    >
      Our Services
    </div>

    <h1
      style={{
        color: "#fff",
        fontSize: "clamp(32px,4vw,52px)",
        marginTop: 16,
        maxWidth: 700,
        lineHeight: 1.1,
      }}
    >
      Delivering reliable,
      <br />
      <span style={{ color: "var(--blue-light)" }}>
        efficient & high-quality
      </span>{" "}
      solutions.
    </h1>

    <p
      style={{
        color: "#d1d9e6",
        marginTop: 20,
        maxWidth: 560,
        lineHeight: 1.8,
        fontSize: 16,
      }}
    >
      Ensuring performance, safety and long-term value for commercial,
      industrial, and residential clients across the UAE.
    </p>

    {/* Stats row */}
    <div
      style={{
        display: "flex",
        gap: 40,
        marginTop: 40,
        flexWrap: "wrap",
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          style={{
            borderLeft: "2px solid var(--blue)",
            paddingLeft: 16,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#fff",
              fontFamily: "Sora, sans-serif",
            }}
          >
            {s.value}
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#aab6c9",
              marginTop: 2,
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  </div>

  <Sweep variant="dark" />
</section>

      {/* SERVICE CARDS */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {services.map((s, idx) => (
            <div
              key={s.title}
              id={s.slug}
              className="service-detail-card"
              style={{
                background: "#fff",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 4px 24px -8px rgba(10,27,61,0.12)",
                border: "1px solid var(--line)",
              }}
            >
              {/* Card header */}
              <div className="service-detail-header" style={{ background: `linear-gradient(135deg, ${s.color}, #061029)`, padding: "36px 40px", display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ fontSize: 48, lineHeight: 1 }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6, letterSpacing: "0.1em" }}>SERVICE {s.number}</div>
                  <h2 style={{ color: "#fff", fontSize: "clamp(18px,2.5vw,26px)", margin: 0 }}>{s.title}</h2>
                  <p style={{ color: "rgba(255,255,255,0.7)", marginTop: 8, fontSize: 14, lineHeight: 1.7, maxWidth: 600 }}>{s.subtitle}</p>
                </div>
              </div>

              {/* Card body */}
              {/* Card body */}
<div className="service-detail-body" style={{ padding: "32px 40px" }}>
  <div
    className="service-detail-grid"
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 40,
      alignItems: "start",
    }}
  >

    {/* LEFT — What's Included + Key Features */}
    <div>

      {/* What's Included */}
      <h4
        style={{
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--ink-soft)",
          marginBottom: 18,
        }}
      >
        What's Included
      </h4>

      <div className="service-detail-image"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px 20px",
        }}
      >
        {s.items.filter(Boolean).map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              color: "var(--ink-soft)",
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: `${s.color}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 12 12">
                <polyline
                  points="2,6 5,9 10,3"
                  fill="none"
                  stroke={s.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            {item}
          </div>
        ))}
      </div>

      {/* Key Features — BELOW What's Included */}
      <div style={{ marginTop: 28 }}>
        <h4
          style={{
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--ink-soft)",
            marginBottom: 14,
          }}
        >
          Key Features
        </h4>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {s.tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 12.5,
                background: `${s.color}10`,
                border: `1px solid ${s.color}30`,
                padding: "5px 14px",
                borderRadius: 20,
                color: s.color,
                fontWeight: 600,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

    </div>

    {/* RIGHT — Service Image */}
    <div
      style={{
        width: "100%",
        height: 260,
        borderRadius: 8,
        overflow: "hidden",
        position: "relative",
        background: "#eef3f8",
      }}
    >
      <img
        src={s.image}
        alt={s.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* subtle overlay */}
      <div
        className="service-items-grid"
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(
            to top,
            ${s.color}55,
            transparent 60%
          )`,
        }}
      />
    </div>

  </div>
</div>
            </div>
          ))}
        </div>
      </section>

    {/* WHY CHOOSE US */}
<section className="why-aerex-section">

  {/* Decorative background elements */}
  <div className="why-bg-circle why-bg-circle-1" />
  <div className="why-bg-circle why-bg-circle-2" />

  <div className="container why-aerex-container">

    {/* SECTION HEADER */}
    <div className="why-header">

      <div className="why-eyebrow">
        <span className="why-eyebrow-line" />

        WHY AEREX

        <span className="why-eyebrow-line" />
      </div>

      <h2 className="why-title">
        The AEREX difference
      </h2>

      <p className="why-description">
        Professional expertise, dependable service and a commitment to
        quality in every project we undertake.
      </p>

    </div>

    {/* CARDS */}
    <div className="why-aerex-grid">

      {[
        {
          number: "01",
          image: "/expert.png",
          title: "Expert Team",
          text: "Trained professionals with deep HVAC and engineering knowledge.",
        },
        {
          number: "02",
          image: "/quality.png",
          title: "Quality Service",
          text: "Every job completed to the highest industry standards.",
        },
        {
          number: "03",
          image: "/solutions.png",
          title: "Reliable Solutions",
          text: "Fast response times and dependable service delivery.",
        },
        {
          number: "04",
          image: "/safetyy.png",
          title: "Safety & Compliance",
          text: "All work carried out in full compliance with UAE regulations.",
        },
      ].map((v) => (

        <div
          key={v.title}
          className="why-aerex-card"
        >

          {/* Number */}
          <div className="why-card-number">
            {v.number}
          </div>

          {/* Image */}
          <div className="why-image-wrapper">

            <div className="why-image-ring">

              <img
                src={v.image}
                alt={v.title}
                className="why-image"
              />

            </div>

          </div>

          {/* Content */}
          <div className="why-card-content">

            <h3 className="why-card-title">
              {v.title}
            </h3>

            <p className="why-card-text">
              {v.text}
            </p>

          </div>

          {/* Bottom accent */}
          <div className="why-card-accent" />

        </div>

      ))}

    </div>

  </div>

</section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, var(--navy-deep), var(--navy))" }}>
        <div className="container" style={{ padding: "72px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h2 style={{ color: "#fff", fontSize: 28 }}>Ready to discuss your service requirements?</h2>
            <p style={{ color: "#aab6c9", marginTop: 8 }}>Our team replies within one business day.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={`https://wa.me/971545253697?text=${encodeURIComponent("Hello AEREX, I'd like to enquire about your services.")}`}
              target="_blank" rel="noopener noreferrer" className="btn btn-light">
              WhatsApp Us
            </a>
            <Link to="/contact" className="btn btn-outline" style={{ borderColor: "#3fa9f5", color: "#fff" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .service-card div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}