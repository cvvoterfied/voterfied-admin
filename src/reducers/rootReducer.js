import { combineReducers } from 'redux';
import loginReducer from './LoginReducer';
import emailReducer from './EmailReducer';
import voteReducer from './VoteReducer';
import versionReducer from './VersionReducer';
import customerReducer from './customerReducer';

export default combineReducers({    
    customerReducer,
    emailReducer,
    loginReducer,
    versionReducer,
    voteReducer
});
