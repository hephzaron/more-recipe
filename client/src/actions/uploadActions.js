import axios from 'axios';
import dotEnv from 'dotenv';
import { createAsyncThunk } from '@reduxjs/toolkit';

dotEnv.config();

const { SERVER_URL } = process.env;
let cloudinaryName;

/**Make photo credentials available in outer scope*/
export const uploadPhoto = createAsyncThunk(
    'photos/uploadPhotoStatus',
    async ({ photoFile }) => {
        try {
            const formData = new FormData();
            const cloudinaryConfig = await axios.get(`${SERVER_URL}/upload/sign`);
            const {
                apiKey,
                timestamp,
                signature,
                cloudName
            } = cloudinaryConfig.data;

            console.log(
                apiKey,
                timestamp,
                signature,
                cloudName, photoFile );

            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
            cloudinaryName = cloudName;

            formData.append('file', photoFile);
            formData.append('signature', signature);
            formData.append('api_key', apiKey);
            formData.append('timestamp', timestamp);
            formData.append('return_delete_token', true);
            formData.append('eager', 'c_crop,w_400,h_400,g_face|w_200,h_200,c_scale');
            formData.append('folder', 'signed_recipe_upload');
            let Axios = axios.create();
            delete Axios.defaults.headers.common['authorization'];

            const uploadResponse = await Axios.post(cloudinaryUrl, formData);
            return uploadResponse.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);


/**
 * deletePhotoByToken
 * @description deletes a recipe photo on failure to create recipe
 * @param { string } cloudName - cloudinary cloud_name
 * @param { string } deleteToken - delete_token of saved photo in cloudinary
 * @returns { promise } -Axios http response from the server
 */
export const deletePhotoByToken = createAsyncThunk(
    'photos/deletePhotoStatus',
    async ({ deleteToken }) => {
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinaryName}/delete_by_token`;
        let Axios = axios.create();
        delete Axios.defaults.headers.common['authorization'];
        try {
            const response = await Axios.post(cloudinaryUrl, { token: deleteToken });
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);
