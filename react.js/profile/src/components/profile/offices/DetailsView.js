// @flow

import React, {Component, Fragment} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import DetailsSection from './DetailsSection';


type Props = {
    officeData: {
        [string]: string,
        type?: boolean
    },
    onCloseDialog: () => void,
    onEdit: () => void
};

export default function DetailsView(props: Props) {
    return (
        <Fragment>
            {
                typeof props.officeData === 'string' ? (
                    <div className='no-offices'>
                        {props.officeData}
                    </div>
                ) : (
                    <Grid fluid={true} className='office-info'>
                        <Row className='office-info__container'>
                            <Col sm={6} lg={4}>
                                <DetailsSection name='Address'>
                                    {
                                        props.officeData.type &&
                                        <div>
                                            <i className="glyphicon glyphicon-ok"></i>&nbsp;
                                            Primary HQ
                                        </div>
                                    }
                                    {props.officeData.address}<br />
                                    {props.officeData.city}, {props.officeData.region} {props.officeData.zip}<br />
                                    {props.officeData.country}<br />
                                </DetailsSection>
                            </Col>

                            <Col sm={6} lg={4}>
                                {
                                    props.officeData.phone &&
                                    <DetailsSection name='Phone'>
                                        {props.officeData.phone}
                                    </DetailsSection>
                                }

                                {
                                    props.officeData.fax &&
                                    <DetailsSection name='Fax'>
                                        {props.officeData.fax}
                                    </DetailsSection>
                                }

                                {
                                    props.officeData.email &&
                                    <DetailsSection name='Email'>
                                        {props.officeData.email}
                                    </DetailsSection>
                                }
                            </Col>

                            <Col lg={4} className='office-info__options'>
                                <div className='btn-group-profile'>
                                    <div className='btn-group-profile__item'>
                                        <button
                                            className='btn-profile btn-profile--sm btn-profile--remove'
                                            onClick={props.onCloseDialog}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <div className='btn-group-profile__item'>
                                        <button
                                            className='btn-profile btn-profile--sm btn-profile--primary'
                                            onClick={props.onEdit}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                )
            }
        </Fragment>
    );
}
