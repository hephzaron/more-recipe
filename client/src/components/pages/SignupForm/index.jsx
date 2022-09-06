import React from 'react';
import useSignupForm from './SignupFormCustomHook';
import { addFlashMessage } from '../../../actions/flashMessageActions';
import { registerUser } from '../../../actions/signupActions';

const SignupForm = () => {
    const {
        userInput,
        formErrors,
        inputChangeHandler,
        submitUserForm
    } = useSignupForm({ addFlashMessage, registerUser });
    return (
        <div className="user-page signup">
            <form onSubmit={submitUserForm}>
                <h3>Sign Up</h3>
                <hr/>
                <label htmlFor="username">Username *</label>
                {
                    formErrors.username &&
                    <p className="error-text">{formErrors.username}</p>
                }
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={userInput.username || ''}
                    onChange={inputChangeHandler}/>
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
                <label htmlFor="firstName">Firstname *</label>
                {
                    formErrors.firstName &&
                    <p className="error-text">{formErrors.firstName}</p>
                }
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={userInput.firstName || ''}
                    onChange={inputChangeHandler}/>
                <label htmlFor="lastName">Lastname *</label>
                {
                    formErrors.lastName &&
                    <p className="error-text">{formErrors.lastName}</p>
                }
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={userInput.lastName || ''}
                    onChange={inputChangeHandler}/>
                <label htmlFor="age">Age *</label>
                {
                    formErrors.age &&
                    <p className="error-text">{formErrors.age}</p>
                }
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={userInput.age || ''}
                    onChange={inputChangeHandler}/>
                <label htmlFor="sex">Gender *</label>
                <select id="sex" name="sex"
                    onChange={inputChangeHandler}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </select>
                <label htmlFor="password">Password *</label>
                {
                    formErrors.pasword &&
                    <p className="error-text">{formErrors.password}</p>
                }
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={userInput.password || ''}
                    onChange={inputChangeHandler}/>
                <label htmlFor="confirmPassword">Confirm Password *</label>
                {
                    formErrors.confirmPassword &&
                    <p className="error-text">{formErrors.confirmPassword}</p>
                }
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={userInput.confirmPassword || ''}
                    onChange={inputChangeHandler}/>
                <input
                    type="submit"
                    value={"Create an Account"}/>
            </form>
        </div>
    );
};

export default SignupForm;