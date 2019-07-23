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
import { logout, startLogin, cancelLogin, startRegistering, verifyEmail, emailConfirmed, resetPassword, startEditProfile, showUserForm } from '../../actions/LoginActions';
import { getApiVersion, hideVersionModal, showVersionModal } from '../../actions/VersionActions';
import { enumCustomer} from '../../actions/CustomerActions';
import { clearVotes } from '../../actions/VoteActions';

import DataGrid, { Scrolling, Sorting, Column } from 'devextreme-react/data-grid';

import stars from '../../images/voterfied_stars.png';
import UserLoginDropdown from '../DropdownFilters/UserLoginDropdown';
import UserLoginModal from '../Modals/UserLoginModal';
import CustomerModal from '../Modals/CustomerModal';
import QuestionModal from '../Modals/QuestionModal';

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
      this.exportToCSV = this.exportToCSV.bind(this);
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
        if (newProps.logintoken && newProps.logintoken !== this.props.logintoken) {
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
            this.props.clearVotes();
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
        columns[4].width = 100;
    }

    exportToCSV() {
        var processRow = function (row) {
            return row.question + "," + 
                row.createdDate + "," + 
                row.answer + "," + 
                String(row.rank) + ",\r\n"                            
        };

        var csvFile = "Question,Vote Date,Answer,Rank,Email\n";
        for (var i = 0; i < this.props.votes.length; i++) {
            csvFile += processRow(this.props.votes[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, "downloadVotes.csv");
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", "downloadVotes.csv");
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
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
            
                <div className={this.props.isloggedin ? "hidden" : "landingSignupForm "}>
                    <h1>{this.getTitle()}</h1>
                    <div className={this.props.isloggedin ? "hidden" : ""}><img alt="" src={stars} /><br /><br /></div>                   
                </div>
                <Row>
                <Col><div className="label">Customers: </div><CustomerDropdown customers={this.props.customerList}/> </Col>
                <Col><div className="label">User List: </div><UserLoginDropdown userLogins={this.props.userLogins}/></Col>
                <Col><div className="label">Questions: </div><QuestionDropdown questions={this.props.allquestions} /></Col>
                <Col className={this.props.votes && this.props.votes.length > 0 ? "label" : "hidden"}><div className="label">&nbsp; </div><div><Button variant="danger" onClick={this.exportToCSV} className="exportButton">Export to CSV</Button></div></Col>
                </Row>
                <Row></Row>

                <br />
               <div className="grid">
                    <span className={this.props.isloggedin ? "float-center " : "hidden"} md={4}>
                    <DataGrid className="grid" elementAttr={{ id: 'gridContainer' }}
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
            </div>

            <UserLoginModal show={this.props.userFormVisible} />
            <CustomerModal show={this.props.customerFormVisible}/>
            <QuestionModal show={this.props.showQuestionForm} />
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
        allquestions: state.voteReducer.allquestions,
        userLogins: state.loginReducer.allUsers,
        customerLogo: (state.customerReducer.currentCustomer ? state.customerReducer.currentCustomer.logoURL : ""),
        userFormVisible: state.loginReducer.showUserForm,
        customerFormVisible: state.customerReducer.customerFormVisible,
        showQuestionForm: state.voteReducer.showQuestionForm
    }
}

export default connect(mapStateToProps, {
    getApiVersion,
    clearVotes,
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
    enumCustomer,
    showUserForm
    
}
)(Landing);


