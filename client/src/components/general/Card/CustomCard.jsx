import React from "react";
import PropTypes from "prop-types";

const CustomCard = (props) => {
    const {
        id,
        userId,
        name,
        description,
        photoUrl,
        createdAt,
        likes
    } = props.recipe;
    return (
        <figure className="recipe">
            <div className="recipe_img_container">
                <span className="save-recipe"><i className="fas fa-save"/></span>
                <img src={photoUrl} alt="Recipe" className="recipe_img"/>
            </div>
            <div className="recipe_content">
                <div className="recipe_title">
                    <h1 className="heading_primary">{name}<i className="fas fa-mug-hot"/></h1>
                    <div className="recipe_tag recipe_tag--1">{id}</div>
                    <div className="recipe_tag recipe_tag--2">{likes}</div>
                </div>
                <p className="recipe_description">
                    {description}
                    <a href="">Read More</a>
                </p>
                <div className="recipe_details">
                    <p className="recipe_detail">
                        <span className="icons icons-red">
                            <i className="fas fa-user"/>
                        </span>
                        <b><a href="">{userId}</a></b>
                    </p>
                    <p className="recipe_detail">
                        <span className="icons icons-grey">
                            <i className="fas fa-clock"/>
                        </span>{createdAt}
                    </p>
                    <p className="recipe_detail">
                        <span className="icons icons-grey">
                            <i className="fas fa-trash"/>
                        </span>
                    </p>
                </div>
            </div>
        </figure>
    );
};

CustomCard.propTypes = {
    recipe: PropTypes.object.isRequired
};

export default CustomCard;
