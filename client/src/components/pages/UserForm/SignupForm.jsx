import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Form for new user
 * @returns { JSX } - JSX element
 */

const propTypes = {
    user: PropTypes.object
};

/**
 *
 */
class SignupForm extends Component {
    /**
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
    }

    /**
     *
     * @param {*} event
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
     *
     * @returns {null} void
     */
    render() {
        const { user } = this.state;
        return (
            <div className="user-page signup">
                <form>
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
                    <label htmlFor="firstname">Firstname *</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={user.firstname || ''}
                        onChange={this.inputChangeHandler}/>
                    <label htmlFor="lastname">Lastname *</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={user.lastname || ''}
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

SignupForm.propTypes = propTypes;
export default SignupForm;
