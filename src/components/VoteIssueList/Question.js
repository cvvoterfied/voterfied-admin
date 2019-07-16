import React from 'react';
import VoteAnswerForm from '../VoteAnswerForm';

import "./VoteIssueList.css";
import { connect } from 'react-redux';


export class Votes extends React.Component {
    render() {
        return (
            this.props.votes.map(
                (v) =>
                    <tr>
                    <div className="votes">
                            <td><div className="question">{v.question}</div></td>
                            <td><div className="answer">{v.answer}</div></td>
                        </div>
                        </tr>
            )
            )
    }
}

export class Questions extends React.Component {

    render() {
        return (
            this.props.questions.map(
                (d) =>
                    <div className="vote">
                        <div className="question">{d.name}</div>
                        <div className="description">{d.description}</div>
                        <div className="metadata">{d.metaData}</div>
                        <VoteAnswerForm isVerified={this.props.isVerified} question={d.id} answers={d.answers} />
                        
                    </div>
            )

        );
    }
}


function mapStateToProps(state) {
    return {
        logintoken: state.loginReducer.loginToken,
        votes: state.voteReducer.votes,
        stats: state.voteReducer.stats,
        questions: state.voteReducer.questions,
        isloggedin: state.loginReducer.isLoggedIn
    }
}

export default connect(mapStateToProps, {  })(Questions);
