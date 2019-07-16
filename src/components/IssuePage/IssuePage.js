import React from 'react';
import Button from 'react-bootstrap/Button';
import VoteAnswerForm from '../VoteAnswerForm';
import AdditionalInfo from '../AdditionalInfo';
import "./IssuePage.css";
import { castVote, hideVoteScreen } from '../../actions/VoteActions';
import { connect } from 'react-redux';
import { serverEnvironment } from '../../constants/ActionConstants';
import bullet from '../../images/bulletpoint.png';

class IssuePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opinionVisible : false
        };
        this.onChange = this.onChange.bind(this);
        this.onClickBack = this.onClickBack.bind(this);
        this.showHideOpinion = this.showHideOpinion.bind(this);

    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onClickBack = (e) => {
        this.props.hideVoteScreen(0, false);
    }

    showHideOpinion = (e) => {
        this.setState({ "opinionVisible": (this.state.opinionVisible ? false : true) });
    }

    isYesNoQuestion() {
        return (this.props.questionType === 1 ? true: false);
    }

    isRankedVote() {
        return (this.props.questionType === 3 ? true : false);
    }

    vote(answerId) {

        this.props.castVote(this.props.logintoken,
            this.props.questionId,
            answerId,
            1,
            "",
            1
        );
    }

    getImagePath(url) {
        if (url) {
            var els = url.split('/');
            var ret = "";
            for (var i = 0; i < els.length - 1; i++) {
                ret += els[i] + '/';
            }
            ret += "rev" + els[els.length - 1];
        }
        return ret;
    }

    render() {
         /*  
         *  Options for type of vote
         *     1. Yes/No = three columns
         *     2. Multiple choice = grid pattern?
         *     3. Ranked voting = grid pattern?
         * */
        return (
            <div className={this.props.questionId > 0 ? "issuePage" : "hidden"}>                
                <Button className="buttonBack" variant="danger" onClick={this.onClickBack}>&lt; Back</Button>
                <div className="issueCategory">
                    <img src={this.getImagePath(this.props.icon)} height="80" width="80" alt=""/>{this.props.category}
                </div>
                <div className="shadowBoxTitle shadowBox"><span className="questionTitle">{this.props.question}</span></div>
                <div className={this.props.opinion ? "opinionSection" : "hidden"}>{serverEnvironment.customer.name}'s Opinion&nbsp;&nbsp;
                    <button className={this.state.opinionVisible ? "opinionButtonActive opinionButton" : "opinionButton opinionButtonInactive"} onClick={this.showHideOpinion}><img className="opinionBullet" src={bullet}/></button>                    
                </div>
                <div className={this.state.opinionVisible ? "opinionText shadowBox shadowBoxNoBorder" : "hidden"}>{this.props.opinion}</div>

                <div className={this.isYesNoQuestion() ? "shadowBox shadowBoxFor" : "hidden"}><span className="shadowBoxHeader shadowBoxHeaderFor"><b>Proponents For:</b></span><br />
                    <div className="scrollBoxArgs">{this.props.pros}</div>
                    <br />
                    <Button className="buttonFor" onClick={() => this.vote(this.props.answers[0].id)}>Vote <b>YES</b></Button>
                </div>
                <div className={this.isYesNoQuestion() ? "shadowBox shadowBoxAgainst" : "hidden"} ><span className="shadowBoxHeader shadowBoxHeaderAgainst"><b>Arguments Against:</b></span><br />
                    <div className="scrollBoxArgs">{this.props.cons}</div>
                    <br />
                    <Button className="buttonAgainst" onClick={() => this.vote(this.props.answers[1].id)}>Vote <b>NO</b></Button>
                </div>
                <div className={this.isYesNoQuestion() ? "hidden" : "shadowBox shadowBoxMultipleChoice"}>
                    <VoteAnswerForm isRankedVote={this.isRankedVote()} isVerified={this.props.isVerified} question={this.props.questionId} answers={this.props.answers} currentVote={this.props.currentVote} />
                    </div>
                <div className="shadowBox shadowBoxNoBorder shadowBoxAddInfo"><span className="shadowBoxHeader"><b>Additional Info:</b></span><br /><br />
                    <AdditionalInfo links={this.props.moreinfo} /><br /></div>
                
                <div className="shadowBox shadowBoxNoBorder shadowBoxComments"><center><b>COMMUNITY COMMENTS</b></center><br /><br />Disqus will go here.... </div>

                <div className="shadowBox shadowBoxCenter">Your vote: {this.props.currentVote}<br /> </div>
                
                
            </div>
            )
    }

}

function mapStateToProps(state) {
    return {
        isloggedin: state.loginReducer.isLoggedIn,
        logintoken: state.loginReducer.loginToken,
        user: state.loginReducer.user
    }
}

export default connect(mapStateToProps, { hideVoteScreen, castVote })(IssuePage);

