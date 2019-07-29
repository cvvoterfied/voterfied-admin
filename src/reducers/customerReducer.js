
import { customerActionTypes, pending, rejected, fulfilled, emptyCustomer } from '../constants/ActionConstants';

export default function reducer(state = {
    currentCustomer: emptyCustomer,    
    customerList : [],
    lastError: "",
    customerFormVisible: false

}, action) {
    switch (action.type) {
        case pending(customerActionTypes.ADD_CUSTOMER):
            return {
                ...state,
                lastError: ""
            }
        case fulfilled(customerActionTypes.ADD_CUSTOMER):
            state.customerList.push(action.payload.data);

            return {
                ...state,
                lastError: "",
                customerFormVisible: false,
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
            var temp = state.customerList.filter(r => r.id !== state.currentCustomer.id);

            return {
                ...state,
                lastError: "",
                customerFormVisible: false,
                customerList: temp,
                currentCustomer: emptyCustomer
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
            var tempec = state.customerList.filter(r => r.id !== state.currentCustomer.id);
            tempec.push(action.payload.data);

            return {
                ...state,
                currentCustomer: action.payload.data,
                customerList: tempec,
                customerFormVisible: false,
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
        case fulfilled(customerActionTypes.HIDE_CUSTOMER_FORM):
            return {
                ...state,
                customerFormVisible: false,
                lastError: ""
            }
        case fulfilled(customerActionTypes.SHOW_CUSTOMER_FORM):
            var selectedItem = {};
            for (var i = 0; i < state.customerList.length; i++) {
                if (state.customerList[i].id === action.payload) {
                    selectedItem = state.customerList[i];
                    break;
                }
            }
            return {
                ...state,
                currentCustomer: selectedItem,
                customerFormVisible: true,
                lastError: ""
            }
        default:
            return state
    }
};
