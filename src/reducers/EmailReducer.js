
import { loginActionTypes, pending, rejected, fulfilled } from '../constants/ActionConstants';

export default function reducer(state = {    
    emailResult: '',
    emailSent: false

}, action) {
    switch (action.type) {
        
        case pending(loginActionTypes.SEND_MAIL):
            return {
                ...state,     
                emailSent: false,
                emailResult: "Sending email"
            }
        case fulfilled(loginActionTypes.SEND_MAIL):
            return {
                ...state,    
                emailSent: true,
                emailResult: "Email has been sent successfully!"
            }
        case rejected(loginActionTypes.SEND_MAIL):
            return {
                ...state,    
                emailSent: false,
                emailResult: action.payload.message
            }
        case pending(loginActionTypes.SEND_MAIL_RESET):
            return {
                ...state,
                emailSent: false,
                emailResult: "Sending password reset email"
            }
        case fulfilled(loginActionTypes.SEND_MAIL_RESET):
            return {
                ...state,
                emailSent: true,
                emailResult: "Password reset email has been sent successfully! Please check your inbox."
            }
        case rejected(loginActionTypes.SEND_MAIL_RESET):
            return {
                ...state,
                emailSent: false,
                emailResult: action.payload.message
            }
        default:
            return state;
    }
};
