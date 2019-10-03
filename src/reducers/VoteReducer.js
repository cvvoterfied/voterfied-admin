/* VoteReducer.js
 * 
 * */

import { voteActionTypes, pending, rejected, fulfilled } from '../constants/ActionConstants';

const blankQuestion = {
    id: 0, name: "", questionType: { id: 1 }, answers: [{ id: 0, percentage: 0, votecount: 0 }, { id: 1, percentage: 0, votecount: 0 }], links: []
}
const blankUser = {
    id: 0, name: ""
}

const blankOpinion = {
    choiceDesc: "", choiceid: "", donateURL: ""
}

export default function reducer(state = {    
    message: '',
    categories: [],
    allquestions: [],
    stats: [],
    votes: [],
    showCategoryForm: false,
    showQuestionForm: false,
    showVoteScreen: false,
    currentQuestion: blankQuestion,
    currentUser: blankUser,
    currentOpinion: blankOpinion
    

}, action) {

    switch (action.type) {
        case pending(voteActionTypes.ADD_CATEGORY):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.ADD_CATEGORY):            
            var temp = state.categories.slice();
            temp.push(action.payload.data);

            return {
                ...state,                
                message: "",
                showCategoryForm: false,
                categories: temp
            }
        case rejected(voteActionTypes.ADD_CATEGORY):
            return {
                ...state,
                message: action.payload.message
            }
        case pending(voteActionTypes.ADD_QUESTION):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.ADD_QUESTION):           
            state.allquestions.push(action.payload.data);
            
            return {
                ...state,
                showQuestionForm: false,
                currentQuestion: action.payload.data,
                message: "Question added"
            }
        case rejected(voteActionTypes.ADD_QUESTION):
            return {
                ...state,
                message: action.payload.message
            }
        case pending(voteActionTypes.CAST_VOTE):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.CAST_VOTE):  
            var newStateArray = state.allquestions.slice();
            if (action.payload.data.result) {
                for (var n = 0; n < newStateArray.length; n++) {
                    if (action.payload.data.result.id === newStateArray[n].id) {
                        newStateArray[n] = action.payload.data.result;
                        break;
                    }
                }
            }
            return {
                ...state,   
                allquestions: newStateArray,
                message: "",
                currentQuestion: action.payload.data.result
            }
        case rejected(voteActionTypes.CAST_VOTE):
            return {
                ...state,                
                message: action.payload.message
            }
        case fulfilled(voteActionTypes.CLEAR_ALL):
            return {
                ...state,
                allquestions: [],
                stats: [],
                votes: [],
                showVoteScreen: false,
                currentQuestion: blankQuestion
            }
        case pending(voteActionTypes.DELETE_QUESTION):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.DELETE_QUESTION):
            var tempd = state.allquestions.filter(r => r.id !== state.currentQuestion.id);

            return {
                ...state,
                showQuestionForm: false,
                currentQuestion: blankQuestion,
                allquestions: tempd,
                message: ""
            }
        case rejected(voteActionTypes.DELETE_QUESTION):
            return {
                ...state,
                message: action.payload.message
            }
        case pending(voteActionTypes.EDIT_CATEGORY):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.EDIT_CATEGORY):
            // TODO: edit the category inside the current category list, or refetch
            return {
                ...state,
                showCategoryForm: false,
                message: ""
            }
        case rejected(voteActionTypes.EDIT_CATEGORY):
            return {
                ...state,
                message: action.payload.message
            }
        case pending(voteActionTypes.ENUM_CATEGORIES):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.ENUM_CATEGORIES):
            return {
                ...state,
                categories: action.payload.data,
                message: ""
            }
        case rejected(voteActionTypes.ENUM_CATEGORIES):
            return {
                ...state,
                categories: [],
                message: action.payload.message,                                
            }
        case pending(voteActionTypes.EDIT_QUESTION):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.EDIT_QUESTION):
            var temp3 = state.allquestions.filter(r => r.id !== state.currentQuestion.id);
            temp3.push(action.payload.data);
            return {
                ...state,         
                showQuestionForm: false,
                allquestions: temp3,
                message: ""
            }
        case rejected(voteActionTypes.EDIT_QUESTION):
            return {
                ...state,
                message: action.payload.message,
            }
        case pending(voteActionTypes.ENUM_QUESTIONS):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.ENUM_QUESTIONS):
            return {
                ...state,
                allquestions: action.payload.data,
                message: ""
            }
        case rejected(voteActionTypes.ENUM_QUESTIONS):
            return {
                ...state,
                allquestions: [],
                message: action.payload.message,
            }
        case pending(voteActionTypes.ENUM_VOTES):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.ENUM_VOTES):
            return {
                ...state,
                votes: action.payload.data,
                currentQuestion: blankQuestion,
                currentUser: blankUser,
                message: ""
            }
        case rejected(voteActionTypes.ENUM_VOTES):
            return {
                ...state,
                votes: [],
                message: action.payload.message,
            }
        case pending(voteActionTypes.GET_FEATURED_CATS):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.GET_FEATURED_CATS):
            return {
             ...state,                
                currentQuestion: action.payload.data[0],
                message: ""
                }
        case rejected(voteActionTypes.GET_FEATURED_CATS):            
            return {
                ...state,
                message: action.payload.message,
                currentQuestion: blankQuestion,
                allquestions: []
            }
        case pending(voteActionTypes.GET_VOTE):
            return {
                ...state,
                message: ""                                
            }
        case fulfilled(voteActionTypes.GET_VOTE):
            var votes = [];
            votes.push(action.payload.data);
            return {
                ...state,
                message: "",                              
                votes: votes
            }
        case rejected(voteActionTypes.GET_VOTE):
            return {
                ...state,
                message: action.payload.message,                
                votes: []
            }
        case fulfilled(voteActionTypes.GO_VOTE):
            return {
                ...state,
                message: "",
                showVoteScreen: true,
                currentQuestion: action.payload
            }
        case fulfilled(voteActionTypes.HIDE_CATEGORY_FORM):
            return {
                ...state,
                showCategoryForm: false
            }        
        case fulfilled(voteActionTypes.HIDE_QUESTION_FORM):
            return {
                ...state,
                showQuestionForm: false
            }
        case fulfilled(voteActionTypes.HIDE_VOTE_SCREEN):
            return {
                ...state,
                showVoteScreen: false,
                currentQuestion: blankQuestion
            }
        case pending(voteActionTypes.LIST_CATEGORIES):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.LIST_CATEGORIES):
            return {
                ...state,
                categories: action.payload.data,
                message: ""
            }
        case rejected(voteActionTypes.LIST_CATEGORIES):
            return {
                ...state,
                message: action.payload.message,
                categories: []
            }
        case pending(voteActionTypes.LIST_VOTE):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.LIST_VOTE):
            return {
                ...state,
                votes: action.payload.data,
                message: ""
            }
        case rejected(voteActionTypes.LIST_VOTE):
            return {
                ...state,
                message: action.payload.message,
                votes: []
            }
        case pending(voteActionTypes.LIST_VOTES_BYCAT):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.LIST_VOTES_BYCAT):
            return {
                ...state,
                votes: action.payload.data,
                currentUser: blankUser,
                message: ""
            }
        case rejected(voteActionTypes.LIST_VOTES_BYCAT):
            return {
                ...state,
                votes: [],                
                message: action.payload.message
            }
        case pending(voteActionTypes.LIST_VOTES_BYUSER):
            return {
                ...state,
                message: "",
                currentUser: blankUser
            }
        case fulfilled(voteActionTypes.LIST_VOTES_BYUSER):
            return {
                ...state,
                message: "",                
                votes: action.payload.data
            }
        case rejected(voteActionTypes.LIST_VOTES_BYUSER):            
            return {
                ...state,
                message: action.payload.message,
                currentQuestion: blankQuestion,                
                votes: []
                
            }
        case pending(voteActionTypes.LIST_QUESTION):            
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.LIST_QUESTION):
            console.log("got the question list...");
            return {
                ...state,
                allquestions: action.payload.data,                
                message: ""
            }
        case rejected(voteActionTypes.LIST_QUESTION):
            console.log(action.payload.message);
            return {
                ...state,
                message: action.payload.message,
                allquestions: []
            }
        case pending(voteActionTypes.LIST_QUESTION_BYCAT):            
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.LIST_QUESTION_BYCAT):            
            return {
                ...state,
                allquestions: action.payload.data,                
                message: ""
            }
        case rejected(voteActionTypes.LIST_QUESTION_BYCAT):
            console.log(action.payload.message);
            return {
                ...state,
                message: action.payload.message,                
                allquestions: []
            }
        case fulfilled(voteActionTypes.SET_CURRENT_QUESTION):
            var selectedQuestion = blankQuestion;
            for (var i = 0; i < state.allquestions.length; i++) {
                if (action.payload === state.allquestions[i].id) {
                    selectedQuestion = state.allquestions[i];
                    break;
                }
            }
            return {
                ...state,
                currentQuestion: selectedQuestion
            }

        case fulfilled(voteActionTypes.SHOW_CATEGORY_FORM):
            return {
                ...state,
                showCategoryForm: true,
                message: ""
            }
        case fulfilled(voteActionTypes.SHOW_QUESTION_FORM):
            var currentQuestion = blankQuestion;
            for (var q = 0; q < state.allquestions.length; q++) {
                if (action.payload === state.allquestions[q].id) {
                    currentQuestion = state.allquestions[q];
                    break;
                }
            }
            return {
                ...state,
                showQuestionForm: true,
                message: "",
                currentQuestion: currentQuestion
            }

        case pending(voteActionTypes.VOTE_STAT):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.VOTE_STAT):
            return {
                ...state,
                stats: action.payload.data,
                message: ""
            }
        case rejected(voteActionTypes.VOTE_STAT):
            return {
                ...state,
                message: action.payload.message,
                stats: []
            }
        case pending(voteActionTypes.GET_DONATE_PREFERENCE):
            return {
                ...state,
                currentOpinion: blankOpinion,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.GET_DONATE_PREFERENCE):
            return {
                ...state,
                currentOpinion: action.payload.data,
                message: ""
            }
        case rejected(voteActionTypes.GET_DONATE_PREFERENCE):
            return {
                ...state,
                message: action.payload.message
            }
        default:
            return state;
    }
};
