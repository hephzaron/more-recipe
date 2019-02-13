import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
	listContent: PropTypes.array.isRequired,
	children: PropTypes.node,
	ulClass: PropTypes.string.isRequired,
	identifier: PropTypes.string,
  notification: PropTypes.bool
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
      identifier
		} = this.props;

		const listItems = listContent.map((item, index) => {
			const {
				liClass,
				aClass,
				aValue,
				href,
				spanValue,
				icon,
				onClick,
				child
      } = item;

      const toggle = (liClass === 'dropdown' ? 'dropdown-toggle' : '');
			return (
				<li key = {index}
					className = {classnames(`${liClass}`)}
					onClick = {onClick}>
          <a href={href}
            className = {classnames(`${aClass}`, toggle)}>
						{
							spanValue &&
								<span className={classnames('badge')}>
									{spanValue}
								</span>}
						{
							icon &&
								<i className = {classnames('fa fa-lg', icon)}/>}
						{aValue && ` ${aValue}`}
         {(this.props.children && child) && this.getChildComponent(`${child}`)}
          </a>
				</li>
			);
		});
		return (
			<ul id = {identifier}
				className = {classnames(`${ulClass}`)}>
				{listItems}
			</ul>
		);
	}
}

CustomList.propTypes = propTypes;

export default CustomList;
