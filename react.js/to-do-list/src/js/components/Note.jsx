var React = require("react");

var Note = React.createClass({
    propTypes: {
        date: React.PropTypes.string.isRequired,
        index: React.PropTypes.number.isRequired,
        handleDelete: React.PropTypes.func.isRequired,
        handleEdit: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        this.value = this.props.children;

        return {
            isEdited: false
        }
    },

    render: function () {
        return (
            <tr>
                <td>
                    { this.props.date }
                </td>

                <td className="note-text">
                    <div className="note-text__inner" ref="noteText">
                        { this.props.children }
                    </div>
                    { this.renderTextarea() }
                </td>

                <td>
                    <span className="glyphicon glyphicon-edit text-success" onClick={ this.handleEdit } />
                    <span> &nbsp; </span>
                    <span className="glyphicon glyphicon-trash text-danger" onClick={ this.handleDelete } />
                </td>
            </tr>
        );
    },

    renderTextarea: function () {
        var listItemClassName;

        if (this.refs.noteText) {
            listItemClassName = this.refs.noteText.className;
        }

        if (this.state.isEdited) {
            if (this.refs.noteText && !/\b(hidden)\b/.test(listItemClassName)) {
                this.refs.noteText.className += " hidden";
            }

            return (
                <form>
                    <fieldset className="edit-note well">
                        <textarea
                            className="edit-note__input form-control"
                            defaultValue={ this.value }
                            ref="editNoteInput"
                            autoFocus />

                        <span className="btn btn-default btn-xs glyphicon glyphicon-ok" onClick={ this.handleSaveChanges } />
                        <span> </span>
                        <span className="btn btn-default btn-xs glyphicon glyphicon-remove" onClick={ this.handleCancelChanges } />
                    </fieldset>
                </form>
            );
        } else {
            if (this.refs.noteText) {
                this.refs.noteText.className = listItemClassName.replace(" hidden", "");
            }

            this.value = this.props.children;
        }
    },

    handleSaveChanges: function () {
        if (this.refs.noteText.innerHTML === this.refs.editNoteInput.value) {
            this.setState({
                isEdited: false
            });
        } else {
            if (confirm("Save this changes?")) {
                this.props.handleEdit(this.props.index, this.refs.editNoteInput.value);
                this.setState({
                    isEdited: false
                });
            } else {
                this.setState({
                    isEdited: true
                });
            }
        }
    },

    handleCancelChanges: function () {
        this.setState({
            isEdited: false
        });
    },

    handleDelete: function () {
        if (confirm("Delete this note?")) {
            this.props.handleDelete(this.props.index);
        }
    },

    handleEdit: function () {
        this.setState({
            isEdited: true
        });
    }
});

module.exports = Note;
