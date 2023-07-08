import * as actionTypes from '../constants/actionTypes';

export default (state = { isLoading: true, messages: [] }, action) => {
    switch (action.type) {
        case actionTypes.START_LOADING:
            return { ...state, isLoading: true };
        case actionTypes.END_LOADING:
            return { ...state, isLoading: false };
        case actionTypes.FETCH_MESSAGES:
            return {
                ...state,
                messages: action.payload.data,
            }
        case actionTypes.SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload.data],
            }
        case actionTypes.FETCH_USERS:
            return {
                ...state,
                users: action.payload.data,
            }
        default:
            return state;
    }
}
        