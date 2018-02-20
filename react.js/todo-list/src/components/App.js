import React, {Component, Fragment} from 'react';
import {Route, NavLink, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Header from './containers/Header';
import ActiveTaskInfo from './containers/ActiveTaskInfo';
import './App.css';


let prevSize;

class App extends Component {
    constructor(props, context) {
        super(props);
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillReceiveProps(nextProps) {
        let nextSize = nextProps.tasks.length;

        if (prevSize !== nextSize) {
            this.context.router.history.push(nextSize ? `/tasks/${nextProps.tasks[0].id}` : '/tasks');

            prevSize = nextSize;
        }
    }

    componentWillMount() {
        if (this.props.location.pathname === '/') {
            this.context.router.history.push('/tasks');
        }
    }

    componentDidMount() {
        prevSize = this.props.tasks.length;
    }

    render () {
        return (
            <Fragment>
                <Header />

                <div className='tasks container'>
                    <ul className='task-list'>
                    {
                        this.props.tasks.length ?
                        this.props.tasks.map((task, i) => (
                            <li key={task.id} className='task-list__item'>
                                <NavLink
                                    to={`/tasks/${task.id}`}
                                    className='task-list__link'
                                    activeClassName='task-list__link--active'>
                                    {task.title}
                                </NavLink>
                            </li>
                        ))
                        :
                        <div className='no-tasks'>
                            <i className='no-tasks__text'>No items here</i>
                        </div>
                    }
                    </ul>

                    <div className='task-details'>
                        <Route path='/tasks/:id?' component={ActiveTaskInfo} />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        tasks: state.tasks
    })
)(App);
