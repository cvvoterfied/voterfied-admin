import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import LoginModal from '../LoginModal';

import * as qs from 'query-string';
import SignupModal from '../SignupModal';
import EditProfile from '../EditProfile';
import EmailModal from '../VerificationComponents/EmailModal';
import ConfirmationModal from '../VerificationComponents/ConfirmationModal';
import CongratulationsModal from '../VerificationComponents/CongratulationsModal';
import VoterVerificationModal from '../VerificationComponents/VoterVerificationModal';
import ChangePasswordModal from '../ChangePasswordModal';
import VersionModal from '../VersionModal';
import VoteIssueList from '../VoteIssueList';
import IssuePage from '../IssuePage';
import IssueList from '../IssueList';
import CategoryDropdown from '../IssueList/CategoryDropdown';
//import VerificationMessageModal from '../VerificationComponents/VerificationMessageModal';

import "../../App.css";
import "./Landing.css";
import Footerbar from '../Footerbar';
import { connect } from 'react-redux';
import { logout, startLogin, cancelLogin, startRegistering, verifyEmail, emailConfirmed, resetPassword, startEditProfile } from '../../actions/LoginActions';
import { hideVoteScreen, listCategories, clearVotes } from '../../actions/VoteActions';
import { serverEnvironment } from '../../constants/ActionConstants';
import { getCustomer } from '../../actions/CustomerActions';
import { getApiVersion, hideVersionModal, showVersionModal } from '../../actions/VersionActions';

import stars from '../../images/voterfied_stars.png';

class Landing extends React.Component {
  constructor(props) {
      super(props);
      this.state = {          
          loggingOut: false,
          email: ""
      };
      this.getLoginText();
      this.onClickLogin = this.onClickLogin.bind(this);
      this.onClickSignup = this.onClickSignup.bind(this);
      this.onChange = this.onChange.bind(this); 
      this.onShowVersion = this.onShowVersion.bind(this);
      this.onClickEditProfile = this.onClickEditProfile.bind(this);
      this.onClickVerifyRegistration = this.onClickVerifyRegistration.bind(this);
      this.logOut = this.logOut.bind(this);
    } 

    componentWillMount() {
        this.props.getCustomer();
        this.props.listCategories();           
       
        const parsed = qs.parse(window.location.search);
        if (parsed.token) {
            this.props.verifyEmail(parsed.token);
        }
        else if (parsed.code && parsed.uid) {
            // verify the code and show the change password screen
            this.props.resetPassword(parsed.uid, parsed.code);
        }               
    }

    componentDidMount() {
        if (String(window.location).includes('/login')) {
            this.props.startLogin();
            return;
        }
    }

    getTitle() {
        return (this.props.isloggedin ?
             this.props.customerName  : 
            "VOICE YOUR OPINION!" );
    }

    getStep (myStep) {
        return (this.props.signupshow && myStep === this.props.registrationstep ? true : false);
    }

    getUserStatus() {
        if (this.props.isloggedin) {
            return (this.props.user.UserRole === 0 || this.props.user.UserRole === undefined ? "Unverified" : "Verified");
        }
        else
            return "";
    }

    isVerified() {
        return (this.getUserStatus() === "Verified" ? true : false);
    }

    getLoginText = () => {
        let loginText = (this.props.isloggedin ? "Log out " + this.props.username : "Login");
        return loginText;
    }    

    onClickSignup(e) {
        if (!this.state.email)
            alert("Please enter your email first");
        else {
            this.props.startRegistering(this.state.email);
            this.setState({loggingOut: false});
        }
    }

    logOut(e) {
        if (this.props.logintoken !== undefined && this.props.logintoken !== '') {
            this.props.logout();
            this.props.clearVotes();
            this.props.hideVoteScreen(0, false);
            this.setState({ loggingOut: true });
        }
    }

    onClickLogin(e) {
        this.props.startLogin();
        this.setState({ loggingOut: false });        
    }

    onClickEditProfile(e) {
        this.props.startEditProfile();
    }

