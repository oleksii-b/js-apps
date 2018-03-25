// @flow

import React, {Fragment} from 'react';

import SidebarMenu from './sidebar-menu';
import Progress from './Progress';


export default function Aside() {
    return (
        <Fragment>
            <div className='aside-top-info'>
                <Progress value={100 * 2 / 8}>
                    <div className='company-info-progress'>
                        2<sup className='company-info-progress__total'>&nbsp;/ 8</sup>
                    </div>
                </Progress>
            </div>

            <SidebarMenu />
        </Fragment>
    );
}
