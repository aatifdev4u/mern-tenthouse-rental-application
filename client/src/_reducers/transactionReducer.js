import {
    SET_TRANSACTION,
    UNSET_TRANSACTION,
    UPDATE_PRODUCTS
} from '../_actions/types';

export default function(state={},action){
    switch(action.type){
        case SET_TRANSACTION:
            return {
                ...state,
                transactionData: action.payload
            }
        case UNSET_TRANSACTION:
            return {
                ...state,
                transactionData: action.payload
            }
        case UPDATE_PRODUCTS:
            return {
                ...state,
                updated: action.payload
            }
        default:
            return state;
    }
}