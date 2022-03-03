import * as actionTypes from '../actions/actionTypes';

const intialState = {
    token: null,
    userID: null,
    error: null,
    loading: false,
    userData: null,
    newUserCreated : false
}; 

const authReducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
        return {
            ...state,
            loading: true
        }
        case actionTypes.AUTH_SUCCESS:
        return {
            ...state,
            token: action.idToken,
            userID: action.userID,
            loading: false
        }
        case actionTypes.AUTH_FAILED:
        return {
            ...state,
            error: action.error,
            loading: false
        }
        case actionTypes.SAVE_USER_DATA:
        return {
            ...state,
            userData: action.userData
        }
        case actionTypes.AUTH_LOGOUT:
        return {
            ...state,
            token: null,
            userID: null
        }
        case actionTypes.SIGNUP_USER_SUCCESS:
        return {
            ...state,
            loading: false, 
            newUserCreated: true
        }
        case actionTypes.SIGNUP_USER_FAILED:
        return {
            ...state,
            loading: false, 
            error: action.error
        };
        default: return state;
    }
};

export default authReducer;