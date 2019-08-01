import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { login, startRegistering } from '../../actions/LoginActions';
import { sendMailReset } from '../../actions/EmailActions';
import './LoginModal.css';
import stars from '../../images/voterfied_stars.png';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            header: "LOGIN",
            showEmailMessage: false
        };
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);    
        this.onClickRegister = this.onClickRegister.bind(this);
    }

    onSubmit = () => {
        
        var userName = this.state.userName;
        var password = this.state.password;
        this.props.login(userName, password); 
        
    }

    onClickForgot = () => {
        var userName = this.state.userName;
        this.props.sendMailReset(userName); // send mail
        this.setState({ showEmailMessage: true });
        
    }

    onClickRegister() {
        this.props.startRegistering();

    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value.trim() });
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
                <h1 className="loginModalHeader">{this.state.header}</h1>
                <center>
                    <div className="float-center"><img src={stars} alt=""/></div>                
                    </center><br/>
          <Form.Group>
                    <Form.Control type='email' placeholder='Your Email' id='userName' onChange={this.onChange} value={this.state.userName}/>
          </Form.Group>
          <Form.Group>
                    <Form.Control type='password' id='password' onChange={this.onChange} value={this.state.password} placeholder='&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;&middot;' />
          </Form.Group>
          <Row>
                <Button className="modalLoginButton" variant="danger" onClick={this.onSubmit} href="#">Login</Button>
                <Button className="modalLoginButton" variant="danger" onClick={this.onClickRegister} href="#">Register</Button>
          </Row>
           <Row>
                <div className="loginModalFooter">{(this.state.showEmailMessage ? this.props.message2: this.props.message)}</div>
                <br /><br/>
            </Row>
          
          <Row>
              <a className="forgotPasswordLink" onClick={this.onClickForgot} href="#">Forgot password?</a>
          </Row>

        </Modal.Body>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
    return {
        message: state.loginReducer.message,
        message2: state.emailReducer.emailResult
    }
}
export default connect(mapStateToProps, { login, sendMailReset, startRegistering })(LoginModal);

