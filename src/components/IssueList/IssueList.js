import React from 'react';
import Button from 'react-bootstrap/Button';
import "./IssueList.css";
import { colors } from '../../constants/ActionConstants';
import { connect } from 'react-redux';
import { goVote} from '../../actions/VoteActions';

import ballotBox from '../../images/ballotBox.png';
import bold_thumbs_up from '../../images/thumbs_up.png';
import thumbs_up from '../../images/thumbs_up2.png';
import bold_thumbs_down from '../../images/thumbs_down.png';
import thumbs_down from '../../images/thumbs_down2.png';

class IssueList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.onClickVote = this.onClickVote.bind(this);
    }

    onClickVote(currentQuestion) {        
        this.props.goVote(currentQuestion);
    }

    getVoteText(d) {
        return (d.currentVote ? "" : "You have not voted");
    }

    getPercentage(d) {
        if (d.currentVote) {
            for (var i = 0; i < d.answers.length; i++) {
                if (d.currentVote === d.answers[i].name) {
                    return d.answers[i].percentage.toFixed(0);
                }
            }
        }
    }

    getColorClass(d) {
        if (d.currentVote) {
            for (var i = 0; i < d.answers.length; i++) {
                if (d.currentVote === d.answers[i].name) {
                    return colors[i];
                }
            }
        }
    }

    getButtonText(d) {
        if (d.currentVote) {
            return "Change Vote";
        }
        else {
            return "Vote Now";
        }
    }

    isYesResponse(d) {
        return (d.currentVote && d.currentVote.toLowerCase() === "yes" ? true: false) ;
    }

  
    render() {
        return (
            this.props.questions.map(
                (d) =>
                    <div className="issueList">
                        <img className="img_issueList" src={ballotBox} height="30" alt=""/>
                        <div className="questionText">{d.name}</div>
                        <div className="answerText">{this.getVoteText(d)}
                            <tr><td>
                            <div className={d.questionType.id === 1 && d.currentVote ? "resultsImages" : "hidden"}>
                                <img src={thumbs_up} height="25px" alt="Yes" className={!this.isYesResponse(d) ? "" : "hidden"}  />
                                    <img src={bold_thumbs_up} height="25px" alt="Yes" className={this.isYesResponse(d) ? "" : "hidden"} />
                                    <div className="darkgreen">{String(d.answers[0].percentage.toFixed(0)) + "%"}</div>
                            </div>
                            </td><td>
                                    <div className={d.questionType.id === 1 && d.currentVote ? "resultsImages" : "hidden"}>
                                    <img src={bold_thumbs_down} height="25px" alt="No" className={!this.isYesResponse(d) ? "" : "hidden"}  />
                                        <img src={thumbs_down} height="25px" alt="No" className={this.isYesResponse(d) ? "" : "hidden"} />                               
                                        <div className="darkred">{String(d.answers[1].percentage.toFixed(0)) + "%"}</div>
                                </div> 
                            </td>
                            </tr><tr>
                                <div className={d.questionType.id === 1 ? "hidden" : this.getColorClass(d) + " currentResults"} ><b>{d.questionType.id === 1 ? "" : d.currentVote}</b><br/>
                                    {d.currentVote ? String(this.getPercentage(d)) + "%" : ""}</div>
                            </tr>
                        </div>
                        <Button variant={d.currentVote ? "success" : "danger"} className={d.currentVote ? "changeVoteButton" : "issueVoteButton"} onClick={() => this.onClickVote(d)} disabled={!this.props.isVerified}>{this.getButtonText(d)}</Button>
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
        questions: state.voteReducer.allquestions,
        isloggedin: state.loginReducer.isLoggedIn        
    }
}

export default connect(mapStateToProps, { goVote })(IssueList);
