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
import EditProfile from '../EditProfile';
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
      
      this.logOut = this.logOut.bind(this);
    } 

    componentWillMount() {
       
    }

    componentDidMount() {
        if (String(window.location).includes('/login')) {
            this.props.startLogin();
            return;
        }
    }

    getTitle() {
        return ("Voterfied Admin Portal" );
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
                                <img className="img-fluid logo" src="" alt="" />                                
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
                                            <DropdownItem onSelect={this.logOut} className="menuItem" eventKey="1.4">{this.getLoginText()}</DropdownItem>
                                        </DropdownMenu>

                                    </Dropdown>
                                </Nav.Item>
                            </td>
                        </tr>
                    </span>
              </Nav>
            </div>
           
           
            <center>
                <div className={this.props.isloggedin ? "hidden" : "landingSignupForm float-center"}>
                    <h1>{this.getTitle()}</h1>
                    <div className={this.props.isloggedin ? "hidden" : "float-center"}><img alt="" src={stars} /><br /><br /></div>

                    <span className={this.props.isloggedin ? "hidden" : ""} md={4}>

                    </span>
                </div>
            </center>

            <br />
            <br />
            
        <div>
        <LoginModal            
            show={!this.props.isloggedin && this.props.loginshow}
            onHide={loginClose}
                />

         <EditProfile 
            email1={this.props.user.Email}
            firstname1={this.props.user.FirstName}
            lastname1={this.props.user.LastName}
            phone1={this.props.user.Phone}
            user={this.props.user}
            show={this.props.showEditProfile}
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


