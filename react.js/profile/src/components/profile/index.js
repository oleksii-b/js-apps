// @flow

import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';

import Aside from './Aside';
import Offices from './offices';


export default function Profile() {
    return (
        <Fragment>
            <div className='layout-aside'>
                <Aside />
            </div>

            <div className='layout-content'>
                <Offices />

                <div className='profile-controls'>
                    <div className='profile-controls__group'>
                        <NavLink
                            to='#'
                            className='profile-controls__btn profile-controls__btn--lg'
                        >
                            Back
                        </NavLink>

                         <NavLink
                            to='#'
                            className='profile-controls__link'
                        >
                            <i className='glyphicon glyphicon-plus'></i>&nbsp;
                            Provide additional comments
                        </NavLink>
                    </div>

                    <div className='profile-controls__group'>
                        <NavLink
                            to='#'
                            className='profile-controls__btn profile-controls__btn--lg'
                        >
                            Skip this step
                        </NavLink>

                        <NavLink
                            to='#'
                            className='profile-controls__btn profile-controls__btn--primary'
                        >
                            Continue
                        </NavLink>
                    </div>
                </div>

            </div>
        </Fragment>
    );
}
