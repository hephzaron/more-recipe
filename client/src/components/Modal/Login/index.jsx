import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import LoginFormModal from './LoginFormModal';
import passportConfig from '../../../config/passport';
import { login } from '../../../actions/userAuth';
import { addFlashMessage } from '../../../actions/flashMessage';
import validateUser from '../../../utils/validators/user';


const contextTypes = {
  router: PropTypes.object.isRequired
};

const propTypes = {
  addFlashMessage: PropTypes.func,
  login: PropTypes.func.isRequired,
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
    this.onGoogleCallback = this.onGoogleCallback.bind(this);
    this.onFacebookCallback = this.onFacebookCallback.bind(this);
    this.onGoogleFailure = this.onGoogleFailure.bind(this);
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

    this.setState({ errors: {} });
    this.setState({ isLoading: true });
    this.props.login(this.state.user)
      .then((data) => {
        if (data.response && data.response.status >= 400) {
          this.setState({
            isLoading: false
          });
        } else {
          this.setState({ isLoading: false });
          this.context.router.history.push('/recipes');
        }
      });
  }

  /**
   * @description This redirects user to login with facebook
   * @param {object} response - facebook response
   * @returns {undefined}
   * @memberof SignIn
   */
  onFacebookCallback(response) {
    if (response && response.email) {
      this.setState({
        user: {
          email: response.email,
          password: `${Math.random()}`,
          oauthID: response.id
        }
      });
      document.getElementById("login").click();
    } else {
      this.props.addFlashMessage({
        type: 'error',
        text: [
          'We experienced an error validating you on facebook. Please try again'
        ]
      });
    }
  }

  /**
   * @description This redirects user to login with Google
   * @param {object} response - google response
   * @returns {undefined}
   * @memberof SignIn
   */
  onGoogleCallback(response) {
    this.setState({
      user: {
        email: response.profileObj.email,
        password: `${Math.random()}`,
        oauthID: response.profileObj.googleId
      }
    });
    document.getElementById("login").click();
  }

   /**
   * @description This handles google login failure
   * @param {object} response - google response
   * @returns {undefined}
   * @memberof SignIn
   */
  onGoogleFailure(response) {
    if (response &&
      (response.error === 'popup_closed_by_user' ||
       response.error === 'access_denied')) {
      this.props.addFlashMessage({
        type: 'error',
        text: [
          'We experienced an error validating you on google. Please try again'
        ]
      });
    }
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
        user = {this.state.user}>
        {
          <div className="row container my-3 justify-content-center">
            <GoogleLogin
              autoLoad={false}
              clientId={passportConfig.google.clientID}
              onSuccess={this.onGoogleCallback}
              onFailure={this.onGoogleFailure}
              tag="button"
              className="btn btn-danger mr-md-3 btn-sm"
              type="button"/>
            <FacebookLogin
              appId={passportConfig.facebook.clientID}
              autoLoad={false}
              textButton=""
              fields="name,email,picture"
              callback={this.onFacebookCallback}
              tag="button"
              cssClass="btn btn-primary mr-md-3 btn-sm"
              type="button"
              icon="fa-facebook mr-md-3 btn-sm"/>
          </div>
        }
      </LoginFormModal>
    );
   }
}

Login.propTypes = propTypes;
Login.contextTypes = contextTypes;

/**
 * @description Maps state from store to props
 * @param {object} state - redux store state
 * @returns {object} map state to props
 */
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

/**
 * @description Maps dispatch to props
 * @param {object} dispatch
 * @returns {object} map dispatch to props
 */
const mapDispatchToProps = (dispatch) => bindActionCreators({
  login,
  addFlashMessage
}, dispatch);

export { Login };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
