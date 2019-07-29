import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Checkbox from 'react-bootstrap/FormCheckInput'
import { connect } from 'react-redux';
import Label from 'react-bootstrap/FormLabel';
import { addUserProfile, editUserProfile2, hideUserForm } from '../../actions/LoginActions';
import './Modal.css';
import stars from '../../images/voterfied_stars.png';
import Select from 'react-styled-select';

import 'react-bootstrap-multiselect/css/bootstrap-multiselect.css';

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
            userRole: 2,
            customers: [],
            header: "Modify User Login",
            selectedItems: []
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    isEditing() {
        return (this.props.currentUserLogin && this.props.currentUserLogin.id ? true : false)
            ;
    }

    componentWillReceiveProps(newProps) {
        if (newProps.currentUserLogin !== this.props.currentUserLogin) {

            var customerList = [];
            var selectedItems = [];

            for (var i = 0; i < this.props.customers.length; i++) {
                customerList.push({ "label": this.props.customers[i].name, "value": this.props.customers[i].id });
            }

            if (newProps.currentUserLogin.AuthorizedCustomers) {
                for (var j = 0; j < newProps.currentUserLogin.AuthorizedCustomers.length; j++) {
                    selectedItems.push(newProps.currentUserLogin.AuthorizedCustomers[j].id);
                }
            }

            this.setState({
                "userRole": newProps.currentUserLogin.UserRole,
                "customerList": customerList,
                "selectedItems": selectedItems
            })
        }
    }

    onSubmit = () => {
        var user = {}
        var custs = [];

        for (var n = 0; n < this.state.selectedItems.length; n++) {            
            custs.push({
                "id": this.state.selectedItems[n]
            });            
        }

        if (!this.isEditing()) {
            user = {
                id: 0,
                name: this.state.userLoginName,
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                Password: this.state.password,
                ForcePasswordChange: this.state.forcePasswordChange,
                Email: this.state.email,
                Phone: this.state.phone,
                UserRole: this.state.userRole,
                AuthorizedCustomers: custs,
                createdDate: new Date(),
                modifiedDate: new Date(),
                ts: "QEA="
            }
            this.props.addUserProfile(this.props.logintoken, user);

        } else {

            // Can't edit password, user name or created date from here
            user = this.props.currentUserLogin;
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
            //user.AuthorizedCustomers = customers;
            
            this.props.editUserProfile2(this.props.logintoken, user);
        }
    }

    onClickCancel = () => {
        this.props.hideUserForm();
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSelect = (e) => {
        this.setState({ "userRole": e });
    }

    handleChange = items => {
        this.setState({ selectedItems: items })
    }

    render() {

        var data = this.props.currentUserLogin;
        if (!data || !data.AuthorizedCustomers) {
            data = {
                id: 0, name: "", UserRole:1, AuthorizedCustomers: []
            };
        }

        var roles =
            [
                { "label": "Unverified Voter", "value": 0, "isSelected": (data.UserRole === 0 ? true : undefined) },
                { "label": "Verified Voter", "value": 1, "isSelected": (data.UserRole === 1 ? true : undefined) },
                { "label": "Customer Admin", "value": 2, "isSelected": (data.UserRole === 2 ? true : undefined) },
                { "label": "Super Admin", "value": 3, "isSelected": (data.UserRole === 3 ? true : undefined) }
            ];

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
                            <Form.Control type='email' id='userLoginName' onChange={this.onChange} defaultValue={data.name} value={this.props.userLoginName} />
                        </Form.Group>
                        <Form.Group className={this.isEditing() ? "hidden" : ""}>
                            <Label>Password: </Label>
                            <Form.Control type='password' id='password' onChange={this.onChange} defaultValue={data.Password} value={this.props.password} />
                        </Form.Group>
                        <Form.Group>
                            <Label>First Name: </Label>
                            <Form.Control type='text' id='firstName' onChange={this.onChange} defaultValue={data.FirstName} value={this.props.firstName} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Last Name: </Label>
                            <Form.Control type='text' id='lastName' onChange={this.onChange} defaultValue={data.LastName} value={this.props.lastName} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Email: </Label>
                            <Form.Control type='email' id='email' onChange={this.onChange} defaultValue={data.Email} value={this.props.email} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Phone: </Label>
                            <Form.Control type='text' id='phone' onChange={this.onChange} defaultValue={data.Phone} value={this.props.phone} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Force Password Change: </Label><br/>
                            <Checkbox value={this.state.forcePasswordChange} defaultValue={data.ForcePasswordChange} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Role: </Label>
                            <Select
                                className="red-theme"
                                name="userRole"
                                options={roles}
                                
                                defaultValue={data.UserRole}
                                value={this.state.userRole}
                                onChange={this.onSelect}
                            /> 
                        </Form.Group>
                        <Form.Group>
                            <Label>Customer(s): </Label><br/>
                            <Select options={this.state.customerList} multi id="customers" value={this.state.selectedItems} onChange={this.handleChange}/>
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
        currentUserLogin: state.loginReducer.currentUserLogin,
        customers: state.customerReducer.customerList

    }
}
export default connect(mapStateToProps, { addUserProfile, editUserProfile2, hideUserForm })(UserLoginModal);

