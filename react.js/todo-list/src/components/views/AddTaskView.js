import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import './AddTask.css';


AddTaskView.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onToggleDialog: PropTypes.func.isRequired
}

export default function AddTaskView(props) {
    let refs = {
        title: '',
        description: ''
    };

    return (
        <Modal
            onClose={props.onToggleDialog}
            buttons={[{
                text: 'Add',
                props: {
                    onClick: () => props.onAdd(refs)
                }
            }, {
                text: 'Cancel',
                props: {
                    onClick: props.onToggleDialog
                }
            }]}>
            <form className='add-task'>
                <h2 className='add-task__form-title'>
                    Add New Task
                </h2>

                <div className='add-task__form-group'>
                    <label>Title:</label>
                    <input className='add-task__title' ref={(val) => refs.title = val} onChange={props.handleChange} />
                    {
                        props.errorMessage &&
                        <div className='error-message'>
                            {props.errorMessage}
                        </div>
                    }
                </div>

                <div className='add-task__form-group'>
                    <label>Description:</label>
                    <textarea className='add-task__description' ref={(val) => refs.description = val} rows={3} />
                </div>
            </form>
        </Modal>
    );
}
