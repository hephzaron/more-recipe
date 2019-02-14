import React from 'react';
import PropTypes from 'prop-types';
import CustomList from '../General/CustomList';

const propTypes = {
  fancyTitle: PropTypes.string.isRequired,
  fancyText: PropTypes.string.isRequired,
  mostFavourite: PropTypes.object.isRequired,
  recentList: PropTypes.array.isRequired
};

const FlavourMainSection = (props) => (
  <div className="wawrecipe-main-section wawrecipe-special-flavoursfull">
    <div className="container">
      <div className="row">
        <aside className="col-md-4">
          <div className="wawrecipe-special-flavours-text">
            <div className="wawrecipe-fancy-title">
              <span><strong>{props.fancyTitle}</strong></span>
            </div>
            <p>{props.fancyText}</p>
          </div>
        </aside>
        <aside className="col-md-4">
          <figure className="wawrecipe-flavours-thumb">
            <a href={props.mostFavourite.href}>
              <img src={props.mostFavourite.imageSrc} alt={props.mostFavourite.imageAlt}/>
            </a>
            <figcaption>
              <span>Hot & Spicy</span>
              <h2><a href={props.mostFavourite.href}>{props.mostFavourite.aValue}</a></h2>
              <p>A lot of people are talking about this&raquo;</p>
            </figcaption>
          </figure>
        </aside>
        <aside className="col-md-4">
          <div className="wawrecipe-flavours-list">
            <CustomList
              notificationContent={props.recentList}/>
          </div>
        </aside>
      </div>
    </div>
  </div>
);

FlavourMainSection.propTypes = propTypes;

export default FlavourMainSection;
