import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessageComponent from './FlashMessage';
import SetTimeout from '../../helpers/SetTimeout';
import { removeFlashMessage } from '../../actions/flashMessage';

/**
 * @description Container component for flash message
 * @class FlashMessage
 * @extends {React.Component}
 */
class FlashMessage extends Component {
  /**
   * Creates an instnce of FlashMessage
   * @param { object } props
   */
  constructor(props) {
    super(props);
    this.state = {
      alertClosed: false
    };
    this.closeAlert = this.closeAlert.bind(this);
  }

  /**
   * componentWillRecieveProps
   * @description Lifecycle method before component receives new props
   * @param { object } nextProps
   * @returns { void }
   */
   componentWillReceiveProps(nextProps) {
    if (this.props.message !== nextProps.message) {
      this.setState({
        alertClosed: false
      });
    }
  }

  /**
   * @description Lifecycle method invoked when component will unmount
   * @memberof FlashMessage
   * @method componentWillMount
   * @returns {void} null
   */
  componentWillUnmount() {
    this.props.removeFlashMessageAction();
  }

  /**
   * closeAlert
   * @description Closes alert
   * @returns {void}
   * @memberof FlashMessage
   */
  closeAlert() {
    this.setState({
      alertClosed: true
    });
  }

  /**
   * @description Renders flash message component
   * @returns {JSX} - JSX
   * @memberof FlashMessage
   */
  render() {
    const { message } = this.props;
    if (!this.state.alertClosed) {
      return (
        <SetTimeout interval = {15000}>
          {Object.keys(message).length !== 0 &&
        <FlashMessageComponent
          message = {message}
          closeAlert = {this.closeAlert}/>
        }
        </SetTimeout>);
      }
    return null;
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object,
  removeFlashMessageAction: PropTypes.func.isRequired
};

/**
 * @description Get state from store
 * @param {object} state - redux store state
 * @returns {object} mapped state
 */

 const mapStateToProps = (state) => ({
   message: state.flashMessage
 });

 export { FlashMessage };
 export default connect(
   mapStateToProps,
   { removeFlashMessageAction: removeFlashMessage }
 )(FlashMessage);
