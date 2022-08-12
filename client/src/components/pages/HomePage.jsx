import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CardComponent from '../general/Card';
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
   * Renders HomePage Component
   * @method render
   * @memberof HomePage
   * @param {null} void
   * @returns { JSX }  JSX component
   */
    componentDidMount() {
        this.props.dispatch(fetchRecipes());
      }

  /**
   * Renders HomePage Component
   * @method render
   * @memberof HomePage
   * @param {null} void
   * @returns { JSX }  JSX component
   */
    render() {
        const { recipes, error, loading } = this.props;

        if (error) {
            return <div> Error: {error.message}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Header/>
                {recipes && recipes.map(recipe => (
                    <CardComponent
                        key = {recipe.id}
                        recipe = {recipe}/>))}
            </div>
        );
    }
}

HomePage.propTypes = {
    recipes: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.object,
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
    recipes: state.recipeReducer.recipes || [],
    loading: state.recipeReducer.loading,
    error: state.recipeReducer.error
  });

export default connect(mapStateToProps)(HomePage);
