
import { loginActionTypes, pending, rejected, fulfilled } from '../constants/ActionConstants';

export default function reducer(state = {
    loginToken: '',
    user: [],
    allUsers: [],
    userName: '',
    loginShow: false,
    registerShow: false,
    showEditProfile: false,
    forcePasswordChange: false,
    registrationStep: 0,
    voter: {},
    currentUserLogin: {  id: 0, name: "", UserRole: { id: 1, name: "Unverified" }, AuthorizedCustomers: [] },
    showUserForm: false,
    message: 'Please log in'
    
}, action) {
    switch (action.type) {
        case pending(loginActionTypes.ADD_USER_PROFILE):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(loginActionTypes.ADD_USER_PROFILE):
            state.allUsers.push(action.payload.data);

            return {
                ...state,
                showUserForm: false,
                message: "User profile Added"
            }
        case rejected(loginActionTypes.ADD_USER_PROFILE):
            return {
                ...state,
                message: action.payload.message
            }
        case fulfilled(loginActionTypes.CANCEL_EDIT_PROFILE):
            return {
                ...state,
                showEditProfile: false,
                message: ""
            }
        case fulfilled(loginActionTypes.CANCEL_LOGIN):
            return {
                ...state,
                loginShow: false,
                message: ""
            }
        case pending(loginActionTypes.DELETE_USER_PROFILE):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(loginActionTypes.DELETE_USER_PROFILE):
            var temp = state.allUsers.filter(r => r.id !== state.currentUserLogin.id);

            return {
                ...state,
                allUsers: temp,
                currentUserLogin:  { id: 0, name: "", UserRole: { id: 1, name: "Unverified" }, AuthorizedCustomers: [] },
                showUserForm: false,
                showEditProfile: false,
                message: ""
            }
        case rejected(loginActionTypes.DELETE_USER_PROFILE):
            return {
                ...state,
                message: action.payload.message
            }
        case pending(loginActionTypes.EDIT_USER_PROFILE):
            return {
                ...state, 
                message: "Working..."
            }
        case fulfilled(loginActionTypes.EDIT_USER_PROFILE):
            var tempeup = state.allUsers.filter(r => r.id !== state.currentUserLogin.id);
            tempeup.push(action.payload.data);

            return {
                ...state,
                showEditProfile: false,
                showUserForm: false,
                allUsers: tempeup,
                message: "User profile updated",
                user: action.payload
            }
        case rejected(loginActionTypes.EDIT_USER_PROFILE):
            return {
                ...state,
                message: action.payload.message
            }
        case pending(loginActionTypes.ENUM_USER_PROFILE):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(loginActionTypes.ENUM_USER_PROFILE):
            return {
                ...state,
                allUsers: action.payload.data,
                message: ""
            }
        case rejected(loginActionTypes.ENUM_USER_PROFILE):
            return {
                ...state,
                message: action.payload.message
            }
        case fulfilled(loginActionTypes.HIDE_USER_FORM):
            return {
                ...state,
                showUserForm: false,
                message: ""
            }
        case pending(loginActionTypes.LOGIN):
            return {
                ...state,                
                message: "Working..."
            }
        case fulfilled(loginActionTypes.LOGIN):
            console.log("Logged In! " + action.payload.token);
            var isVerified = false;

            // Super Admin has access
            if (action.payload.user.UserRole > 2 && action.payload.token) {
                isVerified = true;
            }
           
            return {
                ...state,
                loginShow: false,
                loginToken: action.payload.token,
                user: action.payload.user,
                userName: action.payload.user.name,
                message: "",
                registrationStep: (isVerified ? 0 : (action.payload.user.IsVerified ? 2 : 1)), // redirect to verify if unverified voter
                isLoggedIn: true
            }
        case rejected(loginActionTypes.LOGIN):
            return {
                ...state,
                loginShow: true,
                loginToken: '',
                userName: '',
                user: [],
                message: action.payload.message
            }
        case pending(loginActionTypes.LOGOUT):
            return {
                ...state,
                message: "Working..."
            }
        case fulfilled(loginActionTypes.LOGOUT):
            return {
                ...state,
                loginShow: false,
                loginToken: '',
                userName: '',
                user: [],
                message: "",
                isLoggedIn: false
            }
        case rejected(loginActionTypes.LOGOUT):
            return {
                ...state,
                loginShow: true,
                message: action.payload.message
            }
        case pending(loginActionTypes.REGISTER):
            return {
                ...state,
                registerShow: true,
                message: "Working..."
            }
        case fulfilled(loginActionTypes.REGISTER):
            return {
                ...state,
                registrationStep: 1,
                user: action.payload,
                message: ""
            }
        case rejected(loginActionTypes.REGISTER):
            return {
                ...state,
                registerShow: true,
                message: action.payload.message
            }
        case fulfilled(loginActionTypes.READY_TO_VERIFY):
            return {
                ...state,
                registrationStep: 2,
                registerShow: true
            }
        case fulfilled(loginActionTypes.SHOW_USER_FORM):
            var editingUser = {};
            if (String(action.payload) !== "0") {
                for (var i = 0; i < state.allUsers.length; i++) {
                    if (state.allUsers[i].id === action.payload) {
                        editingUser = state.allUsers[i];
                    }
                }
            }

            return {
                ...state,
                showUserForm: true,
                currentUserLogin: (editingUser ? editingUser : { id: 0, name: "", UserRole: { id: 1, name: "Unverified" }, AuthorizedCustomers: [] }),
                message: ""
            }
        case fulfilled(loginActionTypes.START_LOGIN):
            return {
                ...state,
                loginShow: true,
                message: ""
            }
        case pending(loginActionTypes.VERIFY_VOTER):
            // TODO: show a 'verifying' screen
            return {
                ...state,
                message: "Verifying..."
            }
        case rejected(loginActionTypes.VERIFY_VOTER):
            // Voter was not verified. 
            return {
                ...state,
                message: "We are unable to verify your voter registration: " + action.payload.message,
                verifyShow: true
            }
        case fulfilled(loginActionTypes.VERIFY_VOTER):
            // We can update the user login to confirm they have access to this customer
            // Once they confirm that it's them
            return {
                ...state,
                voter: action.payload,
                message: "",
                registrationStep: 3
            }
        case pending(loginActionTypes.CONFIRM_VOTER):
            return state;
        case rejected(loginActionTypes.CONFIRM_VOTER):
            return {
                ...state,
                message: action.payload.message,
                isVerified: true
            }
        case fulfilled(loginActionTypes.CONFIRM_VOTER):
            return {
                ...state,
                message: "",
                user: action.payload,
                registrationStep: 4
            }
        case fulfilled(loginActionTypes.DONE_REGISTERING):
            return {
                ...state,
                message: "",
                registrationStep: 0,
                registerShow : false
            }
        case fulfilled(loginActionTypes.START_REGISTERING):
            return {
                ...state,
                message: "",
                userName: action.payload,
                registrationStep: 0,
                loginShow: false,
                registerShow: true
            }
        case pending(loginActionTypes.RESET_PASSWORD):
            return {
                ...state,
                message: "Resetting password..."
            }
        case fulfilled(loginActionTypes.RESET_PASSWORD):
            return {
                ...state,
                message: "Enter a new password",
                loginShow: false,
                userName: action.payload,
                forcePasswordChange: true
            }
        case rejected(loginActionTypes.RESET_PASSWORD):
            return {
                ...state,
                message: action.payload.message
            }
        case fulfilled(loginActionTypes.SHOW_EDIT_PROFILE):
            return {
                ...state,
                showEditProfile: true,
                message: ""
            }
        case pending(loginActionTypes.CHANGE_PASSWORD):
            return {
                ...state,
                message: "Changing password..."
            }
        case fulfilled(loginActionTypes.CHANGE_PASSWORD):
            return {
                ...state,
                message: "Password changed",
                loginShow: false,
                forcePasswordChange: false
            }
        case rejected(loginActionTypes.CHANGE_PASSWORD):
            return {
                ...state,
                message: action.payload.message
            }
        case pending(loginActionTypes.VERIFY_EMAIL):
            return {
                ...state,
                message: "Verifying email..."
            }
        case fulfilled(loginActionTypes.VERIFY_EMAIL):
            console.log("Verified email...");

            return {
                ...state,
                loginShow: false,
                registerShow: true,
                loginToken: action.payload.data.token,
                user: action.payload.data.user,
                userName: action.payload.data.user.name,
                message: "",
                registrationStep: 2,
                isLoggedIn: true
            }
        case rejected(loginActionTypes.VERIFY_EMAIL):
            return {
                ...state,
                registrationStep: 1,
                message: action.payload.message
            }
        default:
            return state;
    }
};

