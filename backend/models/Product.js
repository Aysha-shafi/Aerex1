import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, slug: { type: String, required: true, unique: true, lowercase: true },
  brand: { type: String, default: "" }, category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  shortDescription: { type: String, default: "" }, description: { type: String, default: "" },
  specifications: [{ key: String, value: String }], images: [String],
  featured: { type: Boolean, default: false }, inStock: { type: Boolean, default: true },
}, { timestamps: true });
productSchema.index({ name: "text", shortDescription: "text", brand: "text" });
export default mongoose.model("Product", productSchema);
