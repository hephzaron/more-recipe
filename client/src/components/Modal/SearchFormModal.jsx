import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import SingleInput from '../Forms/SingleInput';

const contextTypes = {
  router: PropTypes.object.isRequired
};
const propTypes = {
  changePassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

/**
 * @class SearchFormModal
 * @extends { React.Component }
 * @description Renders a Change Password Form in a modal
 * @param { object} props
 * @return { JSX }
 */

class SearchFormModal extends Component{
  /**
   * Creates an instance od SearchFormModal Class
   * @param {object} props
   */
  constructor(props){
    super(props);
    this.state = {
      user:{},
      isLoading: false,
      errors: {}
    }
    this.onChange  = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.onClose = this.onClose.bind(this);
  }

}

SearchFormModal.propTypes = propTypes;
SearchFormModal.contextTypes = contextTypes;

export default SearchFormModal;
