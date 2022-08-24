import dotEnv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotEnv.config();

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true
});

const uploadImage = (recipe) => {
  const { photoUrl, userId, name} = recipe;
  return cloudinary.uploader.upload(photoUrl, {
    tags: 'more_recipe',
    public_id: `${name}-${userId}`,
    width: 200,
    height: 163,
    crop: 'fill'
  }, (error, result) => {
    if (error) {
      console.log('error', error);
    }
    console.log('result', result);
  });
};

export default uploadImage;
