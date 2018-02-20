import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import TaskDetailsView from '../views/TaskDetailsView';
import Modal from '../views/Modal';


class TaskDetails extends Component {
    constructor (props) {
        super(props);

        this.data = {};
        this.state = {
            isEdited: false,
            isDialogOpen: {
                remove: false,
                update: false
            }
        };
    }

    static propTypes = {
        taskData: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({})
        ]).isRequired
    }

    onToggleDialog = (dialogName, isOpen) => {
        if (typeof isOpen === 'undefined') {
            isOpen = !this.state.isDialogOpen[dialogName];
        }

        this.setState({
            isDialogOpen: {
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

    onSave = (newData) => {
        let isEqual,
            data = this.props.taskData,
            props = Object.getOwnPropertyNames(newData);

        isEqual = props.every((prop) => {
            return (data[prop] === newData[prop]);
        });

        if (!newData.title || isEqual) {
            this.setState({
                isEdited: false
            });
        } else {
            this.data = {...data, ...newData};

            this.onToggleDialog('update');
        }
    }

    onSaveChanges = (e) => {
        e.preventDefault();

        return (refs) => {
            this.onSave({
                title: refs.title.value.trim(),
                description: refs.description.value.trim()
            });
        };
    }

    onCancelChanges = (e) => {
        this.setState({
            isEdited: false
        });
    }

    render () {
        return (
            <Fragment>
                <TaskDetailsView
                    isEdited={this.state.isEdited}
                    onCloseDialog={() => this.onToggleDialog('remove')}
                    onEdit={this.onEdit}
                    onSaveChanges={this.onSaveChanges}
                    onCancelChanges={this.onCancelChanges}
                    taskData={this.props.taskData}
                />

            {
                this.state.isDialogOpen.update &&
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
                this.state.isDialogOpen.remove &&
                <Modal
                    onClose={() => this.onToggleDialog('remove')}
                    buttons={[{
                        text: 'Ok',
                        props: {
                            onClick: () => {
                                this.props.onRemoveTask(this.props.taskData.id);
                                this.onToggleDialog('remove');
                            }
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
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        tasks: state.tasks
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
)(TaskDetails);
