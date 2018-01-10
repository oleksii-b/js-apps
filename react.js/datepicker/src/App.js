import React, {Component} from 'react';
import Datepicker from './Datepicker';
import './App.css';

class App extends Component {
    constructor (props) {
        super(props);

        const date = new Date();

        this.state = {
            isDatepickerVisible: false,
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
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
        let day = this.state.day > 9 ? this.state.day : `0${this.state.day}`,
            month = this.state.month > 9 ? this.state.month + 1 : `0${this.state.month + 1}`;

        return (
            <div className='input-date'>
                <div className='input-date__group' onClick={this.onToggleDatepicker}>
                    <div className='input-date__field'>
                        {`${day}/${month}/${this.state.year}`}
                    </div>

                    <span className='input-date__icon'>&#128197;</span>
                </div>

                <Datepicker
                    selectedDate={(new Date(this.state.year, this.state.month, this.state.day)).toDateString()}
                    isDatepickerVisible={this.state.isDatepickerVisible}
                    handleClick={this.onToggleDatepicker}
                    setDate={this.setDate} />
            </div>
        );
    }
}

export default App;
