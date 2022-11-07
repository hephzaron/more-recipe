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
    try {
      const { timestamp, signature } = signImage();
      return res.status(200).send({
        signature,
        timestamp,
        cloudName,
        apiKey
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message
      });
    }
  }

  /**
    * Delete cloudinary image
    * @method deleteCloudinaryImage
    * @memberof CloudinaryController
    * @param { object } req -request
    * @param { object } res -respone
    * @returns { object } server response
    */
  static deleteCloudinaryImage(req, res) {
    const { imageName } = req.query;
    return cloudinary.uploader.destroy(
      `signed_recipe_upload/${imageName}`,
      { invalidate: true, resource_type: 'image' }
    )
      .then(response => res.status(200).send({response}))
      .catch(error => res.status(400).send({ message: error.message }));
  }
}

export default CloudinaryController;