import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import SingleInput from '../../Forms/SingleInput';
import Button from '../../Forms/Button';
import FlashMessageList from '../../FlashMessage';

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
  children: PropTypes.node.isRequired
};

const LoginFormModal = (props) => (
  <Modal
    identifier={'loginmodal'}>
    <form className = {'form'} id = {'loginForm'} onSubmit={props.onSubmit}>
      <FlashMessageList/>
        {props.children}
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
        name={'Login'}
        identifier = {'login'}/>
      <span className={'badge'}>or</span>
      <a className={'btn btn-default'} data-toggle="modal" data-target="#forgetpasswordmodal">Forgot Password ?</a>
    </form>
  </Modal>
);

LoginFormModal.propTypes = propTypes;

export default LoginFormModal;
