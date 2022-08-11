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
     * Create an instance of HomePage Component
     * @method constructor
     * @memberof HomePage
     * @param {object} props
     * @returns { null } void
     */
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        };
    }

    /**
     * A class method of superclass Component
     * @method componentDidMount
     * @memberof HomePage
     * @param {null} void
     * @returns { null } void
     */
    componentDidMount() {
        this.setState({
            recipes: [...this.props.recipes]
        });
    }

 /**
   * Renders HomePage Component
   * @method render
   * @memberof HomePage
   * @param {null} void
   * @returns { JSX }  JSX component
   */
    render() {
        const { recipes } = this.state;
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
