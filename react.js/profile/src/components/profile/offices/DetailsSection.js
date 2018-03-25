// @flow

import React, {Component, Fragment} from 'react';


type Props = {
    name: string,
    children: any
};

export default function DetailsSection(props: Props) {
    return (
        <div className='office-info-section'>
            <div className='office-info-section__name'>
                {props.name}:
            </div>

            <div className='office-info-section__content'>
                {props.children}
            </div>
        </div>
    );
}
