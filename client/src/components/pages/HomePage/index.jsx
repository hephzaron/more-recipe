import React from 'react';
import RecipeForm from '../RecipeForm';
import ModalForm from '../../general/Modal';
import Pagination from '../../general/Pagination';
import CustomCard from '../../general/CustomCard';
import useHomePage from './HomePageCustomHook';
import { fetchRecipes } from '../../../actions/recipeActions';
import { hideModal } from '../../../actions/modalActions';
import { setFetchedPages } from '../../../actions/paginationActions';
import { addFlashMessage } from '../../../actions/flashMessageActions';

const HomePage = () => {
    const {
        activeRecipes,
        showRecipeModal,
        isAuthenticated,
        loading,
        error,
        wrapperRef,
        closeForm
    } = useHomePage({
        fetchRecipes,
        hideModal,
        setFetchedPages,
        addFlashMessage
    });


    if (error) {
        return <div> Error: {error.message}</div>;
    }

    if (loading) {
        document.getElementById('loader').style = "display: block;";
    } else {
        document.getElementById('loader').style = "display: none;";
    }

    return (
            <div>
                {(showRecipeModal && isAuthenticated) &&
                    <ModalForm>
                        <RecipeForm
                            recipeFormRef={wrapperRef}
                            closeRecipeModal={() => closeForm()}/>
                    </ModalForm>}
                <div className="recipe-list">
                {activeRecipes && activeRecipes.map(recipe => (
                    <CustomCard
                        key = {recipe.id}
                        recipe = {recipe}/>))}
                </div>
                {!loading && <Pagination/>}
            </div>
        );
};

export default HomePage;
