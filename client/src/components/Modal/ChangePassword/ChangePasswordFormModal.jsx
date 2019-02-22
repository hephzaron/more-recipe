import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import SingleInput from '../../Forms/SingleInput';
import Button from '../../Forms/Button';
import FlashMessageComponent from '../../FlashMessage';

/**
 * change password page component begins
 * @description Renders the change password page component,
 *  loads the button and single input component
 * @param {object} props
 * @return {void}
 */

const propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validationError: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

const ChangePasswordFormModal = (props) => (
  <Modal
    identifier={'changepasswordmodal'}>
    <form className = {'form'} id = {'changepasswordForm'} onSubmit={props.onSubmit}>
      <FlashMessageComponent/>
      <SingleInput
        type={'password'}
        placeholder={'New Password'}
        onChange={props.onChange}
        name={'password'}
        value={props.user.password}/>
        {props.validationError.password &&
          <p className = "form-text text-danger">
            {props.validationError.password}
          </p>}
      <SingleInput
        type={'password'}
        placeholder={'Confirm Password'}
        onChange={props.onChange}
        name={'confirmPassword'}
        value={props.user.confirmPassword}/>
        {props.validationError.confirmPassword &&
          <p className = "form-text text-danger">
            {props.validationError.confirmPassword}
          </p>}
      <Button
        btnClass = {'btn-primary'}
        disabled ={props.isLoading}
        onClick ={props.onSubmit}
        name={'Change Password'}/>
    </form>
  </Modal>
);

ChangePasswordFormModal.propTypes = propTypes;

export default ChangePasswordFormModal;
