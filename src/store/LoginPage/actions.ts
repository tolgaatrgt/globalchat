import axios from "axios"

import { ThunkAction } from "redux-thunk";
import { State } from "../reducers";
import { Dispatch } from "react";

import { IUsers } from "./reducers"


export enum ActionTypes {
    ADD_USER = "ADD_USER",
    USERS_DOWNLOADED = "USERS_DOWNLOADED"
}

export interface AddUserAction {
    type: ActionTypes.ADD_USER
    payload: {
        users: IUsers[]
    }
}

export interface onUsersDownloadedAction {
    type: ActionTypes.USERS_DOWNLOADED
    payload: {
        users: IUsers[]
    }
}

export const onUsersDownloaded = (users: IUsers[]): onUsersDownloadedAction => ({
    type: ActionTypes.USERS_DOWNLOADED,
    payload: {
        users
    }
})


export const getUsers = (): ThunkAction<Promise<void>, State, any, any> => {
    return async (dispatch: Dispatch<Action>) => {
        axios.get('http://localhost:5000/users')
            .then(response => {
                dispatch(onUsersDownloaded(response.data));
            })
            .catch(e => console.error(e))
    }
}

export const AddUser = (users: IUsers[]): void => {
    axios.post('http://localhost:5000/users', users[0])

}


export type Action = AddUserAction | onUsersDownloadedAction