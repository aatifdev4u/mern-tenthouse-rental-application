import {
    SET_TRANSACTION,
    UNSET_TRANSACTION,
    UPDATE_PRODUCTS
} from '../_actions/types';
import axios from 'axios';

export function setTransaction(data){
    const request = axios.post('/api/transaction/createTransaction',data)
        .then(response => response.data); 

    return {
        type: SET_TRANSACTION,
        payload: request
    }
}

export function clearTransaction(){
    return {
        type: UNSET_TRANSACTION,
        payload: {}
    }
}

export function updateProducts(data){
    const request = axios.post('/api/product/updateAvailability',data)
    .then(response => response.data); 

return {
    type: UPDATE_PRODUCTS,
    payload: request
}

}
