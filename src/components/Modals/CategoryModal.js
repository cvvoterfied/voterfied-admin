import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import Label from 'react-bootstrap/FormLabel';

import { addCategory, hideCategoryModal, enumCategories } from '../../actions/VoteActions';
import './Modal.css';

import "react-datepicker/dist/react-datepicker.css";

class CategoryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            header: "Add Category"
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit = () => {
        if (!this.state.categoryName || this.state.categoryName.length === 0) {
            alert("Please enter a category name");
            return;
        }
        if (!this.state.iconURL || this.state.iconURL.length === 0) {
            alert("Please enter an icon URL");
            return;
        }

        // Ensure this category doesn't already exist
        for (var n = 0; n < this.props.categories.length; n++) {
            if (this.props.categories[n].name === this.state.categoryName) {
                alert("Category " + this.state.categoryName + " already exists in the database.  Please change the name or cancel.");
                return;
            }
        }

        this.props.addCategory(this.props.logintoken, this.state.categoryName, this.state.iconURL);
        this.props.enumCategories();

        this.setState({
            categoryName: "",
            iconURL: ""
        });
    }

    onClickCancel = () => {     

        this.setState({
            categoryName: "",
            iconURL: ""
        });

        this.props.hideCategoryModal();
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value.trim() });
    }      

    render() {        

        return (
            <div className={this.props.show ? 'Modal' : 'hidden'}
                {...this.props}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <div className='Modal.Body'>
                    
                    <div className="userLoginForm">                        
                        <Form.Group>               
                            <br />
                            <Label>Category Name: </Label>
                            <Form.Control type='text' id='categoryName' onChange={this.onChange} defaultValue="" value={this.state.categoryName} />
                        </Form.Group>
                        <Form.Group>
                            <br />
                            <Label>Icon URL: </Label>
                            <Form.Control type='text' id='iconURL' onChange={this.onChange} defaultValue="" value={this.state.iconURL} />
                        </Form.Group>

                        
                    </div>
                    <Row>                        
                        <Button className="modalLoginButton" variant="danger" onClick={this.onSubmit} href="#">Save</Button>
                        <Button className="modalLoginButton" variant="danger" onClick={this.onClickCancel} href="#">Cancel</Button>
                    </Row>
                    <Row>
                        <div className="loginModalFooter">{this.props.message}</div>                        
                    </Row>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        logintoken: state.loginReducer.loginToken,
        message: state.loginReducer.message,
        categories: state.voteReducer.categories
            }
}
export default connect(mapStateToProps, { addCategory, hideCategoryModal, enumCategories })(CategoryModal);

