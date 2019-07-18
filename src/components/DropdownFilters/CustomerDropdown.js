import React from 'react';

import "./Dropdown.css";
import { connect } from 'react-redux';
import Select from 'react-styled-select';
import { enumQuestions, enumVotes } from '../../actions/VoteActions';
import { enumUserProfile } from '../../actions/LoginActions';
import { getCustomer } from '../../actions/CustomerActions';

class CustomerDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "currentCustomer": { "label": "All Customers", "value": "0" }
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({ "currentCustomer": e });

        if (e && e > 0) {
            this.props.enumQuestions(this.props.logintoken, e);
            this.props.enumUserProfile(this.props.logintoken);
            this.props.enumVotes(this.props.logintoken, e);
            this.props.getCustomer(e);
        }
    }

    render() {
        var cats = [];
        cats.push({ "label": "All Customers", "value": "0" });

        for (var i = 0; i < this.props.customers.length; i++) {
            cats.push({ "label": this.props.customers[i].name, "value": this.props.customers[i].id });
        }

        return (
            <Select
                className="red-theme"
                name="categoryFilter"
                options={cats}
                value={this.state.currentCustomer}
                onChange={this.onChange}
            />
        )

    }
}


function mapStateToProps(state) {
    return {
        logintoken: state.loginReducer.loginToken,
        customers: state.customerReducer.customerList
    }
}

export default connect(mapStateToProps, { getCustomer, enumQuestions, enumUserProfile, enumVotes })(CustomerDropdown);
