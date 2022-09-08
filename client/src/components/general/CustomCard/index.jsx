import React from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMugHot, faClock, faThumbsUp, faStar, faTrashCan, faThumbsDown, faCaretRight
} from "@fortawesome/free-solid-svg-icons";
import useCard from './CardCustomHooks';

const propTypes = {
    recipe: PropTypes.object.isRequired
};

/**
 * @function CustomCard
 * @param { object } props
 * @returns {JSX} JSX Element
 */
const CustomCard = (props) => {
    const expUrl = 'https://www.mensjournal.com/wp-content/uploads/2018/10/rambo-main-3.jpg?quality=86&strip=all';
    const {
        id,
        userId,
        Reviews,
        user,
        photoUrl,
        name,
        likes,
        dislikes,
        upVotes,
        description,
        createdAt
    } = props.recipe;

    const { reactToPost, toggleSave } = useCard(props.recipe);

    return (
        <figure className="recipe">
            <div className="recipe-img-container">
                <img src={expUrl} alt={name} className="recipe-img"/>
                <ul className="recipe-action-list">
                    <li>
                        <a onClick = {() => reactToPost({ id, likes: 1 })}>
                            <FontAwesomeIcon className="fas likes" icon={faThumbsUp}/><span>{likes}</span>
                        </a>
                    </li>
                    <li>
                        <a onClick = {() => reactToPost({ id, dislikes: 1 })}>
                            <FontAwesomeIcon className="fas dislikes" icon={faThumbsDown}/><span>{dislikes}</span>
                        </a>
                    </li>
                    <li>
                        <a onClick = {() => toggleSave()}>
                            <FontAwesomeIcon className="fas upvotes" icon={faStar}/>
                            <FontAwesomeIcon className="fas upvotes-2" icon={faStar}/>
                            <span>{upVotes}</span>
                        </a>
                    </li>
                    <li>
                        <a><FontAwesomeIcon className="fas delete" icon={faTrashCan}/></a>
                    </li>
                </ul>
            </div>
            <h4>
                {name}
                <span><FontAwesomeIcon className="fas" icon={faMugHot}/></span>
            </h4>
            <p>{description.slice(0, 50).concat('...')}</p>
            <div className="user-details">
                <div className="image-overlay"/>
                <img src={expUrl} alt={name}/>
                <div className="user-rect"/>
                <div className="user-recipe-time">
                    <h5>{name}</h5>
                    <FontAwesomeIcon className="fas duration" icon={faClock}/>
                    <Moment className="duration" fromNow>
                        {createdAt}
                    </Moment>
                    <button>Read More <FontAwesomeIcon icon={faCaretRight}/></button>
                </div>
            </div>
        </figure>
    );
};

CustomCard.propTypes = propTypes;
CustomCard.defaultProps = {
    likes: 0,
    reviews: 0,
    upVotes: 0,
    recipe: {}
};

export default CustomCard;
