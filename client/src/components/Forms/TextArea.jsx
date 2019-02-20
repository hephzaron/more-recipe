import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description abstracts input field for text area
 * @param {object} props
 * @returns {JSX} JSX Component
 */

const TextArea = (props) => (
		<textarea
			className="form-control"
			name={props.name}
			placeholder={props.placeholder}
			value={props.value}
      onChange={props.onChange}
      rows ={props.noRows.toString()}/>
);

TextArea.propTypes = {
	placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.fuunc,
  noRows: PropTypes.number.isRequired
};

TextArea.defaultProps = {
  noRows: 5
};

export default TextArea;
