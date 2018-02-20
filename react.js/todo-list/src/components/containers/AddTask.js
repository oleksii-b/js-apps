import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import AddTaskView from '../views/AddTaskView';


class AddTask extends Component {
    constructor(props, context) {
        super(props);

        this.state = {
            errorMessage: '',
        };
    }

    static contextTypes = {
        onToggleDialog: PropTypes.func.isRequired
    }

    handleChange = (e) => {
        if (this.state.errorMessage) {
            this.setState({
                errorMessage: ''
            });
        }
    }

    onAdd = (inputs) => {
        let title = inputs.title.value.trim(),
            description = inputs.description.value.trim();

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
            this.context.onToggleDialog();
        } else {
            this.setState({
                errorMessage: 'This field can not be empty!'
            });
        }
    }

    render () {
        return (
            <AddTaskView
                onToggleDialog={this.context.onToggleDialog}
                errorMessage={this.state.errorMessage}
                handleChange={this.handleChange}
                onAdd={this.onAdd}
            />
        );
    }
}

export default connect(
    state => ({
        tasks: state.tasks
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
