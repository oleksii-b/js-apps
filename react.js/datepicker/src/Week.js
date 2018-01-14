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
        const getDateClass = (date) => {
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
            <tr>
            {
                this.props.week.map((dateInfo, i) => {
                    let isMonthCurrent = dateInfo.month === this.props.currentMonth,
                        dateClass = isMonthCurrent ? getDateClass(dateInfo.date) : 'datepicker-date',
                        handleClick = isMonthCurrent ? this.props.handleClick.bind(null, dateInfo.date) : null;

                    return (
                        <td key={`${dateInfo.date}${dateInfo.month}`} className={dateClass} onClick={handleClick}>
                            {dateInfo.date}
                        </td>
                    );
                })
            }
            </tr>
        )
    }
}

export default Week;
