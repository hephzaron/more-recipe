import React, { Component } from 'react';
import CustomList from './CustomList';

/**
 * @class Footer
 * @extends { React.Component }
 * @description This renders the Header component
 * @param { object } props
 * @return { JSX } - JSX Header Component
 */
class Footer extends Component {
  /**
   * @description Creates an instance of Footer class
   * @param { object } props
   */
  constructor(props) {
    super(props);
    this.state = {
      logoSrc: require('../../../public/images/logo.png'),
      logoAlt: 'logo',
      footerNote: 'Sed vulputate elementum aliquam. Nunc vel efficitur ante. Ut gravida nulla id ornare soda les. Aenean aliquam mauris purus, eget mollis lectus sagittis sed.Cras varius est vel mcsasvsa ultricies, ac rutrum urna hendrerit.',
      baseUrl: '',
      recentPosts: [
        {
          aValue: 'Jollof Rice',
          href: '',
          postDate: '3 Oct 2019'
        }, {
          aValue: 'Jollof Rice',
          href: '',
          postDate: '3 Oct 2019'
        }, {
          aValue: 'Jollof Rice',
          href: '',
          postDate: '3 Oct 2019'
        }
      ]
    };
  }

  /**
	 * @memberof Footer
	 * @method render
	 * @description Renders JSX Component
	 * @returns {JSX} - JSX Component
	 */
  render() {
    const {
      logoSrc,
      logoAlt,
      footerNote,
      baseUrl,
      recentPosts
    } = this.state;

    const footerContent = [
      {
        href: '',
        aValue: 'History'
      }, {
        href: '',
        aValue: 'Community'
      }, {
        href: '',
        aValue: 'Safety'
      }, {
        href: '',
        aValue: 'News & Events'
      }, {
        href: '',
        aValue: 'FAQ'
      }
    ];

    /**<!--// Footer \\-->**/
    return (
      <footer id="wawrecipe-footer" className="wawrecipe-footer-one">
      <span className="wawrecipe-footer-transparent"/>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="wawrecipe-footer-heading">
              <a href={baseUrl} className="logo"><img src={logoSrc} alt={logoAlt}/></a>
              <p>{footerNote}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="wawrecipe-footer-widget">
        <div className="container">
          <div className="row">
            <aside className="col-md-6 widget widget_latest_post">
              <h2 className="footer-widget-title">Recent Post</h2>
              <ul>
                {recentPosts.map((item, index) => (
                  <li>
                    <h6><a href={item.href}>{item.aValue}</a></h6>
                    <time>{item.postDate}</time>
                  </li>))}
              </ul>
            </aside>
            <aside className="col-md-6 widget widget_links">
              <h2 className="footer-widget-title">Useful Links</h2>
              <CustomList listContent = {footerContent}/>
            </aside>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="wawrecipe-copyright">
              <p><a href="">WAW Recipe</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    );
  }
}

export default Footer;
