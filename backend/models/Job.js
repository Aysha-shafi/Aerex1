import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true }, department: { type: String, default: "" },
  location: { type: String, default: "Sharjah, UAE" }, type: { type: String, enum: ["Full-time","Part-time","Contract","Internship"], default: "Full-time" },
  description: { type: String, default: "" }, requirements: [String], isOpen: { type: Boolean, default: true },
}, { timestamps: true });
export default mongoose.model("Job", jobSchema);
