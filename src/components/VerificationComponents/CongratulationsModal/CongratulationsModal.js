import React from 'react';
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CongratulationsModal.css';
import { doneRegistering } from '../../../actions/LoginActions';
import { serverEnvironment } from '../../../constants/ActionConstants';
import stars from '../../../images/voterfied_stars.png';

class CongratulationsModal extends React.Component {
    constructor(props) {
        super(props);
                
        this.onClick = this.onClick.bind(this);
    };    

    onClick = (e) => {
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
                    <h1 className="loginModalHeader">CONGRATULATIONS!</h1><center>
                        <div className="float-center"><img src={stars} alt="" /></div>
                        <br />
                        <br/>
                        <Row>
                        <Col>
                            <img src={serverEnvironment.API_URL + '/Resources/CongratulationsLeft.png'} height="80"  alt=""/>
                            <img src={serverEnvironment.API_URL + '/Resources/Congratulations.png'} height="80" alt="" />
                            <img src={serverEnvironment.API_URL + '/Resources/CongratulationsRight.png'} height="80" alt="" />
                         </Col>
                            </Row>
                    </center>
                    <br/>
                    <Row>                        
                         <div className="medium">Your Voterfied account has been verified!</div>                        
                    </Row>
                    <br/>
                    <Row>                        
                        <div className="small">Your information is fully secured and you may begin voting on issues.</div>                        
                    </Row>                    
                    <Row>
                        <Button className="modalContinueButton" variant="danger" href="#" onClick={this.onClick}>Go Vote</Button>
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

// TODO: this will need to connect to the voting screen
export default connect(mapStateToProps, { doneRegistering })(CongratulationsModal);

