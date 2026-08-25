import { Link } from "react-router-dom";
import { resolveAssetUrl } from "../api/axios.js";

export default function ProductCard({ product }) {
  const img = product.images?.[0];
  const imageUrl = resolveAssetUrl(img);

  return (
    <Link to={`/products/${product.slug}`} className="card product-card" style={{ overflow:"hidden",display:"block" }}>
      <div className="product-card-image-wrap" style={{ aspectRatio:"4/3",background:"var(--silver-light)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden" }}>
        {imageUrl ? <img className="product-card-image" src={imageUrl} alt={product.name} style={{ width:"100%",height:"100%",objectFit:"contain",padding:10 }}/> :
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--silver)" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 16l5-5 4 4 5-6 4 5"/></svg>}
      </div>
      <div style={{ padding:"18px 20px" }}>
        {product.brand && <div style={{ fontFamily:"Space Mono,monospace",fontSize:11,color:"var(--blue)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:6 }}>{product.brand}</div>}
        <h3 style={{ fontSize:16.5,marginBottom:6 }}>{product.name}</h3>
        <p style={{ fontSize:13.5,color:"var(--ink-soft)",margin:0,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden" }}>{product.shortDescription}</p>
        <div style={{ marginTop:14,fontSize:13,fontWeight:600,color:product.inStock?"var(--success)":"#b3413e" }}>{product.inStock?"In Stock":"On Request"}</div>
      </div>
    </Link>
  );
}
