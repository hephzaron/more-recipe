import React from 'react';
import PropTypes from 'prop-types';

const ModalForm = ({ children }) => (
    <div className="modal-overlay">
        {children}
    </div>
);

ModalForm.propTypes = {
    children: PropTypes.object.isRequired
};


export default ModalForm;
