import React from 'react';
import PropTypes from 'prop-types';
import Card from '../General/Card';

const propTypes = {
  recipes: PropTypes.array.isRequired
};
const CardMainSection = (props) => (
  <div className="wawrecipe-main-section wawrecipe-blog-mediumfull">
    <div className="container">
      <div className="row">

        <div className="col-md-12">
          <div className="wawrecipe-fancy-title">
            <span>Most Rated Recipes</span>
            <img src="images/fancy-title-img.png" alt=""/>
          </div>
          <div className="wawrecipe-blog wawrecipe-blog-medium">
            <div className="row wawrecipe-blog-medium-slide">
            {props.recipes.map((item, index) => (
              <Card
                imageSrc = {item.imageSrc}
                imageAlt = {item.imageAlt}
                title = {item.title}
                href = {item.href}
                caption = {item.caption}
                note = {item.note}
                key = {index}
              />))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

CardMainSection.propTypes = propTypes;
export default CardMainSection;
