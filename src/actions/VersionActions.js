/*
 * VersionActions.js handles version information about the current build
 * This is useful in debugging what version of the UI or web API we are testing against,
 * since there is some delay in deployment and webpack processes
 *  
 * */

import { versionActionTypes, pending_function, rejected_function, fulfilled_function, serverEnvironment } from '../constants/ActionConstants';
import axios from 'axios';


/*
 * getApiVersion returns the API's current version
 *
 * */
export function getApiVersion() {
    const { GET_VERSION } = versionActionTypes;

    return function (dispatch, getState) {

        dispatch(pending_function(GET_VERSION));        

        axios
            .get(serverEnvironment.API_URL + '/revision')
            .then(res => {
                dispatch(fulfilled_function(GET_VERSION, res));
            })
            .catch(err => {
                dispatch(rejected_function(GET_VERSION, err));
            });

    }
}

/*
 * showVersionModal shows the version modal
 *
 * */
export function showVersionModal() {
    const { SHOW_VERSION_MODAL } = versionActionTypes;

    return function (dispatch, getState) {
        dispatch(fulfilled_function(SHOW_VERSION_MODAL));        
    }
}

/*
 * hideVersionModal hides the version modal
 *
 * */
export function hideVersionModal() {
    const { HIDE_VERSION_MODAL } = versionActionTypes;

    return function (dispatch, getState) {
        dispatch(fulfilled_function(HIDE_VERSION_MODAL));
    }
}