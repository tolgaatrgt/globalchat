import { Action, ActionTypes, setUser, onMessagesDownloadedAction, ClearMessagesAction, onDmDownloadedAction } from './actions'

export const initialState = {
    currentUser: '',
    messages: [],
    nickname: '',
    personalmessages: []

}

export interface State {
    currentUser: string;
    messages: IMessage[];
    personalmessages: IPersonalMessage[];
}

export interface IMessage {
    id?: number;
    nickname: string;
    text: string;
    time: number | string;
}

export interface IPersonalMessage {
    id?: number;
    receiver: string;
    text: string;
    time: number | string;
    whosend: string;
}





export const setUserReducer = (state: State, action: setUser) => {
    const { payload } = action
    return {
        ...state,
        currentUser: payload.username
    }
}

export const updateDm = (state: State, action: onDmDownloadedAction) => {
    const { payload } = action
    return {
        ...state,
        personalmessages: payload.personalmessages
    }
}


export const updateMessages = (state: State, action: onMessagesDownloadedAction) => {
    const { payload } = action;

    return {
        ...state,
        messages: payload.messages
    }
}

export const clearMessagesReducer = (state: State, action: ClearMessagesAction) => {
    const { payload } = action;

    return {
        ...state,
        messages: []
    }
}


export const reducers = (state: State = initialState, action: Action) => {
    switch (action.type) {

        case ActionTypes.SET_USER:
            return setUserReducer(state, action);
        case ActionTypes.MESSAGES_DOWNLOADED:
            return updateMessages(state, action);
        case ActionTypes.DM_DOWNLOADED:
            return updateDm(state, action);
        case ActionTypes.CLEAR_MESSAGES:
            return clearMessagesReducer(state, action);
        default:
            return state;
    }
}