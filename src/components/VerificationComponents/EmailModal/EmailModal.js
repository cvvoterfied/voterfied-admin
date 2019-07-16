import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux'
import { sendMail } from '../../../actions/EmailActions';
import { doneRegistering } from '../../../actions/LoginActions';
import { serverEnvironment } from '../../../constants/ActionConstants';
import './EmailModal.css';

class EmailModal extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);        
    };

    onClick = (e) => {
        // Resend email
        this.props.sendMail(this.props.email, 'Welcome to Voterfied!', 'Please verify your email address by clicking the link below.');
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
                centered   >        
                <Modal.Body>
                    <h3 className="loginModalHeader">A verification link has been sent to <br /><b>{this.props.email}</b></h3>
                    <br/>
                        <center>
                            <img src={serverEnvironment.API_URL + "/Resources/emailLogo.png"} height="50" alt="" />
                        </center>
                    <br/>
                    <Row>                        
                        <div className="medium">Use the button below if you haven't yet received your verification email</div>                        
                     </Row>
                    <br/>
                    <Row>
                        <center><div className="loginModalFooter">{this.props.message}</div></center>
                    </Row>
                    <Row>
                        <Button className="modalContinueButton" variant="danger" href="#" onClick={this.onClick}>Resend</Button>
                        <Button className="modalContinueButton" variant="danger" href="#" onClick={this.onClickCancel}>Cancel</Button>

                    </Row>

                </Modal.Body>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.emailReducer.emailResult
        }
    }
            
export default connect(mapStateToProps, { sendMail, doneRegistering } )(EmailModal);
        
