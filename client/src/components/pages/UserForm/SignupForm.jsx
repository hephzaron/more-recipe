import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../../actions/signupActions';

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
            user: {}
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
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
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
        this.props.dispatch(registerUser({ ...user, age: parseInt(user.age, 10) }));
    }

    /**
     * Renders SignupForm Component
     * @method render
     * @memberof SignupForm
     * @param {null} void
     * @returns { JSX }  JSX component
     */
    render() {
        const { user } = this.state;
        return (
            <div className="user-page signup">
                <form onSubmit={this.submitUserForm}>
                    <h3>Sign Up</h3>
                    <hr/>
                    <label htmlFor="username">Username *</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username || ''}
                        onChange={this.inputChangeHandler}/>
                    <label htmlFor="email">Email *</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={user.email || ''}
                        onChange={this.inputChangeHandler}/>
                    <label htmlFor="firstName">Firstname *</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={user.firstName || ''}
                        onChange={this.inputChangeHandler}/>
                    <label htmlFor="lastName">Lastname *</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={user.lastName || ''}
                        onChange={this.inputChangeHandler}/>
                    <label htmlFor="age">Age *</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={user.age || ''}
                        onChange={this.inputChangeHandler}/>
                    <label htmlFor="sex">Gender *</label>
                    <select id="sex" name="sex"
                        onChange={this.inputChangeHandler}>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                    <label htmlFor="password">Password *</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password || ''}
                        onChange={this.inputChangeHandler}/>
                    <label htmlFor="confirmPassword">Confirm Password *</label>
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
