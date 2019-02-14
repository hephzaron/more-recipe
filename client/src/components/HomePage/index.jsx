import React, { Component } from 'react';
import { Header, Footer } from '../General';
import Slider from './Slider';
import FlavourMainSection from './FlavourMainSection';
import CardMainSection from './CardMainSection';

const propTypes = {};

/**
 * @description Returns Homepage
 * @class { HomePage }
 * @param { Object } props - component props
 * @returns {JSX } -JSX Component
 */
class HomePage extends Component {
/**
 * @description Creates an instance of HomePage class
 * @param { object } props
 */
	constructor(props) {
    super(props);
    this.state = {
      recipes: [
        {
          imageSrc: require('../../../public/extra-images/blog-medium-img1.jpg'),
          imageAlt: '',
          title: 'Cooking',
          href: '',
          caption: 'Roasted Salmon And Sum- mer Veg Trayback',
          note: 'Sed vulputate elementum aliquam Nunc vel efficitur ante. Ut gravida nulla id ornare sodales. Aenean aliquam mauris purus.'
        }, {
          imageSrc: require('../../../public/extra-images/blog-medium-img1.jpg'),
          imageAlt: '',
          title: 'Cooking',
          href: '',
          caption: 'Roasted Salmon And Sum- mer Veg Trayback',
          note: 'Sed vulputate elementum aliquam Nunc vel efficitur ante. Ut gravida nulla id ornare sodales. Aenean aliquam mauris purus.'
        }, {
          imageSrc: require('../../../public/extra-images/blog-medium-img1.jpg'),
          imageAlt: '',
          title: 'Cooking',
          href: '',
          caption: 'Roasted Salmon And Sum- mer Veg Trayback',
          note: 'Sed vulputate elementum aliquam Nunc vel efficitur ante. Ut gravida nulla id ornare sodales. Aenean aliquam mauris purus.'
        }
      ],

      mostFavourite: {
        href: '',
        aValue: 'Special BEEF BURGERS',
        imageSrc: require('../../../public/extra-images/special-flavours-thumb.jpg'),
        imageAlt: 'Beef burger'
      },
      recentList: [
        {
          href: '',
          imageSrc: require('../../../public/extra-images/flavours-list-img1.jpg'),
          imageAlt: 'Standard Burger Meal',
          recipe: {
            href: '',
            title: 'Standard Burger Meal',
            desc: 'Lorem ipsum dolor sit amet, con sectetur adipiscing elit.'
          }
        }, {
          href: '',
          imageSrc: require('../../../public/extra-images/flavours-list-img1.jpg'),
          imageAlt: 'Standard Burger Meal',
          recipe: {
            href: '',
            title: 'Standard Burger Meal',
            desc: 'Lorem ipsum dolor sit amet, con sectetur adipiscing elit.'
          }
        }, {
          href: '',
          imageSrc: require('../../../public/extra-images/flavours-list-img1.jpg'),
          imageAlt: 'Standard Burger Meal',
          recipe: {
            href: '',
            title: 'Standard Burger Meal',
            desc: 'Lorem ipsum dolor sit amet, con sectetur adipiscing elit.'
          }
        }
      ]
    };
	}


	/**
   * @memberof HomePage
   * @method render
   * @description Renders JSX Component
   * @returns {JSX} - JSX Component
   */
	render() {
    const banners = [
      {
        imageSrc: require('../../../public/extra-images/banner-1.jpg'),
        imageAlt: 'banner-1',
        heading: 'Welcome to WAWRecipe',
        text: 'Largely supported by a community of Chefs across the globe'
      }, {
        imageSrc: require('../../../public/extra-images/banner-2.jpg'),
        imageAlt: 'banner-2',
        heading: 'Welcome to WAWRecipe',
        text: 'Largely supported by a community of Chefs across the globe'
      }
    ];

    const fancyTitle = 'You will find here';
    const fancyText = 'Your favorite recipe for both local and intercontinental dishes, as you browse through our content, you\'ll find recipes reviewed by experts and you can also add your contribution as a registered user';
    return (
      /** Main Wrapper **/
      <div className="wawrecipe-main-wrapper">
        <Header/>
        {/*Main Banner*/}
        <Slider
          banners={banners}/>
        {/*Main Content*/}
        <div className="wawrecipe-main-content">
          <FlavourMainSection
            fancyTitle = {fancyTitle}
            fancyText = {fancyText}
            mostFavourite = {this.state.mostFavourite}
            recentList = {this.state.recentList}/>
          <CardMainSection
            recipes = {this.state.recipes}/>
        </div>
        <Footer/>
      </div>
    );
	}
}

HomePage.propTypes = propTypes;

export default HomePage;
