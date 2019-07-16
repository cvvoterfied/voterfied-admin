
import { versionActionTypes, pending, rejected, fulfilled } from '../constants/ActionConstants';

export default function reducer(state = {
    versionNumber: "",
    buildDate: "",
    assemblyName: "",
    showVersion: false

}, action) {
    switch (action.type) {

        case pending(versionActionTypes.GET_VERSION):
            return {
                ...state
            }
        case fulfilled(versionActionTypes.GET_VERSION):
            return {
                ...state,
                versionNumber: action.payload.data.versionNumber,
                buildDate: action.payload.data.buildDate,
                assemblyName: action.payload.data.assemblyName
            }
        case rejected(versionActionTypes.GET_VERSION):
            return {
                ...state,
                versionNumber: "",
                buildDate: "",
                assemblyName: ""
            }
        case fulfilled(versionActionTypes.SHOW_VERSION_MODAL):
            return {
                ...state,
                showVersion: true
            }
        case fulfilled(versionActionTypes.HIDE_VERSION_MODAL):
            return {
                ...state,
                showVersion: false
            }
        default:
            return state;
    }
};
