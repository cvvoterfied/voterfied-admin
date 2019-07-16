
import { customerActionTypes, pending, rejected, fulfilled } from '../constants/ActionConstants';

export default function reducer(state = {
    currentCustomer : {},    
    customerList : [],
    lastError :  ""

}, action) {
    switch (action.type) {
        case pending(customerActionTypes.ADD_CUSTOMER):
            return {
                ...state,
                lastError: ""
            }
        case fulfilled(customerActionTypes.ADD_CUSTOMER):
            return {
                ...state,
                lastError: "",
                currentCustomer: action.payload.data
            }
        case rejected(customerActionTypes.ADD_CUSTOMER):
            return {
                ...state,
                lastError: action.payload.message
            }
        case pending(customerActionTypes.DELETE_CUSTOMER):
            return {
                ...state,
                lastError: ""
            }
        case fulfilled(customerActionTypes.DELETE_CUSTOMER):
            return {
                ...state,
                lastError: "",
                currentCustomer: {}
            }
        case rejected(customerActionTypes.DELETE_CUSTOMER):
            return {
                ...state,
                lastError: action.payload.message
            }
        case pending(customerActionTypes.EDIT_CUSTOMER):
            return {
                ...state,
                lastError: ""
            }
        case fulfilled(customerActionTypes.EDIT_CUSTOMER):
            return {
                ...state,
                currentCustomer: action.payload.data,
                lastError: ""
            }
        case rejected(customerActionTypes.EDIT_CUSTOMER):
            return {
                ...state,
                lastError: action.payload.message
            }   
        case pending(customerActionTypes.ENUM_CUSTOMER):
            return {
                ...state,
                lastError: ""
            }
        case fulfilled(customerActionTypes.ENUM_CUSTOMER):
            return {
                ...state,
                customerList: action.payload.data,
                lastError: ""
            }
        case rejected(customerActionTypes.ENUM_CUSTOMER):
            return {
                ...state,
                lastError: action.payload.message
            }
        case pending(customerActionTypes.GET_CUSTOMER_DATA):
            return {
                ...state,
                lastError: ""
            }
        case fulfilled(customerActionTypes.GET_CUSTOMER_DATA):
            return {
                ...state,
                currentCustomer: action.payload.data,
                lastError: ""
            }
        case rejected(customerActionTypes.GET_CUSTOMER_DATA):
            return {
                ...state,
                lastError: action.payload.message
            }
        default:
            return state
    }
};
