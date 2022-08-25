import { v2 as cloudinary } from 'cloudinary';
import '../config/cloudinary';
import signImage from '../helpers/signImage';

const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;

/**
 * Handles Cloudinary Image verification
 * @class CloudinaryController
 * @param { null } void
 */
class CloudinaryController {
  /**
    * Gets cloudinary configuration
    * @method getCloudinarySignature
    * @memberof CloudinaryController
    * @param { object } req -request
    * @param { object } res -respone
    * @returns { object } server response
    */
  static getCloudinarySignature(req, res) {
    const { timestamp, signature } = signImage();
    return res.status(200).send({
      signature,
      timestamp,
      cloudName,
      apiKey
    });
  }
}

export default CloudinaryController;