/* 
 * voteActions.js contains actions relating 
 * to displaying and casting votes
 * 
 * */

import { voteActionTypes, pending_function, rejected_function, fulfilled_function, serverEnvironment, loginActionTypes } from '../constants/ActionConstants';
import axios from 'axios';
export var axiosConfig = {
    headers: { 'token': '' }
};

/*
 * listCategories() returns the complete list of categories for this customer
 *
 * */
export function listCategories(customerId) {
    const { LIST_CATEGORIES } = voteActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(LIST_CATEGORIES));

        axios
            .get(serverEnvironment.API_URL + '/question/category/' +
                String(customerId))
            .then(res => {
                dispatch(fulfilled_function(LIST_CATEGORIES, res));
            })
            .catch(err => {
                dispatch(rejected_function(LIST_CATEGORIES, err));
            });
    };
}

/*
 * getFeaturedCategories() returns the top 4 categories to display on the homepage
 *
 * */
export function getFeaturedCategories(token, customerId, categoryId) {
    const { GET_FEATURED_CATS } = voteActionTypes;    
    
    return function (dispatch, getState) {
        dispatch(pending_function(GET_FEATURED_CATS));

        axiosConfig.headers.token = token;
        axios
            .get(serverEnvironment.API_URL + '/question/byCategory/' +
                String(customerId) + '/' +
                String(categoryId), axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(GET_FEATURED_CATS, res));
            })
            .catch(err => {                   
                dispatch(rejected_function(GET_FEATURED_CATS, err));
            });
    };
}

/*
 * listQuestionsByCategory() returns the questions in the given category
 *
 * */
export function listQuestionsByCategory(token, customerId, categoryId) {
    const { LIST_QUESTION_BYCAT } = voteActionTypes;
    const { LOGOUT } = loginActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(LIST_QUESTION_BYCAT));

        axiosConfig.headers.token = token;
        axios
            .get(serverEnvironment.API_URL + '/question/byCategory/' +
                String(customerId) + '/' + 
                String(categoryId), axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(LIST_QUESTION_BYCAT, res));
            })
            .catch(err => {    
                if (err.response.status === 401) {
                    dispatch(fulfilled_function(LOGOUT, err));
                }
                dispatch(rejected_function(LIST_QUESTION_BYCAT, err));
            });
    };
}

/*
 * listQuestions() returns all questions for this customer
 *
 * */
export function listQuestions(token, customerId) {
    const { LIST_QUESTION } = voteActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(LIST_QUESTION));

        axiosConfig.headers.token = token;
        axios
            .get(serverEnvironment.API_URL + '/question/unexpired/' +
                String(customerId) , axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(LIST_QUESTION, res));
            })
            .catch(err => {                
                dispatch(rejected_function(LIST_QUESTION, err));
            });
    };
}

/*
 * hideVoteScreen() displays or hides the voting page for the current question
 *
 * */
export function hideVoteScreen() {
    const { HIDE_VOTE_SCREEN } = voteActionTypes;

    return function (dispatch, getState) {
        dispatch(fulfilled_function(HIDE_VOTE_SCREEN));
    }
}

/*
 * goVote() displays the voting page for a given question
 *
 * */
export function goVote(currentQuestion) {
    const { GO_VOTE } = voteActionTypes;

    return function (dispatch, getState) {
        dispatch(fulfilled_function(GO_VOTE, currentQuestion));
    }
}

/*
 * castVote() is used to write a single vote
 * for a given question
 *
 * */
export function castVote(token, questionId, answerId,  userId, comment, rank) {
    console.log("Starting castVote...");
    return function (dispatch, getState) {
        const { CAST_VOTE } = voteActionTypes;
        const { LOGOUT } = loginActionTypes;

        var payload = {
            id: 0,
            name: '',
            createdDate: new Date(),
            modifiedDate: new Date(),
            ts: "QEA=",
            userLoginID: userId,
            questionID: questionId,
            question: "",
            answerID: answerId,
            answer: "",
            rank: rank,
            comment: comment
        };
        //console.log(payload);

        dispatch(pending_function(CAST_VOTE));

        axiosConfig.headers.token = token;
        axios
            .post(serverEnvironment.API_URL + '/vote', payload, axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(CAST_VOTE, res));
            })            
            .catch(err => {
                if (err.response.status === 401) {
                    dispatch(fulfilled_function(LOGOUT, err));
                }
                dispatch(rejected_function(CAST_VOTE, err));
            });
        
    };
}

