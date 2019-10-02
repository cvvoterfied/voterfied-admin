import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import Label from 'react-bootstrap/FormLabel';
import './Modal.css';
import Select from 'react-styled-select';
import DatePicker from 'react-datepicker';
import CheckBox from 'react-bootstrap/FormCheckInput';
import "react-datepicker/dist/react-datepicker.css";
import DataGrid, { Editing, Texts, Scrolling, Sorting, Column } from 'devextreme-react/data-grid';

import { addQuestion, editQuestion, hideQuestionModal, showCategoryModal, hideCategoryModal, setDonatePreference } from '../../actions/VoteActions';

import stars from '../../images/voterfied_stars.png';
import add from "../../images/icons/add.jpg";
import CategoryModal from './CategoryModal';


class QuestionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [],            
            header: "Save Question",
            isAnonymous: false,
            hideResults: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelectType = this.onSelectType.bind(this);
        this.onSelectCat = this.onSelectCat.bind(this);
        this.onSelectStartDate = this.onSelectStartDate.bind(this);
        this.onSelectEndDate = this.onSelectEndDate.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        this.onClickAnonymous = this.onClickAnonymous.bind(this);
        this.onClickHideResults = this.onClickHideResults.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.selectedAnswer = this.selectedAnswer.bind(this);
    }

    showAddModal() {
        if (this.props.showCategoryForm) {
            this.props.hideCategoryModal();
        }
        else {
            this.props.showCategoryModal();
        }
    }

    formatDate(dateVal) {
        if (dateVal) {            
            var ret = new Date(Date.parse(dateVal));
            return ret;
        }
        // YYYY-MM-DD
        // 0123456789
    }

    isEditing() {
        return (this.props.currentQuestion.id === 0 ? false : true);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.currentQuestion !== this.props.currentQuestion) {
            this.setState({
                "categoryId": newProps.currentQuestion.categoryId,
                "questionType": newProps.currentQuestion.questionType.id,
                "question": newProps.currentQuestion.name,
                "startDate": this.formatDate(newProps.currentQuestion.startDate),
                "endDate": this.formatDate(newProps.currentQuestion.endDate),
                "pros": newProps.currentQuestion.pros,
                "cons": newProps.currentQuestion.cons,
                "candidateOpinion": newProps.currentQuestion.candidateOpinion,
                "ordinal": newProps.currentQuestion.ordinal,
                "hideResults": newProps.currentQuestion.hideResults,
                "isAnonymous": newProps.currentQuestion.isAnonymous
            });
        }
        if (newProps.currentOpinion !== this.props.currentOpinion) {
            this.setState({
                "choiceid": newProps.currentOpinion.choiceid
            });
        }
    }

    onKeyDown(event) {
        if ((event.which === 13) ) {
            event.preventDefault();
            this.setState({
                "answers": this.state.answers + "\r"
            });
        }
    }

    onSubmit = () => {
        var question = {};
        var answers = [];
        var opinion = {};

        if (this.state.answers) {
            // Get the new answers from the text box
            var list = this.state.answers.split("\n");
            var ordinal = 1;

            for (var i = 0; i < list.length; i++ , ordinal++) {
                if (list[i] && list[i].length > 0) {
                    answers.push({ id: 0, name: list[i], ordinal });
                }
            }
        }
        else {
            // Get answers out of grid
            answers = this.props.currentQuestion.answers;

            for (var apos = 0; apos < answers.length; apos++) {
                var a = answers[apos];

                if (!a.id || isNaN(a.id)) {
                    a.id = 0;
                }
                if (!a.questionID) {
                    a.questionID = this.props.currentQuestion.id;
                }
            }
        }

        // Grab links out of grid
        if (this.props.currentQuestion.links) {
            var links = this.props.currentQuestion.links;

            for (var pos = 0; pos < links.length; pos++) {
                var l = links[pos];

                if (!l.id || isNaN(l.id)) {
                    l.id = 0;
                }
                if (!l.questionId) {
                    l.questionId = this.props.currentQuestion.id;
                }
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
                pros: (this.state.pros ? this.state.pros : ""),
                cons: (this.state.cons ? this.state.cons : ""),
                candidateOpinion: (this.state.candidateOpinion ? this.state.candidateOpinion : ""),
                answers: answers,
                ordinal: (this.state.ordinal ? this.state.ordinal : 1),
                isAnonymous: (this.state.isAnonymous ? this.state.isAnonymous : false),
                hideResults: (this.state.hideResults ? this.state.hideResults: false),
                createdDate: new Date(),
                modifiedDate: new Date(),
                ts: "QEA="
            }
            this.props.addQuestion(this.props.logintoken, question);

        } else {

            
            
            question = this.props.currentQuestion;
            opinion = this.props.currentOpinion;
            var donateLink = document.getElementById("donateLink").value;
            var choiceText = document.querySelector(".opinionSelect").textContent;
        



            if (!opinion.choiceid) {
                if (this.state.choiceid && donateLink) {
                    this.props.setDonatePreference(this.props.logintoken, this.props.currentCustomer.id, this.props.currentQuestion.id, this.state.choiceid, choiceText, donateLink);
                }
                else if (this.state.choiceid && !donateLink || (!this.state.choiceid && donateLink)) {
                    alert("Please select an option for both fields");
                }
            }

            if (opinion.choiceid) {
                if (this.state.choiceid && donateLink) {
                    if (this.state.choiceid != this.props.currentOpinion.choiceid) {
                        this.props.setDonatePreference(this.props.logintoken, this.props.currentCustomer.id, this.props.currentQuestion.id, this.state.choiceid, choiceText, donateLink);
                    }
                    else alert("This donation preference is already active");
                }
                else if ((this.state.choiceid && !donateLink) || (!this.state.chioceid && donateLink)) {
                    alert("Please select an option for both fields");
                }
            }


            if (this.state.question && this.state.question.length > 0) {
                question.name = this.state.question;
            }
            if (this.state.questionType) {
                question.questionType = { id: this.state.questionType, name: '' };
            }           
            if (this.state.startDate) {
                question.startDate = this.state.startDate;
            }
            if (this.state.endDate) {
                question.endDate = this.state.endDate;
            }
            if (this.state.categoryId && this.state.categoryId > 0) {
                question.categoryId = this.state.categoryId;
                if (!question.categoryId || question.categoryId === 0) {
                    // TODO: Need the option to add a new category and then use the new category ID
                    // 
                    console.log("Non-existent category")
                }
            }
            if (this.state.pros && this.state.pros.length > 0) {
                question.pros = this.state.pros;
            }
            else {
                question.pros = "";
            }
            if (this.state.cons && this.state.cons.length > 0) {
                question.cons = this.state.cons;
            }
            else {
                question.cons = "";
            }
            if (this.state.candidateOpinion && this.state.candidateOpinion.length > 0) {
                question.candidateOpinion = this.state.candidateOpinion;
            } else {
                question.candidateOpinion = "";
            }
            
            if (this.state.isAnonymous) {
                question.isAnonymous = this.state.isAnonymous;
            }

            if (this.state.hideResults) {
                question.hideResults = this.state.hideResults;
            }

            if (this.state.ordinal && this.state.ordinal > 0) {
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
        this.setState({ [e.target.id]: e.target.value.trim() });
    }

    onClickAnonymous = (e) => {
        this.setState({ 'isAnonymous': e.target.checked });
    }

    onClickHideResults = (e) => {
        this.setState({ 'hideResults': e.target.checked });
    }

    onSelectType = (e) => {
        this.setState({ "questionType": e });
        if (e === 1) {
            this.setState({ "answers": "Yes\nNo\n" });
        }
        else {
            this.setState({ "answers": "" });
        }
    }

    onSelectOpinion = (e) => {
        this.setState({ "choiceid": e });
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

    customizeAnswerColumns(columns) {
        columns[0].width = 40;
        columns[1].width = 100;
        columns[2].width = 100;
    }

    customizeColumns(columns) {
        columns[0].width = 120;
        columns[1].width = 100;
    }

    isLiveQuestion() {
        var today = new Date();

        if (this.isEditing() &&
            this.state.startDate &&
            this.state.startDate < today) {
            return true;
        }
        return false;
    }

    selectedAnswer() {
        // Check the selected answer from the redux store 
        // Iterate through the Potential Answers from the question
        // If the answer matches that which is stored in redux, Return that value to be used within the component 
        var answers = this.props.answers; 
        for (var x = 0; x < answers.length; x++) {
            if (answers[x].questionID === this.props.currentOpinion.questionId && String(answers[x].id) === this.props.currentOpinion.choiceid) {
                return answers[x].name;
                break;
            }
            else {
                return;
            }
        }

    }

    render() {
        var data = this.props.currentQuestion;
        var setAnswer = this.props.currentOpinion;
        
        // Convert answer list into flat string
        var tempAnswers = '';
        for (var j = 0; j < data.answers.length; j++) {
            if (data.answers[j].name && data.answers[j].name.length > 0) {
                tempAnswers = tempAnswers + data.answers[j].name + "\r\n" ;
            }
        }

        // Load combo box with categories
        var cats = [];
        for (var i = 0; i < this.props.categories.length; i++) {
            cats.push({ "label": this.props.categories[i].name, "value": this.props.categories[i].id });
        }

        // Load combo box with Answers
        var answers = [];
        for (var i = 0; i < this.props.answers.length; i++) {
            answers.push({ "label": this.props.answers[i].name, "value": String(this.props.answers[i].id) })
        }

        //function answerOptions (answerset, compare) {
        //    const answers = answerset; 
        //    return (
        //        <Form.Control className="red-theme" as="select">
        //            {answers.map((answer) => answer.id == compare.choiceid ? (<option selected value={answer.id}>{answer.name}</option>) : (<option selected value={answer.id}>{answer.name}</option>))}
        //        </Form.Control>
        //        );
        //}

        // Question Types
        var items =
            [
                { "label": "Yes/No", "value": 1 },
                { "label": "Multiple Choice", "value": 2},
                { "label": "Ranked Choice", "value": 3 }
                //,{ "label": "Cascading", "value": 4 }
            ];
        
        return (
            <Modal
                {...this.props}
                size='lg'
                
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Body className="questionModal">
                    <h1 className="loginModalHeader">{this.state.header}</h1>
                    <center>
                        <div className="float-center"><img src={stars} alt="" /></div>
                    </center><br />

                    <div className="userLoginForm" id='questionModal'>
                        <Form.Group>
                            <Label>Question: </Label>
                            <Form.Control disabled={this.props.showCategoryForm} type='text' id='question' onChange={this.onChange} defaultValue={data.name} value={this.props.name} />
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
                                disabled={this.props.showCategoryForm}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Label>Start Date: </Label><br/>
                            <DatePicker disabled={this.props.showCategoryForm} id="startDate" defaultValue={this.state.startDate} selected={this.state.startDate} onSelect={this.onSelectStartDate}/>
                        </Form.Group>
                        <Form.Group>
                            <Label>End Date: </Label><br />
                            <DatePicker disabled={this.props.showCategoryForm} id="endDate" defaultValue={this.state.endDate} selected={this.state.endDate} onSelect={this.onSelectEndDate}/>
                        </Form.Group>

                        <Form.Group>
                            <Label>Category: </Label>
                            <Row>
                            <Col>
                                <Select
                                    className="red-theme"
                                    name="questionType"
                                    options={cats}
                                    defaultValue={cats.filter(option => option.value === data.categoryId)}
                                    value={this.state.categoryId}
                                    onChange={this.onSelectCat}
                                    />      
                                    <CategoryModal show={this.props.showCategoryForm} />

                            </Col>
                            <Col>
                                <button className="transparent" onClick={this.showAddModal}><img className="crudicons" src={add} height="20" alt="" /> </button>                           
                            </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Label>Is Anonymous Question: </Label><br />
                            <CheckBox checked={this.props.isAnonymous} defaultChecked={data.isAnonymous} onClick={this.onClickAnonymous} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Hide Results from Voters: </Label><br />
                            <CheckBox className={this.props.showCategoryForm ? "hidden" : ""} checked={this.props.hideResults} defaultChecked={data.hideResults} onClick={this.onClickHideResults} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Sort Order: </Label>
                            <Form.Control disabled={this.props.showCategoryForm} type='text' id='ordinal' onChange={this.onChange} defaultValue="1" value={this.props.ordinal} />
                        </Form.Group>

                        <Form.Group className={this.state.questionType === 1 ? "" : "hidden"}>
                            <Label>Pros: </Label><br/>
                            <textarea disabled={this.props.showCategoryForm} rows="5" cols="50" className="modal-longbox" id='pros' onChange={this.onChange} defaultValue={data.pros} value={this.props.pros} />
                        </Form.Group>
                        <Form.Group className={this.state.questionType === 1 ? "" : "hidden"}>
                            <Label>Cons: </Label><br/>
                            <textarea disabled={this.props.showCategoryForm} rows="5" cols="50" className="modal-longbox" id='cons' onChange={this.onChange} defaultValue={data.cons} value={this.props.cons} />
                        </Form.Group>
                        <Form.Group>
                            <Label>Candidate's Opinion: </Label><br/>
                            <textarea disabled={this.props.showCategoryForm} rows="5" cols="50" className="modal-longbox" id="candidateOpinion" onChange={this.onChange} defaultValue={data.candidateOpinion} value={this.props.candidateOpinion} />
                        </Form.Group>

                        <Form.Group className={this.isEditing() && !this.isLiveQuestion()  ? "" : "hidden"}>
                            <Label>Answers: </Label><br/>
                            
                            <DataGrid className="editGroup" elementAttr={{ id: 'gridAnswers' }}
                                dataSource={this.props.currentQuestion.answers}
                                keyExpr={'id'}
                                showBorders={true}
                                customizeColumns={this.customizeAnswerColumns}>
                                <Editing 
                                    mode={'row'}
                                    allowUpdating={true}
                                    allowDeleting={true}
                                    allowAdding={true}
                                >
                                    <Texts
                                        confirmDeleteMessage=""
                                    />
                                </Editing>
                                <Column
                                    dataField={"ordinal"}
                                    caption="Order"
                                    dataType={"number"}
                                    alignment={"center"}
                                />
                                <Column
                                    dataField={"name"}
                                    caption="Answer"
                                    dataType={"string"}
                                    alignment={"left"}
                                />     
                                <Column
                                    dataField={"metadata"}
                                    caption="Additional Info"
                                    dataType={"string"}
                                    alignment={"left"}
                                />
                            </DataGrid>

                        </Form.Group>

                        <Form.Group className={ this.isEditing() && !this.isLiveQuestion() ? "hidden" : ""}>
                            <Label>Answers: </Label><br/>
                            <textarea disabled={this.props.showCategoryForm || this.isLiveQuestion()} rows="5" cols="50" className="modal-longbox" id='answers' onChange={this.onChange} defaultValue={tempAnswers} value={this.isLiveQuestion() ? tempAnswers : this.state.answers} onKeyDown={this.onKeyDown} />
                        </Form.Group>

                        <Form.Group className={this.isEditing()? "" : "hidden"}>
                            <Label>Links: </Label>
                            <DataGrid className="editGrid" elementAttr={{ id: 'gridContainer' }}
                                dataSource={this.props.currentQuestion.links}
                                keyExpr={'id'}                                
                                showBorders={true}
                                
                                customizeColumns={this.customizeColumns}>
                                <Sorting mode={'single'} />   
                                <Scrolling mode={'infinite'} />
                                <Editing
                                    mode={'row'}
                                    allowUpdating={true}
                                    allowDeleting={true}
                                    allowAdding={true}
                                >                                
                                <Texts
                                    confirmDeleteMessage=""
                                    />                                    
                                </Editing>

                                <Column
                                    dataField={"linkURL"}
                                    caption={"URL"}
                                    dataType={"string"}
                                    alignment={"left"}
                                    sortable={"true"}
                                />
                                <Column
                                    dataField={"name"}
                                    caption={"Title"}
                                    dataType={"string"}
                                    alignment={"left"}
                                    sortable={"true"}
                                />
                            </DataGrid>
                        </Form.Group>

                        <Form.Group>
                            <Label>Donate Preference: </Label>
                            <Row>
                                <Col>
                                    <Select 
                                        className="red-theme opinionSelect"
                                        name="donatePreference"
                                        options={answers}
                                        defaultValue={setAnswer ? answers.filter(option => option.value === setAnswer.choiceid) : ""}
                                        value={this.state.choiceid}
                                        onChange={this.onSelectOpinion}
                                    />
                                    
                                </Col>
                                <Col>
                                    <input type="text" name="donateLink" id="donateLink" placeholder="Donation Link" defaultValue={(this.props.currentOpinion && this.props.currentOpinion.donateURL) ? this.props.currentOpinion.donateURL : ""}/>
                                </Col>
                            </Row>
                        </Form.Group>
                    </div>
                    <Row>
                        <Button className="modalLoginButton" variant="danger" onClick={this.onSubmit} href="#">Save</Button>
                        <Button className="modalLoginButton" variant="danger" onClick={this.onClickCancel} href="#">Cancel</Button>
                    </Row>
                    <Row>
                        <br /><br />
                        <div className="loginModalFooter">{this.props.message}</div>
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
        currentQuestion: state.voteReducer.currentQuestion,
        customers: state.customerReducer.customerList,
        categories: state.voteReducer.categories,
        showCategoryForm: state.voteReducer.showCategoryForm,
        customerId: state.voteReducer.currentQuestion.customerID,
        questionId: state.voteReducer.currentQuestion.id,
        answers: state.voteReducer.currentQuestion.answers,
        currentOpinion: state.voteReducer.currentOpinion
    }
}
export default connect(mapStateToProps, { addQuestion, editQuestion, hideQuestionModal, showCategoryModal, hideCategoryModal, setDonatePreference })(QuestionModal);

