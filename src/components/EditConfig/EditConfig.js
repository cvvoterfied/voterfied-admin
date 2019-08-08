import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux'
import './EditConfig.css';
import stars from '../../images/voterfied_stars.png';
import { showConfigForm, hideConfigForm, updateConfig, getConfig } from '../../actions/CustomerActions';

const ADMIN_TIMEOUT = "ADMIN TIMEOUT MINUTES";
const PORTAL_TIMEOUT = "PORTAL TIMEOUT MINUTES";

class EditConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adminTimeout: this.props.adminTimeout,
            portalTimeout: this.props.portalTimeout
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
    };


    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value.trim() });
    }

    onClick = (e) => {

        var adminTimeout = (this.state.adminTimeout ? this.state.adminTimeout : this.props.adminTimeout1);
        var portalTimeout = (this.state.portalTimeout ? this.state.portalTimeout : this.props.portalTimeout1);
        var adminRowID = this.getAdminConfigID();
        var portalRowID = this.getPortalConfigID();
        
        this.props.updateConfig(this.props.token,
            adminRowID,
            this.props.customer.id,
            ADMIN_TIMEOUT,
            adminTimeout);

        this.props.updateConfig(this.props.token,
            portalRowID,
            this.props.customer.id,
            PORTAL_TIMEOUT,
            portalTimeout);
        
    }

    onClickCancel = (e) => {
        this.props.hideConfigForm();
    }

    getAdminConfigID() {
        for (var i = 0; i < this.props.configData.length; i++) {
            if (this.props.configData[i].name === ADMIN_TIMEOUT && this.props.configData[i].customerID !== 0) {
                return this.props.configData[i].id;
            }
        }
        return 0;
    }

    getPortalConfigID() {
        for (var i = 0; i < this.props.configData.length; i++) {
            if (this.props.configData[i].name === PORTAL_TIMEOUT && this.props.configData[i].customerID !== 0) {
                return this.props.configData[i].id;
            }
        }
        return 0;
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
                    <h1 className="loginModalHeader">EDIT CONFIGURATION</h1>
                    <center>
                        <div className="float-center"><img src={stars} alt="" /></div>
                    </center><br />
                    <Form.Group as={Row}>
                        <Form.Label className="label" column sm={2}>
                            Admin Timeout (mins):
                    </Form.Label>
                        <Col sm={8}>
                            <Form.Control id="adminTimeout" placeholder="" onChange={this.onChange} value={this.props.adminTimeout} defaultValue={this.props.adminTimeout1} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label className="label" column sm={2}>
                            Portal Timeout (mins):
                    </Form.Label>
                        <Col sm={8}>
                            <Form.Control id="portalTimeout" placeholder="" onChange={this.onChange} value={this.props.portalTimeout} defaultValue={this.props.portalTimeout1} />
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
        message: state.customerReducer.lastError,
        user: state.loginReducer.user,
        token: state.loginReducer.loginToken,
        customer: state.customerReducer.currentCustomer,
        configData: state.customerReducer.configData
    }
}
export default connect(mapStateToProps, { showConfigForm, hideConfigForm, updateConfig, getConfig })(EditConfig);

