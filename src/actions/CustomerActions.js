/*
 * CustomerActions.js
 * 
 * These are actions that return public information associated with the customer
 * such as getting the headshot and logo
 * 
 * */

import { customerActionTypes, pending_function, rejected_function, fulfilled_function, serverEnvironment } from '../constants/ActionConstants';
import axios from 'axios';

/*
 * getCustomer() returns a CustomerBTO by customer ID
 * 
 * */

export function getCustomer() {
    const { GET_CUSTOMER_DATA } = customerActionTypes;

    return function (dispatch, getState) {

        dispatch(pending_function(GET_CUSTOMER_DATA));

        axios
            .get(serverEnvironment.API_URL + '/customer/' + serverEnvironment.customer.id)
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

export function addCustomer(customer) {
    const { ADD_CUSTOMER } = customerActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(ADD_CUSTOMER));

        axios
            .post(serverEnvironment.API_URL + '/customer', customer)
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

export function editCustomer(customer) {
    const { EDIT_CUSTOMER } = customerActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(EDIT_CUSTOMER));

        axios
            .put(serverEnvironment.API_URL + '/customer/' + customer.id, customer)
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

export function deleteCustomer(customerId) {
    const { DELETE_CUSTOMER } = customerActionTypes;

    return function (dispatch, getState) {
        dispatch(pending_function(DELETE_CUSTOMER));

        axios
            .delete(serverEnvironment.API_URL + '/customer/' + customerId)
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

export function enumCustomer() {
    const { ENUM_CUSTOMER } = customerActionTypes;

    return function (dispatch, getState) {

        dispatch(pending_function(ENUM_CUSTOMER));

        axios
            .get(serverEnvironment.API_URL + '/customer')
            .then(res => {
                dispatch(fulfilled_function(ENUM_CUSTOMER, res));
            })
            .catch(err => {
                dispatch(rejected_function(ENUM_CUSTOMER, err));
            });

    }
}

