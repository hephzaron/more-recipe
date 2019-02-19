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
     onClick = {props.onClick}>
      {props.name}
  </button>);

Button.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    btnClass: PropTypes.string,
    onClick: PropTypes.func,
    iconClass: PropTypes.string
};

Button.defaultProps = {
    type: 'button',
    disabled: true,
    btnClass: 'btn-default'
};

export default Button;
