import React from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { castVote } from '../../actions/VoteActions';

class VoteAnswerRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "currentRank": this.props.currentRank,
            "comment": ""
        };
        this.onChange = this.onChange.bind(this);
        this.onClickAnswer = this.onClickAnswer.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.currentRank) {
            this.setState({ "currentRank": newProps.currentRank });
        }
    }

    onClickAnswer(e) {
        var rank = this.state.currentRank;
        if (!rank) {
            rank = 1;
        }
        else {
            rank = rank + 1;
        }        
        this.vote(rank);
    }

    onChange = (e) => {        
        this.setState({ currentRank: e.target.value });
        this.vote(e.target.value);        
    }

    vote(rank) {
        if (!this.props.isRankedVote) {
            rank = 1;            
        }
        
        this.props.castVote(this.props.logintoken,
            this.props.question,
            this.props.id,
            1, // user ID is assigned automatically
            this.state.comment,
            rank 
        ); 

        this.setState({ currentRank: rank });
    }

    render() {
        return (   
            <div className="answers">            
                <Form.Control className={this.props.currentVote === this.props.name ? "currentanswer" : "answer"} type="button" value={this.props.name} onClick={this.onClickAnswer}></Form.Control>
                     <div className={this.props.isRankedVote ? "metadata" : "hidden"}>
                            <Form.Control className="rankBox" type='text' id='currentRank' onChange={this.onChange} value={this.state.currentRank} defaultValue={this.props.currentRank}  />
                    </div>
            </div> 
        );
    }
}

function mapStateToProps(state) {
    return {
        logintoken: state.loginReducer.loginToken,       
        user: state.loginReducer.user
    }
}

export default connect(mapStateToProps, { castVote})(VoteAnswerRow);

