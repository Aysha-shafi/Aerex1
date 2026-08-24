import Sweep from "../components/Sweep.jsx";

const brands = [
  { name:"Honeywell", note:"Refrigerants & controls" },
  { name:"Vaultex", note:"Safety gear & PPE" },
  { name:"Miller", note:"Fall protection & height safety" },
  { name:"Armstrong", note:"HVAC & fluid flow equipment" },
  { name:"WD-40", note:"Maintenance & industrial chemicals" },
  { name:"Uken Professional Tools", note:"Professional hand & power tools" },
  { name:"Steelpro Safety", note:"Industrial safety products" },
  { name:"Workland", note:"PPE & workwear" },
  { name:"M2 Safety", note:"Safety products & PPE" },
  { name:"BOS Safety", note:"Height safety & fall protection" },
];

export default function Brands() {
  return (
    <>
      <section style={{ background:"var(--navy-deep)",color:"#fff" }}>
        <div className="container" style={{ padding:"90px 32px 64px" }}>
          <div className="eyebrow" style={{ color:"var(--blue-light)" }}>Our Business Network</div>
          <h1 style={{ color:"#fff",fontSize:"clamp(32px,4vw,46px)",marginTop:16,maxWidth:700 }}>
            Building strong partnerships for better solutions.
          </h1>
          <p style={{ color:"#aab6c9",marginTop:16,maxWidth:560,lineHeight:1.7 }}>
            AEREX collaborates with trusted manufacturers, suppliers, contractors, consultants, and industry professionals to deliver reliable and efficient products and services.
          </p>
        </div>
        <Sweep variant="dark"/>
      </section>

      <section className="section">
        <div className="container">
          <p style={{ color:"var(--ink-soft)",maxWidth:700,lineHeight:1.8,marginBottom:48 }}>
            We believe in building long-term partnerships based on trust, collaboration, and quality, ensuring smooth project execution and solutions that consistently meet our clients' requirements. Through close coordination with our partners, we provide access to dependable products, innovative technologies, and effective solutions that add value to every project.
          </p>
          <div className="grid-3">
            {brands.map((b) => (
              <div key={b.name} className="card" style={{ padding:28,display:"flex",flexDirection:"column",gap:10 }}>
                <h3 style={{ fontSize:18 }}>{b.name}</h3>
                <p style={{ fontSize:14,color:"var(--ink-soft)" }}>{b.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:"var(--navy)",color:"#fff" }}>
        <div className="container" style={{ padding:"64px 32px",textAlign:"center" }}>
          <h2 style={{ color:"#fff",fontSize:26 }}>Interested in becoming a partner?</h2>
          <p style={{ color:"#aab6c9",marginTop:10 }}>We're always open to new manufacturer relationships and supply partnerships.</p>
          <a href="mailto:sales@aerexgroup.com?subject=Partnership Enquiry" className="btn btn-light" style={{ marginTop:24,display:"inline-flex" }}>Get in Touch</a>
        </div>
      </section>
    </>
  );
}
