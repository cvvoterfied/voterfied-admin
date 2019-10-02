// ActionConstants.js
//

export const serverEnvironment = {
    API_URL: "https://voterfiedmtv2.azurewebsites.net",
    //API_URL: "http://localhost:62364"
}

export const colors = ["darkgreen", "darkred", "yellow", "darkblue", "magenta", "white", "orange", "purple", "lightblue", "darkgray", "lightgray"];
export const emptyCustomer = { id: 0, name: '', logoURL: '' };

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
    const { LOGOUT } = loginActionTypes;
    if (err && err.response && (err.response.status === 401 || err.response.status === 400)) {
        return function (dispatch, getState) {
            dispatch(fulfilled_function(LOGOUT, err));
        }
    }

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
    CANCEL_EDIT_PROFILE: "CANCEL_EDIT_PROFILE",
    ADD_USER_PROFILE: "ADD_USER_PROFILE",
    DELETE_USER_PROFILE: "DELETE_USER_PROFILE",
    ENUM_USER_PROFILE: "ENUM_USER_PROFILE",
    SHOW_USER_FORM: "SHOW_USER_FORM",
    HIDE_USER_FORM: "HIDE_USER_FORM",
    SET_CURRENT_USER: "SET_CURRENT_USER"
};

export const voteActionTypes = {
    GET_FEATURED_CATS: "GET_FEATURED_CATS",
    LIST_QUESTION: "LIST_QUESTION",
    LIST_QUESTION_BYCAT: "LIST_QUESTION_BYCAT",
    ADD_QUESTION: "ADD_QUESTION",
    EDIT_QUESTION: "EDIT_QUESTION",
    DELETE_QUESTION: "DELETE_QUESTION",
    ENUM_QUESTIONS: "ENUM_QUESTIONS",
    LIST_VOTE: "LIST_VOTE",
    CAST_VOTE: "CAST_VOTE",
    VOTE_STAT: "VOTE_STAT",
    HIDE_VOTE_SCREEN: "HIDE_VOTE_SCREEN",
    LIST_CATEGORIES: "LIST_CATEGORIES",
    ADD_CATEGORY: "ADD_CATEGORY",
    EDIT_CATEGORY: "EDIT_CATEGORY",
    ENUM_CATEGORIES: "ENUM_CATEGORIES",
    GO_VOTE: "GO_VOTE",
    CLEAR_ALL: "CLEAR_ALL",
    ENUM_VOTES: "ENUM_VOTES",
    LIST_VOTES_BYCAT: "LIST_VOTES_BY_CAT",
    LIST_VOTES_BYUSER: "LIST_VOTES_BY_USER",
    GET_VOTE: "GET_VOTE",
    SHOW_QUESTION_FORM: "SHOW_QUESTION_FORM",
    HIDE_QUESTION_FORM: "HIDE_QUESTION_FORM",
    SHOW_CATEGORY_FORM: "SHOW_CATEGORY_FORM",
    HIDE_CATEGORY_FORM: "HIDE_CATEGORY_FORM",
    SET_CURRENT_QUESTION: "SET_CURRENT_QUESTION",
    SET_DONATE_PREFERENCE: "SET_DONATE_PREFERENCE",
    GET_DONATE_PREFERENCE: "GET_DONATE_PREFERENCE",
    UPDATE_DONATE_PREFERENCE: "UPDATE_DONATE_PREFERENCE"
}

export const versionActionTypes = {
    GET_VERSION: "GET_VERSION",
    SHOW_VERSION_MODAL: "SHOW_VERSION_MODAL",
    HIDE_VERSION_MODAL: "HIDE_VERSION_MODAL"
}

export const customerActionTypes = {
    GET_CUSTOMER_DATA: "GET_CUSTOMER_DATA",
    ADD_CUSTOMER: "ADD_CUSTOMER",
    EDIT_CUSTOMER: "EDIT_CUSTOMER",
    DELETE_CUSTOMER: "DELETE_CUSTOMER",
    ENUM_CUSTOMER: "ENUM_CUSTOMER",
    SHOW_CUSTOMER_FORM: "SHOW_CUSTOMER_FORM",
    HIDE_CUSTOMER_FORM: "HIDE_CUSTOMER_FORM",
    SHOW_CONFIG_FORM: "SHOW_CONFIG_FORM",
    HIDE_CONFIG_FORM: "HIDE_CONFIG_FORM",
    GET_CONFIG: "GET_CONFIG",
    UPDATE_CONFIG: "UPDATE_CONFIG"
}
