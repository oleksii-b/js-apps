// @flow

import React, {Component} from 'react';
import {Dropdown, MenuItem} from 'react-bootstrap';

import countries from 'countries.json';
import Input from './Input';


type Props = {
    name: string
};

type State = {
    isOpen: boolean
};

let allCountries = countries,
    target;

export default class CountrySelector extends Component<Props, State> {
    state = {
        isOpen: false
    }

    handleChange = (e: any) => {
        target = e.target;
        const val = e.target.value;

        if (val.length > 2) {
            this.setState({
                isOpen: true
            });

            allCountries = countries.filter((country) => {
                return country.name.search(new RegExp('(^|\\s)' + val, 'ig')) > -1;
            });
        } else {
            this.setState({
                isOpen: false
            });
        }
    }

    onToggle = (isOpen: boolean, e: any, data: {source: string}) => {
        if (data.source === 'rootClose' && e.srcElement.dataset.id !== 'countrySelector') {
            this.setState({
                isOpen: false
            });
        }
    }

    onSelect = (e: string) => {
        target.value = e;

        this.setState({
            isOpen: false
        });
    }

    render () {
        return (
            <Dropdown
                className='country-selector'
                componentClass='div' onToggle={(isOpen, e, data) => this.onToggle(isOpen, e, data)}
                open={this.state.isOpen}
                id='countrySelector'
            >
                <Dropdown.Toggle className='hidden' />

                <Input
                    {...this.props}
                    data-id='countrySelector'
                    onChange={this.handleChange}
                    autoComplete='off'
                />

                <Dropdown.Menu>
                    {
                        allCountries.map((country) => {
                            return (
                                <MenuItem
                                    key={country.code}
                                    eventKey={country.name}
                                    onSelect={(e) => this.onSelect(e)}
                                >
                                    {country.name}
                                </MenuItem>
                            );
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
