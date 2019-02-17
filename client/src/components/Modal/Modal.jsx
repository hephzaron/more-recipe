import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  identifier: PropTypes.string.isRequired
};

const Modal = (props) => (
  <div className={classnames('modal fade', props.identifier)} id={props.identifier} tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-body">
      <a href="#" className="wawrecipe-close-btn" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
      {props.children}
      </div>
    </div>
  </div>);

Modal.propTypes = propTypes;

export default Modal;
