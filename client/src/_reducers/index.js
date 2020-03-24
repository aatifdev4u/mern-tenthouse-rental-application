import { combineReducers } from 'redux';
import user from './userReducer';
import transaction from './transactionReducer';

const rootReducer = combineReducers({
    user,
    transaction
});

export default rootReducer;