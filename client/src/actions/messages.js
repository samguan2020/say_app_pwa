import * as api from '../api/index.js';
import { FETCH_MESSAGES , SEND_MESSAGE , END_LOADING , START_LOADING , FETCH_USERS } from '../constants/actionTypes.js';

export const getMessages = (startindex,endindex) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getMessages(startindex,endindex);
        dispatch({ type: FETCH_MESSAGES, payload: data });  // you had response.data but you are destructuring response to data
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const sendMessage = (message) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.sendMessage(message);
        dispatch({ type: SEND_MESSAGE, payload: data });  // same correction here
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getUsers();
        dispatch({ type: FETCH_USERS, payload: data }); 
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getDirectMessages = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getDirectMessages();
        dispatch({ type: FETCH_MESSAGES, payload: data });  // you had response.data but you are destructuring response to data
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const sendDirectMessage = (receiverId,message) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.sendDirectMessage(receiverId,message);
        dispatch({ type: SEND_MESSAGE, payload: data });  // same correction here
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}