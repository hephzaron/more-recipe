import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @description abstracts button element
 * @param {object} props
 * @return {void}
 */

const Button = (props) => (
  <button
    className = {classnames('btn',
      props.btnClass,
      props.iconClass ? `fa ${props.iconClass}` : '')}
     type = {props.type}
     disabled = {props.disabled}
     onClick = {props.onClick}
     id = {props.identifier}>
      {props.name}
  </button>);

Button.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    btnClass: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    iconClass: PropTypes.string,
    identifier: PropTypes.string
};

Button.defaultProps = {
    type: 'button',
    disabled: true,
    btnClass: 'btn-default'
};

export default Button;
