import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AddTask from '../containers/AddTask';
import './Header.css';


HeaderView.contextTypes = {
    onToggleDialog: PropTypes.func.isRequired
}

export default function HeaderView(props, context) {
    return (
        <header className='layout-header'>
            <div className='layout-header__container'>
                <h1 className='main-title'>
                    ToDo List
                </h1>

                <div className='layout-header__bar'>
                    <button className='add-task-btn' onClick={context.onToggleDialog}>
                        Add Task
                    </button>
                </div>

                {props.children}
            </div>
        </header>
    );
}
