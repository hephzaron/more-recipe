import React from 'react';
import { useLocation } from 'react-router-dom';
import RecipeForm from '../RecipeForm';
import ChangePasswordForm from '../ChangePasswordForm';
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
        showModalForm,
        modalForm,
        isAuthenticated,
        loading,
        wrapperRef,
        closeForm
    } = useHomePage({
        fetchRecipes,
        hideModal,
        setFetchedPages,
        addFlashMessage
    });

    const location = useLocation();
    const home = location.pathname === '/';

    if ((loading === 'fulfilled' || loading === 'failed')) {
        document.getElementById('loader').style = "display: none;";
    } else {
        document.getElementById('loader').style = "display: block;";
    }

    return (
            <div>
                {(showModalForm && isAuthenticated) &&
                    <ModalForm wrapperRef={wrapperRef}>
                        {
                            modalForm === 'recipeForm' &&
                            <RecipeForm
                                closeRecipeModal={() => closeForm()}/>
                        }
                        {
                            modalForm === 'changePasswordForm' &&
                            <ChangePasswordForm
                                closeChangePasswordModal={() => closeForm()}/>
                        }
                    </ModalForm>}
                <div className="recipe-list">
                {activeRecipes && activeRecipes.map(recipe => (
                    <CustomCard
                        key = {recipe.id}
                        recipe = {recipe}/>))}
                </div>
                {((loading === 'fulfilled' || loading === 'failed') && home) && <Pagination/>}
            </div>
        );
};

export default HomePage;
