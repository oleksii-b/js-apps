var React = require("react"),
    monthsList = require("json!../months-list.json");

var Calendar = React.createClass({
    propTypes: {
        setDate: React.PropTypes.func.isRequired,
        toggleCalendar: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            currentMonth: (new Date()).getMonth(),
            currentYear: (new Date()).getFullYear(),
            list: [],
            selectedDate: new Date().getDate()
        }
    },

    getCurrentMonth: function() {
        var date = new Date(),
            currentDate = date.getDate(),
            currentDay,
            currentMonth,
            day = 0,
            i = 0,
            lasthDate = 28,
            month = [],
            that = this,
            week = [];

        // Get Last Date
        do {
            currentMonth = (new Date(this.state.currentYear, this.state.currentMonth, ++lasthDate)).getMonth();
        } while (currentMonth === this.state.currentMonth);

        lasthDate--;

        // Last Month's Days
        if (new Date(this.state.currentYear, this.state.currentMonth, 1).getDay() > 0) {
            do {
                currentDay = (new Date(this.state.currentYear, this.state.currentMonth, i)).getDay();
                week[currentDay] = {
                    date: (new Date(that.state.currentYear, that.state.currentMonth, i)).getDate(),
                    month: that.state.currentMonth - 1
                };

                i--;            
            } while (currentDay > 0);

            i = 0;
        }

        for (i = 1; i <= lasthDate; i++) {
            day = (new Date(this.state.currentYear, this.state.currentMonth, i)).getDay();
            week[day] = {
                date: i,
                month: that.state.currentMonth
            };

            if (day === 6) {
                month.push(week);
                week = [];
            }

            if (day < 6 && i === lasthDate) {
                i = 0;
                currentDay = ++day;

                while (currentDay <= 6) {
                    week[currentDay] = {
                        date: ++i,
                        month: that.state.currentMonth + 1
                    };

                    ++currentDay;
                }

                month.push(week);
                break;
            }
        }

        return month;
    },

    componentDidMount: function() {
        var localList = JSON.parse(localStorage.getItem("list"));

        if (localList) {
            this.setState({
                list: localList
            });
        }
    },

    componentDidUpdate: function () {
        localStorage.setItem("list", JSON.stringify(this.state.list));
    },

    handleGetDate: function (date) {
        var that = this;

        this.props.setDate({
            day: date > 9 ? date : "0" + date,
            month: that.state.currentMonth >= 9 ? that.state.currentMonth + 1 : "0" + (that.state.currentMonth + 1),
            year: that.state.currentYear
        });
        this.props.toggleCalendar();
        this.setState({
            selectedDate: date
        });
    },

    handlePreviousMonth: function (e) {
        e.preventDefault();

        var that = this;

        if (this.state.currentMonth === 0) {
            this.setState({
                currentMonth: 11,
                currentYear: that.state.currentYear - 1
            });     
        } else {
            this.setState({
                currentMonth: that.state.currentMonth - 1
            });
        }
    },

    handleNextMonth: function (e) {
        e.preventDefault();

        var that = this;

        if (this.state.currentMonth === 11) {
            this.setState({
                currentMonth: 0,
                currentYear: that.state.currentYear + 1
            });     
        } else {
            this.setState({
                currentMonth: that.state.currentMonth + 1
            });
        }
    },

    render: function () {
        var dayId = 0,
            currentDate = (new Date()).toDateString(),
            currentDateClassName = "calendar__date calendar__date--current-date",
            currentMonthClassName = "calendar__date calendar__date--current-month",
            isCurrentDate = function (date) {
                return currentDate === (new Date(that.state.currentYear, that.state.currentMonth, date)).toDateString();
            },
            month = this.getCurrentMonth(),
            that = this,
            weekId = 1;

        return (
            <div className="calendar-wrapper">
                <div className="calendar popover bottom">
                    <div className="arrow" />
                    <div className="calendar__header">
                        <a
                            className="calendar__control glyphicon glyphicon-chevron-left pull-left"
                            href="#previous-month"
                            onClick={ this.handlePreviousMonth } />
                        <b>{ monthsList.monthsNames[this.state.currentMonth] }, { this.state.currentYear }</b>
                        <a
                            className="calendar__control glyphicon glyphicon-chevron-right pull-right"
                            href="#next-month"
                            onClick={ this.handleNextMonth } />
                    </div>
                    <table>
                        <thead className="calendar__weekdays">
                            <tr>
                                <th>Sun</th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                month.map(function (week) {
                                    return (
                                        <tr key={ weekId++ }>
                                            {
                                                week.map(function (day) {
                                                    return (
                                                        day.month === that.state.currentMonth ? (
                                                            <td
                                                                className={ isCurrentDate(day.date) ? currentDateClassName : currentMonthClassName }
                                                                key={ dayId++ }
                                                                onClick={ that.handleGetDate.bind(null, day.date) }>
                                                                    { day.date }
                                                            </td>
                                                        ) : (
                                                            <td
                                                                className="calendar__date"
                                                                key={ dayId++ }>
                                                                    { day.date }
                                                            </td>
                                                        )
                                                    );
                                                })
                                            }
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

module.exports = Calendar;
