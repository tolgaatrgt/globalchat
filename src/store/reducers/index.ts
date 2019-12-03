import { combineReducers } from 'redux';


import * as chatpagereducers from '../ChatPage/reducers'
import * as loginpagereducers from '../LoginPage/reducers'
export interface State {
    messages: chatpagereducers.State
    users: loginpagereducers.State
}
export const initialState: State = {
    messages: chatpagereducers.initialState,
    users: loginpagereducers.initialState
}

export const reducer = combineReducers<State>({
    messages: chatpagereducers.reducers,
    users: loginpagereducers.reducers
})  
