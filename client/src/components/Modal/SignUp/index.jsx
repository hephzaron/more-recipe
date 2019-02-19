import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignupFormModal from './SignupFormModal';
import validateUser from '../../../utils/validators/user';


const contextTypes = {
  router: PropTypes.object.isRequired
};

const propTypes = {
  signUpUser: PropTypes.func.isRequired,
};

/**
 * @description -Signup component
 * @class Signup
 * @extends {React.Component}
 */
class Signup extends Component {
  /**
   * @description This creates an instance of Signup Component
   * @param {object} props - comoponent props
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        age: '',
        sex: 'Male',
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
   * @memberof Signup
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
   * @memberof Signup
   */
  isFormValid() {
    const { errors, isValid } = validateUser(this.state.user, 'register');
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
   * @memberof Signup
   */
  render() {
    return (
      <SignupFormModal
        validationError = {this.state.errors}
        onChange = {this.onChange}
        onSubmit = {this.onSubmit}
        isLoading = {this.state.isLoading}
        user = {this.state.user}/>
    );
   }
}

Signup.propTypes = propTypes;
Signup.contextTypes = contextTypes;

export default Signup;
