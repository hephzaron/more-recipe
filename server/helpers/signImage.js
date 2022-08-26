import { v2 as cloudinary } from 'cloudinary';
import '../config/cloudinary';

const apiSecret = cloudinary.config().api_secret;

const signImage = () => {
  const date = new Date();
  const timestamp = Math.round(date.getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request({
    timestamp,
    eager: 'c_crop,w_400,h_400,g_face|w_200,h_200,c_scale',
    folder: 'signed_recipe_upload'
  }, apiSecret);

  return { timestamp, signature };
};

export default signImage;