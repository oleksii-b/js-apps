import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import TaskDetails from './TaskDetails';


class ActiveTaskInfo extends Component {
    constructor (props) {
        super(props);

        this.task = 'Task is not found'
    }

    getDetails() {
        if (this.props.tasks.length) {
            let currentTaskId = this.props.match.params.id;

            for (let i = 0; i < this.props.tasks.length; i++) {
                if (this.props.tasks[i].id === +currentTaskId) {
                    this.task = this.props.tasks[i];

                    break;
                }
            }

            return;
        }

        this.task = 'Tasks are absent';
    }

    render () {
        this.getDetails();

        return <TaskDetails taskData={this.task} />;
    }
}

export default connect(
    state => ({
        tasks: state.tasks
    })
)(ActiveTaskInfo);
