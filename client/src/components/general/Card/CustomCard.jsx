import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSave, faMugHot, faUser, faClock, faTrash, faThumbsUp, faHeart
} from "@fortawesome/free-solid-svg-icons";

/**
 * @function CustomCard
 * @description This renders the Notification component
 * @param { object } props
 * @return { JSX } - JSX Notification Component
 */
const CustomCard = (props) => {
    const {
        id,
        userId,
        name,
        description,
        //photoUrl,
        createdAt,
        likes,
        upVotes
    } = props.recipe;

    const shortDescription = description.slice(0, 40).concat('...');

    const photoUrl = "https://www.mensjournal.com/wp-content/uploads/2018/10/rambo-main-3.jpg?quality=86&strip=all"
    return (
        <figure className="recipe">
            <div className="recipe_img_container">
                <span className="save-recipe"><FontAwesomeIcon className="fas fa-save" icon={faSave}/></span>
                <img src={photoUrl} alt="Recipe" className="recipe_img"/>
            </div>
            <div className="recipe_content">
                <div className="recipe_title">
                    <h1 className="heading_primary">{name}<FontAwesomeIcon className="fas" icon={faMugHot}/></h1>
                    <div className="recipe_tag recipe_tag--1">
                        <FontAwesomeIcon className="fas" icon={faThumbsUp}/>
                        {likes}
                    </div>
                    <div className="recipe_tag recipe_tag--2">
                        <FontAwesomeIcon className="fas" icon={faHeart}/>
                        {upVotes}
                    </div>
                </div>
                <p className="recipe_description">
                    {shortDescription}
                    <a href="">Read More</a>
                </p>
                <div className="recipe_details">
                    <p className="recipe_detail">
                        <span className="icons icons-red">
                            <FontAwesomeIcon className="fas" icon={faUser}/>
                        </span>
                        <b><a href="">{`Id: ${id} userId: ${userId}`}</a></b>
                    </p>
                    <p className="recipe_detail">
                        <span className="icons icons-grey">
                            <FontAwesomeIcon className="fas" icon={faClock}/>
                        </span>
                        <Moment fromNow>
                            {createdAt}
                        </Moment>
                    </p>
                    <p className="recipe_detail">
                        <span className="icons icons-grey">
                        <FontAwesomeIcon className="fas fa-trash" icon={faTrash}/>
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
