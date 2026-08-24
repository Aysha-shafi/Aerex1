import visionImg from "../assets/vision.png";
import missionImg from "../assets/mission.png";
import Sweep from "../components/Sweep.jsx";

const values = [
  { title:"Integrity & Customer Focus", text:"Building lasting relationships through honesty, transparency, and a commitment to customer satisfaction." },
  { title:"Quality & Excellence", text:"Delivering reliable, high-quality solutions that consistently meet the highest standards." },
  { title:"Innovation & Sustainability", text:"Embracing innovative technologies and sustainable practices to create efficient, future-ready solutions." },
  { title:"Safety & Responsibility", text:"Prioritizing safety, accountability, and responsible practices in every project and operation." },
];

export default function About() {
  return (
    <>
      <section
  style={{
    position: "relative",
    backgroundImage: `
     linear-gradient(
    135deg,
    rgba(5, 18, 40, 0.72),
    rgba(19, 39, 80, 0.48),
    rgba(24, 42, 78, 0.28)
  ),
      url("/aboutt.png")
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
      padding: "110px 32px 80px",
      position: "relative",
      zIndex: 2,
    }}
  >
    <div
      className="eyebrow"
      style={{ color: "var(--blue-light)" }}
    >
      About AEREX
    </div>

    <h1
      style={{
        color: "#fff",
        fontSize: "clamp(32px,4vw,46px)",
        marginTop: 16,
        maxWidth: 700,
        lineHeight: 1.12,
      }}
    >
      A UAE-based engineering solutions & trading company.
    </h1>

    <p
      style={{
        color: "#d1d9e6",
        maxWidth: 620,
        marginTop: 20,
        fontSize: 16,
        lineHeight: 1.7,
      }}
    >
      Delivering reliable engineering products, technical solutions,
      and professional services across the UAE and GCC.
    </p>
  </div>

  <div
    style={{
      position: "relative",
      zIndex: 2,
    }}
  >
    <Sweep variant="dark" />
  </div>
</section>
      {/* ABOUT */}
      <section className="section">
        <div className="container grid-2">
          <div>
            <h2 style={{ fontSize:26 }}>About AEREX Group</h2>
            <p style={{ marginTop:16,color:"var(--ink-soft)",lineHeight:1.8 }}>
              <strong style={{ color:"var(--navy)" }}>AEREX</strong> is a UAE-based HVAC engineering and trading company committed to delivering reliable, efficient, and high-quality solutions for commercial, industrial, and residential applications.
            </p>
            <p style={{ marginTop:14,color:"var(--ink-soft)",lineHeight:1.8 }}>
              We specialize in <strong style={{ color:"var(--navy)" }}>HVAC engineering, air conditioning, refrigeration, and related technical solutions</strong>, providing our clients with dependable products and professional services tailored to their specific requirements.
            </p>
            <p style={{ marginTop:14,color:"var(--ink-soft)",lineHeight:1.8 }}>
              At AEREX, we combine technical expertise, quality products, innovative solutions, and customer-focused service to ensure every project is delivered with precision and reliability. From project requirements and equipment supply to installation, maintenance, and technical support, we strive to provide complete solutions under one roof.
            </p>
            <p style={{ marginTop:14,color:"var(--ink-soft)",lineHeight:1.8 }}>
              Our approach is built on strong relationships, transparent communication, safety, and continuous improvement. We work closely with our clients and partners to understand their needs and deliver solutions that offer performance, energy efficiency, long-term value, and sustainability.
            </p>
          </div>
          <div className="card" style={{ padding:32 }}>
            <h3 style={{ fontSize:18,marginBottom:18 }}>At a glance</h3>
            {[["Headquarters","Sharjah, UAE"],["Coverage","UAE & GCC"],["Specialisation","HVAC, Refrigeration, Safety"],["Clients","Commercial, Industrial, Residential"],["Website","www.aerexgroup.com"]].map(([k,v])=>(
              <div key={k} style={{ display:"flex",justifyContent:"space-between",fontSize:14,borderBottom:"1px solid var(--line)",padding:"12px 0" }}>
                <span style={{ color:"var(--ink-soft)" }}>{k}</span><span style={{ fontWeight:600 }}>{v}</span>
              </div>
            ))}
            <blockquote style={{ marginTop:24,padding:"16px 20px",background:"var(--bg)",borderLeft:"3px solid var(--blue)",borderRadius:4,fontSize:14,color:"var(--ink-soft)",fontStyle:"italic",lineHeight:1.7 }}>
              "Every product we supply reflects our commitment to excellence, safety, and innovation — providing reliable engineering solutions that support success across every industry."
            </blockquote>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="section" style={{ background:"var(--navy-deep)" }}>
        <div className="container grid-2" style={{ gap:32 }}>
          <div style={{ position:"relative",borderRadius:6,overflow:"hidden",minHeight:360 }}>
            <img src={visionImg} alt="Our Vision" style={{ width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0 }}/>
            <div style={{ position:"absolute",inset:0,background:"rgba(6,16,41,0.72)" }}/>
            <div style={{ position:"relative",zIndex:2,padding:40,height:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-end" }}>
              <div className="eyebrow" style={{ color:"var(--blue-light)" }}>Our Vision</div>
              <h2 style={{ color:"#fff",fontSize:22,marginTop:14,lineHeight:1.4 }}>
                To become a leading engineering solutions and trading company recognized across the UAE and GCC.
              </h2>
              <p style={{ color:"#aab6c9",fontSize:14,marginTop:14,lineHeight:1.8 }}>
                Delivering premium products, innovative solutions, and exceptional customer service while setting new benchmarks in quality, safety, and reliability.
              </p>
            </div>
          </div>

          <div style={{ position:"relative",borderRadius:6,overflow:"hidden",minHeight:360 }}>
            <img src={missionImg} alt="Our Mission" style={{ width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0 }}/>
            <div style={{ position:"absolute",inset:0,background:"rgba(6,16,41,0.72)" }}/>
            <div style={{ position:"relative",zIndex:2,padding:40,height:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-end" }}>
              <div className="eyebrow" style={{ color:"var(--blue-light)" }}>Our Mission</div>
              <h2 style={{ color:"#fff",fontSize:22,marginTop:14,lineHeight:1.4 }}>
                To deliver high-quality engineering products from trusted global manufacturers.
              </h2>
              <p style={{ color:"#aab6c9",fontSize:14,marginTop:14,lineHeight:1.8 }}>
                Providing reliable, cost-effective, and innovative solutions tailored to customers' needs — committed to safety, quality, and sustainability, building long-term partnerships through integrity and exceptional service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="section-tight" style={{ background:"var(--paper)",borderTop:"1px solid var(--line)" }}>
        <div className="container">
          <div className="eyebrow">Core Values</div>
          <h2 style={{ fontSize:26,marginTop:14 }}>What guides our work</h2>
          <div className="grid-4" style={{ marginTop:36 }}>
            {values.map((v) => (
              <div key={v.title} style={{ borderTop:"2px solid var(--blue)",paddingTop:20 }}>
                <h3 style={{ fontSize:16 }}>{v.title}</h3>
                <p style={{ fontSize:14,color:"var(--ink-soft)",marginTop:8,lineHeight:1.7 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
