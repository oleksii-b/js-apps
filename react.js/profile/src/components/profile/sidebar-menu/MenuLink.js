// @flow

import React from 'react';
import {NavLink} from 'react-router-dom';


type Props = {
    to: string,
    children: string
};

export default function (props: Props) {
    return (
        <NavLink
            to={props.to}
            className='sidebar-menu-link'
            activeClassName='sidebar-menu-link--active'
        >
            {props.children}
        </NavLink>
    );
}
