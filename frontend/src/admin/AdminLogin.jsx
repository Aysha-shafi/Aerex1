import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import Logo from "../components/Logo.jsx";

export default function AdminLogin() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try { const { data } = await api.post("/auth/login",{email,password}); localStorage.setItem("aerex_admin_token",data.token); localStorage.setItem("aerex_admin_name",data.admin.name); navigate("/admin/products"); }
    catch(err){ setError(err.response?.data?.message||"Login failed"); } finally { setLoading(false); }
  };
  return (
    <div style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)" }}>
      <form onSubmit={submit} className="card" style={{ width:380,padding:36 }}>
        <Logo/>
        <h2 style={{ fontSize:20,marginTop:24 }}>Admin Sign In</h2>
        {error && <div style={{ background:"#fde8e7",color:"#b3413e",padding:"10px 14px",borderRadius:4,fontSize:13.5,marginTop:18 }}>{error}</div>}
        <label style={{ display:"block",marginTop:22,fontSize:13,fontWeight:600 }}>Email</label>
        <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} style={{ width:"100%",padding:"10px 12px",border:"1px solid var(--line)",borderRadius:4,marginTop:6,fontSize:14 }}/>
        <label style={{ display:"block",marginTop:16,fontSize:13,fontWeight:600 }}>Password</label>
        <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} style={{ width:"100%",padding:"10px 12px",border:"1px solid var(--line)",borderRadius:4,marginTop:6,fontSize:14 }}/>
        <button type="submit" disabled={loading} className="btn btn-primary" style={{ width:"100%",justifyContent:"center",marginTop:26 }}>{loading?"Signing in...":"Sign In"}</button>
      </form>
    </div>
  );
}
