export const initialRecipeState = {
    recipes: [],
    recipe: {},
    loading: false,
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
