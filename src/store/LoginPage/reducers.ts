import { Action, ActionTypes, AddUserAction, onUsersDownloadedAction } from './actions'



export const initialState = {

    users: []

}

export interface State {

    users: IUsers[]
}

export interface IUsers {
    id?: number;
    name: string;
    status: string;
}

export const AddUserReducer = (state: State, action: AddUserAction) => {
    const { payload } = action
    return {
        ...state,
        users: [...state.users, ...payload.users]
    }
}

export const updateUsers = (state: State, action: onUsersDownloadedAction) => {
    const { payload } = action
    return {
        ...state,
        users: payload.users
    }
}


export const reducers = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.ADD_USER:
            return AddUserReducer(state, action);
        case ActionTypes.USERS_DOWNLOADED:
            return updateUsers(state, action);
        default:
            return state;
    }
}