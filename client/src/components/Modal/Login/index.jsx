import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginFormModal from './LoginFormModal';
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
 * @description -Login component
 * @class Login
 * @extends {React.Component}
 */
class Login extends Component {
  /**
   * @description This creates an instance of Login Component
   * @param {object} props - comoponent props
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        oauthID: ''
      },
      isLoading: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goToFacebook = this.goToFacebook.bind(this);
    this.goToGoogle = this.goToGoogle.bind(this);
  }

  /**
   * @description This handles form input onChange event
   * @param {object} event - event handler
   * @returns {undefined}
   * @memberof Login
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
   * @memberof Login
   */
  isFormValid() {
    const { errors, isValid } = validateUser(this.state.user, 'login');
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
   * @description This redirects user to login with facebook
   * @param {object} event - event handler
   * @returns {undefined}
   * @memberof SignIn
   */
  goToFacebook(event) {
    event.preventDefault();
    if (!this.isFormValid()) { return; }

    this.setState({ errors: {} });
    this.setState({ isLoading: true });
    window.prompt(this.state.user)
  }

  /**
   * @description This redirects user to login with Google
   * @param {object} event - event handler
   * @returns {undefined}
   * @memberof SignIn
   */
  goToGoogle(event) {
    event.preventDefault();
    if (!this.isFormValid()) { return; }

    this.setState({ errors: {} });
    this.setState({ isLoading: true });
    window.prompt(this.state.user)
  }

  /**
   * @description Renders component
   * @returns {object} JSX
   * @memberof Login
   */
  render() {
    return (
      <LoginFormModal
        validationError = {this.state.errors}
        onChange = {this.onChange}
        onSubmit = {this.onSubmit}
        isLoading = {this.state.isLoading}
        user = {this.state.user}
        goToFacebook = {this.goToFacebook}
        goToGoogle = {this.goToGoogle}/>
    );
   }
}

Login.propTypes = propTypes;
Login.contextTypes = contextTypes;

export default Login;
