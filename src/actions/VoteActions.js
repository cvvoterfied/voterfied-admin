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
export function listCategories() {
    const { LIST_CATEGORIES } = voteActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(LIST_CATEGORIES));

        axios
            .get(serverEnvironment.API_URL + '/question/category/' +
                String(serverEnvironment.customer.id))
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
export function getFeaturedCategories(token, categoryId) {
    const { GET_FEATURED_CATS } = voteActionTypes;    
    
    return function (dispatch, getState) {
        dispatch(pending_function(GET_FEATURED_CATS));

        axiosConfig.headers.token = token;
        axios
            .get(serverEnvironment.API_URL + '/question/byCategory/' +
                String(serverEnvironment.customer.id) + '/' +
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
export function listQuestionsByCategory(token, categoryId) {
    const { LIST_QUESTION_BYCAT } = voteActionTypes;
    const { LOGOUT } = loginActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(LIST_QUESTION_BYCAT));

        axiosConfig.headers.token = token;
        axios
            .get(serverEnvironment.API_URL + '/question/byCategory/' +
                String(serverEnvironment.customer.id) + '/' + 
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
export function listQuestions(token) {
    const { LIST_QUESTION } = voteActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(LIST_QUESTION));

        axiosConfig.headers.token = token;
        axios
            .get(serverEnvironment.API_URL + '/question/unexpired/' +
                String(serverEnvironment.customer.id) , axiosConfig)
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