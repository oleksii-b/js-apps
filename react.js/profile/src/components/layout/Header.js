// @flow

import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';


export default function Header() {
    return (
        <Fragment>
            <h1 className='logo'>
                <span className='logo__brand-name'>SPD</span> University
            </h1>

            <NavLink to='#profile-editor' className='header-link header-link--editor'>Profile Editor</NavLink>

            <nav className='header-menu'>
                <NavLink to='#contact' className='header-link'>
                    Contact
                </NavLink>

                <NavLink to='#faq' className='header-link'>
                    FAQs
                </NavLink>

                <NavLink to='#save&exit' className='header-link'>
                    Save and Exit
                </NavLink>
            </nav>
        </Fragment>
    );
}
