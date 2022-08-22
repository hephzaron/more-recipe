/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validateUserForm } from '../../../utils/validators/user';
import { loginUser } from '../../../actions/authUserActions';


const propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
    error: PropTypes.string,
    isAuthenticated: PropTypes.bool
};

/**
 * Class component for LoginForm
 * @class LoginForm
 * @param { props } object
 * @returns { JSX } JSX component
 */
class LoginForm extends Component {
    /**
     * Creates an instance of LoginForm component
     * @method constructor
     * @param {object} props
     * @returns {null} void
     */
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            isAuthenticated: false,
            errors: {},
            isValid: false
        };
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitAuthForm = this.submitAuthForm.bind(this);
    }

    /**
     * React lifecyle to executes when component updates
     * @method componentDidUpdate
     * @memberof LoginForm
     * @param {object} prevProps
     * @returns { null }  void
     */
    componentDidUpdate(prevProps) {
        if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
            const { isAuthenticated, user } = this.props;
            this.setState({ isAuthenticated, user });
        }
    }

    /**
     * Handles input changes in field entries
     * @method inputChangeHandler
     * @memberof LoginForm
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
     * @method submitAuthForm
     * @memberof LoginForm
     * @param {object} event
     * @returns {null} void
     */
     submitAuthForm(event) {
        event.preventDefault();
        const { user } = this.state;
        const { validationErrors } = validateUserForm(user);
        const { email, password } = validationErrors;
        const isValid = !(email || password);
        this.setState({
            errors: { email, password },
            isValid
        });

        if (isValid) {
            this.props.dispatch(loginUser(user));
        }
    }

    /**
     * Renders LoginForm Component
     * @method render
     * @memberof LoginForm
     * @param {null} void
     * @returns { JSX }  JSX component
     */
    render() {
        const { user, errors } = this.state;
        return (
            <div className="user-page login">
                <form onSubmit={this.submitAuthForm}>
                    <h3>Login</h3>
                    <hr/>
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
                    <label htmlFor="password">Password *</label>
                    {
                        errors.password &&
                        <p className="error-text">{errors.password}</p>
                    }
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

const mapStateToProps = (state) => ({
    user: state.userAuthReducer.user,
    isAuthenticated: state.userAuthReducer.isAuthenticated,
    error: state.userAuthReducer.error
});

LoginForm.propTypes = propTypes;
export default connect(mapStateToProps)(LoginForm);
