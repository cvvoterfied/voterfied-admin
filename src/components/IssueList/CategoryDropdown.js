import React from 'react';

import "./IssueList.css";
import { connect } from 'react-redux';
import { listQuestionsByCategory, listQuestions } from '../../actions/VoteActions';
import Select from 'react-styled-select';

class IssueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "currentCategory": { "label": "All Categories", "value": "0"}
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        this.setState({"currentCategory": e });

        if (e === "0") {
            this.props.listQuestions(this.props.logintoken);
        }
        else {
            this.props.listQuestionsByCategory(this.props.logintoken, e);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.logintoken && newProps.logintoken.length > 0 && this.props.allquestions && this.props.allquestions.length === 0) {
            this.props.listQuestions(this.props.logintoken);
        }
    }

    render() {
        var cats = [];
        cats.push({ "label": "All Categories", "value": "0" });

        for (var i = 0; i < this.props.categories.length; i++) {
            cats.push({ "label": this.props.categories[i].name, "value": this.props.categories[i].id });
        }

        return (
            <Select   
                className="red-theme"
                name="categoryFilter"
                options={cats}
                value={this.state.currentCategory}
                onChange={this.onChange}
            /> 
            )
        
    }
}


function mapStateToProps(state) {
    return {
        logintoken: state.loginReducer.loginToken,        
        categories: state.voteReducer.categories,
        allquestions: state.voteReducer.allquestions
    }
}

export default connect(mapStateToProps, {listQuestionsByCategory, listQuestions })(IssueList);
