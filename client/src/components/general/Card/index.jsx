import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomCard from "./CustomCard";

/**
 * Class component for recipe card
 * @class CardComponent
 * @param { props } object
 * @returns { JSX } JSX component
 */
class CardComponent extends Component {
    /**
     * Create an instance of CardComponent
     * @method constructor
     * @memberof CardComponent
     * @param {object} props
     * @returns { null } void
     */
    constructor(props) {
        super(props);
        this.state = {};
    }

  /**
   * Renders CardComponent
   * @method render
   * @memberof CardComponent
   * @param {null} void
   * @returns { JSX }  JSX component
   */
    render() {
        return (
            <CustomCard
                recipe={this.props.recipe}/>
        );
    }
}

CardComponent.propTypes = {
    recipe: PropTypes.object.isRequired,
    cardActions: PropTypes.array
};

export default CardComponent;
