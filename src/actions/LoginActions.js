/*
 * Login.js handles everything relating to 
 * user security and account management
 *  
 * */

import axios from 'axios';
import { loginActionTypes, pending_function, rejected_function, fulfilled_function, serverEnvironment } from '../constants/ActionConstants';

export var axiosConfig = {
    headers: { 'token': '' }
};

/*
 * startLogin() starts the login process (shows the login screen)
 *  
 * */
export function startLogin() {
    const { START_LOGIN } = loginActionTypes;
    return function (dispatch) {
        dispatch(fulfilled_function(START_LOGIN));
    }
}

/*
 * cancelLogin hides the login screen
 * 
 * */
export function cancelLogin() {
    const { CANCEL_LOGIN } = loginActionTypes;
    return function (dispatch) {
        dispatch(fulfilled_function(CANCEL_LOGIN));
    }
}

/*
 * login() calls the /login endpoint that returns a login token if successful
 * 
 * */
export function login(userName, password) {
    const { LOGIN } = loginActionTypes;

    return function (dispatch, getState) {

        dispatch(pending_function(LOGIN));
        var payload =
        {
            'userName': userName,
            'password': password
        };

        axios
            .post(serverEnvironment.API_URL + '/login', payload)
            .then((res) => {                
                dispatch(fulfilled_function(LOGIN, res.data));
            })
            .catch(err => {
                dispatch(rejected_function(LOGIN, err));
            });

    }

}

/*
 * logout() calls /logout to end the current user's session.  This should never
 * fail, even if the token is invalid.
 *  
 * */
export function logout(token) {
    const { LOGOUT } = loginActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(LOGOUT));

        axiosConfig.headers.token = token;
        axios
            .post(serverEnvironment.API_URL + '/logout', '', axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(LOGOUT));
            })
            .catch(err => {
                dispatch(rejected_function(LOGOUT, err));
            });
    };
}

/*
 * verifyEmail() calls userLogin/verifyEmail to record that the fact that the 
 * token checks out for the current user.
 *  
 * */
export function verifyEmail(token) {
    const { VERIFY_EMAIL } = loginActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(VERIFY_EMAIL));

        axios.put(serverEnvironment.API_URL + '/userLogin/verifyEmail/' + token)
        .then(res => {
            dispatch(fulfilled_function(VERIFY_EMAIL, res));
        })
        .catch (err => {
            dispatch(rejected_function(VERIFY_EMAIL, err));
        });
    }

}

/*
 * changePassword() allows the user to change their password
 *  
 * */
export function changePassword(userName, oldPassword, newPassword) {
    const { CHANGE_PASSWORD } = loginActionTypes;

   
    return function (dispatch, getState) {
        dispatch(pending_function(CHANGE_PASSWORD ));

        var payload =
            {
                'userName': userName,
                'password': oldPassword,
                'newpassword': newPassword
            };

        axios
            .post(serverEnvironment.API_URL + '/changePassword', payload)
            .then(res => {
                dispatch(fulfilled_function(CHANGE_PASSWORD));
            })
            .catch(err => {
                dispatch(rejected_function(CHANGE_PASSWORD, err));
            });
     
    };
}

/*
 * resetPassword() verifies the code sent in email against the database,
 * and flips the bit that allows them to change their password
 *  
 * */
export function resetPassword(uid, code) {
    const { RESET_PASSWORD } = loginActionTypes;

    return function (dispatch) {
        var payload =
        {
            'uid': uid,
            'code': code
        };

        axios.post(serverEnvironment.API_URL + '/resetPassword', payload)
            .then(res => {
                dispatch(fulfilled_function(RESET_PASSWORD, res.data));
            })
            .catch(err => {
                dispatch(rejected_function(RESET_PASSWORD, err));
            })
    }
}

/*
 * register() records a user's initial login information in the database.
 * TODO: email and username are treated as the same value currently
 *  
 * */
export function register(email, password, firstname, lastname, phone) {
    const { REGISTER } = loginActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(REGISTER));
        
        var payload =
        {
            id: 0,
            name: email,
            UserRole: 0,
            FirstName: firstname,
            LastName: lastname,
            Email: email,
            Phone: phone,
            Password: password,
            AuthorizedCustomers: [],
            createdDate: new Date(),
            modifiedDate: new Date(),
            ts: "QEA="
        }

        axios
            .post(serverEnvironment.API_URL + '/userLogin', payload)
            .then(res => {
                dispatch(fulfilled_function(REGISTER, res.data));                
            })
            .catch(err => {
                dispatch(rejected_function(REGISTER, err));
            });
    }

}

/*
 * editUserProfile() allows the user to change their name, email and phone number
 *  
 * */
export function editUserProfile(oldUser, email, firstname, lastname, phone) {
    const { EDIT_USER_PROFILE } = loginActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(EDIT_USER_PROFILE));

        var payload =
        {
            id: oldUser.id,
            name: email,
            UserRole: oldUser.UserRole,
            FirstName: firstname,
            LastName: lastname,
            Email: email,
            Phone: phone,
            AuthorizedCustomers: oldUser.AuthorizedCustomers,            
            modifiedDate: new Date(),
            ts: "QEA="
        }

        axios
            .put(serverEnvironment.API_URL + '/userLogin/' + String(oldUser.id), payload)
            .then(res => {
                dispatch(fulfilled_function(EDIT_USER_PROFILE, res.data));
            })
            .catch(err => {
                dispatch(rejected_function(EDIT_USER_PROFILE, err));
            });
    }

}

/*
 * TODO: emailConfirmed() is only used to invoke the voter registration screen
 * It probably shouldn't be necessary
 *  
 * */
