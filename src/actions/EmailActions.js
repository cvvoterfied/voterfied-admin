/*
 * EmailActions.js handles sending emails to the customer
 * Current this calls custom web APIs to send it from .Net
 *  
 * */

import { loginActionTypes, pending_function, rejected_function, fulfilled_function, serverEnvironment } from '../constants/ActionConstants';
import axios from 'axios';


//var mailer = require("nodemailer");
//var smtpTransport = require('nodemailer-smtp-transport');

/*
 * sendMail() sends an email confirmation to the user by calling /email/confirm
 * TODO: This route currently ignores everything except the To: address
 * 
 * */
export function sendMail(to, title, body) {
    const { SEND_MAIL } = loginActionTypes;

    return function (dispatch, getState) {

        dispatch(pending_function(SEND_MAIL));        

        var payload =
        {
            'From': 'christine@voterfied.com',
            'To': to,
            'Subject': title,
            'Body': body
        };

        axios
            .post(serverEnvironment.API_URL + '/email/confirm', payload)
            .then(res => {
                dispatch(fulfilled_function(SEND_MAIL));
            })
            .catch(err => {
                dispatch(rejected_function(SEND_MAIL, err));
            });

    }

}

/*
 * sendMailReset() sends reset request to the user by calling /email/reset
 * TODO: This route currently ignores everything except the To: address
 * 
 * */
export function sendMailReset(to) {
    const { SEND_MAIL_RESET } = loginActionTypes;

    return function (dispatch, getState) {

        dispatch(pending_function(SEND_MAIL_RESET));

        var payload =
        {
            'From': 'christine@voterfied.com',
            'To': to,
            'Subject': 'Reset password',
            'Body': 'Resetting password'
        };

        axios
            .post(serverEnvironment.API_URL + '/email/reset', payload)
            .then(res => {
                dispatch(fulfilled_function(SEND_MAIL_RESET));
            })
            .catch(err => {
                dispatch(rejected_function(SEND_MAIL_RESET, err));
            });

    }

}
