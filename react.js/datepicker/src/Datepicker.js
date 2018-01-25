import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Calendar from './Calendar';
import './DatePicker.css';


const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export default class Datepicker extends Component {
    constructor (props) {
        super(props);

        const date = new Date();

        this.state = {
            currentMonth: date.getMonth(),
            currentYear: date.getFullYear()
        };
    }

    static propTypes = {
        setDate: PropTypes.func.isRequired,
        handleClick: PropTypes.func.isRequired,
        isDatepickerVisible: PropTypes.bool.isRequired
    }

    get currentMonth () {
        const {currentYear, currentMonth} = this.state;
        const date = new Date();

        let currentDate = date.getDate(),
            currentDay,
            day = 0,
            i = 0,
            lastDate = (new Date(currentYear, currentMonth + 1, 0)).getDate(),
            month = [],
            week = [];

        // Last Month's Days
        if (new Date(currentYear, currentMonth, 1).getDay() > 0) {
            do {
                currentDay = (new Date(currentYear, currentMonth, i)).getDay();
                week[currentDay] = {
                    date: (new Date(currentYear, currentMonth, i)).getDate(),
                    month: currentMonth - 1
                };

                i--;
            } while (currentDay > 0);

            i = 0;
        }

        for (i = 1; i <= lastDate; i++) {
            day = (new Date(currentYear, currentMonth, i)).getDay();
            week[day] = {
                date: i,
                month: currentMonth
            };

            if (day === 6) {
                month.push(week);
                week = [];
            }

            if (day < 6 && i === lastDate) {
                i = 0;
                currentDay = ++day;

                while (currentDay <= 6) {
                    week[currentDay] = {
                        date: ++i,
                        month: currentMonth + 1
                   };

                    ++currentDay;
                }

                month.push(week);
                break;
            }
        }

        return month;
    }

    onSetDate = (date) => {
        this.props.handleClick();

        this.props.setDate({
            day: date,
            month: this.state.currentMonth,
            year: this.state.currentYear
        });
    }

    onPrevMonth = (e) => {
        e.preventDefault();

        if (this.state.currentMonth === 0) {
            this.setState({
                currentMonth: 11,
                currentYear: this.state.currentYear - 1
            });
        } else {
            this.setState({
                currentMonth: this.state.currentMonth - 1
           });
        }
    }

    onNextMonth = (e) => {
        e.preventDefault();

        if (this.state.currentMonth === 11) {
            this.setState({
                currentMonth: 0,
                currentYear: this.state.currentYear + 1
            });
        } else {
            this.setState({
                currentMonth: this.state.currentMonth + 1
            });
        }
    }

    render () {
        let self = this,
            {currentMonth, currentYear} = this.state,
            datepickerClass = 'datepicker' + (this.props.isDatepickerVisible ? '' : ' datepicker--hidden');

        return (
            <div className={datepickerClass}>
                <div className='datepicker__container'>
                    <div className='datepicker__header'>
                        <button className='datepicker__control datepicker__control--prev' onClick={this.onPrevMonth}>
                            &lt;
                        </button>

                        <b>{months[currentMonth]}, {currentYear}</b>

                        <button className='datepicker__control datepicker__control--next' onClick={this.onNextMonth}>
                            &gt;
                        </button>
                    </div>

                    <Calendar {...{
                        currentMonthDays: this.currentMonth,
                        handleClick: this.onSetDate,
                        currentMonth,
                        currentYear
                    }} />
                </div>
            </div>
        );
    }
}
