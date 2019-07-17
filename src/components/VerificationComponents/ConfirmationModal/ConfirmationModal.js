import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux'
import './ConfirmationModal.css';
import { confirmVoter } from '../../../actions/LoginActions';
import stars from '../../../images/voterfied_stars.png';

class ConfirmationModal extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    };

    onClick = (e) => {
        // Activate the user as a verified voter
        this.props.confirmVoter(this.props.user, this.props.voter);
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
                    <h1 className="loginModalHeader">IS THIS YOU?</h1><center>
                        <div className="float-center"><img src={stars} alt="" /></div>
                        <br />
                    </center>
                    <Form.Group as={Row}>                        
                        <center><div class="medium">{this.props.voter.firstName} {this.props.voter.lastName} of {this.props.voter.city}, {this.props.voter.stateProv}</div></center>
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
        voter: state.loginReducer.voter,
        user: state.loginReducer.user
    }
}

// TODO: this will need to connect to the voting screen
export default connect(mapStateToProps, { confirmVoter })(ConfirmationModal);

