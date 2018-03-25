// @flow

import React, {Component} from 'react';
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

import OfficeFormControl from './FormControl';


type Props = {
    label: string,
    name: string,
    isRequired?: boolean
};

export default class OfficeFormGroup extends Component<Props> {
    render () {
        return (
            <FormGroup bsStyle='-office-editor'>
                <ControlLabel bsStyle='-office-editor'>
                    {this.props.isRequired && '*'}{this.props.label}:
                </ControlLabel>

                <div className='form-group__control'>
                    <OfficeFormControl
                        name={this.props.name}
                        isRequired={this.props.isRequired}
                    />
                </div>
            </FormGroup>
        );
    }
}
