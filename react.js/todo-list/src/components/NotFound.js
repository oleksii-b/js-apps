import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './NotFound.css';


export default function NotFound() {
    return (
        <div className='error-page'>
            <h2 className='error-page__title'>
                Page is not found
            </h2>
        </div>
    );
}
