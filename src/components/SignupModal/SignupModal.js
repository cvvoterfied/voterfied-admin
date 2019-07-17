import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux'
import { register, doneRegistering } from '../../actions/LoginActions';
import './SignupModal.css';
import stars from '../../images/voterfied_stars.png';

class SignupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email1,
            firstname: "",
            lastname: "",
            phone: "",
            password: "",
            password2: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
    };
    
    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onClick = (e) => {
        if (this.state.password !== this.state.password2) {
            alert("Passwords do not match!");
        }
        else if (!this.state.password) {
            alert("Password cannot be blank");
        }
        else if (!(this.state.firstname &&
            this.state.lastname )) {
            alert("Name is required.");            
        }
        else {
            var email = this.state.email;
            if (email === undefined || email === "") {
                email = this.props.email1;
            }
            this.props.register(email, this.state.password, this.state.firstname, this.state.lastname, this.state.phone)
        }
    }

    onClickCancel = (e) => {
        this.props.doneRegistering();
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
                <h1 className="loginModalHeader">SIGN UP</h1>
                <center>
                    <div className="float-center"><img src={stars} alt="" /></div>
                </center><br />
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              First Name
            </Form.Label>
            <Col sm={8}>
                        <Form.Control id="firstname" placeholder="First Name" onChange={this.onChange} value={this.props.firstname} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Last Name
            </Form.Label>
            <Col sm={8}>
                        <Form.Control id="lastname" placeholder="Last Name" onChange={this.onChange} value={this.props.lastname}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Row>
                <Col><Form.Control type="password" id="password" onChange={this.onChange} placeholder="&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;" /></Col>
                <Col><Form.Control type="password" id="password2" onChange={this.onChange} placeholder="Confirm &middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;" /></Col>
              </Row>
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
                        <Form.Control id="phone" type="phone" placeholder="phone" value={this.props.phone} onChange={this.onChange} />
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
        username: state.loginReducer.userName
    }
}
export default connect(mapStateToProps, { register, doneRegistering })(SignupModal);

