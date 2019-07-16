import React from 'react';
import { connect } from 'react-redux';

import VoteAnswerRow from './VoteAnswerRow';

class VoteAnswerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        
    }


    render() {

        //var maxRank = Math.max.apply(Math, this.props.answers.map(function (a) { return a.currentRank; }));
        //if (!maxRank) {
        //    maxRank = 1;
        //}
        return (
            this.props.answers.map(
                (j) =>
                    <VoteAnswerRow
                        logintoken={this.props.logintoken}
                        question={this.props.question}
                        name={j.name}
                        id={j.id}
                        percentage={j.percentage}
                        votecount={j.votecount}
                        isRankedVote={this.props.isRankedVote}
                        currentRank={j.currentRank}
                        metaData={j.metaData}
                        currentVote={this.props.currentVote}
                    />
            )

        )
    }
}

function mapStateToProps(state) {
    return {
        logintoken: state.loginReducer.loginToken,       
        user: state.loginReducer.user
    }
}

export default connect(mapStateToProps, {})(VoteAnswerForm);

