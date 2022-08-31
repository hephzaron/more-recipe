import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { removeFlashMessage } from '../../../actions/flashMessageActions';
import useFlashMessage from './FlashMessageCustomHook';


const FlashMessage = () => {
    const { message, type, hideFlashMessage } = useFlashMessage(removeFlashMessage);
    return (
        <div id ="flash-message" className={`${type}`}>
            <FontAwesomeIcon
                className="flash-icon" icon={faWindowClose}
                onClick={hideFlashMessage()}/>
            <p> {message} </p>
        </div>);
};

export default FlashMessage;
