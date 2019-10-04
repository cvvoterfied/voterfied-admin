/*
 * CustomerActions.js
 * 
 * These are actions that return public information associated with the customer
 * such as getting the headshot and logo
 * 
 * */

import { customerActionTypes, pending_function, rejected_function, fulfilled_function, serverEnvironment } from '../constants/ActionConstants';
import axios from 'axios';
export var axiosConfig = {
    headers: { 'token': '' }
};

/*
 * getCustomer() returns a CustomerBTO by customer ID
 * 
 * */

export function getCustomer(customerId) {
    const { GET_CUSTOMER_DATA } = customerActionTypes;

    return function (dispatch, getState) {

        dispatch(pending_function(GET_CUSTOMER_DATA));

        axios
            .get(serverEnvironment.API_URL + '/customer/' + String(customerId))
            .then(res => {
                dispatch(fulfilled_function(GET_CUSTOMER_DATA, res));
            })
            .catch(err => {
                dispatch(rejected_function(GET_CUSTOMER_DATA, err));
            });

    }
}

/*
 * addCustomer() inserts a new customer in the database
 * 
 * Object template:
 *          name (full name),
            logoURL ,
            bioStatement ,
            donateURL ,
            headshotURL ,
            location (physical location),
            title (job title),
            volunteerURL ,
            website 
 * 
 * */

export function addCustomer(token, customer) {
    const { ADD_CUSTOMER } = customerActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(ADD_CUSTOMER));
        axiosConfig.headers.token = token;
        axios
            .post(serverEnvironment.API_URL + '/customer', customer, axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(ADD_CUSTOMER, res));
            })
            .catch(err => {
                dispatch(rejected_function(ADD_CUSTOMER, err));
            });
    }
}

/*
 * editCustomer() updates an existing customer in the database
 * 
 * */

export function editCustomer(token, customer) {
    const { EDIT_CUSTOMER } = customerActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(EDIT_CUSTOMER));
        axiosConfig.headers.token = token;
        axios
            .put(serverEnvironment.API_URL + '/customer/' + customer.id, customer, axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(EDIT_CUSTOMER, res));
            })
            .catch(err => {
                dispatch(rejected_function(EDIT_CUSTOMER, err));
            });
    }
}

/*
 * deleteCustomer() deletes an existing customer in the database.
 * This will fail if there is existing data such as votes or users
 * 
 * */

export function deleteCustomer(token, customerId) {
    const { DELETE_CUSTOMER } = customerActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(DELETE_CUSTOMER));
        axiosConfig.headers.token = token;
        axios
            .delete(serverEnvironment.API_URL + '/customer/' + customerId, axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(DELETE_CUSTOMER));
            })
            .catch(err => {
                dispatch(rejected_function(DELETE_CUSTOMER, err));
            });
    }
}


/*
 * enumCustomer() returns a CustomerBTO by customer ID
 * 
 * */

export function enumCustomer(token) {
    const { ENUM_CUSTOMER } = customerActionTypes;

    return function (dispatch, getState) {

        dispatch(pending_function(ENUM_CUSTOMER));
        axiosConfig.headers.token = token;
        axios
            .get(serverEnvironment.API_URL + '/customer', axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(ENUM_CUSTOMER, res));
            })
            .catch(err => {
                dispatch(rejected_function(ENUM_CUSTOMER, err));
            });

    }
}

/* 
 *  showCustomerForm
 *  
 *  */
export function showCustomerForm(customer) {
    const { SHOW_CUSTOMER_FORM } = customerActionTypes;

    return function (dispatch, getState) {
        dispatch(fulfilled_function(SHOW_CUSTOMER_FORM, customer));
    }
}

/*
 * hideCustomerForm
 * 
 * */
export function hideCustomerForm() {
    const { HIDE_CUSTOMER_FORM } = customerActionTypes;

    return function (dispatch, getState) {
        dispatch(fulfilled_function(HIDE_CUSTOMER_FORM));
    }
}

/* 
 *  showConfigForm
 *  
 *  */
export function showConfigForm(customer) {
    const { SHOW_CONFIG_FORM } = customerActionTypes;

    return function (dispatch, getState) {
        dispatch(fulfilled_function(SHOW_CONFIG_FORM, customer));
    }
}

/*
 * hideConfigForm
 * 
 * */
export function hideConfigForm() {
    const { HIDE_CONFIG_FORM } = customerActionTypes;

    return function (dispatch, getState) {
        dispatch(fulfilled_function(HIDE_CONFIG_FORM));
    }
}

/* 
 * Update one config for a customer
 * 
 * */
export function updateConfig(token, rowID, customerID, configName, configValue) {
    const { UPDATE_CONFIG } = customerActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(UPDATE_CONFIG));
        axiosConfig.headers.token = token;

        var item = {
            id: rowID,
            name: configName,
            customerID: customerID,
            configValue: configValue,            
            createdDate: new Date(),
            modifiedDate: new Date(),
            ts: "QEA="
        };

        if (rowID !== 0) {
            axios
                .put(serverEnvironment.API_URL + '/config/' + String(rowID), item, axiosConfig)
                .then(res => {
                    dispatch(fulfilled_function(UPDATE_CONFIG, res));
                })
                .catch(err => {
                    dispatch(rejected_function(UPDATE_CONFIG, err));
                });
        }
        else {
            var items = [];
            items.push(item);
            axios
                .post(serverEnvironment.API_URL + '/config', items, axiosConfig)
                .then(res => {
                    dispatch(fulfilled_function(UPDATE_CONFIG, res));
                })
                .catch(err => {
                    dispatch(rejected_function(UPDATE_CONFIG, err));
                });
        }
    }
}

/* 
 * Get configuration values for a customer
 * 
 * */
export function getConfig(token, customerID) {
    const { GET_CONFIG } = customerActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(GET_CONFIG));
        axiosConfig.headers.token = token;
        axios
            .get(serverEnvironment.API_URL + '/config/' + String(customerID), axiosConfig)
            .then(res => {
                dispatch(fulfilled_function(GET_CONFIG, res));
            })
            .catch(err => {
                dispatch(rejected_function(GET_CONFIG, err));
            });

    }
}

/*
 * Clears the current customer reducer
 * */

export function clearCustomer() {
    const { CLEAR_CUSTOMER } = customerActionTypes;

    return function (dispatch) {
        dispatch(fulfilled_function(CLEAR_CUSTOMER));
    }
}