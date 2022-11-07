import { createReducer } from '@reduxjs/toolkit';
import { initialPhotoState } from './initialState';
import { uploadPhoto, deletePhotoByToken, deletePhotoByName } from '../actions/uploadActions';

const photoReducer = createReducer(initialPhotoState, (builder) => {
    builder.addCase(uploadPhoto.fulfilled, (state, action) => ({
        ...state,
        secureUrl: action.payload['secure_url'],
        deleteToken: action.payload['delete_token'],
        loading: 'fulfilled'
    }));
    builder.addCase(uploadPhoto.pending, (state) => ({
        ...state,
        secureUrl: '',
        deleteToken: '',
        loading: 'pending'
    }));
    builder.addCase(uploadPhoto.rejected, (state) => ({
        ...state,
        secureUrl: '',
        deleteToken: '',
        loading: 'failed'
    }));
    builder.addCase(deletePhotoByToken.fulfilled, (state, action) => ({
        ...state,
        data: action.payload['data'],
        loading: 'fulfilled'
    }));
    builder.addCase(deletePhotoByToken.pending, (state) => ({
        ...state,
        loading: 'pending'
    }));
    builder.addCase(deletePhotoByToken.rejected, (state) => ({
        ...state,
        data: '',
        loading: 'failed'
    }));
    builder.addCase(deletePhotoByName.fulfilled, (state, action) => ({
        ...state,
        data: action.payload['data'],
        loading: 'fulfilled'
    }));
    builder.addCase(deletePhotoByName.rejected, (state) => ({
        ...state,
        data: '',
        loading: 'failed'
    }));
});

export default photoReducer;
