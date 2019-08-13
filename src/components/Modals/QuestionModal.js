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

import { addQuestion, editQuestion, hideQuestionModal, showCategoryModal, hideCategoryModal } from '../../actions/VoteActions';

import stars from '../../images/voterfied_stars.png';
import add from "../../images/icons/add.jpg";
import CategoryModal from './CategoryModal';


class QuestionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [],
            header: "Modify Question"
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelectType = this.onSelectType.bind(this);
        this.onSelectCat = this.onSelectCat.bind(this);
        this.onSelectStartDate = this.onSelectStartDate.bind(this);
        this.onSelectEndDate = this.onSelectEndDate.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
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
            return new Date(parseInt(String(dateVal).substring(0, 4)),
                parseInt(String(dateVal).substring(5, 7)),
                parseInt(String(dateVal).substring(8, 10)));
        }

    }

    isEditing() {
        return (this.props.currentQuestion.id === 0 ? false : true);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.currentQuestion !== this.props.currentQuestion ) {
            this.setState({
                "categoryId": newProps.currentQuestion.categoryId,
                "questionType": newProps.currentQuestion.questionType.id,
                "startDate": this.formatDate(newProps.currentQuestion.startDate),
                "endDate": this.formatDate(newProps.currentQuestion.endDate)
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
                var l = answers[apos];

                if (!l.id || isNaN(l.id)) {
                    l.id = 0;
                }
                if (!l.questionID) {
                    l.questionID = this.props.currentQuestion.id;
                }
            }
        }

        // Grab links out of grid
        if (this.props.currentQuestion.links) {
            var list = this.props.currentQuestion.links;

            for (var pos = 0; pos < list.length; pos++) {
                var l = list[pos];

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
            
            if (this.state.isAnonymous) {
                question.isAnonymous = this.state.isAnonymous;
            }

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
        this.setState({ [e.target.id]: e.target.value.trim() });
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

        if (this.state.startDate &&
            this.state.startDate < today) {
            return true;
        }
        return false;
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
        for (var i = 0; i < this.props.categories.length; i++) {
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
                            <CheckBox value={this.state.isAnonymous} defaultValue={data.isAnonymous} />
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
                            <Label>Answers: </Label>
                            
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
                            <Label>Answers: </Label>
                            <textarea disabled={this.props.showCategoryForm || this.isLiveQuestion()} rows="5" cols="50" className="modal-longbox" id='answers' onChange={this.onChange} defaultValue={tempAnswers} value={this.state.answers} onKeyDown={this.onKeyDown} />
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
        showCategoryForm: state.voteReducer.showCategoryForm
    }
}
export default connect(mapStateToProps, { addQuestion, editQuestion, hideQuestionModal, showCategoryModal, hideCategoryModal })(QuestionModal);

