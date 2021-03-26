import {combineReducers} from 'redux';
import home from './home_reducer';
import account from './account_reducer';

const rootReducer= combineReducers({
    home,
    account
})

export default rootReducer;