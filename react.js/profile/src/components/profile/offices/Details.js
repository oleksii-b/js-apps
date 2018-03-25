// @flow

import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import validateOfficeData from 'services/office-validation';
import Modal from 'components/core/Modal';
import Editor from './Editor';
import DetailsView from './DetailsView';
import RemovalReason from './RemovalReason';


type Props = {
    officeData: {
        id: string,
        country: string,
        region: string,
        zip: string,
        city: string,
        address: string,
        address2?: string,
        phone?: string,
        fax?: string,
        email?: string,
        type?: boolean
    },
    onRemoveOffice: (officeId: string) => void,
    onUpdateOffice: (office: {}) => void
};

type State = {
    isEdited: boolean,
    isDialogOpen: {
        remove: boolean,
        update: boolean
    },
    validationErrors: string[]
};

let data: {} = {};

class Details extends Component<Props, State> {
    state = {
        isEdited: false,
        isDialogOpen: {
            remove: false,
            update: false
        },
        validationErrors: []
    }

    onToggleDialog = (dialogName, isOpen?: boolean) => {
        if (typeof isOpen === 'undefined') {
            isOpen = !this.state.isDialogOpen[dialogName];
        }

        this.setState({
            isDialogOpen: {
                [dialogName]: isOpen
            }
        });
    }

    onEdit = () => {
        if (!this.state.isEdited) {
            this.setState({
                isEdited: true
            });
        }
    }

    onUpdate = () => {
        this.props.onUpdateOffice(data);
        this.onToggleDialog('update');
        this.setState({
            isEdited: false
        });
    }

    onSave = (e: any) => {
        e.preventDefault();

        validateOfficeData(e.target.elements)
            .then((office: {}) => {
                data = {...this.props.officeData, ...office};

                this.onToggleDialog('update');
                this.setState({
                    validationErrors: []
                });
            })
            .catch((errors: string[]) => {
                this.setState({
                    validationErrors: errors
                });
            });
    }

    onCancel = () => {
        this.setState({
            isEdited: false,
            validationErrors: []
        });
    }

    render () {
        return (
            <Fragment>
                {
                    this.state.isEdited ?
                    <Editor
                        officeData={this.props.officeData}
                        errors={this.state.validationErrors}
                        onSave={this.onSave}
                        onCancel={this.onCancel}
                    />
                    :
                    <DetailsView
                        officeData={this.props.officeData}
                        onCloseDialog={() => this.onToggleDialog('remove')}
                        onEdit={this.onEdit}
                    />
                }

                {
                    this.state.isDialogOpen.update &&
                    <Modal
                        onClose={() => this.onToggleDialog('update')}
                        buttons={[{
                            text: 'Cancel',
                            props: {
                                className: 'btn-profile btn-profile--lg',
                                onClick: () => {
                                    this.onCancel();
                                    this.onToggleDialog('update');
                                }
                            }
                        }, {
                            text: 'Save',
                            props: {
                                className: 'btn-profile btn-profile--lg btn-profile--primary',
                                onClick: this.onUpdate
                            }
                        }]}
                    >
                        <div className='update-confirm'>
                            Save this changes?
                        </div>
                    </Modal>
                }

                {
                    this.state.isDialogOpen.remove &&
                    <Modal
                        onClose={() => this.onToggleDialog('remove')}
                        buttons={[{
                            text: 'Cancel',
                            props: {
                                className: 'btn-profile btn-profile--lg',
                                onClick: () => this.onToggleDialog('remove')
                            }
                        }, {
                            text: 'Remove Record',
                            props: {
                                className: 'btn-profile btn-profile--lg btn-profile--primary',
                                onClick: ():void => {
                                    this.props.onRemoveOffice(this.props.officeData.id);
                                    this.onToggleDialog('remove');
                                }
                            }
                        }]}
                    >
                        <RemovalReason />
                    </Modal>
                }
            </Fragment>
        );
    }
}

export default connect(
    null,

    (dispatch: ({
        type: string,
        payload: any
    }) => void) => ({
        onRemoveOffice: (id: number) => {
            dispatch({
                type: 'REMOVE_OFFICE',
                payload: id
            });
        },
        onUpdateOffice: (office: {}) => {
            dispatch({
                type: 'UPDATE_OFFICE',
                payload: office
            });
        }
    })
)(Details);
