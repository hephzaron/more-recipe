import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import SingleInput from '../../Forms/SingleInput';
import TextArea from '../../Forms/TextArea';
import Button from '../../Forms/Button';

/**
 * create recipe page component
 * @description Renders the create recipe page component,
 *  loads the button and single input component
 * @param {object} props
 * @return {void}
 */

const propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validationError: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  recipe: PropTypes.object.isRequired
};

const CreateRecipeFormModal = (props) => (
  <Modal
    identifier={'newrecipemodal'}>
    <form className = {'form'} id = {'newrecipeForm'} onSubmit={props.onSubmit}>
      <SingleInput
        placeholder={'Name of recipe'}
        onChange={props.onChange}
        name={'name'}
        value={props.recipe.name}/>
        {props.validationError.name &&
          <p className = "form-text text-danger">
            {props.validationError.name}
          </p>}
      <TextArea
        placeholder={'Description'}
        onChange={props.onChange}
        name={'description'}
        value={props.recipe.description}/>
        {props.validationError.description &&
          <p className = "form-text text-danger">
            {props.validationError.description}
          </p>}
      <SingleInput
        type = {'file'}
        onChange={props.onChange}
        name={'photoUrl'}
        value={props.recipe.photoUrl}/>
        {props.validationError.photoUrl &&
          <p className = "form-text text-danger">
            {props.validationError.photoUrl}
          </p>}
      <div className="progress" style={{ height: '10px' }}>
        <div className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${props.recipe.progress}%` }}/>
      </div>
      <Button
        btnClass = {'btn-primary'}
        disabled ={props.isLoading}
        onClick ={props.onSubmit}
        name={'Post'}/>
    </form>
  </Modal>
);

CreateRecipeFormModal.propTypes = propTypes;


export default CreateRecipeFormModal;
