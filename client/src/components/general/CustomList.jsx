import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  listContent: PropTypes.array.isRequired,
  children: PropTypes.node,
  ulClass: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
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
   * @memberof CustomList
   * @method render
   * @description Renders JSX Component
   * @returns {JSX} - JSX Component
   */
  render() {
    const {
      listContent,
      children,
      ulClass,
      identifier
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
        notification,
        imageAlt,
        imageUrl
      } = item;

      const liConcatClass = liClass.reduce((prev, next) => `${prev} ${next}`);
      const aConcatClass = aClass.reduce((prev, next) => `${prev} ${next}`);
      return (
        <li key = {index}
          className = {classnames(`${liConcatClass}`)}
          onClick = {onClick}>
          <a href={href} className = {classnames(`${aConcatClass}`)}>
            {
              spanValue &&
                <span className={classnames('badge pull-right')}>
                  {spanValue}
                </span>
            }
            {
              icon &&
                <i className = {classnames('fa fa-lg', icon)}/>
            }
            {aValue}
            {children}
            {
              notification &&
              <div className={'row'}>
                <div className ={classnames('col-md-3 col-sm-3 col-xs-3')}>
                  <img src={`${imageUrl}`} className={classnames('img-circle')} alt={`${imageAlt}`}/>
                  <span className={
                    classnames('fa fa-lg',
                      notification.review ? 'fa-edit' : null,
                      notification.reply ? 'fa-reply' : null,
                      notification.like ? 'fa-thumbs-up' : null)}/>
                </div>
                <div className={classnames('col-md-9 col-sm-9 col-xs-9')}>
                  <p>{notification.message}</p>
                  <p>{notification.time}</p>
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
