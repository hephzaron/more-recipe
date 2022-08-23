import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { removeFlashMessage } from '../../actions/flashMessageActions';

const propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    dispatch: PropTypes.func
};

/**
 * @class FlashMessage
 * @description Flash message class component to give user feeback on actions carried out
 */
class FlashMessage extends Component {
    /**
     * @method render
     * @description Renders the JSX component
     * @memberof FlashMessage
     * @param { null } void
     * @returns { JSX } JSX Component
     */
    render() {
        return (
            <div id ="flash-message" className={`${this.props.type}`}>
                <FontAwesomeIcon
                    className="flash-icon" icon={faWindowClose}
                    onClick={() => this.props.dispatch(removeFlashMessage())}/>
                <p> {this.props.message} </p>
            </div>
        );
    }
}

FlashMessage.propTypes = propTypes;

const mapStateToProps = (state) => ({
    message: state.flashMessageReducer.message,
    type: state.flashMessageReducer.type
});

export default connect(mapStateToProps)(FlashMessage);
