// @flow

import React from 'react';

import MenuLink from './MenuLink';
import SubmenuLink from './SubmenuLink';


export default function () {
    return (
        <ul className='sidebar-menu'>
            <li className='sidebar-menu__item'>
                <MenuLink to='#company-info'>
                    Company Info
                </MenuLink>

                <ul className='sidebar-submenu'>
                    <li className='sidebar-submenu__item'>
                        <SubmenuLink to='#basic-info' done={true}>
                            Basic Info
                        </SubmenuLink>
                    </li>

                    <li className='sidebar-submenu__item'>
                        <SubmenuLink to='#offices'>
                            Offices
                        </SubmenuLink>
                    </li>

                    <li className='sidebar-submenu__item'>
                        <SubmenuLink to='#competitors'>
                            Competitors
                        </SubmenuLink>
                    </li>
                </ul>
            </li>

            <li className='sidebar-menu__item'>
                <MenuLink to='#my-firm'>
                    My Firm
                </MenuLink>
            </li>

            <li className='sidebar-menu__item'>
                <MenuLink to='#deals'>
                    Deals
                </MenuLink>
            </li>

            <li className='sidebar-menu__item'>
                <MenuLink to='#financials'>
                    Financials
                </MenuLink>
            </li>
        </ul>
    );
}