    onClickVerifyRegistration(e) {
        if (!this.isVerified()) {
            this.props.emailConfirmed();
        } else {
            alert('You are already verified');
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onShowVersion = (e) => {
        this.props.getApiVersion();
        this.props.showVersionModal();
    }

    render() {
        
        let loginClose = () => {
            this.props.cancelLogin();
        };        

    return (
        <div className="loginPage">
            <div className="landingNavBar">                               
                <Nav className="justify-content-start">
                    <Nav.Item className="leftLinks">
                        <div className="App-link" >                            
                            <div className="App-link" >
                                <img className="img-fluid logo" src={this.props.customerLogo} alt="" />                                
                            </div>
                        </div>
                    </Nav.Item>
                    <span className="rightLinks">
                        <tr>
                            <td>
                                <Nav.Item>
                                    <Button className="transparentButton" onClick={this.onShowVersion}>Version</Button>
                                </Nav.Item>
                            </td>
                            <td>
                                <Nav.Item >
                                    <Nav.Link className="App-link customLink" href={this.props.donateLink} eventKey="donateLink">Donate</Nav.Link>
                                    </Nav.Item>
                            </td><td>
                                <Nav.Item >
                                    <Nav.Link className=" App-link customLink" href={this.props.volunteerLink} eventKey="volunteerLink">Volunteer</Nav.Link>
                                </Nav.Item>
                            </td>
                            <td>
                                <Nav.Item>
                                    <div className={this.getUserStatus() ? "userStatusButton" : "hidden"}  >
                                        {this.getUserStatus()}&nbsp;&nbsp;
                                    </div>
                                </Nav.Item>
                            </td>
                            <td>
                                <Nav.Item>

                                    <Button className={!this.props.isloggedin ? "loginButton" : "hidden"} variant="danger" onClick={this.onClickLogin} >
                                        {this.getLoginText()}
                                    </Button>

                                    <Dropdown
                                        className={this.props.isloggedin ? "menuItem loginButton Button" : "hidden"}
                                        size="sm"
                                        isOpen={this.state.menuOpen}
                                        toggle={this.toggle}
                                        eventKey="1"
                                        variant="danger"
                                        title="Edit Profile"
                                        id="loginMenu" >
                                        <DropdownToggle className={this.props.isloggedin ? "menuItem" : "hidden"} caret>{this.props.username ? this.props.username: ""}</DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem className="menuItem" eventKey="1.1"></DropdownItem>
                                            <DropdownItem onSelect={this.onClickEditProfile} className="menuItem" eventKey="1.2">Edit Profile</DropdownItem>
                                            <DropdownItem onSelect={this.onClickVerifyRegistration} className="menuItem" eventKey="1.3">Verify Registration</DropdownItem>
                                            <DropdownItem onSelect={this.logOut} className="menuItem" eventKey="1.4">{this.getLoginText()}</DropdownItem>
                                        </DropdownMenu>

                                    </Dropdown>
                                </Nav.Item>
                            </td>
                        </tr>
                    </span>
              </Nav>
            </div>
            <IssuePage
                questionId={this.props.currentQuestion.id}
                questionType={this.props.currentQuestion.questionType.id}
                question={this.props.currentQuestion.name}
                loginToken={serverEnvironment.logintoken}
                answers={this.props.currentQuestion.answers}
                icon={this.props.currentQuestion.categoryIcon}
                category={this.props.currentQuestion.categoryName}
                opinion={this.props.currentQuestion.candidateOpinion}
                pros={this.props.currentQuestion.pros}
                cons={this.props.currentQuestion.cons}
                moreinfo={this.props.currentQuestion.links}
                currentVote={this.props.currentQuestion.currentVote}
            />
            <div className={this.props.isloggedin && this.props.currentQuestion.id === 0 ? "landingSignupForm float-center" : "hidden"}>
                <br />
                <br />
                <center>
                    <img className={this.props.isloggedin ? "circle" : "hidden"} alt="" src={this.props.customerHeadshot} height="200" width="200" />
                    
                    <h1>{this.getTitle()}</h1>                                
                    <div className={this.props.isloggedin ? "hidden" : "float-center"}><img alt="" src={stars} /><br/><br/></div>           
                    <div className={this.props.isloggedin ? "largetext" : "hidden"}>{this.props.customerTitle}</div>
                    <div className={this.props.isloggedin ? "largetext" : "hidden"}>{this.props.customerLocation}</div>
                    <div className={this.props.isloggedin ? "featuredCategories" : "hidden"}>                        
                        <center>
                            <h1>VOTE NOW ON ISSUES</h1>
                            <div className="float-center"><img src={stars} alt=""/><br /></div>
                            <div className="subTitle">Featured Issues</div>                                    
                            <div className="gridLayout">
                                <VoteIssueList isVerified={this.isVerified()} />
                            </div>                                                        
                        </center>
                        <br />
                        <div className="allIssues">
                            <br />
                            <Container className="issueHeader">                                
                                <CategoryDropdown />
                                <h2>All Issues</h2>
                            </Container>
                            <Container >
                                <IssueList isVerified={this.isVerified()} />
                            </Container>
                            <br />
                        </div>
                    </div>
                                       
                    
                </center>
            </div>
            <center>
                <div className={this.props.isloggedin ? "hidden" : "landingSignupForm float-center"}>
                    <h1>{this.getTitle()}</h1>
                    <div className={this.props.isloggedin ? "hidden" : "float-center"}><img alt="" src={stars} /><br /><br /></div>

                    <span className={this.props.isloggedin ? "hidden" : ""} md={4}>

                        <input id="email" className="roundedges" type='email' placeholder='&nbsp;Your Email' onChange={this.onChange} />
                        &nbsp;
                                <Button variant="danger" onClick={this.onClickSignup}>Sign Up</Button>
                    </span>
                </div>
            </center>

            <br />
            <br />
            <div className={this.props.isloggedin ? "hidden" : ""}>
                <Container className="landingCandidate">
                    <Row >
                        <Col className="candidatePhoto">
                            <br/>
                            <img alt="" className="circle" src={this.props.customerHeadshot} height="150" width="150"  />
                        </Col>
                        <Col className="descriptiveColumn" >                        
                            <br />                        
                            <span className="candidateName">{this.props.customerName}</span><span className="largetext"> wants you to participate</span>
                            <br />
                            <br />
                            <div className="mediumtext">
                                {this.props.customerBio}
                            </div>
                        </Col>                    
                        <Col className="gridLayout">
                            <VoteIssueList isVerified={this.isVerified()} />
                        </Col>
                    
                    </Row>
                </Container>
            </div>
        <div>
        <LoginModal            
            show={!this.props.isloggedin && this.props.loginshow}
            onHide={loginClose}
                />
         <SignupModal email1={this.state.email}
            show={this.getStep(0)}
         />
         <EditProfile 
            email1={this.props.user.Email}
            firstname1={this.props.user.FirstName}
            lastname1={this.props.user.LastName}
            phone1={this.props.user.Phone}
            user={this.props.user}
            show={this.props.showEditProfile}
           />
        
         <EmailModal email={this.state.email} show={this.getStep(1)}            
            />
        <VoterVerificationModal firstName1={this.props.user.FirstName} lastName1={this.props.user.LastName}
            show={this.getStep(2)}
        />
        <ConfirmationModal
            show={this.getStep(3)}            
        />
        <CongratulationsModal
            show={this.getStep(4)}            
                />
        <ChangePasswordModal show={this.props.forcePasswordChange} userName={this.props.username}/>
        <VersionModal show={this.props.showVersion} onHide={this.props.hideVersionModal} />  
        </div>
        <Footerbar/>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        username: state.loginReducer.userName,
        logintoken: state.loginReducer.loginToken,
        loginshow: state.loginReducer.loginShow,
        signupshow: state.loginReducer.registerShow,
        showEditProfile: state.loginReducer.showEditProfile,
        isloggedin: state.loginReducer.isLoggedIn,
        registrationstep: state.loginReducer.registrationStep,
        forcePasswordChange: state.loginReducer.forcePasswordChange,
        user: state.loginReducer.user,
        categories: state.voteReducer.categories,
        hideVoteScreen: state.voteReducer.hideVoteScreen,
        currentQuestion: state.voteReducer.currentQuestion,   
        showVersion: state.versionReducer.showVersion,
        customerName: state.customerReducer.name,
        customerTitle: state.customerReducer.title,
        customerLocation: state.customerReducer.location,
        customerLogo: state.customerReducer.logoURL,
        customerHeadshot: state.customerReducer.headshotURL,
        donateLink: state.customerReducer.donateURL,
        volunteerLink: state.customerReducer.volunteerURL,
        customerBio: state.customerReducer.bioStatement
    }
}

export default connect(mapStateToProps, {
    getApiVersion,
    getCustomer,
    hideVersionModal,
    showVersionModal,
    hideVoteScreen,
    logout,
    startRegistering,
    startEditProfile,
    startLogin,
    cancelLogin,
    verifyEmail,
    listCategories,
    emailConfirmed,
    resetPassword,
    clearVotes
}
)(Landing);