/*
 * clearVotes() is used on log out to tell the reducer to 
 * empty its user-specific cache
 *
 * */
export function clearVotes() {
    const { CLEAR_ALL } = voteActionTypes;

    return function (dispatch, getState) {
        dispatch(fulfilled_function(CLEAR_ALL));
    }
}

/*
 * addCategory() is used to write a single category to the DB
 *
 * */
export function addCategory(token, categoryName, iconUrl) {
    
    return function (dispatch, getState) {
        const { ADD_CATEGORY } = voteActionTypes;
        

        var payload = {
            id: 0,
            name: categoryName,
            createdDate: new Date(),
            modifiedDate: new Date(),
            ts: "QEA=",
            iconURL: iconUrl
        };

        dispatch(pending_function(ADD_CATEGORY));

        axiosConfig.headers.token = token;
        axios
            .post(serverEnvironment.API_URL + '/question/category', payload, axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(ADD_CATEGORY, res));
            })
            .catch(err => {               
                dispatch(rejected_function(ADD_CATEGORY, err));
            });

    };
}

/*
 * editCategory() is used to write a single category to the DB
 *
 * */
export function editCategory(token, id, category) {

    return function (dispatch, getState) {
        const { EDIT_CATEGORY } = voteActionTypes;

        dispatch(pending_function(EDIT_CATEGORY));

        axiosConfig.headers.token = token;
        axios
            .post(serverEnvironment.API_URL + '/question/category/' + String(id), category, axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(EDIT_CATEGORY, res));
            })
            .catch(err => {
                dispatch(rejected_function(EDIT_CATEGORY, err));
            });

    };
}


/*
 * enumCategories() lists all categories in the DB
 *
 * */
export function enumCategories(token) {

    return function (dispatch, getState) {
        const { ENUM_CATEGORIES } = voteActionTypes;

        dispatch(pending_function(ENUM_CATEGORIES));

        var test = serverEnvironment.API_URL + '/question/category';

       // axiosConfig.headers.token = token;
        axios
            .get(test)
            .then(res => {
                dispatch(fulfilled_function(ENUM_CATEGORIES, res));
            })
            .catch(err => {
                dispatch(rejected_function(ENUM_CATEGORIES, err));
            });

    };
}

/*
 * enumVotes() returns all votes for a single customer
 *
 * */
export function enumVotes(token, customerId) {
    const { ENUM_VOTES } = voteActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(ENUM_VOTES));
        
        axiosConfig.headers.token = token;
        axios
            .get(serverEnvironment.API_URL + '/vote/' + String(customerId), axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(ENUM_VOTES, res));
            })
            .catch(err => {
                dispatch(rejected_function(ENUM_VOTES, err));
            });
    };
}


/*
 * listVotesByQuestion() returns all votes for a single customer and question
 *
 * */
export function listVotesByQuestion(token, customerId, questionId) {
    const { LIST_VOTES_BYCAT, SET_CURRENT_QUESTION } = voteActionTypes;
    const { SET_CURRENT_USER } = loginActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(LIST_VOTES_BYCAT));
        dispatch(fulfilled_function(SET_CURRENT_QUESTION, questionId));
        dispatch(fulfilled_function(SET_CURRENT_USER, 0));

        axiosConfig.headers.token = token;
        axios
            .get(serverEnvironment.API_URL + '/vote/' + String(customerId) + '/' + String(questionId), axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(LIST_VOTES_BYCAT, res));
            })
            .catch(err => {
                dispatch(rejected_function(LIST_VOTES_BYCAT, err));
            });
    };
}


/*
 * listVotesByUser() returns all votes for a single customer and user
 *
 * */
export function listVotesByUser(token, customerId, userId) {
    const { LIST_VOTES_BYUSER, SET_CURRENT_QUESTION } = voteActionTypes;
    const { SET_CURRENT_USER } = loginActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(LIST_VOTES_BYUSER));
        dispatch(fulfilled_function(SET_CURRENT_USER, userId));
        dispatch(fulfilled_function(SET_CURRENT_QUESTION, 0));

        axiosConfig.headers.token = token;
        axios
            .get(serverEnvironment.API_URL + '/vote/byUser/' + String(customerId) + '/' + String(userId), axiosConfig)
            .then(res => {
                dispatch(fulfilled_function( LIST_VOTES_BYUSER, res ));
            })
            .catch(err => {
                dispatch(rejected_function(LIST_VOTES_BYUSER, err));
            });
    };
}


