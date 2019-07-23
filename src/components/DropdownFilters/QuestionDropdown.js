import React from 'react';

import "./Dropdown.css";
import { connect } from 'react-redux';
import Select from 'react-styled-select';
import Row from 'react-bootstrap/Row';
import { listVotesByQuestion, enumVotes, showQuestionModal, deleteQuestion } from '../../actions/VoteActions';

import add from "../../images/icons/add.jpg";
import edit from "../../images/icons/edit.png";
import del from "../../images/icons/delete.jpg";

class QuestionDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "currentQuestion": { "label": "All Questions", "value": "0" }
        };
        this.onChange = this.onChange.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
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

    showAddModal() {
        this.props.showQuestionModal({});
    }

    showEditModal() {
        if (this.state.currentQuestion && this.state.currentQuestion !== "0" && this.state.currentQuestion.value !== "0") {
            this.props.showQuestionModal(this.state.currentQuestion);
        }
        else {
            alert("No question selected");
        }
    }

    showDeleteModal() {
        if (this.state.currentQuestion && this.state.currentQuestion !== "0" && this.state.currentQuestion.value !== "0") {
            this.props.deleteQuestion(this.state.logintoken, this.state.currentQuestion.id);
        }
        else {
            alert("No question selected");
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
            <Row>
                <Select
                    className="red-theme"
                    name="categoryFilter"
                    options={cats}
                    value={this.state.currentQuestion}
                    onChange={this.onChange}
                /> 
                <button className="transparent" onClick={this.showAddModal}><img className="crudicons" src={add} height="20" alt="" /> </button>
                <button className="transparent" onClick={this.showEditModal}><img className="crudicons" src={edit} height="20" alt="" /> </button>
                <button className="transparent" onClick={this.showDeleteModal}><img className="crudicons" src={del} height="20" alt=""/></button>
            </Row>
        )

    }
}


function mapStateToProps(state) {
    return {
        logintoken: state.loginReducer.loginToken,
        currentCustomer: state.customerReducer.currentCustomer
    }
}

export default connect(mapStateToProps, { listVotesByQuestion, enumVotes, showQuestionModal, deleteQuestion })(QuestionDropdown);
