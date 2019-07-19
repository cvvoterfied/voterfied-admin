import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import Label from 'react-bootstrap/FormLabel';
import { addUserProfile, editUserProfile2, hideUserForm } from '../../actions/LoginActions';
import './Modal.css';
import stars from '../../images/voterfied_stars.png';

class UserLoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoginName: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            password2: '',
            forcePasswordChange: false,
            userRole: 0,
            customers: [],
            header: "Modify User Login"
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isEditing() {
        return (this.state.id === 0 ? false : true)
            ;
    }

    onSubmit = () => {


        if (!this.isEditing()) {
            var user = {
                id: 0,
                name: this.state.userLoginName,
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                Password: this.state.password,
                ForcePasswordChange: this.state.forcePasswordChange,
                Email: this.state.email,
                Phone: this.state.phone,
                UserRole: this.state.userRole,
                AuthorizedCustomers: this.state.customers,
                createdDate: new Date(),
                modifiedDate: new Date(),
                ts: "QEA="
            }
            this.props.addUserProfile(this.props.logintoken, user);

        } else {

            // Can't edit password, user name or created date from here
            var user = this.props.currentUserLogin;
            if (this.state.firstName && this.state.firstName.length > 0) {
                user.FirstName = this.state.firstName;
            }
            if (this.state.lastName && this.state.lastName.length > 0) {
                user.LastName = this.state.lastName;
            }
            if (this.state.forcePasswordChange) {
                user.ForcePasswordChange = this.state.forcePasswordChange;
            }
            if (this.state.userRole && this.state.userRole >= 0) {
                user.UserRole = this.state.userRole;
            }
            if (this.state.phone && this.state.phone.length > 0) {
                user.Phone = this.state.phone;
            }
            if (this.state.email && this.state.email.length > 0) {
                user.Email = this.state.email;
            }
            user.modifiedDate = new Date();
 //           user.AuthorizedCustomers = this.state.customers;
            
            this.props.editUserProfile2(this.props.logintoken, user);
        }
    }

    onClickCancel = () => {
        this.props.hideUserForm();
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {

        var loginName = this.props.currentUserLogin.name;
        
        return (
            <Modal
                {...this.props}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Body >
                    <h1 className="loginModalHeader">{this.state.header}</h1>
                    <center>
                        <div className="float-center"><img src={stars} alt="" /></div>
                    </center><br />

                    <div className="userLoginForm">
                        <Form.Group>
                            <Label>Login Name: </Label> 
                            <Form.Control type='email' id='userLoginName' onChange={this.onChange} defaultValue={loginName} value={this.props.userLoginName} />
                        </Form.Group>
                        <Form.Group className={this.isEditing() ? "hidden" : ""}>
                            <Label>Password: </Label>
                            <Form.Control type='password' id='password' onChange={this.onChange} defaultValue={this.props.currentUserLogin.Password} value={this.props.password} />
                        </Form.Group>
                        <Form.Group>
                            <Label>First Name: </Label>
                            <Form.Control type='text' id='firstName' onChange={this.onChange} defaultValue={this.props.currentUserLogin.FirstName} value={this.props.firstName} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Last Name: </Label>
                            <Form.Control type='text' id='lastName' onChange={this.onChange} defaultValue={this.props.currentUserLogin.LastName} value={this.props.lastName} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Email: </Label>
                            <Form.Control type='email' id='email' onChange={this.onChange} defaultValue={this.props.currentUserLogin.Email} value={this.props.email} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Phone: </Label>
                            <Form.Control type='text' id='phone' onChange={this.onChange} defaultValue={this.props.currentUserLogin.Phone} value={this.props.phone} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Role: </Label>

                        </Form.Group>
                        <Form.Group>
                            <Label>Customer(s): </Label>

                        </Form.Group>
                        <Form.Group>
                            <Label>Force Password Change: </Label>

                        </Form.Group>
                    </div>
                    <Row>
                        <Button className="modalLoginButton" variant="danger" onClick={this.onSubmit} href="#">Save</Button>
                        <Button className="modalLoginButton" variant="danger" onClick={this.onClickCancel} href="#">Cancel</Button>
                    </Row>


                    <Row>
                        <div className="loginModalFooter">{this.props.message}</div>
                        <br /><br />
                    </Row>

                </Modal.Body>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        logintoken: state.loginReducer.loginToken,
        message: state.loginReducer.message,
        currentUserLogin: state.loginReducer.currentUserLogin
    }
}
export default connect(mapStateToProps, { addUserProfile, editUserProfile2, hideUserForm })(UserLoginModal);

