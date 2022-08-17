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
class LoginForm extends Component {
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
            <div className="user-page login">
                <form>
                    <h3>Login</h3>
                    <hr/>
                    <label htmlFor="email">Email *</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={user.email || ''}
                        onChange={this.inputChangeHandler}/>
                    <label htmlFor="password">Password *</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password || ''}
                        onChange={this.inputChangeHandler}/>
                    <input
                        type="submit"
                        value={"Login"}/>
                </form>
            </div>
        );
    }
}

LoginForm.propTypes = propTypes;
export default LoginForm;
