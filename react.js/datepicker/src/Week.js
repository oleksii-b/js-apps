import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Week.css';


Week.propTypes = {
    selectedDate: PropTypes.string.isRequired,
    currentMonth: PropTypes.number.isRequired,
    currentYear: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
    week: PropTypes.array.isRequired
};

export default function Week({selectedDate, currentMonth, currentYear, handleClick, week}) {
    const currentDate = (new Date()).toDateString();
    const getDateClass = (date) => {
        let dateString = (new Date(currentYear, currentMonth, date)).toDateString();

        if (dateString === selectedDate) {
            return 'datepicker-date datepicker-date--selected-day';
        } else if (dateString === currentDate) {
            return 'datepicker-date datepicker-date--current-day';
        } else {
            return 'datepicker-date datepicker-date--current-month';
        }
    };

    return (
        <tr>
        {
            week.map((dateInfo, i) => {
                let isMonthCurrent = dateInfo.month === currentMonth,
                    dateClass = isMonthCurrent ? getDateClass(dateInfo.date) : 'datepicker-date',
                    onSetDate = isMonthCurrent ? handleClick.bind(null, dateInfo.date) : null;

                return (
                    <td key={`${dateInfo.date}${dateInfo.month}`} className={dateClass} onClick={onSetDate}>
                        {dateInfo.date}
                    </td>
                );
            })
        }
        </tr>
    );
};
