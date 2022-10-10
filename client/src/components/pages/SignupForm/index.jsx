import React from 'react';
import useSignupForm from './SignupFormCustomHook';
import useUserUpdateForm from './UpdateUserCustomHook';
import { addFlashMessage } from '../../../actions/flashMessageActions';
import { registerUser } from '../../../actions/signupActions';
import { loginUser, set } from '../../../actions/authUserActions';

const SignupForm = () => {
    const userUpdate = useUserUpdateForm();
    const {
        userInput,
        formErrors,
        pathname,
        inputChangeHandler,
        submitUserForm
    } = useSignupForm({
        addFlashMessage, registerUser, loginUser, set
    });


    const onSubmit = (pathname === '/register') ? submitUserForm : userUpdate.submitUserForm;
    const userField = (pathname === '/register') ? userInput : userUpdate.userInput;
    const onChange = (pathname === '/register') ? inputChangeHandler : userUpdate.inputChangeHandler;
    const fieldErrors = (pathname === '/register') ? formErrors : userUpdate.formErrors;

    return (
        <div className="user-page signup">
            <form onSubmit={onSubmit}>
                { pathname === '/register' && <h3>Sign Up</h3>}
                <hr/>
                <label htmlFor="username">Username *</label>
                {
                    fieldErrors.username &&
                    <p className="error-text">{fieldErrors.username}</p>
                }
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={userField.username || ''}
                    onChange={onChange}/>
                {
                    (pathname === '/register') &&
                    <>
                        <label htmlFor="email">Email *</label>
                        {fieldErrors.email &&
                        <p className="error-text">{fieldErrors.email}</p>}
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={userField.email || ''}
                            onChange={onChange}/>
                        <label htmlFor="firstName">Firstname *</label>
                    </>
                }
                {
                    fieldErrors.firstName &&
                    <p className="error-text">{fieldErrors.firstName}</p>
                }
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={userField.firstName || ''}
                    onChange={onChange}/>
                <label htmlFor="lastName">Lastname *</label>
                {
                    fieldErrors.lastName &&
                    <p className="error-text">{fieldErrors.lastName}</p>
                }
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={userField.lastName || ''}
                    onChange={onChange}/>
                <label htmlFor="age">Age *</label>
                {
                    fieldErrors.age &&
                    <p className="error-text">{fieldErrors.age}</p>
                }
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={userField.age || ''}
                    onChange={onChange}/>
                <label htmlFor="sex">Gender *</label>
                <select id="sex" name="sex"
                    onChange={onChange}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </select>
                {
                    (pathname === '/register') &&
                    <>
                        <label htmlFor="password">Password *</label>
                        {
                            fieldErrors.password &&
                            <p className="error-text">{fieldErrors.password}</p>
                        }
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userField.password || ''}
                            onChange={onChange}/>
                        <label htmlFor="confirmPassword">Confirm Password *</label>
                        {
                            fieldErrors.confirmPassword &&
                            <p className="error-text">{fieldErrors.confirmPassword}</p>
                        }
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={userField.confirmPassword || ''}
                            onChange={onChange}/>
                        <input
                            type="submit"
                            value={"Create an Account"}/>
                    </>
                }
                {
                    (pathname === '/edit-profile') &&
                    <>
                        <label htmlFor="profilePhotoUrl">Upload picture:</label>
                        { fieldErrors.profilePhotoUrl &&
                           <p className="error-text">{fieldErrors.profilePhotoUrl}</p> }
                        <input
                            type="file"
                            id="profilePhotoUrl" required
                            onChange={onChange}
                            value={userField.profilePhotoUrl}
                            name="profilePhotoUrl" accept="image/*"/>
                        <input
                            type="submit"
                            value={"Update Profile"}/>
                    </>
                }
            </form>
        </div>
    );
};

export default SignupForm;
