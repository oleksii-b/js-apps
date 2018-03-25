// @flow

import React from 'react';
import {NavLink} from 'react-router-dom';


type Props = {
    to: string,
    children: string,
    done?: boolean
};

export default function (props: Props) {
    let className: string = 'sidebar-submenu-link';

    props.done && (className += ' sidebar-submenu-link--done');

    return (
        <NavLink
            to={props.to}
            className={className}
            activeClassName='sidebar-submenu-link--active'
        >
            {props.children}

            {
                props.done &&
                <span>
                    &nbsp;<i className='glyphicon glyphicon-ok'></i>
                </span>
            }
        </NavLink>
    );
}
