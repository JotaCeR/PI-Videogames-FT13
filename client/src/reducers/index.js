import filterReducer from './filterReducer';
import paginationReducer from './paginationReducer';
import searchReducer from './searchReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    filter: filterReducer,
    pagination: paginationReducer,
    search: searchReducer
})