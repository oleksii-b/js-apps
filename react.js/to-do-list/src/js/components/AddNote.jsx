var React = require("react"),
    Datepicker = require("./Datepicker.jsx");

var AddNote = React.createClass({
    propTypes: {
        handleAdd: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        var date = new Date();

        return {
            day: date.getDate() > 9 ? date.getDate() : "0" + date.getDate(),
            isCalendarVisible: false,
            month: date.getMonth() + 1,
            validationMessage: "",
            year: date.getFullYear()
        }
    },

    handleChange: function (e) {
        this.setState({
            validationMessage: ""
        });
    },

    handleSubmit: function (e) {
        e.preventDefault();
        
        var that = this;

        if (this.refs.listItemTextInput.value) {
            this.props.handleAdd(
                this.refs.listItemTextInput.value, {
                    day: that.state.day,
                    month: that.state.month,
                    year: that.state.year
                }
            );
            this.refs.listItemTextInput.value = "";
        } else {
            this.setState({
                validationMessage: "The field can not be empty!"
            }); 
        }
    },

    handleToggleCalendar: function () {
        var that = this;

        this.setState({
            isCalendarVisible: that.state.isCalendarVisible ? false : true,
        });
    },

    setDate: function (date) {
        this.setState({
            day: date.day,
            month: date.month,
            year: date.year
        });
        this.refs.date.innerHTML = date.day + "/" + date.month + "/" + date.year;
    },

    render: function () {
        return (
            <form className="add-note__form" onSubmit={ this.handleSubmit }>
                <fieldset className="add-note__fieldset well">
                    <legend className="add-note__legend">Add new note:</legend>
                    <br />
                    <div className="add-note__datepicker" onClick={ this.handleToggleCalendar }>
                        <div className="input-group">
                            <div className="add-note__date form-control" ref="date">
                                { this.state.day + "/" + this.state.month + "/" + this.state.year }
                            </div>
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-calendar"></span>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.isCalendarVisible ? (
                            <Datepicker setDate={ this.setDate } toggleCalendar={ this.handleToggleCalendar } />
                        ) : null
                    }
                    <textarea
                        className="add-note__input form-control"
                        onChange={ this.handleChange }
                        ref="listItemTextInput"
                        rows={ 3 } />
                    {
                        this.state.validationMessage ? (
                            <span className="error-message text-danger">{ this.state.validationMessage }</span>
                        ) : null
                    }
                    <input className="add-note__btn btn btn-primary btn-sm" type="submit" value="Add" />
                </fieldset>
            </form>
        );
    }
});

module.exports = AddNote;
