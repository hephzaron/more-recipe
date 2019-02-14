import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  banners: PropTypes.array.isRequired
};

const Slider = (props) => (
  <div className="wawrecipe-banner">
    {props.banners && props.banners.map((banner) => (
			<div className="wawrecipe-banner-layer">
				<img src={banner.imageSrc} alt={banner.imageAlt}/>
				<span className="wawrecipe-banner-transparent"/>
				<div className="wawrecipe-banner-caption">
					<div className="container">
						<div className="row">
							<div className="col-md-6">
								<div className="wawrecipe-banner-text">
									<h1>{banner.heading}</h1>
									<p>{banner.text}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
    ))}
  </div>
);

Slider.propTypes = propTypes;

export default Slider;
