// @flow

import React, {Component} from 'react';
import {array, object} from 'prop-types';
import {FormControl} from 'react-bootstrap';


type Props = {
    name: string,
    bsStyle?: string,
    defaultValue?: string,
    isRequired?: boolean,
    onBlur?: (e: SyntheticEvent<>) => {},
    onFocus?: (e: SyntheticEvent<>) => {}
};

type State = {
    isFilled: boolean
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
        isFilled: !!this.getDefaultValue()
    }

    getDefaultValue () {
        if (this.context.defaultData) {
            return this.context.defaultData[this.props.name];
        }

        return this.props.defaultValue;
    }

    handleBlur = (e: SyntheticEvent<>) => {
        this.props.onBlur && this.props.onBlur(e);

        if (e.target.value) {
            this.setState({
                isFilled: true
            });
        } else {
            this.setState({
                isFilled: false
            });
        }
    }

    handleFocus = (e: SyntheticEvent<>) => {
        this.props.onFocus && this.props.onFocus(e);

        this.setState({
            isFilled: false
        });
    }

    render () {
        let controlClass:string = '',
            controlProps = {...this.props};

        'isRequired' in controlProps && delete controlProps.isRequired;

        if (this.state.isFilled) {
            controlClass = 'form-control--filled';
        } else if (this.context.errors && this.context.errors.indexOf(this.props.name) > -1) {
            controlClass = 'form-control--error';
        }

        return (
            <FormControl
                {...controlProps}
                data-required={this.props.isRequired}
                className={controlClass}
                name={this.props.name}
                defaultValue={this.getDefaultValue()}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
            />
        );
    }
}
