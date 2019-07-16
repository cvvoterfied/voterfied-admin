import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux'
import './VerificationMessageModal.css';

class VerificationMessageModal extends React.Component {
    constructor(props) {
        super(props);        
    };

    render() {
        return (
            <Modal
                {...this.props}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Body>
                    <h3 className="loginModalHeader">We are verifying and securing your information</h3>
                    <Form.Group as={Row}>
                        <Form.Label >
                            Please Wait
                        </Form.Label>
                    </Form.Group>                    

                </Modal.Body>
            </Modal>
        );
    }
}
