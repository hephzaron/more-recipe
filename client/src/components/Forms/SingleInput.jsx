import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * @description resolve text field and its label into a function
 * @param {object} props
 * @returns {void}
 */

const SingleInput = (props) => (
    <input
      type={props.type}
      name = {props.name}
      className={classnames(`form-control ${props.inputClass}`)}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onSubmit={props.onSubmit}
      value = {props.value}
    />
);

SingleInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
  inputClass: PropTypes.string,
  name: PropTypes.string.isRequired
};

SingleInput.defaultProps = {
  type: 'text',
  value: ''
};

export default SingleInput;
