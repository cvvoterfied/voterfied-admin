import React from 'react';

import "./Dropdown.css";
import { connect } from 'react-redux';
import Select from 'react-styled-select';

class UserLoginDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "currentUserLogin": { "label": "All UserLogins", "value": "0" }
        };
        this.onChange = this.onChange.bind(this);
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

    render() {
        var cats = [];
        cats.push({ "label": "All UserLogins", "value": "0" });

        if (this.props.userLogins) {
            for (var i = 0; i < this.props.userLogins.length; i++) {
                cats.push({ "label": this.props.userLogins[i].name, "value": this.props.userLogins[i].id });
            }
        }

        return (
            <Select
                className="red-theme"
                name="categoryFilter"
                options={cats}
                value={this.state.currentUserLogin}
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

export default connect(mapStateToProps, {  })(UserLoginDropdown);
