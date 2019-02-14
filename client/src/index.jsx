import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/js/bootstrap';
import '../public/css/bootstrap.css';
import '../public/css/color.css';
import '../public/css/main.css';
import '../public/css/font-awesome.css';
import '../public/css/flaticon.css';
import '../public/css/slick-slider.css';
import Header from './components/General/Header';
import Footer from './components/General/Footer';
/**
 * @description The entry point - this will render the application with it's
 * route on the DOM
 * @returns {void}
 */

render(
	<Footer/>,
	document.getElementById('app')
);
