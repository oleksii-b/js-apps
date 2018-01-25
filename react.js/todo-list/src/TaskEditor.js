import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './TaskEditor.css';


export default class TaskEditor extends Component {
    static propTypes = {
        onSaveChanges: PropTypes.func.isRequired,
        onCancelChanges: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired
    }

    handleClick = (e) => {
        e.preventDefault();

        this.props.onSaveChanges(
            this.refs.title.value.trim(),
            this.refs.description.value.trim()
        );
    };

    render () {
        return (
            <form className='update-task'>
                <input
                    className='update-task__title update-task__input'
                    defaultValue={this.props.data.title}
                    ref='title'
                    autoFocus />

                <textarea
                    className='update-task__input'
                    defaultValue={this.props.data.description}
                    ref='description' />

                <button className='' onClick={this.handleClick}>
                    Save
                </button>

                <button className='' onClick={this.props.onCancelChanges}>
                    Cancel
                </button>
            </form>
        );
    }
};
