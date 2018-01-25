import React, {Component} from 'react';

import AddTask from './AddTask';
import './Header.css';


export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDialogVisible: false
        }
    }

    onToggleDialog = () => {
        this.setState({
            isDialogVisible: !this.state.isDialogVisible
        });
    }

    render () {
        return (
            <header className='layout-header'>
                <div className='layout-header__container'>
                    <h1 className='main-title'>
                        ToDo List
                    </h1>

                    <div className='layout-header__bar'>
                        <button className='add-task-btn' onClick={this.onToggleDialog}>
                            Add Task
                        </button>
                    </div>

                    {
                        this.state.isDialogVisible &&
                        <AddTask onToggleDialog={this.onToggleDialog} />
                    }
                </div>
            </header>
        );
    }
}
