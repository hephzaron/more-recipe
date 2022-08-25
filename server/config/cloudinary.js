import { v2 as cloudinary } from 'cloudinary';
import dotEnv from 'dotenv';

dotEnv.config();

const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env;

const cloudinaryConfig = cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
});

export default cloudinaryConfig;