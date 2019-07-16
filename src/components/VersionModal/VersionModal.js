import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import "../../App.css";

class VersionModal extends React.Component {
   
    render() {
        return (
            <Modal
                {...this.props}                
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered   >
                <Modal.Body className="versionModal">
                    <div className="App-header">
                        <Form.Group as={Row}>
                            <div className="largetext">Version Information</div>                    
                        </Form.Group>

                        <Form.Group as={Row}>
                                <div className="mediumtext">Version Number: <b>{this.props.versionNumber}</b></div>
                        </Form.Group>
                        <Form.Group as={Row}>
                                <div className="mediumtext">Build Date: <b>{this.props.buildDate}</b></div>
                        </Form.Group>
                        <Form.Group as={Row}>
                                <div className="mediumtext">Assembly Name: <b>{this.props.assemblyName}</b></div>    
                            </Form.Group>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        versionNumber: state.versionReducer.versionNumber,
        buildDate: state.versionReducer.buildDate,
        assemblyName: state.versionReducer.assemblyName
    }
}

// TODO: this will need to connect to the voting screen
export default connect(mapStateToProps, {  })(VersionModal);

