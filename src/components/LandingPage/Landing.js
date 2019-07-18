import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import LoginModal from '../LoginModal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomerDropdown from '../DropdownFilters/CustomerDropdown';

import EditProfile from '../EditProfile';
import ChangePasswordModal from '../ChangePasswordModal';
import VersionModal from '../VersionModal';
import QuestionDropdown from '../DropdownFilters/QuestionDropdown';
import "../../App.css";
import "./Landing.css";
import Footerbar from '../Footerbar';
import { connect } from 'react-redux';
import { logout, startLogin, cancelLogin, startRegistering, verifyEmail, emailConfirmed, resetPassword, startEditProfile } from '../../actions/LoginActions';
import { getApiVersion, hideVersionModal, showVersionModal } from '../../actions/VersionActions';
import { enumCustomer } from '../../actions/CustomerActions';

import DataGrid, { Scrolling, Sorting, Column } from 'devextreme-react/data-grid';

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

    componentWillReceiveProps(newProps) {
        if (newProps.logintoken && newProps.logintoken != this.props.logintoken) {
            this.props.enumCustomer(newProps.logintoken);
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
            return (this.props.user.UserRole < 2 || this.props.user.UserRole === undefined ?
                "Unverified" : (this.props.user.UserRole === 2 ? "Admin" : "Super Admin"));
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

    logOut(e) {
        if (this.props.logintoken !== undefined && this.props.logintoken !== '') {
            this.props.logout();            
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

    customizeColumns(columns) {
        columns[0].width = 500;
        columns[1].width = 100;
        columns[2].width = 240;
        columns[3].width = 100;
        columns[4].width = 200;
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
           
           
            
                <div className={this.props.isloggedin ? "hidden" : "landingSignupForm float-center"}>
                    <h1>{this.getTitle()}</h1>
                    <div className={this.props.isloggedin ? "hidden" : ""}><img alt="" src={stars} /><br /><br /></div>                   
                </div>
                <Row>
                <Col>Customers: <CustomerDropdown customers={this.props.customerList}/> </Col>
                    <Col>User List: </Col>
                <Col>Questions: <QuestionDropdown questions={this.props.allquestions}/></Col>
                </Row>
                <Row></Row>
            
                <center>
                    <span className={this.props.isloggedin ? "float-center" : "hidden"} md={4}>
                        <DataGrid elementAttr={{ id: 'gridContainer' }}
                            dataSource={this.props.votes}
                            showBorders={true}
                            customizeColumns={this.customizeColumns}>
                            <Sorting mode={'none'} />
                            <Scrolling mode={'infinite'} />
                        <Column
                            dataField={"question"}
                            caption={"Question"}
                            dataType={"string"}
                            alignment={"left"}
                        />
                        <Column
                            dataField={"createdDate"}
                            caption={"Vote Date"}
                            dataType={"date"}
                            alignment={"left"}
                        />
                        <Column
                            dataField={"answer"}
                            caption={"Answer"}
                            dataType={"string"}
                            alignment={"left"}
                        />
                        <Column
                            dataField={"rank"}
                            caption={"Rank"}
                            dataType={"number"}
                            alignment={"center"}
                        />
                        <Column
                            dataField={"email"}
                            caption={"Email"}
                            dataType={"string"}
                            alignment={"left"}
                        />
                        </DataGrid>

                    </span>
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
        votes: state.voteReducer.votes,
        customerList: state.customerReducer.customerList,
        allquestions: state.voteReducer.allquestions
    }
}

export default connect(mapStateToProps, {
    getApiVersion,
    hideVersionModal,
    showVersionModal,
    logout,
    startRegistering,
    startEditProfile,
    startLogin,
    cancelLogin,
    verifyEmail,
    emailConfirmed,
    resetPassword,
    enumCustomer
    
}
)(Landing);


