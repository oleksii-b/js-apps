// @flow

import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem} from 'react-bootstrap';


type State = {
    activeIndex: number,
    activeTitle: string    
};

let reasons = ['Former Record', 'Duplicate Record', 'Record never Existed', 'Other'];

export default class RemovalReason extends Component<{}, State> {
    state = {
        activeIndex: 0,
        activeTitle: reasons[0]
    }

    onSelect = (item: string, i: number) => {
        this.setState({
            activeIndex: i,
            activeTitle: item
        });
    }

    render () {
        return (
            <form className='removal-reason'>
                <div className='removal-reason__title'>
                    Please tell us why you're removing this record.
                </div>

                <div className='form-group'>
                    <DropdownButton
                        id='removalReason'
                        className='form-control removal-reason-input'
                        title={this.state.activeTitle}
                    >
                        {
                            reasons.map((item, i) => {
                                return (
                                    <MenuItem
                                        key={i}
                                        eventKey={i}
                                        active={this.state.activeIndex === i}
                                        onSelect={this.onSelect.bind(null, item, i)}
                                    >
                                        {item}
                                    </MenuItem>
                                );
                            })
                        }
                    </DropdownButton>
                </div>

                <FormGroup>
                    <ControlLabel>Notes:</ControlLabel>

                    <FormControl
                        componentClass='textarea'
                        rows={3}
                    />
                </FormGroup>
            </form>
        );
    }
}
