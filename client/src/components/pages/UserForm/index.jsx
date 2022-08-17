/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
/**
 * Class component for UserForm
 * @class UserForm
 * @param { props } object
 * @returns { JSX } JSX component
 */
class UserForm extends Component {
    /**
     * Creates an instance of UserForm component
     * @method constructor
     * @param {object} props
     * @returns {null} void
     */
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    /**
     * Renders UserForm Component
     * @method render
     * @memberof UserForm
     * @param {null} void
     * @returns { JSX }  JSX component
     */
    render() {
        const { user } = this.state;

        return (
            <div className="user-page">
                <SignupForm/>
            </div>
        );
    }
}

export default UserForm;
