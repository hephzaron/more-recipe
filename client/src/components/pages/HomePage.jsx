import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CardComponent from '../general/Card';
import Header from '../general/Header';

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
    render() {
        const { recipes } = this.props;
        return (
            <div>
                <Header/>
                {recipes && recipes.map(recipe => (
                    <CardComponent
                        recipe = {recipe}/>))}
            </div>
        );
    }
}

HomePage.propTypes = {
    recipes: PropTypes.array.isRequired
};

export default HomePage;
