import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import SingleInput from '../../Forms/SingleInput';
import Button from '../../Forms/Button';
import FlashMessageList from '../../FlashMessage';

/**
 * sign up page component
 * @description Renders the sign up page component,
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

const LoginFormModal = (props) => (
  <Modal
    identifier={'signupmodal'}>
    <form className = {'form'} id = {'signupForm'} onSubmit={props.onSubmit}>
      <FlashMessageList/>
      <SingleInput
        placeholder={'First name'}
        onChange={props.onChange}
        name={'firstName'}
        value={props.user.firstName}/>
        {props.validationError.firstName &&
          <p className = "form-text text-danger">
            {props.validationError.firstName}
          </p>}
      <SingleInput
        placeholder={'Last name'}
        onChange={props.onChange}
        name={'lastName'}
        value={props.user.lastName}/>
        {props.validationError.lastName &&
          <p className = "form-text text-danger">
            {props.validationError.lastName}
          </p>}
      <SingleInput
        placeholder={'Username'}
        onChange={props.onChange}
        name={'username'}
        value={props.user.username}/>
        {props.validationError.username &&
          <p className = "form-text text-danger">
            {props.validationError.username}
          </p>}
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
        type = {'number'}
        placeholder={'Age'}
        onChange={props.onChange}
        name={'age'}
        value={props.user.age}/>
        {props.validationError.age &&
          <p className = "form-text text-danger">
            {props.validationError.age}
          </p>}
      <select className={'form-control'}>
        <option>Male</option>
        <option>Female</option>
      </select>
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
      <SingleInput
        placeholder={'Confirm password'}
        type={'password'}
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
        name={'Sign Up'}/>
    </form>
  </Modal>
);

LoginFormModal.propTypes = propTypes;

export default LoginFormModal;
