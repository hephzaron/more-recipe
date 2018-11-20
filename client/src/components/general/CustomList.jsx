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
		this.getComponent = this.getComponent.bind(this);
	}

	/**
   * @memberof CustomList
   * @method getComponent
   * @description Selects children elements to render
   * @param {string} key
   * @returns {JSX} children
   */
	getComponent(key) {
		if (this.props.children.length >= 1) {
			return this.props.children.filter(comp => comp.key === key);
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
			notification
		} = this.props;

		const listItems = listContent.map((item, index) => {
			const {
				liClass,
				aClass,
				aValue,
				subNav,
				href,
				spanValue,
				icon,
				onClick,
				child,
				imageAlt,
				imageUrl,
				message,
				time,
				review,
				reply,
				like
			} = item;
			return (
				<li key = {index}
					className = {classnames(`${liClass}`)}
					onClick = {onClick}>
					<a href={href} className = {classnames(`${aClass}`)}>
						{
							spanValue &&
								<span className={classnames('badge pull-right')}>
									{spanValue}
								</span>}
						{
							icon &&
								<i className = {classnames('fa fa-lg', icon)}/>}
						{(!spanValue || (aValue && spanValue)) && ` ${aValue}`}
						{
							notification &&
							<div className={'row'}>
								<div className ={classnames('col-md-3 col-sm-3 col-xs-3')}>
									<img src={`${imageUrl}`}
										className={classnames('img-circle')}
										alt={`${imageAlt}`}/>
									<span className={
										classnames('fa fa-lg',
											review ? 'fa-edit' : null,
											reply ? 'fa-reply' : null,
											like ? 'fa-thumbs-up' : null)}/>
								</div>
								<div className={classnames('col-md-9 col-sm-9 col-xs-9')}>
									<p>{message}</p>
									<p>{time}</p>
								</div>
							</div>
						}
					</a>
					{
						subNav &&
						<span className={classnames('has-subnav')}>
							<i className={classnames('fa fa-angle-down')}/>
						</span>
					}
					{child && this.getComponent(`${child}`)}
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
