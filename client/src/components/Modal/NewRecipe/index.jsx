import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateRecipeFormModal from './CreateRecipeFormModal';
import validateRecipe from '../../../utils/validators/recipe';


const contextTypes = {
  router: PropTypes.object.isRequired
};

const propTypes = {
  createRecipe: PropTypes.func.isRequired,
  editRecipe: PropTypes.func.isRequired
};

/**
 * @description -CreateRecipe component
 * @class CreateRecipe
 * @extends {React.Component}
 */
class CreateRecipe extends Component {
  /**
   * @description This creates an instance of CreateRecipe Component
   * @param {object} props - comoponent props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        name: '',
        description: '',
        photoUrl: '',
        progress: 20
      },
      isLoading: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description This handles form input onChange event
   * @param {object} event - event handler
   * @returns {undefined}
   * @memberof CreateRecipe
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
   * @description This validates recipe entry
   * @param {void} null
   * @returns {boolean} isValid
   * @memberof CreateRecipe
   */
  isFormValid() {
    const { errors, isValid } = validateRecipe(this.state.recipe);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

   /**
   * @description This submits recipe form on completion
   * @param {object} event - event handler
   * @returns {undefined}
   * @memberof SignIn
   */
  onSubmit(event) {
    event.preventDefault();
    if (!this.isFormValid()) { return; }
    window.prompt(this.state.recipe)
  }

  /**
   * @description Renders component
   * @returns {object} JSX
   * @memberof CreateRecipe
   */
  render() {
    return (
      <CreateRecipeFormModal
        validationError = {this.state.errors}
        onChange = {this.onChange}
        onSubmit = {this.onSubmit}
        isLoading = {this.state.isLoading}
        recipe = {this.state.recipe}/>
    );
   }
}

CreateRecipe.propTypes = propTypes;
CreateRecipe.contextTypes = contextTypes;

export default CreateRecipe;
