import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired
};

const Card = (props) => (
  <div className="col-md-6 wawrecipe-blog-medium-layer">
    <figure>
      <a href="recipe-detail.html">
        <img src={props.imageSrc} alt={props.imageAlt}/>
        <span className="hover-btn">
          <i className="icon wawrecipe-link"/>
        </span>
      </a>
    </figure>
    <div className="wawrecipe-blog-medium-text">
      <span>{props.title}</span>
      <h5>
        <a href={props.href}>{props.caption}</a>
      </h5>
      <p>{props.note}</p>
      <a href={props.href} className="wawrecipe-simple-btn">Read More
        <i className="fa fa-angle-double-right"/>
      </a>
    </div>
  </div>
);

Card.propTypes = propTypes;
export default Card;
