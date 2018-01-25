import React, {Component} from 'react';
import PropTypes from 'prop-types';

import DatePicker from './DatePicker';
import './App.css';


class App extends Component {
    constructor () {
        super();

        const date = new Date();

        this.state = {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            isDatepickerVisible: false
        };
    }

    static childContextTypes = {
        selectedDate: PropTypes.string
    }
  
    getChildContext() {
        const {day, month, year} = this.state;

        return {
            selectedDate: (new Date(year, month, day)).toDateString()
        };
    }

    setDate = (date) => {
        this.setState({
            day: date.day,
            month: date.month,
            year: date.year
        });
    }

    onToggleDatepicker = () => {
        this.setState({
            isDatepickerVisible: this.state.isDatepickerVisible ? false : true,
        });
    }

    render () {
        let {day, month} = this.state;

        day = day > 9 ? day : `0${day}`;
        month = month > 9 ? month + 1 : `0${month + 1}`;

        return (
            <div className='input-date'>
                <div className='input-date__group' onClick={this.onToggleDatepicker}>
                    <div className='input-date__field'>
                        {`${day}/${month}/${this.state.year}`}
                    </div>

                    <span className='input-date__icon'>&#128197;</span>
                </div>

                <DatePicker
                    isDatepickerVisible={this.state.isDatepickerVisible}
                    handleClick={this.onToggleDatepicker}
                    setDate={this.setDate} />
            </div>
        );
    }
}

export default App;