export function emailConfirmed() {
    const { READY_TO_VERIFY } = loginActionTypes;
    return function (dispatch) {
        dispatch(fulfilled_function(READY_TO_VERIFY));
    }
}

///*
// * verifyVoter() is the voter registration step.  If successful, this
// * endpoint returns the matching voter registration record
// *  
// * */
//export function verifyVoter(first, last, birthMonth, birthDay, birthYear, houseNumber, zip) {
    
//    const { VERIFY_VOTER } = loginActionTypes;

//    return function (dispatch) {
//        dispatch(pending_function(VERIFY_VOTER));
//        axios
//            .get(serverEnvironment.API_URL + '/constituent/data/' +
//                String(serverEnvironment.customer.id) + '/' +
//                first + '/' + last + '/' + String(houseNumber) + '/' +
//                String(zip) + '/' + String(birthMonth) + '-' + String(birthDay) + '-' + String(birthYear))
//            .then((res) => {
//                let voter = res.data;
//                console.log(voter);                
//                dispatch(fulfilled_function(VERIFY_VOTER, voter));
//            })
//            .catch(err => {
//                dispatch(rejected_function(VERIFY_VOTER, err));
//            });
//    }
//}

/*
 * startRegistering() is used to invoke the initial email registration window
 *  
 * */
export function startRegistering(email) {
    const { START_REGISTERING } = loginActionTypes;
    return function (dispatch) {
        dispatch(fulfilled_function(START_REGISTERING, email));
    }
}

/*
 * doneRegistering() closes the registration process (the Cancel button action)
 *  
 * */
export function doneRegistering() {
    const { DONE_REGISTERING } = loginActionTypes;
    return function (dispatch) {
        dispatch(fulfilled_function(DONE_REGISTERING));
    }
}

/*
 * startEditProfile() invokes the edit profile window
 *  
 * */
export function startEditProfile() {
    const { SHOW_EDIT_PROFILE } = loginActionTypes;
    return function (dispatch) {
        dispatch(fulfilled_function(SHOW_EDIT_PROFILE));
    }
}

/*
 * cancelEditProfile() closes the edit profile window
 *  
 * */
export function cancelEditProfile() {
    const { CANCEL_EDIT_PROFILE } = loginActionTypes;
    return function (dispatch) {
        dispatch(fulfilled_function(CANCEL_EDIT_PROFILE));
    }
}

/*
 * addUserProfile() creates a new user login record in the database
 * This is how new admins are added for a customer, or super admins for internals
 *  
 * */
export function addUserProfile(token, user) {

    const { ADD_USER_PROFILE } = loginActionTypes;

    return function (dispatch) {
        dispatch(pending_function(ADD_USER_PROFILE));
        axiosConfig.headers.token = token;
        axios
            .post(serverEnvironment.API_URL + '/userLogin', user, axiosConfig)
            .then((res) => {                
                dispatch(fulfilled_function(ADD_USER_PROFILE, res));
            })
            .catch(err => {
                dispatch(rejected_function(ADD_USER_PROFILE, err));
            });
    }
}

/*
 * editUserProfile2() updates a user login record in the database
 * This one allows you to update the user's role also
 * but it's going to dispatch as the same thing as the more limited one
 *  
 * */
export function editUserProfile2(token, user) {

    const { EDIT_USER_PROFILE } = loginActionTypes;

    return function (dispatch) {
        dispatch(pending_function(EDIT_USER_PROFILE));
        axiosConfig.headers.token = token;
        axios
            .put(serverEnvironment.API_URL + '/userLogin/' + String(user.id), user, axiosConfig)
            .then((res) => {
                dispatch(fulfilled_function(EDIT_USER_PROFILE, res));
            })
            .catch(err => {
                dispatch(rejected_function(EDIT_USER_PROFILE, err));
            });
    }
}

/*
 * deleteUserProfile removes a record from the DB
 * TODO: This should be a soft delete
 *  
 * */
export function deleteUserLogin(token, userLoginId) {

    const { DELETE_USER_PROFILE } = loginActionTypes;

    return function (dispatch) {
        dispatch(pending_function(DELETE_USER_PROFILE));
        axiosConfig.headers.token = token;
        axios
            .delete(serverEnvironment.API_URL + '/userLogin/' + String(userLoginId), axiosConfig)
            .then((res) => {
                dispatch(fulfilled_function(DELETE_USER_PROFILE));
            })
            .catch(err => {
                dispatch(rejected_function(DELETE_USER_PROFILE, err));
            });
    }
}

/*
 * EnumUserProfile returns all users in the database
 *  
 * */
export function enumUserProfile(token) {

    const { ENUM_USER_PROFILE } = loginActionTypes;

    return function (dispatch) {
        dispatch(pending_function(ENUM_USER_PROFILE));
        axiosConfig.headers.token = token;
        axios
            .get(serverEnvironment.API_URL + '/userLogin', axiosConfig )
            .then((res) => {
                dispatch(fulfilled_function(ENUM_USER_PROFILE, res));
            })
            .catch(err => {
                dispatch(rejected_function(ENUM_USER_PROFILE, err));
            });
    }
}

/*
 * showUserForm() is used to invoke the add or edit user form
 *  
 * */
export function showUserForm(user) {
    const { SHOW_USER_FORM } = loginActionTypes;
    return function (dispatch) {
        dispatch(fulfilled_function(SHOW_USER_FORM, user));
    }
}

/*
 * hideUserForm() closes the add/edit user form
 *  
 * */
export function hideUserForm() {
    const { HIDE_USER_FORM } = loginActionTypes;
    return function (dispatch) {
        dispatch(fulfilled_function(HIDE_USER_FORM));
    }
}