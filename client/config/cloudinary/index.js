import dotEnv from 'dotenv';
import { Cloudinary } from '@cloudinary/url-gen';

dotEnv.config();

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env;

export const cloudinary = new Cloudinary({
    cloud: {
        cloudName: CLOUDINARY_CLOUD_NAME,
        apiKey: CLOUDINARY_API_KEY,
        apiSecret: CLOUDINARY_API_SECRET
    }
});
export default {};
