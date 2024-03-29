import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLoginForm from './LoginFormCustomHook';
import { loginUser, set } from '../../../actions/authUserActions';
import { addFlashMessage } from '../../../actions/flashMessageActions';

const LoginForm = () => {
    const {
        userInput,
        formErrors,
        inputChangeHandler,
        submitAuthForm
    } = useLoginForm({ loginUser, addFlashMessage, set });

    const navigate = useNavigate();
    return (
        <div className="user-page login">
            <form onSubmit={submitAuthForm}>
                <h3>Login</h3>
                <hr/>
                <label htmlFor="email">Email *</label>
                {
                    formErrors.email &&
                    <p className="error-text">{formErrors.email}</p>
                }
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={userInput.email || ''}
                    onChange={inputChangeHandler}/>
                <label htmlFor="password">Password *</label>
                {
                    formErrors.password &&
                    <p className="error-text">{formErrors.password}</p>
                }
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={userInput.password || ''}
                    onChange={inputChangeHandler}/>
                <input
                    type="submit"
                    value={"Login"}/>
                <ul>
                    <li><a onClick={() => navigate('/forgot-password')}>Forgot Password ?</a></li>
                    <li><a>Google Signin</a></li>
                </ul>
            </form>
        </div>
    );
};

export default LoginForm;
