import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import TaskEditor from './TaskEditor';
import Modal from './Modal';
import './Task.css';


class Task extends Component {
    constructor (props) {
        super(props);

        this.data = {};
        this.state = {
            isEdited: false,
            isDialogVisible: {
                remove: false,
                update: false
            }
        };
    }

    static propTypes = {
        data: PropTypes.object.isRequired
    }

    onToggleDialog = (dialogName, isOpen) => {
        if (typeof isOpen === 'undefined') {
            isOpen = !this.state.isDialogVisible[dialogName];
        }

        this.setState({
            isDialogVisible: {
                [dialogName]: isOpen
            }
        });
    }

    onEdit = () => {
        if (!this.state.isEdited) {
            this.setState({
                isEdited: true
            });
        }
    }

    onRemove = (id) => {
        this.props.onRemoveTask(id);
    }

    onUpdate = () => {
        const {id, description, title} = this.data;

        if (title) {
            this.props.onUpdateTask({
                id: id,
                title: title,
                description: description
            });

            this.setState({
                isEdited: false
            });
        }

        this.onToggleDialog('update');
    }

    onSaveChanges = (title, description) => {
        let data = this.props.data;

        if (!title || data.title === title && data.description === description) {
            this.setState({
                isEdited: false
            });
        } else {
            this.data = {
                id: data.id,
                title: title,
                description: description
            };

            this.onToggleDialog('update');
        }
    }

    onCancelChanges = () => {
        this.setState({
            isEdited: false
        });
    }

    render () {
        return (
            <tr>
                <td>
                    {this.props.data.date}
                </td>

                <td>
                    {
                        this.state.isEdited ? (
                            <TaskEditor
                                onSaveChanges={this.onSaveChanges}
                                onCancelChanges={this.onCancelChanges}
                                data={this.props.data} />
                        ) : (
                            this.props.children
                        )
                    }
                </td>

                <td>
                    <button className='' onClick={this.onEdit}>
                        Edit
                    </button>

                    <button className='' onClick={() => this.onToggleDialog('remove')}>
                        Remove
                    </button>
                </td>

                {
                    this.state.isDialogVisible.update &&
                    <Modal
                        onClose={() => this.onToggleDialog('update')}
                        buttons={[{
                            text: 'Ok',
                            props: {
                                onClick: this.onUpdate
                            }
                        }, {
                            text: 'Cancel',
                            props: {
                                onClick: () => {
                                    this.onCancelChanges();
                                    this.onToggleDialog('update');
                                }
                            }
                        }]}>
                        <b className='dialog-text'>Save this changes?</b>
                    </Modal>
                }

                {
                    this.state.isDialogVisible.remove &&
                    <Modal
                        onClose={() => this.onToggleDialog('remove')}
                        buttons={[{
                            text: 'Ok',
                            props: {
                                onClick: this.onRemove.bind(null, this.props.data.id)
                            }
                        }, {
                            text: 'Cancel',
                            props: {
                                onClick: () => this.onToggleDialog('remove')
                            }
                        }]}>
                        <b className='dialog-text'>Do you confirm to remove?</b>
                    </Modal>
                }
            </tr>
        );
    }
};

export default connect(
    state => ({
        tasks: state
    }),

    dispatch => ({
        onRemoveTask: (id) => {
            dispatch({
                type: 'remove',
                id: id
            });
        },
        onUpdateTask: (task) => {
            dispatch({
                type: 'update',
                task: task
            });
        }
    })
)(Task);
