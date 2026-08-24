import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";

export default function AdminLayout() {
  const navigate = useNavigate();
  const name = localStorage.getItem("aerex_admin_name") || "Admin";
  const logout = () => { localStorage.removeItem("aerex_admin_token"); localStorage.removeItem("aerex_admin_name"); navigate("/admin/login"); };
  const linkStyle = ({ isActive }) => ({ display:"block",padding:"10px 16px",borderRadius:4,fontSize:14,fontWeight:600,color:isActive?"#fff":"#aab6c9",background:isActive?"var(--blue)":"transparent" });
  return (
    <div style={{ display:"grid",gridTemplateColumns:"240px 1fr",minHeight:"100vh" }}>
      <aside style={{ background:"var(--navy-deep)",padding:"28px 16px" }}>
        <div style={{ padding:"0 8px 24px",background:"#fff",borderRadius:6,marginBottom:8,display:"inline-block" }}><Logo/></div>
        <nav style={{ display:"flex",flexDirection:"column",gap:4,marginTop:16 }}>
          <NavLink to="/admin/products" style={linkStyle}>Products</NavLink>
          <NavLink to="/admin/categories" style={linkStyle}>Categories</NavLink>
          <NavLink to="/admin/jobs" style={linkStyle}>Careers / Jobs</NavLink>
        </nav>
        <button onClick={logout} style={{ marginTop:32,background:"none",border:"1px solid #2a3a63",color:"#aab6c9",padding:"10px 16px",borderRadius:4,width:"100%",fontSize:13 }}>Sign Out ({name})</button>
      </aside>
      <main style={{ padding:36,background:"var(--bg)" }}><Outlet/></main>
    </div>
  );
}
