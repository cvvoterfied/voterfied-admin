import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import Label from 'react-bootstrap/FormLabel';
import { addQuestion, editQuestion, hideQuestionModal } from '../../actions/VoteActions';
import './Modal.css';
import stars from '../../images/voterfied_stars.png';
import Select from 'react-styled-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class QuestionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoginName: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            password2: '',
            forcePasswordChange: false,
            userRole: 2,
            customers: [],
            header: "Modify Question"
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelectType = this.onSelectType.bind(this);
        this.onSelectCat = this.onSelectCat.bind(this);
        this.onSelectStartDate = this.onSelectStartDate.bind(this);
        this.onSelectEndDate = this.onSelectEndDate.bind(this);
    }

    isEditing() {
        return (this.state.id === 0 ? false : true)
            ;
    }

    onSubmit = () => {
        var question = {};
        var answers = [];
        var list = this.state.answers.split("\r\n");
        var ordinal = 1;

        for (var i = 0; i < list.length; i++ , ordinal++) {
            if (list[i].name && list[i].name.length > 0) {
                answers.push({ id: 0, name: list[i], ordinal });
            }
        }        

        if (!this.isEditing()) {
            question = {
                id: 0,
                name: this.state.question,
                customerID: this.props.currentCustomer.id,
                questionType: { id: this.state.questionType, name: '' },
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                categoryId: this.state.categoryId,
                pros: this.state.pros,
                cons: this.state.cons,
                candidateOpinion: this.state.candidateOpinion,
                answers: answers,
                ordinal: this.state.ordinal,
                createdDate: new Date(),
                modifiedDate: new Date(),
                ts: "QEA="
            }
            this.props.addQuestion(this.props.logintoken, question);

        } else {

            
            question = this.props.currentQuestion;

            if (this.state.question && this.state.question.length > 0) {
                question.name = this.state.question;
            }
            if (this.state.questionType && this.state.questionType.length > 0) {
                question.questionType = { id: this.state.questionType, name: '' };
            }           
            if (this.state.startDate && this.state.startDate.length > 0) {
                question.startDate = this.state.startDate;
            }
            if (this.state.endDate && this.state.endDate.length > 0) {
                question.endDate = this.state.endDate;
            }
            if (this.state.categoryId && this.state.categoryId.length > 0) {
                question.categoryId = this.state.categoryId;
                if (!question.categoryId || question.categoryId === 0) {
                    // TODO: Need the option to add a new category and then use the new category ID
                    // 
                }
            }
            if (this.state.pros && this.state.pros.length > 0) {
                question.pros = this.state.pros;
            }
            if (this.state.cons && this.state.cons.length > 0) {
                question.cons = this.state.cons;
            }
            if (this.state.candidateOpinion && this.state.candidateOpinion.length > 0) {
                question.candidateOpinion = this.state.candidateOpinion;
            }
            question.answers = answers;

            if (this.state.ordinal && this.state.ordinal.length > 0) {
                question.ordinal = this.state.ordinal;
            }
                   
            question.modifiedDate = new Date();            

            this.props.editQuestion(this.props.logintoken, question);
        }
    }

    onClickCancel = () => {
        this.props.hideQuestionModal();
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSelectType = (e) => {
        this.setState({ "questionType": e });
        if (e === 1) {
            this.setState({"answers": "Yes\r\nNo\r\n"});
        }
    }

    onSelectCat = (e) => {
        this.setState({ "categoryId": e });
    }

    onSelectStartDate = (e) => {
        this.setState({ "startDate": e });
    }

    onSelectEndDate = (e) => {
        this.setState({ "endDate": e });
    }

    render() {

        var data = this.props.currentQuestion;

        // Convert answer list into flat string
        var tempAnswers = '';
        for (var j = 0; j < data.answers.length; j++) {
            if (data.answers[j].name && data.answers[j].name.length > 0) {
                tempAnswers = tempAnswers + data.answers[j].name + "\r\n" ;
            }
        }

        // Load combo box with categories
        var cats = [];
        for (var i = 0; i < this.props.categories; i++) {
            cats.push({ "label": this.props.categories[i].name, "value": this.props.categories[i].id });
        }

        // Question Types
        var items =
            [
                { "label": "Yes/No", "value": 1 },
                { "label": "Multiple Choice", "value": 2},
                { "label": "Ranked Choice", "value": 3 },
                { "label": "Cascading", "value": 4 }
            ];

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
                            <Label>Question: </Label>
                            <Form.Control type='email' id='userLoginName' onChange={this.onChange} defaultValue={data.name} value={this.props.name} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Question Type: </Label>
                            <Select
                                className="red-theme"
                                name="questionType"
                                options={items}                                
                                defaultValue={items.filter(option => option.value === data.questionType.id)}
                                value={this.state.questionType}
                                onChange={this.onSelectType}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Label>Start Date: </Label><br/>
                            <DatePicker id="startDate" defaultValue={data.startDate} selected={this.state.startDate} onSelect={this.onSelectStartDate}/>
                        </Form.Group>
                        <Form.Group>
                            <Label>End Date: </Label><br />
                            <DatePicker id="endDate" defaultValue={data.endDate} selected={this.state.endDate} onSelect={this.onSelectEndDate}/>
                        </Form.Group>

                        <Form.Group>
                            <Label>Category: </Label>
                            <Select
                                className="red-theme"
                                name="questionType"
                                options={cats}
                                value={data.categoryId}
                                onChange={this.onSelectCat}
                            />
                            
                        </Form.Group>
                        <Form.Group>
                            <Label>Sort Order: </Label>
                            <Form.Control type='text' id='ordinal' onChange={this.onChange} defaultValue="1" value={this.props.ordinal} />
                        </Form.Group>

                        <Form.Group>
                            <Label>Pros: </Label>
                            <textarea rows="5" cols="50" className="modal-longbox" id='pros' onChange={this.onChange} defaultValue={data.pros} value={this.props.pros} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Cons: </Label>
                            <textarea rows="5" cols="50" className="modal-longbox" id='cons' onChange={this.onChange} defaultValue={data.cons} value={this.props.cons} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Candidate's Opinion: </Label>
                            <textarea rows="5" cols="50" className="modal-longbox" id="candidateOpinion" onChange={this.onChange} defaultValue={data.candidateOpinion} value={this.props.candidateOpinion} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Answers: </Label>
                            <textarea rows="5" cols="50" className="modal-longbox" id='answers' onChange={this.onChange} defaultValue={tempAnswers} value={this.props.answers} />
                        </Form.Group>
                      
                    </div>
                    <Row>
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
        currentQuestion: state.voteReducer.currentQuestion,
        customers: state.customerReducer.customerList,
        categories: state.voteReducer.categories
    }
}
export default connect(mapStateToProps, { addQuestion, editQuestion, hideQuestionModal })(QuestionModal);

