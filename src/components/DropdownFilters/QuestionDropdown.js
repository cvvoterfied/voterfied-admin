import React from 'react';

import "./Dropdown.css";
import { connect } from 'react-redux';
import Select from 'react-styled-select';
import { listVotesByQuestion, enumVotes } from '../../actions/VoteActions';

class QuestionDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "currentQuestion": { "label": "All Questions", "value": "0" }
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({ "currentQuestion": e });

        if (e && e !== "0") {
            this.props.listVotesByQuestion(this.props.logintoken, this.props.currentCustomer.id, e);
        }
        if (e === "0") {
            this.props.enumVotes(this.props.logintoken, this.props.currentCustomer.id);
        }
    }

    render() {
        var cats = [];
        cats.push({ "label": "All Questions", "value": "0" });

        if (this.props.questions) {
            for (var i = 0; i < this.props.questions.length; i++) {
                cats.push({ "label": this.props.questions[i].name, "value": this.props.questions[i].id });
            }
        }

        return (
            <Select
                className="red-theme"
                name="categoryFilter"
                options={cats}
                value={this.state.currentQuestion}
                onChange={this.onChange}
            />
        )

    }
}


function mapStateToProps(state) {
    return {
        logintoken: state.loginReducer.loginToken,
        currentCustomer: state.customerReducer.currentCustomer
    }
}

export default connect(mapStateToProps, { listVotesByQuestion, enumVotes })(QuestionDropdown);
