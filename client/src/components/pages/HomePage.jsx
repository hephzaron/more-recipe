/* eslint-disable react/no-did-update-set-state */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CardComponent from '../general/Card';
import Pagination from '../general/Pagination';
import Header from '../general/Header';
import { fetchRecipes } from '../../actions/recipeActions';
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
     * Renders HomePage Component
     * @method render
     * @memberof HomePage
     * @param {null} void
     * @returns { JSX }  JSX component
     */
    render() {
        const { currentRecipes } = this.state;
        const { error, loading, recipes } = this.props;

        const activeRecipes = currentRecipes.length === 0 ? recipes.slice(0, 8) : currentRecipes;

        if (error) {
            return <div> Error: {error.message}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <div className="recipe-list">
                {activeRecipes && activeRecipes.map(recipe => (
                    <CardComponent
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
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
    recipes: state.recipeReducer.recipes || [],
    loading: state.recipeReducer.loading,
    error: state.recipeReducer.error,
    currentPage: state.paginationReducer.currentPage
  });

export default connect(mapStateToProps)(HomePage);
