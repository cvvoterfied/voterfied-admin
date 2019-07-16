// ActionConstants.js
//

export const serverEnvironment = {
    API_URL: "https://voterfiedmtv2.azurewebsites.net",
    //API_URL: "http://localhost:62364/",
    customer: {
        id: "5",
        name: "Matt Hall",
        title: "Mayor, Carlsbad CA"
    }
}

export const colors = ["darkgreen", "darkred", "yellow", "darkblue", "magenta", "white", "orange", "purple", "lightblue", "darkgray", "lightgray"];

export const pending = function (status) {
    return status.concat("_PENDING");
}

export const rejected = function (status) {
    return status.concat("_REJECTED");
}

export const fulfilled = function (status) {
    return status.concat("_FULFILLED");
}

export function pending_function(type) {
    return {
        type: pending(type)
    }
}

export function fulfilled_function(type, res) {
    return {
        type: fulfilled(type),
        payload: res
    }
}

export function rejected_function(type, err) {
    return {
        type: rejected(type),
        payload: err
    }
}

export const loginActionTypes = {
    START_LOGIN: "START_LOGIN",
    CANCEL_LOGIN: "CANCEL_LOGIN",
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",    
    REGISTER: "REGISTER",
    CHANGE_PASSWORD: "CHANGE_PASSWORD",
    RESET_PASSWORD: "RESET_PASSWORD",
    SEND_MAIL: "SEND_MAIL",
    SEND_MAIL_RESET: "SEND_MAIL_RESET",
    READY_TO_VERIFY: "READY_TO_VERIFY",
    VERIFY_VOTER: "VERIFY_VOTER",
    CONFIRM_VOTER: "CONFIRM_VOTER",
    START_REGISTERING: "START_REGISTERING",
    DONE_REGISTERING: "DONE_REGISTERING",
    VERIFY_EMAIL: "VERIFY_EMAIL",
    EDIT_USER_PROFILE: "EDIT_USER_PROFILE",
    SHOW_EDIT_PROFILE: "SHOW_EDIT_PROFILE",
    CANCEL_EDIT_PROFILE: "CANCEL_EDIT_PROFILE"
};

export const voteActionTypes = {
    GET_FEATURED_CATS: "GET_FEATURED_CATS",
    LIST_QUESTION: "LIST_QUESTION",
    LIST_QUESTION_BYCAT: "LIST_QUESTION_BYCAT",
    LIST_VOTE: "LIST_VOTE",
    CAST_VOTE: "CAST_VOTE",
    VOTE_STAT: "VOTE_STAT",
    HIDE_VOTE_SCREEN: "HIDE_VOTE_SCREEN",
    LIST_CATEGORIES: "LIST_CATEGORIES",
    GO_VOTE: "GO_VOTE",
    CLEAR_ALL: "CLEAR_ALL"
}

export const versionActionTypes = {
    GET_VERSION: "GET_VERSION",
    SHOW_VERSION_MODAL: "SHOW_VERSION_MODAL",
    HIDE_VERSION_MODAL: "HIDE_VERSION_MODAL"
}

export const customerActionTypes = {
    GET_CUSTOMER_DATA: "GET_CUSTOMER_DATA"
}