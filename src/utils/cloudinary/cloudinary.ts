import { v2 as cloudinary, ConfigOptions } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

interface CloudinaryConfig {
    cloud_name: string;
    api_key: string;
    api_secret: string;
}

const cloudinaryConfig: CloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_SECRET_API_KEY!
};

cloudinary.config(cloudinaryConfig);

export default cloudinary;