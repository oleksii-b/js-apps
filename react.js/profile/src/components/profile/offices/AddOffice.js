// @flow

import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Button, DropdownButton, MenuItem} from 'react-bootstrap';

import validateOfficeData from 'services/office-validation';
import Editor from './Editor';


type Props = {
    offices: Array<{}>,
    onAddOffice: (office: {}) => void
};

type State = {
    isActive: boolean,
    validationErrors: string[]
};

class AddOffice extends Component<Props, State> {
    state = {
        isActive: false,
        validationErrors: []
    }

    onAdd = (e: any):void => {
        e.preventDefault();

        validateOfficeData(e.target.elements)
            .then((office: {}) => {
                this.props.onAddOffice(office);
                this.onToggle(false);
                this.setState({
                    validationErrors: []
                });
            })
            .catch((errors) => {
                this.setState({
                    validationErrors: errors
                });
            });
    }

    onToggle = (state: boolean):void => {
        this.setState({
            isActive: state,
            validationErrors: []
        });
    }

    render () {
        return (
            <Fragment>
                <div className='add-office'>
                    <button
                        className='add-office__btn'
                        onClick={() => !this.state.isActive && this.onToggle(true)}
                    >
                        Add New Office
                    </button>

                    <div>
                        {this.props.offices.length} offices
                    </div>
                </div>

                {
                    this.state.isActive &&
                    <div className='add-office-form'>
                        <Editor
                            officeData={{}}
                            errors={this.state.validationErrors}
                            onSave={this.onAdd}
                            onCancel = {this.onToggle.bind(null, false)}
                        />
                    </div>
                }
            </Fragment>
        );
    }
}

export default connect(
    (state: {offices: []}) => ({
        offices: state.offices
    }),

    (dispatch: ({
        type: string,
        payload: any
    }) => void) => ({
        onAddOffice: (office: {}) => {
            dispatch({
                type: 'ADD_OFFICE',
                payload: office
            });
        }
    })
)(AddOffice);
