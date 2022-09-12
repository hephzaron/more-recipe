import React from 'react';
import PropTypes from 'prop-types';
import useChangePasswordForm from './ChangePasswordFormCustomHook';


const ChangePasswordForm = ({ closeChangePasswordModal }) => {
    const {
        user,
        formErrors,
        submitPasswordForm,
        handleInputChange
    } = useChangePasswordForm(changePassword);

    return (
        <div className="user-recipe-form">
            <form onSubmit={submitPasswordForm}>
                <h3>Change Password</h3>
                <span onClick = {closeChangePasswordModal} className="close-btn">Close</span>
                <hr/>
                <label htmlFor="oldPassword">Old Password:</label>
                {
                    formErrors.oldPassword &&
                    <p className="error-text">{formErrors.oldPassword}</p>
                }
                <input
                    type="password"
                    id="oldPassword" required
                    onChange={handleInputChange}
                    name="oldPassword"
                    value={user.oldPassword}/>
                <label htmlFor="newPassword">New Password:</label>
                {
                    formErrors.newPassword &&
                    <p className="error-text">{formErrors.newPassword}</p>
                }
                <input
                    type="password"
                    id="newPassword" required
                    onChange={handleInputChange}
                    value={user.newPassword}
                    name="newPassword"/>
                <label htmlFor="confirmPassword">Enter Password again:</label>
                {
                    formErrors.confirmPassword &&
                    <p className="error-text">{formErrors.confirmPassword}</p>
                }
                <input
                    type="password"
                    id="confirmPassword" required
                    onChange={handleInputChange}
                    value={user.confirmPassword}
                    name="confirmPassword"/>
                <input type="submit" value="Change"/>
            </form>
        </div>);
};

ChangePasswordForm.propTypes = {
    closeChangePasswordModal: PropTypes.func.isRequired
};

export default ChangePasswordForm;
