import React from 'react';
import PropTypes from 'prop-types';

const ModalForm = ({ children, wrapperRef }) => (
    <div className="modal-overlay">
        <div ref ={wrapperRef}>
            {children}
        </div>
    </div>
);

ModalForm.propTypes = {
    children: PropTypes.array.isRequired,
    wrapperRef: PropTypes.object.isRequired
};


export default ModalForm;
