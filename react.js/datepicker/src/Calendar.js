import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Week from './Week';
import './Calendar.css';


const calendarHeader = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
    <th key={i} className='calendar__head-cell'>{day}</th>
));

export default class Calendar extends Component {
    constructor(props) {
        super(props);
    }

    static contextTypes = {
        selectedDate: PropTypes.string.isRequired
    }

    render() {
        const {currentMonthDays, currentMonth, currentYear, handleClick} = this.props;

        return (
            <table className='calendar'>
                <thead className='calendar__head'>
                    <tr className='calendar__head-row'>
                        {calendarHeader}
                    </tr>
                </thead>

                <tbody>
                {
                    currentMonthDays.map((week, i) => (
                        <Week
                            key={i + currentMonth + currentYear}
                            selectedDate={this.context.selectedDate}
                            currentMonth={currentMonth}
                            currentYear={currentYear}
                            handleClick={handleClick}
                            week={week} />
                    ))
                }
                </tbody>
            </table>
        );
    }
}
