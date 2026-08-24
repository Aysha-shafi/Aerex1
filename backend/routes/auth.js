import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
const router = express.Router();
const signToken = (a) => jwt.sign({ id: a._id, email: a.email, name: a.name }, process.env.JWT_SECRET, { expiresIn: "7d" });
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email?.toLowerCase() });
    if (!admin || !(await admin.comparePassword(password))) return res.status(401).json({ message: "Invalid credentials" });
    res.json({ token: signToken(admin), admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) { res.status(500).json({ message: err.message }); }
});
export default router;
