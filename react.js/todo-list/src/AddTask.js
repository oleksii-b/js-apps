import React, {Component} from 'react';
import {connect} from 'react-redux';

import Modal from './Modal';
import './AddTask.css';


class AddTask extends Component {
    constructor (props) {
        super(props);

        this.state = {
            errorMessage: '',
        };
    }

    handleChange = (e) => {
        if (!this.state.errorMessage) {
            this.setState({
                errorMessage: ''
            });
        }
    }

    onAdd = () => {
        let title = this.refs.title.value.trim(),
            description = this.refs.description.value.trim();

        if (title) {
            let currentDate = new Date(),
                date = currentDate.getDate(),
                month = currentDate.getMonth() + 1,
                task = {
                    title: title,
                    description: description,
                    date: `${date < 10 ? '0' : ''}${date}/${month < 10 ? '0' : ''}${month}/${currentDate.getFullYear()}`
                };

            this.props.onAddTask(task);
            this.props.onToggleDialog();
        } else {
            this.setState({
                errorMessage: 'This field can not be empty!'
            });
        }
    }

    render () {
        return (
            <Modal
                onClose={this.props.onToggleDialog}
                buttons={[{
                    text: 'Add',
                    props: {
                        onClick: this.onAdd
                    }
                }, {
                    text: 'Cancel',
                    props: {
                        onClick: this.props.onToggleDialog
                    }
                }]}>
                <form className='add-task'>
                    <h2 className='add-task__form-title'>
                        Add New Task
                    </h2>

                    <div className='add-task__form-group'>
                        <label>Title:</label>
                        <input className='add-task__title' ref='title' onChange={this.handleChange} />
                        {
                            this.state.errorMessage &&
                            <div className='error-message'>
                                {this.state.errorMessage}
                            </div>
                        }
                    </div>

                    <div className='add-task__form-group'>
                        <label>Description</label>
                        <textarea className='add-task__description' ref='description' rows={3} />
                    </div>
                </form>
            </Modal>
        );
    }
};

export default connect(
    state => ({
        tasks: state
    }),

    dispatch => ({
        onAddTask: (task) => {
            dispatch({
                type: 'add',
                task: task
            });
        }
    })
)(AddTask);
