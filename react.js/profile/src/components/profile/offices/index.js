// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';

import AddOffice from './AddOffice';
import Details from './Details';


type Props = {
    offices: Array<{
        id: string
    }>
};

class Offices extends Component<Props> {
    render () {
        return (
            <section className='profile-info'>
                <h2 className='profile-info__title'>
                    Offices <span className='profile-info__title-secondary'>| Company Info</span>
                </h2>

                <div>
                    Updating your location and company information helps you appeal to regional investors and service providers.
                </div>

                <div className='profile-info__content'>
                    <AddOffice />

                    {
                        this.props.offices.length ?
                        <ul className='office-list'>
                            {
                                this.props.offices.map((office) => (
                                    <li key={office.id} className='office-list__item'>
                                        <Details officeData={office} />
                                    </li>
                                ))
                            }
                        </ul>
                        :
                        <div className='no-offices'>
                            <i className='no-offices__text'>No offices here</i>
                        </div>
                    }
                </div>
            </section>
        );
    }
}

export default connect(
    (state: {offices: []}) => ({
        offices: state.offices
    })
)(Offices);
