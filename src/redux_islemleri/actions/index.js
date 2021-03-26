import {API_URL,API_KEY} from '../../config';

//action types for home
export const GET_HOME_ACCOUNTS = 'GET_HOME_ACCOUNTS';
export const GET_HOME_EXPENSES = 'GET_HOME_EXPENSES';
// export const GET_HOME_ACCOUNTS_SUM = 'GET_HOME_ACCOUNTS_SUM';
// export const GET_HOME_EXPENSES_SUM = 'GET_HOME_EXPENSES_SUM';
// export const GET_HOME_CONSIGMENT_COUNT = 'GET_HOME_CONSIGMENT_COUNT';
// export const GET_HOME_STOCK_COUNT = 'GET_HOME_STOCK_COUNT';
// export const GET_HOME_WEEKLY_BALANCE = 'GET_HOME_WEEKLY_BALANCE';
// export const GET_HOME_WEEKLY_EXPENSES = 'GET_HOME_WEEKLY_EXPENSES';
// export const GET_HOME_WEEKLY_ORDER = 'GET_HOME_WEEKLY_ORDER';
// export const GET_HOME_RECENTLY_ACTIVITIES = 'GET_HOME_RECENTLY_ACTIVITIES';

//action typesboth
export const SHOW_LOADING_SPINNER = 'SHOW_LOADING_SPINNER';

export function showLoadingSpinner(){
    return{
        type: SHOW_LOADING_SPINNER,
        payload:null
    }
}

//action creator for home
export function getHomeAccounts(firmID){
    const endpoint = '${API_URL}account/home?api_key=${API_KEY}&query=${firmID}';
            
    const request = fetch(endpoint)
    .then(result => result.json())
    .then(result =>{
        return result;
    })
    .catch(error=> console.error('Error:',error))

    return {
        type: GET_HOME_ACCOUNTS,
        payload: request
    }
}
export function getHomeExpenses(firmID){
    const endpoint = '${API_URL}expenses/home?api_key=${API_KEY}&query=${firmID}';
            
    const request = fetch(endpoint)
    .then(result => result.json())
    .then(result =>{
        return result;
    })
    .catch(error=> console.error('Error:',error))

    return {
        type: GET_HOME_EXPENSES,
        payload: request
    }
}

