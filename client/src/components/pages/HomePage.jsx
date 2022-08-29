/* eslint-disable react/no-did-update-set-state */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardComponent from '../general/Card';
import RecipeForm from './RecipeForm';
import ModalForm from '../general/Modal';
import Pagination from '../general/Pagination';
import CustomCard from '../general/CustomCard';
import { fetchRecipes } from '../../actions/recipeActions';
import { hideModal } from '../../actions/modalActions';
/**
 * Class component for homepage
 * @class HomePage
 * @param { props } object
 * @returns { JSX } JSX component
 */
class HomePage extends Component {
    /**
     * Creates an instance of HomePage component
     * @method constructor
     * @param {object} props
     * @returns {null} void
     */
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            currentRecipes: []
        };
        this.closeForm = this.closeForm.bind(this);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    /**
     * Life Cycle method when component mounts
     * @method componentDidMount
     * @memberof HomePage
     * @param {null} void
     * @returns { null }  void
     */
    componentDidMount() {
        this.props.dispatch(fetchRecipes());
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    /**
     * Lifecycle method when components update
     * @method componentDidUpdate
     * @memberof HomePage
     * @param {object} prevProps
     * @returns {null} void
     */
    componentDidUpdate(prevProps) {
        if (this.props.currentPage !== prevProps.currentPage) {
            const { recipes, currentPage } = this.props;
            const end = (currentPage * 8);
            const start = end - 8;
            const currentRecipes = recipes.slice(start, end);
            this.setState({ currentRecipes, currentPage });
        }
    }

    /**
     * Lifecycle method when components update
     * @method componentWillUnmount
     * @memberof HomePage
     * @param {null} void
     * @returns {null} void
     */
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    /**
      * @method closeForm
      * @description closes Recipe modal form
      * @param {object} event
      * @returns { null } void
      */
    closeForm() {
      this.props.dispatch(hideModal());
    }

    /**
      * @method handleClickOutside
      * @description closes Recipe modal form when clicked outside the form
      * @param {object} event
      * @returns { null } void
      */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.props.dispatch(hideModal());
        }
    }

    /**
     * Renders HomePage Component
     * @method render
     * @memberof HomePage
     * @param {null} void
     * @returns { JSX }  JSX component
     */
    render() {
        const { currentRecipes } = this.state;
        const {
            error,
            loading,
            recipes,
            showRecipeModal,
            isAuthenticated
        } = this.props;

        const activeRecipes = currentRecipes.length === 0 ? recipes.slice(0, 8) : currentRecipes;

        if (error) {
            return <div> Error: {error.message}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                {(showRecipeModal && isAuthenticated) &&
                    <ModalForm>
                        <RecipeForm
                            recipeFormRef={this.wrapperRef}
                            closeRecipeModal={() => this.closeForm()}/>
                    </ModalForm>}
                <div className="recipe-list">
                {activeRecipes && activeRecipes.map(recipe => (
                    <CustomCard
                        key = {recipe.id}
                        recipe = {recipe}/>))}
                </div>
                <Pagination/>
            </div>
        );
    }
}

HomePage.propTypes = {
    recipes: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object,
    currentPage: PropTypes.number,
    dispatch: PropTypes.func,
    showRecipeModal: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    recipes: state.recipeReducer.recipes || [],
    loading: state.recipeReducer.loading,
    error: state.recipeReducer.error,
    currentPage: state.paginationReducer.currentPage,
    showRecipeModal: state.modalReducer.show,
    isAuthenticated: state.userAuthReducer.isAuthenticated
  });

export default connect(mapStateToProps)(HomePage);
