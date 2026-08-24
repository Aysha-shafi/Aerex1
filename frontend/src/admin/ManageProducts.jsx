import { useEffect, useState } from "react";
import api from "../api/axios.js";

const emptyForm = { name:"",brand:"",category:"",shortDescription:"",description:"",featured:false,inStock:true,specifications:[{key:"",value:""}] };
const inputStyle = { width:"100%",padding:"10px 12px",border:"1px solid var(--line)",borderRadius:4,fontSize:14 };

function Field({ label, children, style }) {
  return <div style={style}><label style={{ display:"block",fontSize:13,fontWeight:600,marginBottom:6 }}>{label}</label>{children}</div>;
}

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const load = () => {
    api.get("/products?limit=100").then((r)=>setProducts(r.data.products||[]));
    api.get("/categories").then((r)=>setCategories(r.data||[]));
  };
  useEffect(load,[]);

  const resetForm = () => { setForm(emptyForm); setFiles([]); setEditingId(null); };
  const startEdit = (p) => { setEditingId(p._id); setForm({ name:p.name,brand:p.brand||"",category:p.category?._id||"",shortDescription:p.shortDescription||"",description:p.description||"",featured:p.featured,inStock:p.inStock,specifications:p.specifications?.length?p.specifications:[{key:"",value:""}] }); setFiles([]); window.scrollTo({top:0,behavior:"smooth"}); };
  const updateSpec = (i,f,v) => { const s=[...form.specifications]; s[i][f]=v; setForm({...form,specifications:s}); };
  const addSpec = () => setForm({...form,specifications:[...form.specifications,{key:"",value:""}]});
  const removeSpec = (i) => setForm({...form,specifications:form.specifications.filter((_,idx)=>idx!==i)});

  const submit = async (e) => {
    e.preventDefault(); setSaving(true); setMsg("");
    try {
      const fd = new FormData();
      ["name","brand","category","shortDescription","description"].forEach(k=>fd.append(k,form[k]));
      fd.append("featured",form.featured); fd.append("inStock",form.inStock);
      fd.append("specifications",JSON.stringify(form.specifications.filter(s=>s.key)));
      files.forEach(f=>fd.append("images",f));
      const headers = { "Content-Type":"multipart/form-data" };
      if(editingId) await api.put(`/products/${editingId}`,fd,{headers});
      else await api.post("/products",fd,{headers});
      setMsg(editingId?"Product updated.":"Product created."); resetForm(); load();
    } catch(err){ setMsg(err.response?.data?.message||"Error saving"); } finally { setSaving(false); }
  };

  const remove = async (id) => { if(!confirm("Delete this product?")) return; await api.delete(`/products/${id}`); load(); };

  return (
    <div>
      <h1 style={{ fontSize:24 }}>Manage Products</h1>
      <form onSubmit={submit} className="card" style={{ padding:28,marginTop:20 }}>
        <h3 style={{ fontSize:16,marginBottom:18 }}>{editingId?"Edit Product":"New Product"}</h3>
        {msg && <div style={{ background:"#e7f5ee",color:"#1c8a5a",padding:"8px 14px",borderRadius:4,fontSize:13,marginBottom:16 }}>{msg}</div>}
        <div className="grid-2" style={{ gap:18 }}>
          <Field label="Name"><input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} style={inputStyle}/></Field>
          <Field label="Brand"><input value={form.brand} onChange={(e)=>setForm({...form,brand:e.target.value})} style={inputStyle}/></Field>
        </div>
        <Field label="Category" style={{ marginTop:16 }}>
          <select required value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} style={inputStyle}>
            <option value="">Select category</option>
            {categories.map((c)=><option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </Field>
        <Field label="Short Description" style={{ marginTop:16 }}><input value={form.shortDescription} onChange={(e)=>setForm({...form,shortDescription:e.target.value})} style={inputStyle}/></Field>
        <Field label="Full Description" style={{ marginTop:16 }}><textarea rows={4} value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} style={{...inputStyle,resize:"vertical"}}/></Field>
        <Field label="Specifications" style={{ marginTop:16 }}>
          {form.specifications.map((s,i)=>(
            <div key={i} style={{ display:"flex",gap:10,marginBottom:8 }}>
              <input placeholder="Key" value={s.key} onChange={(e)=>updateSpec(i,"key",e.target.value)} style={inputStyle}/>
              <input placeholder="Value" value={s.value} onChange={(e)=>updateSpec(i,"value",e.target.value)} style={inputStyle}/>
              <button type="button" onClick={()=>removeSpec(i)} style={{ background:"none",border:"1px solid var(--line)",borderRadius:4,padding:"0 12px" }}>✕</button>
            </div>
          ))}
          <button type="button" onClick={addSpec} style={{ fontSize:13,color:"var(--blue)",background:"none",border:"none",fontWeight:600 }}>+ Add spec</button>
        </Field>
        <Field label="Images" style={{ marginTop:16 }}><input type="file" multiple accept="image/*" onChange={(e)=>setFiles(Array.from(e.target.files))}/></Field>
        <div style={{ display:"flex",gap:24,marginTop:18 }}>
          <label style={{ fontSize:14,display:"flex",alignItems:"center",gap:8 }}><input type="checkbox" checked={form.featured} onChange={(e)=>setForm({...form,featured:e.target.checked})}/> Featured</label>
          <label style={{ fontSize:14,display:"flex",alignItems:"center",gap:8 }}><input type="checkbox" checked={form.inStock} onChange={(e)=>setForm({...form,inStock:e.target.checked})}/> In Stock</label>
        </div>
        <div style={{ display:"flex",gap:12,marginTop:24 }}>
          <button type="submit" disabled={saving} className="btn btn-primary">{saving?"Saving...":editingId?"Update":"Create"}</button>
          {editingId && <button type="button" onClick={resetForm} className="btn btn-outline">Cancel</button>}
        </div>
      </form>

      <div style={{ marginTop:36 }}>
        <h3 style={{ fontSize:16,marginBottom:14 }}>All Products ({products.length})</h3>
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          {products.map((p)=>(
            <div key={p._id} className="card" style={{ padding:16,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              <div><div style={{ fontWeight:600 }}>{p.name}</div><div style={{ fontSize:12.5,color:"var(--ink-soft)" }}>{p.category?.name}{p.featured&&" · Featured"}</div></div>
              <div style={{ display:"flex",gap:10 }}>
                <button onClick={()=>startEdit(p)} className="btn btn-outline" style={{ padding:"8px 16px",fontSize:13 }}>Edit</button>
                <button onClick={()=>remove(p._id)} style={{ padding:"8px 16px",fontSize:13,border:"1px solid #f3c5c2",color:"#b3413e",borderRadius:4,background:"none" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
