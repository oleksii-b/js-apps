// @flow

import React, {Component} from 'react';
import {array, object} from 'prop-types';

import EditorView from './EditorView';


type Props = {
    onSave: () => void,
    onCancel: () => void,
    officeData: {},
    errors?: string[]
};

export default class Editor extends Component<Props> {
    static childContextTypes = {
        defaultData: object,
        errors: array
    }

    getChildContext = () => ({
        defaultData: this.props.officeData,
        errors: this.props.errors
    })

    render () {
        return <EditorView {...this.props} />;
    }
}
