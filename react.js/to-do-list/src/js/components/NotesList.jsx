var React = require("react"),
    AddNote = require("./AddNote.jsx"),
    Note = require("./Note.jsx");

var NotesList = React.createClass({
    getInitialState: function () {
        return {
            list: []
        }
    },

    componentDidMount: function() {
        var localList = JSON.parse(localStorage.getItem("list"));

        if (localList) {
            this.setState({
                list: localList
            });
        }
    },

    componentDidUpdate: function() {
        localStorage.setItem("list", JSON.stringify(this.state.list));
    },

    render: function () {
        var i = 0,
            list = this.state.list.sort(function (prev, next) {
                if (prev.date.year === next.date.year) {
                    if (prev.date.month === next.date.month) {
                        return prev.date.day - next.date.day;
                    } else {
                        return prev.date.month - next.date.month;
                    }
                } else {
                    return prev.date.year - next.date.year;
                }
            }),
            that = this,
            tbody = [];

        while (i < this.state.list.length) {
            (function (i) {
                tbody.push(
                    <Note
                        key={ list[i].id + "-" + list[i].idPostfix }
                        date={ list[i].date.day + "/" + list[i].date.month + "/" + list[i].date.year }
                        index={ i }
                        handleDelete={ that.handleDelete }
                        handleEdit={ that.handleEdit }>
                            { list[i].text }
                    </Note>
                );
            })(i);

            i += 1;
        }

        return (
            <div className="add-note">
                <AddNote handleAdd={ this.handleAdd } />
                <table className="notes-list table">
                    <thead>
                        <tr>
                            <th className="note-date-legend">
                                Date
                            </th>
                            <th className="note-text-legend">
                                Note
                            </th>
                            <th className="note-options-legend">
                                &nbsp;
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tbody.length ? (
                                tbody
                            ) : (
                                <tr>
                                    <td className="empty-list" colSpan="3">
                                        <i>No items here</i>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    },

    handleAdd: function (noteText, noteDate) {
        var list = this.state.list,
            noteId = (new Date()).getTime(),
            noteIdPostfix;

        if (noteText) {
            if (list.length && list[list.length - 1].id === noteId) {
                noteIdPostfix = +list[list.length - 1].idPostfix + 1;
            } else {
                noteIdPostfix = 0;
            }

            list.push({
                date: noteDate,
                id: noteId,
                idPostfix: noteIdPostfix,
                text: noteText
            });
            this.setState({
                list: list.sort(function (prev, next) {
                    if (prev.date.year === next.date.year) {
                        if (prev.date.month === next.date.month) {
                            return prev.date.day - next.date.day;
                        } else {
                            return prev.date.month - next.date.month;
                        }
                    } else {
                        return prev.date.year - next.date.year;
                    }
                })
            });
        }
    },

    handleDelete: function (index) {
        var list = this.state.list;

        list.splice(index, 1);
        this.setState({
            list: list
        });
    },

    handleEdit: function (index, value) {
        var list;

        if (value) {
            list = this.state.list;
            list[index].text = value;
            this.setState({
                list: list
            });
        }
    }
});

module.exports = NotesList;
