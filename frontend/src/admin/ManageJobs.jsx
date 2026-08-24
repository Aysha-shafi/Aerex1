import { useEffect, useState } from "react";
import api from "../api/axios.js";

const emptyForm = { title:"",department:"",location:"Sharjah, UAE",type:"Full-time",description:"",requirements:"",isOpen:true };
const inputStyle = { width:"100%",padding:"10px 12px",border:"1px solid var(--line)",borderRadius:4,fontSize:14 };

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const load = () => api.get("/jobs?all=true").then((r)=>setJobs(r.data||[]));
  useEffect(()=>{ load(); },[]);
  const submit = async (e) => {
    e.preventDefault();
    const payload = {...form,requirements:form.requirements.split(",").map(s=>s.trim()).filter(Boolean)};
    if(editingId) await api.put(`/jobs/${editingId}`,payload); else await api.post("/jobs",payload);
    setForm(emptyForm); setEditingId(null); load();
  };
  const startEdit = (j) => { setEditingId(j._id); setForm({...j,requirements:(j.requirements||[]).join(", ")}); };
  const remove = async (id) => { if(!confirm("Delete?")) return; await api.delete(`/jobs/${id}`); load(); };
  return (
    <div>
      <h1 style={{ fontSize:24 }}>Manage Careers / Jobs</h1>
      <form onSubmit={submit} className="card" style={{ padding:28,marginTop:20 }}>
        <h3 style={{ fontSize:16,marginBottom:18 }}>{editingId?"Edit Job":"New Job"}</h3>
        <div className="grid-2" style={{ gap:18 }}>
          <div><label style={{ fontSize:13,fontWeight:600,display:"block",marginBottom:6 }}>Title</label><input required value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} style={inputStyle}/></div>
          <div><label style={{ fontSize:13,fontWeight:600,display:"block",marginBottom:6 }}>Department</label><input value={form.department} onChange={(e)=>setForm({...form,department:e.target.value})} style={inputStyle}/></div>
          <div><label style={{ fontSize:13,fontWeight:600,display:"block",marginBottom:6 }}>Location</label><input value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})} style={inputStyle}/></div>
          <div><label style={{ fontSize:13,fontWeight:600,display:"block",marginBottom:6 }}>Type</label>
            <select value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})} style={inputStyle}>
              <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop:16 }}><label style={{ fontSize:13,fontWeight:600,display:"block",marginBottom:6 }}>Description</label><textarea rows={3} value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} style={{...inputStyle,resize:"vertical"}}/></div>
        <div style={{ marginTop:16 }}><label style={{ fontSize:13,fontWeight:600,display:"block",marginBottom:6 }}>Requirements (comma separated)</label><input value={form.requirements} onChange={(e)=>setForm({...form,requirements:e.target.value})} style={inputStyle} placeholder="e.g. 3+ years HVAC, UAE driving license"/></div>
        <label style={{ fontSize:14,display:"flex",alignItems:"center",gap:8,marginTop:16 }}><input type="checkbox" checked={form.isOpen} onChange={(e)=>setForm({...form,isOpen:e.target.checked})}/> Open for applications</label>
        <div style={{ display:"flex",gap:12,marginTop:22 }}>
          <button type="submit" className="btn btn-primary">{editingId?"Update Job":"Create Job"}</button>
          {editingId && <button type="button" onClick={()=>{ setEditingId(null); setForm(emptyForm); }} className="btn btn-outline">Cancel</button>}
        </div>
      </form>
      <div style={{ marginTop:32,display:"flex",flexDirection:"column",gap:10 }}>
        {jobs.map((j)=>(
          <div key={j._id} className="card" style={{ padding:16,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div><div style={{ fontWeight:600 }}>{j.title} {!j.isOpen&&<span style={{ color:"#b3413e",fontSize:12 }}>(Closed)</span>}</div><div style={{ fontSize:12.5,color:"var(--ink-soft)" }}>{j.department&&`${j.department} · `}{j.location} · {j.type}</div></div>
            <div style={{ display:"flex",gap:10 }}>
              <button onClick={()=>startEdit(j)} className="btn btn-outline" style={{ padding:"8px 16px",fontSize:13 }}>Edit</button>
              <button onClick={()=>remove(j._id)} style={{ padding:"8px 16px",fontSize:13,border:"1px solid #f3c5c2",color:"#b3413e",borderRadius:4,background:"none" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
