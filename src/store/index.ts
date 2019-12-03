import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer, State } from './reducers';

const store = createStore<State, any, any, any>(
    reducer,
    applyMiddleware(thunk)
);

export default store;