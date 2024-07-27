import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import GithubReducer from './Github/Reducer';
import {thunk} from 'redux-thunk';

const combine_reducers  = combineReducers({
    github : GithubReducer
})
const store = legacy_createStore(combine_reducers,applyMiddleware(thunk))
export default store;