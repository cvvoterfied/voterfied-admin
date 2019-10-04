import React from 'react';

import "./Dropdown.css";
import { connect } from 'react-redux';
import Select from 'react-styled-select';
import Row from 'react-bootstrap/Row';
import { enumQuestions, enumVotes, clearVotes } from '../../actions/VoteActions';
import { enumUserProfile } from '../../actions/LoginActions';
import { getCustomer, showCustomerForm, clearCustomer, deleteCustomer, getConfig  } from '../../actions/CustomerActions';

import add from  "../../images/icons/add.jpg";
import edit from "../../images/icons/edit.png";
import del from "../../images/icons/delete.jpg";
import { emptyCustomer } from '../../constants/ActionConstants';


class CustomerDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "currentCustomer": { "label": "All Customers", "value": "0" }
        };
        this.onChange = this.onChange.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);

    }

    componentDidMount() {
        this.setState({ "currentCustomer": { "label": this.props.currentCustomer.name, "value": this.props.currentCustomer.id } });
    }

    onChange = (e) => {
        this.setState({ "currentCustomer": e });

        if (e && e > 0) {
            this.props.enumQuestions(this.props.logintoken, e);
            this.props.enumUserProfile(this.props.logintoken);
            this.props.enumVotes(this.props.logintoken, e);
            this.props.getConfig(this.props.logintoken, e);
            this.props.getCustomer(e);
        }
        else {
            this.props.clearVotes();
            this.props.clearCustomer();
        }
    }

    showAddModal() {
        this.props.showCustomerForm(emptyCustomer.id);
    }

    showEditModal() {
        if (this.state.currentCustomer && this.state.currentCustomer !== "0" && this.state.currentCustomer.value !== "0") {
            // edit
            this.props.showCustomerForm(this.state.currentCustomer);
        }
        else {
            alert("No customer selected");
        }
    }

    showDeleteModal() {
        if (this.state.currentCustomer && this.state.currentCustomer !== "0" && this.state.currentCustomer.value !== "0") {
            // delete
            this.props.deleteCustomer(this.props.logintoken, this.props.currentCustomer.id);
        }
        else {
            alert("No customer selected");
        }
    } 

    render() {
        var cats = [];
        cats.push({ "label": "All Customers", "value": "0" });

        if (this.props.customers) {
            for (var i = 0; i < this.props.customers.length; i++) {
                cats.push({ "label": this.props.customers[i].name, "value": this.props.customers[i].id });
            }
        }

        return (
            <span>
                <Row>
                    <Select
                        className="red-theme"
                        name="categoryFilter"
                        options={cats}
                        value={this.props.currentCustomer.id}
                        onChange={this.onChange}
                    />
                </Row>
                <Row className="centeredButtons">                    
                    <button className="transparent" onClick={this.showAddModal}><img className="crudicons" src={add} height="20" alt="" /> </button>
                    <button className="transparent" onClick={this.showEditModal}><img className="crudicons" src={edit} height="20" alt=""  /> </button>
                    <button className="transparent" onClick={this.showDeleteModal}><img className="crudicons" src={del} height="20" alt=""/></button>
                </Row>
            </span>
        )

    }
}


function mapStateToProps(state) {
    return {
        logintoken: state.loginReducer.loginToken,
        currentCustomer: state.customerReducer.currentCustomer,
        customers: state.customerReducer.customerList
    }
}

export default connect(mapStateToProps, { getCustomer, enumQuestions, enumUserProfile, enumVotes, clearCustomer, showCustomerForm, deleteCustomer, clearVotes, getConfig })(CustomerDropdown);
