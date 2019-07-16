import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux'
import './VoterVerificationModal.css';
import { verifyVoter, doneRegistering } from '../../../actions/LoginActions';
import stars from '../../../images/voterfied_stars.png';
import Select from 'react-select';

class VoterVerificationModal extends React.Component {
    constructor(props) {
        super(props);
                
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);

        this.state = this.getInitialState();
    }; 

    getInitialState () {
        return {
            firstName: this.props.firstName1,
            lastName: this.props.lastName1,
            birthMonth: { value: "1", label: 'January' },
            birthDay: 1,
            birthYear: 1979,
            houseNumber: 0,
            zipCode: 0
        };
    }

    onChangeMonth = (e) => {
        this.setState({ "birthMonth": e });
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onClick = (e) => {
        // verify the user against the voter rolls.
        var firstName = this.state.firstName;
        var lastName = this.state.lastName;

        if (firstName === undefined || firstName === "")
            firstName = this.props.firstName1;
        if (lastName === undefined || lastName === "")
            lastName = this.props.lastName1;

        this.props.verifyVoter(firstName, lastName,
            this.state.birthMonth.value, this.state.birthDay, this.state.birthYear,
            this.state.houseNumber, this.state.zipCode);

    }

    onClickCancel = (e) => {
        this.props.doneRegistering();
    }

    render() {

        var options = [
            { value: "1", label: 'January' },
            { value: "2", label: 'February' },
            { value: "3", label: 'March' },
            { value: "4", label: 'April' },
            { value: "5", label: 'May' },
            { value: "6", label: 'June' },
            { value: "7", label: 'July' },
            { value: "8", label: 'August' },
            { value: "9", label: 'September' },
            { value: "10", label: 'October' },
            { value: "11", label: 'November' },
            { value: "12", label: 'December' }
        ];
        return (
            <Modal
                {...this.props}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Body>
                    <h1 className="loginModalHeader">VOTER INFO</h1><center>
                        <div className="float-center"><img src={stars} alt=""/></div>
                        <br />
                    </center>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Legal First Name
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control id="firstName" onChange={this.onChange} value={this.props.firstName} defaultValue={this.props.firstName1}/>
                        </Col>
                        <Form.Label column sm={2}>
                            Legal Last Name
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control id="lastName" onChange={this.onChange} value={this.props.lastName} defaultValue={this.props.lastName1}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Birth Month
                        </Form.Label>
                        <Col sm={8}>                            
                            <Select
                                name="birthMonth"
                                options={options}
                                value={this.state.birthMonth}
                                onChange={this.onChangeMonth}
                            /> 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Birth Day
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control id="birthDay" placeholder="Select Day" onChange={this.onChange} value={this.props.birthDay} />
                        </Col>
                        <Form.Label column sm={2}>
                            Birth Year
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control id="birthYear" placeholder="Select Year" onChange={this.onChange} value={this.props.birthYear} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                           House #
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control id="houseNumber" placeholder="House #" onChange={this.onChange} value={this.props.houseNumber} />
                        </Col>
                        <Form.Label column sm={2}>
                            Zip Code
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control id="zipCode" placeholder="zip code" onChange={this.onChange} value={this.props.zipCode} />
                        </Col>
                    </Form.Group>
                    <Row>
                        <div className="mediumtext">Ex. If you live on 13170 Ocean Dr, please only enter <b>13170</b>.</div>
                    </Row>
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

export default connect(mapStateToProps, { verifyVoter, doneRegistering } )(VoterVerificationModal);

