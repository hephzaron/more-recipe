import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChangePasswordFormModal from './ChangePasswordFormModal';
import validateUser from '../../../utils/validators/user';


const contextTypes = {
  router: PropTypes.object.isRequired
};

const propTypes = {
  loginUser: PropTypes.func.isRequired,
  signin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

/**
 * @description -ChangePassword component
 * @class ChangePassword
 * @extends {React.Component}
 */
class ChangePassword extends Component {
  /**
   * @description This creates an instance of ChangePassword Component
   * @param {object} props - comoponent props
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        password: '',
        confirmPassword: ''
      },
      isLoading: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description This handles form input onChange event
   * @param {object} event - event handler
   * @returns {undefined}
   * @memberof ChangePassword
   */
  onChange(event) {
    event.preventDefault();
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    });
  }

  /**
   * @description This validates user entry
   * @param {void} null
   * @returns {boolean} isValid
   * @memberof ChangePassword
   */
  isFormValid() {
    const { errors, isValid } = validateUser(this.state.user, 'change-password');
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

   /**
   * @description This submits user form on completion
   * @param {object} event - event handler
   * @returns {undefined}
   * @memberof SignIn
   */
  onSubmit(event) {
    event.preventDefault();
    if (!this.isFormValid()) { return; }
    window.prompt(this.state.user)
  }

  /**
   * @description Renders component
   * @returns {object} JSX
   * @memberof ChangePassword
   */
  render() {
    return (
      <ChangePasswordFormModal
        validationError = {this.state.errors}
        onChange = {this.onChange}
        onSubmit = {this.onSubmit}
        isLoading = {this.state.isLoading}
        user = {this.state.user}/>
    );
   }
}

ChangePassword.propTypes = propTypes;
ChangePassword.contextTypes = contextTypes;

export default ChangePassword;
