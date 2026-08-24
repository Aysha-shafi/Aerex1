import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth > 900) setOpen(false);
    };

    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  return (
    <header style={{ position:"sticky",top:0,zIndex:50,background:"rgba(255,255,255,0.95)",backdropFilter:"blur(8px)",borderBottom:"1px solid var(--line)" }}>
      <div className="container" style={{ display:"flex",alignItems:"center",justifyContent:"space-between",height:76 }}>
        <NavLink to="/"><Logo /></NavLink>

        <nav style={{ display:"flex",gap:28 }} className="nav-desktop">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} style={({ isActive }) => ({ fontSize:14,fontWeight:600,color:isActive?"var(--blue)":"var(--ink)",padding:"8px 0",borderBottom:isActive?"2px solid var(--blue)":"2px solid transparent" })}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          <a href="tel:+971545087262" className="btn btn-primary">Get a Quote</a>
          <button aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)} className="nav-toggle"
            style={{ display:"none",background:"none",border:"none",padding:8 }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2">
              {open ? <><path d="M6 6l12 12"/><path d="M18 6l-12 12"/></> : <path d="M3 6h18M3 12h18M3 18h18"/>}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile navigation" style={{ borderTop:"1px solid var(--line)",padding:"12px 24px",display:"flex",flexDirection:"column",gap:4,background:"#fff" }}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} style={{ padding:"10px 0",fontWeight:600,fontSize:15 }}>{l.label}</NavLink>
          ))}
        </nav>
      )}

      <style>{`
        @media(max-width:900px){ .nav-desktop{display:none!important;} .nav-toggle{display:block!important;} }
      `}</style>
    </header>
  );
}
