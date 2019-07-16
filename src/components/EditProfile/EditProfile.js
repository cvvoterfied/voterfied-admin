import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux'
import { editUserProfile, cancelEditProfile } from '../../actions/LoginActions';
import './EditProfile.css';
import stars from '../../images/voterfied_stars.png';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            email: this.props.email1,
            firstname: "",
            lastname: "",
            phone: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
    };

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onClick = (e) => {

        var email = this.state.email;
        var firstname = this.state.firstname;
        var lastname = this.state.lastname;
        var phone = this.state.phone;

        if (firstname === undefined || firstname === "") {
            firstname = this.props.firstname1;
        }
        if (lastname === undefined || lastname === "") {
            lastname = this.props.lastname1;
        }
        if (phone === undefined || phone === "") {
            phone = this.props.phone1;
        }
        if (email === undefined || email === "") {
            email = this.props.email1;
        }
        if (!(firstname && lastname)) {
            alert("Name is required.");
            return;
        }
        if (!email || email === "") {
            alert("Email is required.");
            return;
        }

        this.props.editUserProfile(this.props.user, email, firstname, lastname, phone)
    }

    onClickCancel = (e) => {
        this.props.cancelEditProfile();
    }

    render() {
        return (
            <Modal
                {...this.props}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Body>
                    <h1 className="loginModalHeader">EDIT PROFILE</h1>
                    <center>
                        <div className="float-center"><img src={stars} alt="" /></div>
                    </center><br />
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            First Name
            </Form.Label>
                        <Col sm={8}>
                            <Form.Control id="firstname" placeholder="First Name" onChange={this.onChange} value={this.props.firstname} defaultValue={this.props.firstname1} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Last Name
            </Form.Label>
                        <Col sm={8}>
                            <Form.Control id="lastname" placeholder="Last Name" onChange={this.onChange} value={this.props.lastname} defaultValue={this.props.lastname1}  />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Your Email
            </Form.Label>
                        <Col sm={10}>
                            <Form.Control id="email" type="email" placeholder="Email" value={this.props.email} defaultValue={this.props.email1} onChange={this.onChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Phone Number (optional)
                    </Form.Label>
                        <Col sm={10}>
                            <Form.Control id="phone" type="phone" placeholder="phone" value={this.props.phone} onChange={this.onChange} defaultValue={this.props.phone1} />
                        </Col>
                    </Form.Group>
                    <Row>
                        <center><div className="loginModalFooter">{this.props.message}</div></center>
                    </Row>
                    <Row>
                        <Button className="modalContinueButton" variant="danger" href="#" onClick={this.onClick}>Continue</Button>
                        <Button className="modalContinueButton" variant="danger" href="#" onClick={this.onClickCancel}>Cancel</Button>

                    </Row>

                </Modal.Body>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.loginReducer.message,
        user: state.loginReducer.user
    }
}
export default connect(mapStateToProps, { editUserProfile, cancelEditProfile })(EditProfile);

