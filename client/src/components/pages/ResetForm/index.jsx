import React from 'react';
import useResetForm from './ResetFormCustomHook';

const ResetForm = () => {
    const {
        userInput,
        formErrors,
        inputChangeHandler,
        submitResetForm
    } = useResetForm();
    return (
        <div className="user-page login">
            <form onSubmit={submitResetForm}>
                <h3>Recover Password</h3>
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
                <input
                    type="submit"
                    value={"Send Reset Link"}/>
            </form>
        </div>
    );
};

export default ResetForm;
