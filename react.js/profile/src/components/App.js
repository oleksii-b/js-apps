// @flow

import React, {Fragment} from 'react';

import Header from './layout/Header';
import Profile from './profile';


export default function App() {
    return (
        <Fragment>
            <header className='layout-header'>
                <div className='layout-header__container container'>
                    <Header />
                </div>
            </header>

            <main className='layout-main container'>
                <div className='layout-main__container'>
                    <Profile />
                </div>
            </main>
        </Fragment>
    );
}
