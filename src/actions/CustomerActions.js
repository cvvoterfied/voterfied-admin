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
