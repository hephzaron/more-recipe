import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import SingleInput from '../../Forms/SingleInput';
import Button from '../../Forms/Button';

/**
 * sign in page component begins
 * @description Renders the sign in page component,
 *  loads the button and single input component
 * @param {object} props
 * @return {void}
 */

const propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validationError: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  goToFacebook: PropTypes.func,
  goToGoogle: PropTypes.func
};

const LoginFormModal = (props) => (
  <Modal
    identifier={'loginmodal'}>
    <form className = {'form'} id = {'loginForm'} onSubmit={props.onSubmit}>
      <Button
        iconClass={'fa-facebook-square'}
        disabled ={props.isLoading}
        onClick ={props.goToFacebook}
        name ={'Login with Facebook'}/>
      <Button
        iconClass={'fa-google-plus-square'}
        disabled ={props.isLoading}
        onClick ={props.goToGoogle}
        name={'Login with Google'}/>
      <SingleInput
        placeholder={'Email'}
        onChange={props.onChange}
        name={'email'}
        value={props.user.email}/>
        {props.validationError.email &&
          <p className = "form-text text-danger">
            {props.validationError.email}
          </p>}
      <SingleInput
        placeholder={'Password'}
        type={'password'}
        onChange={props.onChange}
        name={'password'}
        value={props.user.password}/>
        {props.validationError.password &&
          <p className = "form-text text-danger">
            {props.validationError.password}
          </p>}
      <Button
        btnClass = {'btn-primary'}
        disabled ={props.isLoading}
        onClick ={props.onSubmit}
        name={'Login'}/>
      <span className={'badge'}>or</span>
      <a className={'btn btn-default'} data-toggle="modal" data-target="#forgetpasswordmodal">Forgot Password ?</a>
    </form>
  </Modal>
);

LoginFormModal.propTypes = propTypes;

export default LoginFormModal;
