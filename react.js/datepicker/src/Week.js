import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Week.css';

class Week extends Component {
    static propTypes = {
        selectedDate: PropTypes.string.isRequired,
        currentMonth: PropTypes.number.isRequired,
        currentYear: PropTypes.number.isRequired,
        handleClick: PropTypes.func.isRequired,
        week: PropTypes.array.isRequired
    }

    render () {
        const currentDate = (new Date()).toDateString();

        let dateId = 0,
            weekId = 0,
            getDateClass = (date) => {
                let dateString = (new Date(this.props.currentYear, this.props.currentMonth, date)).toDateString();

                if (dateString === this.props.selectedDate) {
                    return 'datepicker-date datepicker-date--selected-day';
                } else if (dateString === currentDate) {
                    return 'datepicker-date datepicker-date--current-day';
                } else {
                    return 'datepicker-date datepicker-date--current-month';
                }
            };

        return (
            <tr key={weekId++}>
            {
                this.props.week.map(dateInfo => (
                    dateInfo.month === this.props.currentMonth ? (
                        <td key={dateId++} className={getDateClass(dateInfo.date)} onClick={this.props.handleClick.bind(null, dateInfo.date)}>
                            {dateInfo.date}
                        </td>
                    ) : (
                        <td key={dateId++} className='datepicker-date'>
                            {dateInfo.date}
                        </td>
                    )
                ))
            }
            </tr>
        )
    }
}

export default Week;
