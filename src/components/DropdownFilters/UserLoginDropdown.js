﻿import React from 'react';

import "./Dropdown.css";
import { connect } from 'react-redux';
import Select from 'react-styled-select';
import Row from 'react-bootstrap/Row';
import add from "../../images/icons/add.jpg";
import edit from "../../images/icons/edit.png";
import del from "../../images/icons/delete.jpg";

import { showUserForm, enumUserProfile, deleteUserLogin } from '../../actions/LoginActions';
import { getVotes, enumVotes, listVotesByUser, listVotesByQuestion } from '../../actions/VoteActions';

class UserLoginDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "currentUserLogin": { "label": "All UserLogins", "value": "0" }
        };
        this.onChange = this.onChange.bind(this);
        this.showAddModal = this.showAddModal.bind(this);

        this.showEditModal = this.showEditModal.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);

    }

    onChange = (e) => {
        this.setState({ "currentUserLogin": e });

        if (e && e !== "0") {
            if (this.props.currentQuestion && this.props.currentQuestion.id !== 0){
                // The vote for one question and user
                this.props.getVotes(this.props.logintoken, this.props.currentCustomer.id, this.props.currentQuestion.id, e);
            }
            else {
                // All votes for this user
                this.props.listVotesByUser(this.props.logintoken, this.props.currentCustomer.id, e);
            }            
        }
        else if (e && e === "0") {
            if (this.props.currentQuestion && this.props.currentQuestion.id !== 0) {
                // This customer + question
                this.props.listVotesByQuestion(this.props.logintoken, this.props.currentCustomer.id, this.props.currentQuestion.id);
            }
            else {
                // All questions 
                this.props.enumVotes(this.props.logintoken, this.props.currentCustomer.id);
            }   
        }
    }

    showAddModal() {
        this.props.showUserForm(0);
    }

    showEditModal() {
        if (this.state.currentUserLogin && this.state.currentUserLogin !== "0" && this.state.currentUserLogin.value !== "0") {
            // edit
            this.props.showUserForm(this.state.currentUserLogin);
        }
        else {
            alert("No user selected");
        }
    }

    showDeleteModal() {
        if (this.state.currentUserLogin && this.state.currentUserLogin !== "0" && this.state.currentUserLogin.value !== "0") {
            // delete
            this.props.deleteUserLogin(this.props.logintoken, this.state.currentUserLogin);
            this.props.enumUserProfile(this.props.logintoken);
        }
        else {
            alert("No user selected");
        }
    } 

    render() {
        var cats = [];
        cats.push({ "label": "All UserLogins", "value": "0" });

        if (this.props.userLogins) {
            for (var i = 0; i < this.props.userLogins.length; i++) {
                cats.push({ "label": this.props.userLogins[i].name, "value": this.props.userLogins[i].id });
            }
        }

        return (
            <span>
                <Row>
                    <Select
                        className="red-theme"
                        name="categoryFilter"
                        options={cats}
                        value={this.state.currentUserLogin}
                        onChange={this.onChange}
                    /> 
                </Row>
                <Row className="centeredButtons">                    
                    <button className="transparent" onClick={this.showAddModal}><img className="crudicons" src={add} height="20" alt="" /> </button>
                    <button className="transparent" onClick={this.showEditModal}><img className="crudicons" src={edit} height="20" alt="" /> </button>
                    <button className="transparent" onClick={this.showDeleteModal}><img className="crudicons" src={del} height="20" alt="" /></button>                   
                </Row >
            </span>

        )

    }
}


function mapStateToProps(state) {
    return {
        logintoken: state.loginReducer.loginToken,
        currentCustomer: state.customerReducer.currentCustomer,
        currentQuestion: state.voteReducer.currentQuestion
    }
}

export default connect(mapStateToProps, { showUserForm, enumUserProfile, deleteUserLogin, getVotes, enumVotes, listVotesByUser, listVotesByQuestion  })(UserLoginDropdown);
