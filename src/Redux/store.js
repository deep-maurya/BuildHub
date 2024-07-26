import { combineReducers, legacy_createStore } from 'redux'
import GithubReducer from './Github/Reducer';


const combine_reducers  = combineReducers({
    github : GithubReducer
})
const store = legacy_createStore(combine_reducers)
export default store;