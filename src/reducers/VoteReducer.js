/* VoteReducer.js
 * 
 * */

import { voteActionTypes, pending, rejected, fulfilled } from '../constants/ActionConstants';

const blankQuestion = {
    id: 0, name: "", questionType: { id: 1 }, answers: [{ id: 0, percentage: 0, votecount: 0 }, { id: 1, percentage: 0, votecount: 0 }], links: []
}

export default function reducer(state = {    
    message: '',
    categories: [],
    allquestions: [],
    stats: [],
    votes: [],
    showVoteScreen: false,
    currentQuestion: blankQuestion

}, action) {

    switch (action.type) {
        case pending(voteActionTypes.ADD_CATEGORY):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.ADD_CATEGORY):            
            var temp = this.state.categories;
            temp.push(action.payload.data);

            return {
                ...state,                
                message: "",
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
            var temp = this.state.allquestions;
            temp.push(action.payload.data);
            
            return {
                ...state,
                allquestions: temp,
                message: ""
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
        case pending(voteActionTypes.EDIT_CATEGORY):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(voteActionTypes.EDIT_CATEGORY):
            // TODO: edit the category inside the current category list, or refetch
            return {
                ...state,
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
            return {
                ...state,                
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
        case fulfilled(voteActionTypes.GO_VOTE):
            return {
                ...state,
                message: "",
                showVoteScreen: true,
                currentQuestion: action.payload
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
                message: ""
            }
        case rejected(voteActionTypes.LIST_VOTES_BYCAT):
            return {
                ...state,
                votes: [],
                message: action.payload.message,
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
        default:
            return state;
    }
};
