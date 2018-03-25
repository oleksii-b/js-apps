// @flow

import React, {Component, Fragment} from 'react';

import FormGroup from './FormGroup';


type Props = {
    onSave: (e: SyntheticEvent<>) => void,
    onCancel: () => void
};

export default function EditorView(props: Props) {
    return (
        <form className='office-editor' onSubmit={(e: SyntheticEvent<>) => props.onSave(e)}>
            <fieldset className='office-editor__fieldset'>
                <FormGroup
                    label='Country'
                    name='country'
                    isRequired={true}
                />

                <FormGroup
                    label='State/Province'
                    name='region'
                    isRequired={true}
                />

                <FormGroup
                    label='Postal Code'
                    name='zip'
                    isRequired={true}
                />

                <FormGroup
                    label='City'
                    name='city'
                    isRequired={true}
                />

                <FormGroup
                    label='Street Address'
                    name='address'
                    isRequired={true}
                />

                <FormGroup
                    label='Address 2'
                    name='address2'
                />
            </fieldset>

            <fieldset className='office-editor__fieldset'>
                <FormGroup
                    label='Phone'
                    name='phone'
                />

                <FormGroup
                    label='Fax'
                    name='fax'
                />

                <FormGroup
                    label='Email'
                    name='email'
                />

                <FormGroup
                    label='Office Type'
                    name='type'
                />
            </fieldset>

            <div className='btn-group-profile'>
                <div className='btn-group-profile__item'>
                    <button
                        className='btn-profile btn-profile--sm btn-profile--cancel'
                        onClick={props.onCancel}
                    >
                        Cancel
                    </button>
                </div>

                <div className='btn-group-profile__item'>
                    <button
                        className='btn-profile btn-profile--sm btn-profile--primary'
                        type='submit'
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}
