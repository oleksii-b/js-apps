// @flow

import React, {Component} from 'react';
import {array, object} from 'prop-types';
import {Checkbox, FormControl} from 'react-bootstrap';

import CountrySelector from './CountrySelector';
import Input from './Input';


type Props = {
    name: string,
    bsStyle?: string,
    isRequired?: boolean
};

type State = {
    isDropdownActive: boolean
};

export default class OfficeFormControl extends Component<Props, State> {
    static contextTypes = {
        defaultData: object,
        errors: array
    }

    static defaultProps = {
        isRequired: false
    }

    state = {
        isDropdownActive: false
    }

    isChecked = () => {
        if (this.context.defaultData) {
            return this.context.defaultData[this.props.name];
        }

        return false;
    }

    handleBlur = () => {
        this.setState({
            isDropdownActive: false
        });
    }

    render () {
        if (this.props.name === 'country') {
            return (
                <CountrySelector {...this.props} />
            );
        }

        if (this.props.name === 'type') {
            return (
                <Checkbox
                    name='type'
                    defaultChecked={this.isChecked()}
                    data-required={this.props.isRequired}
                    inline
                >
                    Primary HQ
                </Checkbox>
            );
        }

        return <Input {...this.props} />;
    }
}
