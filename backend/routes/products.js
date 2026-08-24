import express from "express";
import Product from "../models/Product.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
const router = express.Router();
const toSlug = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")+"-"+Date.now().toString(36);

router.get("/", async (req, res) => {
  try {
    const { category, search, featured, page=1, limit=12 } = req.query;
    const query = {};
    if (category) { const Category=(await import("../models/Category.js")).default; const cat=await Category.findOne({slug:category}); if(cat) query.category=cat._id; else return res.json({products:[],total:0,page:1,pages:0}); }
    if (featured) query.featured = featured==="true";
    if (search) query.$text = { $search: search };
    const skip = (Number(page)-1)*Number(limit);
    const [products,total] = await Promise.all([Product.find(query).populate("category","name slug").sort({createdAt:-1}).skip(skip).limit(Number(limit)),Product.countDocuments(query)]);
    res.json({ products, total, page: Number(page), pages: Math.ceil(total/Number(limit)) });
  } catch(err){ res.status(500).json({message:err.message}); }
});
router.get("/:slug", async (req, res) => { const p=await Product.findOne({slug:req.params.slug}).populate("category","name slug"); if(!p) return res.status(404).json({message:"Not found"}); res.json(p); });
router.post("/", protect, upload.array("images",6), async (req, res) => {
  try {
    const { name, brand, category, shortDescription, description, featured, inStock } = req.body;
    const specifications = req.body.specifications ? JSON.parse(req.body.specifications) : [];
    const images = (req.files||[]).map(f=>`/uploads/${f.filename}`);
    res.status(201).json(await Product.create({ name, slug:toSlug(name), brand, category, shortDescription, description, specifications, images, featured:featured==="true", inStock:inStock!=="false" }));
  } catch(err){ res.status(400).json({message:err.message}); }
});
router.put("/:id", protect, upload.array("images",6), async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if(!p) return res.status(404).json({message:"Not found"});
    const { name,brand,category,shortDescription,description,featured,inStock } = req.body;
    if(name) p.name=name; if(brand!==undefined) p.brand=brand; if(category) p.category=category;
    if(shortDescription!==undefined) p.shortDescription=shortDescription; if(description!==undefined) p.description=description;
    if(req.body.specifications) p.specifications=JSON.parse(req.body.specifications);
    if(featured!==undefined) p.featured=featured==="true"; if(inStock!==undefined) p.inStock=inStock==="true";
    if(req.files?.length) p.images=[...p.images,...req.files.map(f=>`/uploads/${f.filename}`)];
    await p.save(); res.json(p);
  } catch(err){ res.status(400).json({message:err.message}); }
});
router.delete("/:id", protect, async (req, res) => { await Product.findByIdAndDelete(req.params.id); res.json({message:"Deleted"}); });
export default router;
