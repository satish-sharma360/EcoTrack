import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import configration from '../config/env.congi.js'


class CloudinaryUtil {
    constructor() {
        cloudinary.config({
            cloud_name: configration.cloud_name,
            api_key: configration.api_key,
            api_secret: configration.api_secret
        })
    }

    async upload(localFilePath) {
        try {
            if (!localFilePath) {
                return null
            }

            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: 'auto'
            })
            console.log("Cloudinary Upload Success:", response.secure_url)
            return response
        } catch (error) {
            console.error("Cloudinary Upload Error:", error.message);
            fs.unlinkSync(localFilePath); // cleanup temp file
            return null;
        }
    }
}

export default new CloudinaryUtil()