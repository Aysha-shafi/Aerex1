import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const fileFilter = (req, file, cb) => file.mimetype.startsWith("image/") ? cb(null, true) : cb(new Error("Images only"));
export const upload = multer({ storage: multer.memoryStorage(), fileFilter, limits: { fileSize: 5*1024*1024 } });

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const uploadToCloudinary = (file) => new Promise((resolve, reject) => {
  configureCloudinary();
  const stream = cloudinary.uploader.upload_stream({ folder: "aerex/products", resource_type: "image" }, (error, result) => {
    if (error) reject(error); else resolve(result.secure_url);
  });
  stream.end(file.buffer);
});
