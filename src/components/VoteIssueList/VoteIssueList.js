import React from 'react';
import Button from 'react-bootstrap/Button';
import "./VoteIssueList.css";
import { connect } from 'react-redux';
import { startLogin } from '../../actions/LoginActions';
import { listCategories, getFeaturedCategories, goVote } from '../../actions/VoteActions';

class VoteIssueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
        this.onClickVote = this.onClickVote.bind(this);
    }

    onClickVote(id) {
        if (this.props.isVerified) {

            // Refresh the question list for this category
            this.props.getFeaturedCategories(this.props.logintoken, id);

            // Show the vote screen
            this.props.goVote(this.props.currentQuestion);
        }
        else {
            this.props.startLogin();
        }
    }

    getLoginText() {
        return (this.props.isVerified ? "Vote" : "Login");
    }

    render() {
        while (this.props.categories.length < 4)
            this.props.categories.push({ iconURL: "", name: "", id: 0 });

        return (
            this.props.categories.slice(0,4).map(
                (d) =>
                    <div className="vote">                        
                        <div>
                            <img src={d.iconURL} height="70" width="70" alt="" />
                            <div className="mediumtext iconTitle">{d.name}</div>
                            <Button variant="danger" className="voteButton" onClick={() => this.onClickVote(d.id)} >{this.getLoginText()}</Button>
                        </div>                        
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
        categories: state.voteReducer.categories,
        questions: state.voteReducer.questions,
        isloggedin: state.loginReducer.isLoggedIn,
        currentQuestion: state.voteReducer.currentQuestion
    }
}

export default connect(mapStateToProps, { listCategories, getFeaturedCategories, goVote, startLogin })(VoteIssueList);
