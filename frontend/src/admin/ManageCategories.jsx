import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(""); const [description, setDescription] = useState(""); const [editingId, setEditingId] = useState(null);
  const load = () => api.get("/categories").then((r)=>setCategories(r.data||[]));
  useEffect(()=>{ load(); },[]);
  const submit = async (e) => { e.preventDefault(); if(editingId) await api.put(`/categories/${editingId}`,{name,description}); else await api.post("/categories",{name,description}); setName(""); setDescription(""); setEditingId(null); load(); };
  const startEdit = (c) => { setEditingId(c._id); setName(c.name); setDescription(c.description||""); };
  const remove = async (id) => { if(!confirm("Delete?")) return; await api.delete(`/categories/${id}`); load(); };
  const inputStyle = { width:"100%",padding:"10px 12px",border:"1px solid var(--line)",borderRadius:4 };
  return (
    <div>
      <h1 style={{ fontSize:24 }}>Manage Categories</h1>
      <form onSubmit={submit} className="card" style={{ padding:24,marginTop:20,display:"flex",gap:12,alignItems:"flex-end",flexWrap:"wrap" }}>
        <div style={{ flex:1,minWidth:200 }}><label style={{ fontSize:13,fontWeight:600,display:"block",marginBottom:6 }}>Name</label><input required value={name} onChange={(e)=>setName(e.target.value)} style={inputStyle}/></div>
        <div style={{ flex:2,minWidth:240 }}><label style={{ fontSize:13,fontWeight:600,display:"block",marginBottom:6 }}>Description</label><input value={description} onChange={(e)=>setDescription(e.target.value)} style={inputStyle}/></div>
        <button type="submit" className="btn btn-primary">{editingId?"Update":"Add"}</button>
        {editingId && <button type="button" onClick={()=>{ setEditingId(null); setName(""); setDescription(""); }} className="btn btn-outline">Cancel</button>}
      </form>
      <div style={{ marginTop:28,display:"flex",flexDirection:"column",gap:10 }}>
        {categories.map((c)=>(
          <div key={c._id} className="card" style={{ padding:16,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div><div style={{ fontWeight:600 }}>{c.name}</div><div style={{ fontSize:12.5,color:"var(--ink-soft)" }}>{c.description}</div></div>
            <div style={{ display:"flex",gap:10 }}>
              <button onClick={()=>startEdit(c)} className="btn btn-outline" style={{ padding:"8px 16px",fontSize:13 }}>Edit</button>
              <button onClick={()=>remove(c._id)} style={{ padding:"8px 16px",fontSize:13,border:"1px solid #f3c5c2",color:"#b3413e",borderRadius:4,background:"none" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
