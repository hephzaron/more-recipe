export const initialRecipeState = {
    recipes: [],
    recipe: {},
    loading: 'idle',
    error: null
};

export const initialPagerState = {
    recipePages: {},
    currentPage: 1
};

export const initialUserState = {
    user: {},
    isAuthenticated: false,
    error: ''
};

export const initialFlashMessageState = {
    message: '',
    type: ''
};

export const initialModalState = {
    show: false
};

export const initialPhotoState = {
    secureUrl: '',
    deleteToken: '',
    error: null,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
};

export const initialNotificationState = {
    notification: {}
};
