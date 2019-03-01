import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
	listContent: PropTypes.array,
	children: PropTypes.node,
	ulClass: PropTypes.string.isRequired,
	identifier: PropTypes.string,
  notification: PropTypes.bool,
  notificationContent: PropTypes.array
};

/**
 * @description Returns a custom list
 * @class { CustomList }
 * @param { Object } props - component props
 * @returns {JSX } -JSX Component
 */
class CustomList extends Component {
/**
 * @description Creates an instance of Header class
 * @param { object } props
 */
	constructor(props) {
		super(props);
		this.getChildComponent = this.getChildComponent.bind(this);
	}

	/**
   * @memberof CustomList
   * @method getChildComponent
   * @description Selects children elements to render
   * @param {string} key
   * @returns {JSX} children
   */
	getChildComponent(key) {
		if (this.props.children.length >= 1) {
			return this.props.children.filter(comp => comp.key === key);
		} else {
			return this.props.children;
		}
	}

	/**
   * @memberof CustomList
   * @method render
   * @description Renders JSX Component
   * @returns {JSX} - JSX Component
   */
	render() {
		const {
			listContent,
			ulClass,
      identifier,
      notificationContent
		} = this.props;

		const listItems = listContent ? listContent.map((item, index) => {
			const {
        itemId,
				liClass,
				aClass,
				aValue,
				href,
				spanValue,
				icon,
        onClick,
				child,
        modal,
        dataTarget
      } = item;

      const toggle = (liClass === 'dropdown' ? 'dropdown-toggle' : '');
      const dataToggle = () => {
        if (liClass === 'dropdown') {
          return liClass;
        } else if (modal) {
          return 'modal';
        } else {
          return '';
        }
      };

			return (
				<li key = {index}
					className = {classnames(`${liClass}`)}
          onClick = {onClick ? onClick : null}
          id = {itemId}>
          <a href={href}
            className = {classnames(`${aClass}`, toggle)}
            data-toggle = {dataToggle()}
            data-target = {modal ? `#${dataTarget}` : ''}>
						{
							icon &&
                <i className = {classnames('fa fa-lg', icon)}/>}
            {
              spanValue &&
              <span className={classnames('badge')}>
                {spanValue}
              </span>}
						{aValue && ` ${aValue}`}
          {(this.props.children && child) && this.getChildComponent(`${child}`)}
          </a>
				</li>
			);
    }) : null;

    const notificationItems = notificationContent ? notificationContent.map((item, index) => {
      const {
        href,
        imageSrc,
        imageAlt,
        info,
        duration,
        recipe
      } = item;

      return (
        <li key={index}>
          <figure>
            <a href={href}>
              <img src={imageSrc} alt={imageAlt}/>
            </a>
          </figure>
          <div className={classnames(`${duration ? 'notification' : 'wawrecipe-flavours-list'}-text`)}>
            {duration && <a>{info}</a>}
            {duration && <br/>}
            {duration && <a><i className="fa fa-clock-o"/>{duration}</a>}
            {!duration && <h6><a href={recipe.href}>{recipe.title}</a></h6>}
            {!duration && <p>{recipe.desc}</p>}
          </div>
        </li>
      );
    }) : null;

		return (
			<ul id = {identifier}
				className = {classnames(`${ulClass}`)}>
        {listItems}
        {notificationItems}
			</ul>
		);
	}
}

CustomList.propTypes = propTypes;

CustomList.defaultProps = {
  ulClass: ''
};

export default CustomList;
