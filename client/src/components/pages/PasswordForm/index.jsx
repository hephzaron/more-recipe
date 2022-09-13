import React from 'react';
import usePasswordForm from './PasswordFormCustomHook';

const PasswordForm = () => {
    const {
        userInput,
        formErrors,
        inputChangeHandler,
        submitPasswordForm
    } = usePasswordForm();
    return (
        <div className="user-page login">
            <form onSubmit={submitPasswordForm}>
                <h3>Create a new password</h3>
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
                    value={"Create"}/>
            </form>
        </div>
    );
};

export default PasswordForm;
