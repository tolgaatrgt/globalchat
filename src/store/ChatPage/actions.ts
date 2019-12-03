import axios from "axios"
import { IMessage, IPersonalMessage } from "./reducers"
import { ThunkAction } from "redux-thunk";
import { State } from "../reducers";
import { Dispatch } from "react";



export enum ActionTypes {
    SET_USER = "SET_USER",
    MESSAGES_DOWNLOADED = "MESSAGES_DOWNLOADED",
    CLEAR_MESSAGES = "CLEAR_MESSAGES",
    DM_DOWNLOADED = "DM_DOWNLOADED"
}


export interface onDmDownloadedAction {
    type: ActionTypes.DM_DOWNLOADED
    payload: {
        personalmessages: IPersonalMessage[]
    }
}

export interface onMessagesDownloadedAction {
    type: ActionTypes.MESSAGES_DOWNLOADED,
    payload: {
        messages: IMessage[]
    }
}


export interface setUser {
    type: ActionTypes.SET_USER,
    payload: {
        username: string
    }
}

export interface ClearMessagesAction {
    type: ActionTypes.CLEAR_MESSAGES
    payload: {
        messages: IMessage[]
    }
}


export const onDmDownloaded = (personalmessages: IPersonalMessage[]): onDmDownloadedAction => ({
    type: ActionTypes.DM_DOWNLOADED,
    payload: {
        personalmessages
    }
})


export const onMessagesDownloaded = (messages: IMessage[]): onMessagesDownloadedAction => ({
    type: ActionTypes.MESSAGES_DOWNLOADED,
    payload: {
        messages
    }
})


export const setUser = (username: string): setUser => ({
    type: ActionTypes.SET_USER,
    payload: {
        username
    }
})


export const sendMessage = (messages: IMessage): void => {
    axios.post('http://localhost:5000/messages', messages)

}

export const sendDm = (personalmessages: IPersonalMessage): void => {
    axios.post('http://localhost:5000/personalmessages', personalmessages)
}

export const getMessages = (): ThunkAction<Promise<void>, State, any, any> => {
    return async (dispatch: Dispatch<Action>) => {
        axios.get('http://localhost:5000/messages')
            .then(response => {
                dispatch(onMessagesDownloaded(response.data));
            })
            .catch(e => console.error(e))
    }
}

export const getDm = (): ThunkAction<Promise<void>, State, any, any> => {
    return async (dispatch: Dispatch<Action>) => {
        axios.get('http://localhost:5000/personalmessages')
            .then(response => {
                dispatch(onDmDownloaded(response.data));
            })
            .catch(e => console.error(e))
    }
}



export type Action = onMessagesDownloadedAction | setUser | ClearMessagesAction | onDmDownloadedAction