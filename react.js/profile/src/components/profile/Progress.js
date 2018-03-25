// @flow

import React from 'react';


type Props = {
    value: number,
    children: any
};

export default function Progress(props: Props) {
    const value: number = props.value;

    let deg: number,
        styles: {transform: string};

    if (value <= 50) {
        deg = (value / 50) * 180;
    } else {
        deg = ((value - 50) / 50) * 180;
    }

    styles = {
        transform: `rotate(${deg}deg)`
    };

    return (
        <div className='circular-propress'>
            <div className='circular-propress__sector' style={styles} />

            {
                props.value > 50 &&
                <div className='circular-propress__sector' style={styles} />
            }

            <div className='circular-propress__content'>
                {props.children}
            </div>
        </div>
    );
}
