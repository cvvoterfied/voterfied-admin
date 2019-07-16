
import { customerActionTypes, pending, rejected, fulfilled } from '../constants/ActionConstants';

export default function reducer(state = {
    name: "",
    title: "",
    location: "",
    website: "",
    bioStatement: "",
    donateURL: "",
    volunteerURL: "",
    headshotURL: "",
    logoURL: ""

}, action) {
    switch (action.type) {

        case pending(customerActionTypes.GET_CUSTOMER_DATA):
            return {
                ...state
            }
        case fulfilled(customerActionTypes.GET_CUSTOMER_DATA):
            return {
                ...state,
                name: action.payload.data.name,
                title: action.payload.data.title,
                location: action.payload.data.location,
                website: action.payload.data.website,
                bioStatement: action.payload.data.bioStatement,
                donateURL: action.payload.data.donateURL,
                volunteerURL: action.payload.data.volunteerURL,
                headshotURL: action.payload.data.headshotURL,
                logoURL: action.payload.data.logoURL
            }
        case rejected(customerActionTypes.GET_CUSTOMER_DATA):
            return {
                ...state
            }
        default:
            return state
    }
};
