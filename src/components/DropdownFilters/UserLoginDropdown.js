import React from 'react';

import "./Dropdown.css";
import { connect } from 'react-redux';
import Select from 'react-styled-select';
import Row from 'react-bootstrap/Row';
import add from "../../images/icons/add.jpg";
import edit from "../../images/icons/edit.png";
import del from "../../images/icons/delete.jpg";

import { showUserForm, enumUserProfile, deleteUserLogin } from '../../actions/LoginActions';

class UserLoginDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "currentUserLogin": { "label": "All UserLogins", "value": "0" }
        };
        this.onChange = this.onChange.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);

    }

    onChange = (e) => {
        this.setState({ "currentUserLogin": e });

        if (e && e !== "0") {
            //this.props.listVotesByUserLogin(this.props.logintoken, this.props.currentCustomer.id, e);
        }
        if (e === "0") {
            //this.props.enumVotes(this.props.logintoken, this.props.currentCustomer.id);
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
            <Row>
                <Select
                    className="red-theme"
                    name="categoryFilter"
                    options={cats}
                    value={this.state.currentUserLogin}
                    onChange={this.onChange}
                /> 
                <button className="transparent" onClick={this.showAddModal}><img className="crudicons" src={add} height="20" alt=""  /> </button>
                <button className="transparent" onClick={this.showEditModal}><img className="crudicons" src={edit} height="20" alt=""  /> </button>
                <button className="transparent" onClick={this.showDeleteModal}><img className="crudicons" src={del} height="20" alt="" /></button>
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

export default connect(mapStateToProps, { showUserForm, enumUserProfile, deleteUserLogin })(UserLoginDropdown);
