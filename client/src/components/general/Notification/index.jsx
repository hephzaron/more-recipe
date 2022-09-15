import React from 'react';
import Moment from "react-moment";

const pixUrl = "https://res.cloudinary.com/power-mobile/image/upload/v1663155102/signed_recipe_upload/profile-avatar.jpg";
const Notification = () => (
    <ul id="notification">
        <h5> Notifications </h5>
        <span><i>2</i></span>
        <hr/>
        <li>
            <a>
                <img src={pixUrl}/>
                <div className="user-on"/>
                <span>Jane and 5 others liked your post</span>
            </a>
            <Moment className="duration" fromNow>
                "2022-09-12"
            </Moment>
            <div className="ellipsis">&#10095;</div>
        </li>
        <li>
            <a>
                <img src={pixUrl}/>
                <div className="user-on"/>
                <span>Hephzaron added a review to Macroni</span>
            </a>
            <Moment className="duration" fromNow>
                "2022-09-12"
            </Moment>
            <div className="ellipsis">&#10095;</div>
        </li>
        <li>
            <a>
                <img src={pixUrl}/>
                <div className="user-on"/>
                <span>Sunday commented on your post</span>
            </a>
            <Moment className="duration" fromNow>
                "2022-09-12"
            </Moment>
            <div className="ellipsis">&#10095;</div>
        </li>
    </ul>
);

export default Notification;
