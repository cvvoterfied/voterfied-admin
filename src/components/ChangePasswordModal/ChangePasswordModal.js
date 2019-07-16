import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { changePassword } from '../../actions/LoginActions';

import './ChangePasswordModal.css';
import stars from '../../images/voterfied_stars.png';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            header: "CHANGE PASSWORD"
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit = () => {
        if (this.state.password === this.state.password2) {
            
            var password = this.state.password;
            this.props.changePassword(this.props.userName, "", password);
        }
        else
            alert("Passwords do not match!");
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
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
                    <h1 className="loginModalHeader">{this.state.header}</h1><center>
                    <div className="float-center"><img src={stars} alt="" /></div>
                        <br />
                        </center>
                    <Form.Group>
                        <Form.Control type='email' placeholder='Your Email' id='userName' onChange={this.onChange} value={this.props.userName} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='password' id='password' onChange={this.onChange} value={this.props.password} placeholder='&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='password' id='password2' onChange={this.onChange} value={this.props.password2} placeholder='&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;' />
                    </Form.Group>
                    <Row>
                        <div className="loginModalFooter">{this.props.message}</div><br/><br/>
                    </Row>                   
                    <Row>
                        <Button className="modalLoginButton" variant="danger" onClick={this.onSubmit} href="#">Change Password</Button>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.loginReducer.message
    }
}
export default connect(mapStateToProps, { changePassword })(LoginModal);

