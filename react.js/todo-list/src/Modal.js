import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './Modal.css';

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    dialogClass: PropTypes.string,
    buttons: PropTypes.array
};

export default function Modal(props) {
    if (document.getElementById('modalDialog')) {
        var root = document.getElementById('modalDialog');
    } else {
        var root = document.createElement('div');

        root.id = 'modalDialog';

        document.body.appendChild(root);
    }

    let dialogClass = 'modal-dialog' + (props.dialogClass ? ` ${props.dialogClass}` : ''),
        cancelText = props.cancelText ? props.cancelText : 'Ok',
        handleClick = (e) => e.stopPropagation();

    return (
        ReactDOM.createPortal(
            <div className='modal' onClick={props.onClose}>
                <div className={dialogClass} onClick={handleClick}>
                    <button className='modal-dialog__btn-close' onClick={props.onClose}>
                        &times;
                    </button>

                    {props.children}

                    <div className='modal-dialog__btn-container'>
                    {
                        props.buttons.map((button, i) => {
                            return (
                                <button key={i} className='modal-dialog__btn' {...button.props}>
                                    {button.text}
                                </button>
                            );
                        })
                    }
                    </div>
                </div>
            </div>,
            root
        )
    );
};
