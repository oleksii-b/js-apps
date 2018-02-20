import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import './TaskDetails.css';


TaskDetailsView.propTypes = {
    isEdited: PropTypes.bool.isRequired,
    onCloseDialog: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onSaveChanges: PropTypes.func.isRequired,
    onCancelChanges: PropTypes.func.isRequired,
    taskData: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({})
    ]).isRequired
}

export default function TaskDetailsView(props) {
    const refs = {
        title: '',
        description: ''
    };

    return (
        <Fragment>
        {
            typeof props.taskData === 'string' ? (
                <div className='task-info-empty'>
                    {props.taskData}
                </div>
            ) : (
                <Fragment>
                {
                    props.isEdited ? (
                        <form className='update-task'>
                            <input
                                className='update-task__title update-task__input'
                                defaultValue={props.taskData.title}
                                ref={(val) => refs.title = val}
                                autoFocus />

                            <textarea
                                className='update-task__input'
                                defaultValue={props.taskData.description}
                                ref={(val) => refs.description = val} />

                            <button onClick={(e) => props.onSaveChanges(e)(refs)}>
                                Save
                            </button>

                            <button onClick={props.onCancelChanges}>
                                Cancel
                            </button>
                        </form>
                    ) : (
                        <section className='task-info'>
                            <h2 className='task-info__title'>
                                {props.taskData.title}
                            </h2>

                            <pre className='task-info__description'>
                                {props.taskData.description}
                            </pre>
                        </section>
                    )
                }

                {
                    !props.isEdited &&
                    <div className='task-options'>
                        <button className='task-options__btn' onClick={props.onEdit}>
                            Edit
                        </button>

                        <button className='task-options__btn' onClick={props.onCloseDialog}>
                            Remove
                        </button>
                    </div>
                }

                    <div>
                        {props.taskData.date}
                    </div>
                </Fragment>
            )
        }
        </Fragment>
    );
}
