import { combineReducers } from 'redux';
import paginationReducer from './pagination';
import userAuthReducer from './userAuth';
import flashMessageReducer from './flashMessage';
import modalReducer from './modal';
import { uploadPhotoReducer, deletePhotoReducer } from './photo';
import { createRecipeReducer, updateRecipeReducer, fetchRecipesReducer } from './recipes';

const reducer = combineReducers({
    createRecipeReducer,
    updateRecipeReducer,
    fetchRecipesReducer,
    paginationReducer,
    userAuthReducer,
    flashMessageReducer,
    modalReducer,
    uploadPhotoReducer,
    deletePhotoReducer
});

export default reducer;
