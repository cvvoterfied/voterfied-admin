
import { customerActionTypes, pending, rejected, fulfilled, emptyCustomer } from '../constants/ActionConstants';

const ADMIN_TIMEOUT = "ADMIN TIMEOUT MINUTES";
const PORTAL_TIMEOUT = "PORTAL TIMEOUT MINUTES";

export default function reducer(state = {
    currentCustomer: emptyCustomer,    
    customerList : [],
    lastError: "",
    customerFormVisible: false,
    configFormVisible: false,
    configData: [],
    adminTimeoutMins: 60,
    portalTimeoutMins: 240

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
        case fulfilled(customerActionTypes.CLEAR_CUSTOMER):
            return {
                ...state,
                currentCustomer: emptyCustomer
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

        case pending(customerActionTypes.GET_CONFIG):
            return {
                ...state,
                lastError: "Fetching config data..."
            }
        case fulfilled(customerActionTypes.GET_CONFIG):
            var adminTimeout = 60;
            var portalTimeout = 240;
            for (var cf = 0; cf < action.payload.data.length; cf++) {
                if (action.payload.data[cf].name === ADMIN_TIMEOUT) {
                    adminTimeout = action.payload.data[cf].configValue;
                }
                if (action.payload.data[cf].name === PORTAL_TIMEOUT) {
                    portalTimeout = action.payload.data[cf].configValue;
                }
            }

            return {
                ...state,
                configData: action.payload.data,
                adminTimeoutMins: adminTimeout,
                portalTimeoutMins: portalTimeout,
                lastError: ""
            }
        case rejected(customerActionTypes.GET_CONFIG):
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
        case fulfilled(customerActionTypes.HIDE_CONFIG_FORM):
            return {
                ...state,
                configFormVisible: false
            }
        case fulfilled(customerActionTypes.HIDE_CUSTOMER_FORM):
            return {
                ...state,
                customerFormVisible: false,
                lastError: ""
            }
        case fulfilled(customerActionTypes.SHOW_CONFIG_FORM):
            return {
                ...state,
                configFormVisible: true,
                customerFormVisible: false
            }
        case fulfilled(customerActionTypes.SHOW_CUSTOMER_FORM):
            var selectedItem = emptyCustomer;
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
        case pending(customerActionTypes.UPDATE_CONFIG):
            return {
                ...state,
                lastError: "Updating config..."
            }
        case fulfilled(customerActionTypes.UPDATE_CONFIG):
            var newStateArray = state.configData.slice();
            var found = false;

            for (var c = 0; c < newStateArray.length; c++) {
                if (newStateArray[c].id === action.payload.data.id) {
                    newStateArray[c].configValue = action.payload.data.configValue;
                    found = true;
                    break;
                }
            }

            if (!found) {
                newStateArray.push(action.payload.data);
            }

            return {
                ...state,
                configData: newStateArray,
                configFormVisible: false,
                lastError: "Done!"
            }
        case rejected(customerActionTypes.UPDATE_CONFIG):
            return {
                ...state,
                lastError: action.payload.message
            }
        default:
            return state
    }
};
