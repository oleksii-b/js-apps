import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import Header from './Header';
import Task from './Task';
import './App.css';


class App extends Component {
    render () {
        return (
            <Fragment>
                <Header />

                <table className='tasks'>
                    <thead>
                        <tr>
                            <th className='task-date-legend'>Date</th>
                            <th className='task-info-legend'>Task</th>
                            <th className='task-options-legend'>Options</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.tasks.length ?
                            this.props.tasks.map((task, i) => {
                                return (
                                    <Task key={task.id} data={task}>
                                        <section className='task-info'>
                                            <h2 className='task-info__title'>
                                                {task.title}
                                            </h2>

                                            <pre className='task-info__description'>
                                                {task.description}
                                            </pre>
                                        </section>
                                    </Task>
                                );
                            })
                            :
                            <tr>
                                <td className='no-tasks' colSpan='3'>
                                    <i className='no-tasks__text'>No items here</i>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        tasks: state
    })
)(App);