/*
 * getVote() returns a votes for a single customer and user and question
 *
 * */
export function getVotes(token, customerId, questionId, userId) {
    const { GET_VOTE, SET_CURRENT_QUESTION } = voteActionTypes;
    const { SET_CURRENT_USER } = loginActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(GET_VOTE));
        dispatch(fulfilled_function(SET_CURRENT_QUESTION, questionId));
        dispatch(fulfilled_function(SET_CURRENT_USER, userId));

        axiosConfig.headers.token = token;
        axios
            .get(serverEnvironment.API_URL + '/vote/' + String(customerId) + '/' + String(questionId) + '/' + String(userId), axiosConfig)
            .then(res => {
                dispatch(fulfilled_function( GET_VOTE, res ));
            })
            .catch(err => {
                dispatch(rejected_function(GET_VOTE, err));
            });
    };
}

/*
 * addQuestion() adds a single question to the database
 *
 * */
export function addQuestion(token, question) {
    const { ADD_QUESTION } = voteActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(ADD_QUESTION));

        axiosConfig.headers.token = token;
        axios
            .post(serverEnvironment.API_URL + '/question', question, axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(ADD_QUESTION, res));
            })
            .catch(err => {
                dispatch(rejected_function(ADD_QUESTION, err));
            });
    };
}

/*
 * editQuestion() adds a single question to the database
 *
 * */
export function editQuestion(token, question) {
    const { EDIT_QUESTION } = voteActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(EDIT_QUESTION));

        axiosConfig.headers.token = token;
        axios
            .put(serverEnvironment.API_URL + '/question/' + String(question.id), question, axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(EDIT_QUESTION, res));
            })
            .catch(err => {
                dispatch(rejected_function(EDIT_QUESTION, err));
            });
    };
}


/*
 * deleteQuestion() removes a single question from the database
 * This will fail if there are any questions that have been answered already
 *
 * */
export function deleteQuestion(token, questionId) {
    const { DELETE_QUESTION } = voteActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(DELETE_QUESTION));

        axiosConfig.headers.token = token;
        axios
            .delete(serverEnvironment.API_URL + '/question/' + String(questionId), axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(DELETE_QUESTION));
            })
            .catch(err => {
                dispatch(rejected_function(DELETE_QUESTION, err));
            });
    };
}

/*
 * enumQuestions() returns all questions in the database for a given customer
 *
 * */
export function enumQuestions(token, customerId) {
    const { ENUM_QUESTIONS } = voteActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(ENUM_QUESTIONS));

        axiosConfig.headers.token = token;
        axios
            .get(serverEnvironment.API_URL + '/question/' + String(customerId), axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(ENUM_QUESTIONS, res));
            })
            .catch(err => {
                dispatch(rejected_function(ENUM_QUESTIONS, err));
            });
    };
}

/*
 * showQuestionModal
 * 
 * */

export function showQuestionModal(question) {
    const { SHOW_QUESTION_FORM } = voteActionTypes;

    return function (dispatch, getState) {
        dispatch(fulfilled_function(SHOW_QUESTION_FORM, question));
    }
}


/*
 * hideQuestionModal
 * 
 * */

export function hideQuestionModal() {
    const { HIDE_QUESTION_FORM } = voteActionTypes;

    return function (dispatch, getState) {
        dispatch(fulfilled_function(HIDE_QUESTION_FORM));
    }
}


/*
 * showCategoryModal
 * 
 * */

export function showCategoryModal(question) {
    const { SHOW_CATEGORY_FORM } = voteActionTypes;

    return function (dispatch, getState) {
        dispatch(fulfilled_function(SHOW_CATEGORY_FORM, question));
    }
}


/*
 * hideCategoryModal
 * 
 * */

export function hideCategoryModal() {
    const { HIDE_CATEGORY_FORM } = voteActionTypes;

    return function (dispatch, getState) {
        dispatch(fulfilled_function(HIDE_CATEGORY_FORM));
    }
}