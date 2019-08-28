import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import Label from 'react-bootstrap/FormLabel';
import { addCustomer, editCustomer, hideCustomerForm } from '../../actions/CustomerActions';
import { emptyCustomer } from '../../constants/ActionConstants';
import './Modal.css';
import stars from '../../images/voterfied_stars.png';
import { showConfigForm, getConfig } from '../../actions/CustomerActions';

class CustomerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerName: '',
            logoURL: '',
            bioStatement: '',
            donateURL: '',
            headshotURL: '',
            location: '',
            title: '',
            volunteerURL: '',
            website: '',
            header: "Save Customer"
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.onClickConfig = this.onClickConfig.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    isEditing() {
        return (this.props.currentCustomer && this.props.currentCustomer.id !== 0 ? true : false) ;
    }

    onSubmit = () => {
        var customer = this.props.currentCustomer;

        if (!this.isEditing()) {
            customer = {
                id: 0,
                name : this.state.customerName,
                title : this.state.title,
                location : this.state.location,
                logoURL : this.state.logoURL,
                bioStatement : this.state.bioStatement,
                donateURL : this.state.donateURL,
                headshotURL : this.state.headshotURL,
                volunteerURL : this.state.volunteerURL,
                website : this.state.website,
                createdDate: new Date(),
                modifiedDate: new Date(),
                ts: "QEA="
            }
            this.props.addCustomer(this.props.logintoken, customer);

        } else {
            
            if (this.state.customerName && this.state.customerName.length > 0) {
                customer.name = this.state.customerName;
            }
            if (this.state.title && this.state.title.length > 0) {
                customer.title = this.state.title;
            }
            if (this.state.location && this.state.location.length > 0) {
                customer.location = this.state.location;
            }
            if (this.state.logoURL && this.state.logoURL.length >= 0) {
                customer.logoURL = this.state.logoURL;
            }
            if (this.state.bioStatement && this.state.bioStatement.length > 0) {
                customer.bioStatement = this.state.bioStatement;
            }
            if (this.state.donateURL && this.state.donateURL.length > 0) {
                customer.donateURL = this.state.donateURL;
            }
            if (this.state.headshotURL && this.state.headshotURL.length > 0) {
                customer.headshotURL = this.state.headshotURL;
            }
            if (this.state.volunteerURL && this.state.volunteerURL.length > 0) {
                customer.volunteerURL = this.state.volunteerURL;
            }
            if (this.state.website && this.state.website.length > 0) {
                customer.website = this.state.website;
            }
            customer.modifiedDate = new Date();

            this.props.editCustomer(this.props.logintoken, customer);
        }
    }

    onClickCancel = () => {
        this.props.hideCustomerForm();
    }

    onClickConfig = () => {        
        this.props.showConfigForm();
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value.trim() });
    }

    render() {
        var data = this.props.currentCustomer;
        if (!data) {
            data = emptyCustomer;
        }

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
                            <Label>Customer Name: </Label>
                            <Form.Control type='email' id='customerName' onChange={this.onChange} defaultValue={data.name} value={this.props.name} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Location: </Label>
                            <Form.Control type='text' id='location' onChange={this.onChange} defaultValue={data.location} value={this.props.location} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Title: </Label>
                            <Form.Control type='text' id='title' onChange={this.onChange} defaultValue={data.title} value={this.props.title} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Logo URL: </Label>
                            <Form.Control type='text' id='logoURL' onChange={this.onChange} defaultValue={data.logoURL} value={this.props.logoURL} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Donate URL: </Label>
                            <Form.Control type='email' id='donateURL' onChange={this.onChange} defaultValue={data.donateURL} value={this.props.donateURL} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Headshot URL: </Label>
                            <Form.Control type='text' id='headshotURL' onChange={this.onChange} defaultValue={data.headshotURL} value={this.props.headshotURL} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Volunteer URL: </Label>
                            <Form.Control type='text' id='volunteerURL' onChange={this.onChange} defaultValue={data.volunteerURL} value={this.props.volunteerURL} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Website: </Label>
                            <Form.Control type='text' id='website' onChange={this.onChange} defaultValue={data.website} value={this.props.website} />
                        </Form.Group>                       
                        <Label>Biography: </Label>
                    </div>
                    <Form.Group>
                        
                        <textarea rows="10" cols="110" className="modal-longbox" id='bioStatement' onChange={this.onChange} defaultValue={data.bioStatement} value={this.props.bioStatement} />
                    </Form.Group>

                    <Row>
                        <Button className={this.isEditing() ? "modalLoginButton" : "hidden"} variant="danger" onClick={this.onClickConfig} href="#">Configure</Button>                        
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
        currentCustomer: state.customerReducer.currentCustomer,
        customers: state.customerReducer.customerList,
        configFormVisible: state.customerReducer.configFormVisible
    }
}
export default connect(mapStateToProps, { addCustomer, editCustomer, hideCustomerForm, showConfigForm, getConfig  })(CustomerModal);

