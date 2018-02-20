import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AddTask from '../containers/AddTask';
import HeaderView from '../views/HeaderView';


export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDialogOpen: false
        }
    }

    static childContextTypes = {
        onToggleDialog: PropTypes.func
    }

    getChildContext() {
        return {
            onToggleDialog: this.onToggleDialog
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isDialogOpen !== nextState.isDialogOpen;
    }

    onToggleDialog = () => {
        this.setState({
            isDialogOpen: !this.state.isDialogOpen
        });
    }

    render () {
        return (
            <HeaderView>
                {this.state.isDialogOpen && <AddTask />}
            </HeaderView>
        );
    }
}
