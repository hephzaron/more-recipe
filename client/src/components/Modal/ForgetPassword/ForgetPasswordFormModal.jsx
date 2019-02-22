import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import SingleInput from '../../Forms/SingleInput';
import Button from '../../Forms/Button';
import FlashMessageList from '../../FlashMessage';

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

const ForgetPasswordFormModal = (props) => (
  <Modal
    identifier={'forgetpasswordmodal'}>
    <form className = {'form'} id = {'forgetpasswordForm'} onSubmit={props.onSubmit}>
      <FlashMessageList/>
      <SingleInput
        type={'email'}
        placeholder={'Email'}
        onChange={props.onChange}
        name={'email'}
        value={props.user.email}/>
        {props.validationError.email &&
          <p className = "form-text text-danger">
            {props.validationError.email}
          </p>}
      <Button
        btnClass = {'btn-primary'}
        disabled ={props.isLoading}
        onClick ={props.onSubmit}
        name={'Send Me Reset Link'}/>
    </form>
  </Modal>
);

ForgetPasswordFormModal.propTypes = propTypes;

export default ForgetPasswordFormModal;
