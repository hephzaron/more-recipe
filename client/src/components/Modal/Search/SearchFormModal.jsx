import React, { Component } from 'react';
import Modal from '../Modal';
import SingleInput from '../../Forms/SingleInput';
import validateRecipe from '../../../utils/validators/recipe';

/**
 * @class SearchFormModal
 * @extends { React.Component }
 * @description Renders a Change Password Form in a modal
 * @param { object} props
 * @return { JSX } JSX Component
 */
class SearchFormModal extends Component {
  /**
   * Creates an instance od SearchFormModal Class
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        searchText: ''
      },
      isLoading: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
  }

  /**
   * @method onChange
   * @memberof SearchFormModal
   * @description Handles onChange event
   * @param { event } event
   * @returns { void }
   */
  onChange(event) {
    event.preventDefault();
    this.setState({
      recipe: {
        ...this.state.recipe,
        [event.target.name]: event.target.value
      }
    });
  }

  /**
   * @description This validate recipe name
   * @param {void} null
   * @returns { boolean } isValid
   * @memberof SearchFormModal
   */
  isFormValid() {
    const { errors, isValid } = validateRecipe(this.state.recipe);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * @method onSubmit
   * @memberof SearchFormModal
   * @description Handles onSubmit event
   * @param { event } event
   * @returns { void }
   */
  onSubmit(event) {
    event.preventDefault();
    const { searchText } = this.state.recipe;
    this.setState({
      isLoading: true
    });
    if (!this.isFormValid()) {
      this.setState({
        isLoading: false
      });
      return;
    }
    window.prompt({searchText})
  }

  /**
   * Renders JSX Search Component
   * @return {JSX} JSX component
   */
  render() {
    return (
      <Modal identifier = {'searchmodal'}>
      <form>
        <SingleInput
          placeholder={'Type your keyword'}
          onChange={this.onChange}
          name={'searchText'}
          value={this.state.recipe.searchText}
          onSubmit={this.onSubmit}/>
        <SingleInput
          type={'submit'}
          name={'searchSubmit'}
          onSubmit={this.onSubmit}/>
        <i className={'fa fa-search'}/>
      </form>
      </Modal>
    );
  }
}

export default SearchFormModal;
