import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFlashMessage } from '../../../actions/flashMessage';
import { userSignupRequestAction } from '../../../actions/userSignup';
import SignupFormModal from './SignupFormModal';
import validateUser from '../../../utils/validators/user';


const contextTypes = {
  router: PropTypes.object.isRequired
};

const propTypes = {
  userSignupRequestAction: PropTypes.func.isRequired
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

    this.setState({ isLoading: true });
    this.props.userSignupRequestAction(this.state.user)
      .then(data => {
        if (data.response && data.response.status >= 400) {
          this.setState({ isLoading: false });
        } else {
          this.context.router.history.push('/recipes');
        }
      });
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


/**
 * @description Maps dispatch to props
 * @param {object} dispatch
 * @returns {object} map dispatch to props
 */
const mapDispatchToProps = (dispatch) => bindActionCreators({
  userSignupRequestAction,
  addFlashMessage
}, dispatch);

export { Signup };
export default connect(null, mapDispatchToProps)(Signup);
