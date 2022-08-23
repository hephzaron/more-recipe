import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../../actions/signupActions';
import { addFlashMessage } from '../../../actions/flashMessageActions';
import { validateUserForm } from '../../../utils/validators/user';

const propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
    error: PropTypes.string
};

/**
 * Class component for SignupForm
 * @class SignupForm
 * @param { props } object
 * @returns { JSX } JSX component
 */
class SignupForm extends Component {
    /**
     * Creates an instance of SignupForm component
     * @method constructor
     * @param {object} props
     * @returns {null} void
     */
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                email: '',
                firstName: '',
                lastName: '',
                age: '',
                password: '',
                confirmPassword: ''
            },
            errors: {},
            isValid: false
        };
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitUserForm = this.submitUserForm.bind(this);
    }


    /**
     * Handles input changes in field entries
     * @method inputChangeHandler
     * @memberof SignupForm
     * @param {object} event
     * @returns {null} void
     */
    inputChangeHandler(event) {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        });
    }

    /**
     * Submit completed UserForm
     * @method submitUserForm
     * @memberof SignupForm
     * @param {object} event
     * @returns {null} void
     */
    submitUserForm(event) {
        event.preventDefault();
        const { user } = this.state;
        const { validationErrors, isValid } = validateUserForm(user);
        this.setState({
            errors: { ...validationErrors },
            isValid
        });

        if (isValid) {
            this.props.dispatch(registerUser({ ...user, age: parseInt(user.age, 10) }))
                .then((response) => this.props.dispatch(addFlashMessage({
                    message: response.message,
                    type: 'success'
                })))
                .catch((error) => this.props.dispatch(addFlashMessage({
                    message: error.message,
                    type: 'failure'
                })));
        }
    }

    /**
     * Renders SignupForm Component
     * @method render
     * @memberof SignupForm
     * @param {null} void
     * @returns { JSX }  JSX component
     */
    render() {
        const { user, errors } = this.state;
        return (
            <div className="user-page signup">
                <form onSubmit={this.submitUserForm}>
                    <h3>Sign Up</h3>
                    <hr/>
                    <label htmlFor="username">Username *</label>
                    {
                        errors.username &&
                        <p className="error-text">{errors.username}</p>
                    }
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username || ''}
                        onChange={this.inputChangeHandler}/>
                    <label htmlFor="email">Email *</label>
                    {
                        errors.email &&
                        <p className="error-text">{errors.email}</p>
                    }
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={user.email || ''}
                        onChange={this.inputChangeHandler}/>
                    <label htmlFor="firstName">Firstname *</label>
                    {
                        errors.firstName &&
                        <p className="error-text">{errors.firstName}</p>
                    }
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={user.firstName || ''}
                        onChange={this.inputChangeHandler}/>
                    <label htmlFor="lastName">Lastname *</label>
                    {
                        errors.lastName &&
                        <p className="error-text">{errors.lastName}</p>
                    }
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={user.lastName || ''}
                        onChange={this.inputChangeHandler}/>
                    <label htmlFor="age">Age *</label>
                    {
                        errors.age &&
                        <p className="error-text">{errors.age}</p>
                    }
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={user.age || ''}
                        onChange={this.inputChangeHandler}/>
                    <label htmlFor="sex">Gender *</label>
                    <select id="sex" name="sex"
                        onChange={this.inputChangeHandler}>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                    <label htmlFor="password">Password *</label>
                    {
                        errors.pasword &&
                        <p className="error-text">{errors.password}</p>
                    }
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password || ''}
                        onChange={this.inputChangeHandler}/>
                    <label htmlFor="confirmPassword">Confirm Password *</label>
                    {
                        errors.confirmPassword &&
                        <p className="error-text">{errors.confirmPassword}</p>
                    }
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={user.confirmPassword || ''}
                        onChange={this.inputChangeHandler}/>
                    <input
                        type="submit"
                        value={"Create an Account"}/>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.userAuthReducer.user,
    isAuthenticated: state.userAuthReducer.isAuthenticated,
    error: state.userAuthReducer.error
});

SignupForm.propTypes = propTypes;
export default connect(mapStateToProps)(SignupForm);
