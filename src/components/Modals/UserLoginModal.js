import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
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
            header: "User Login"
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit = () => {
        var id = this.props.currentUserLogin.id;
        if (id === 0) {
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
            var user = this.state.currentUserLogin;
            user.FirstName = this.state.firstName;
            user.LastName = this.state.lastName;
            user.ForcePasswordChange = this.state.forcePasswordChange;
            user.UserRole = this.state.userRole;
            user.Phone = this.state.phone;
            user.Email = this.state.email;
            user.modifiedDate = this.state.modifiedDate;
            user.AuthorizedCustomers = this.state.customers;
            
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
        /*
         * UserLoginName, First, Last, Email, Phone, ForcePasswordChange, 
         * CustomerList,                -> checkbox list visible only on edit
         * Password, Re-enter password  -> visible only on new user
         * */

        return (
            <Modal
                {...this.props}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Body>
                    <h1 className="loginModalHeader">{this.state.header}</h1>
                    <center>
                        <div className="float-center"><img src={stars} alt="" /></div>
                    </center><br />

                    <Form.Group>

                    </Form.Group>


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
        currentUserLogin: state.currentUserLogin
    }
}
export default connect(mapStateToProps, { addUserProfile, editUserProfile2, hideUserForm })(UserLoginModal);

