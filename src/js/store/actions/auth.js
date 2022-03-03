import * as actionTypes from './actionTypes';
import axios from 'axios';

import { newUserDataStructure } from './newUserDataStructure';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userID) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userID: userID,
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const signupUserSuccess = () => {
    return{
        type: actionTypes.SIGNUP_USER_SUCCESS,
    };
};

export const signupUserFailed = (error) => {
    return{
        type: actionTypes.SIGNUP_USER_FAILED,
        error: error
    };
};

export const fetchUserData = () => {
    return dispatch => {
        axios.get('https://cahol-sagol.firebaseio.com/users.json')
        .then(response => {
            let fetchedUsers = []
            for(let key in response.data){
                fetchedUsers.push({
                    ...response.data[key],
                    id: key
                }); 
            }
            fetchedUsers.map(user => {
                if(user.userID ===  localStorage.getItem('userID')){
                    dispatch(saveUserData(user));
                }         
            }) 
            fetchedUsers = null;  
        })
        .catch(error => {
            console.log(error);
        })
    }        
}

export const saveUserData = (userData) => {
    return {
        type: actionTypes.SAVE_USER_DATA,
        userData: userData
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userID');  
    return {
        type: actionTypes.AUTH_LOGOUT,  
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime*1000);
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());    
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()){
                dispatch(logout());
            } else {
                const userID = localStorage.getItem('userID');
                dispatch(fetchUserData());    
                dispatch(authSuccess(token, userID));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
    }
}

export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true   
        };
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASEBnGEzt2rGmcpmd5ukZ-41ThoqrX4n8';
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userID', response.data.localId);
            dispatch(fetchUserData());    
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFailed(error.response.data.error));
        });
    };
};

export const authSignUp = (email, password, firstName, lastName, age) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true   
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASEBnGEzt2rGmcpmd5ukZ-41ThoqrX4n8'
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            const user = newUserDataStructure(firstName,lastName,age,response.data.localId);
            console.log(user)
            axios.post('https://cahol-sagol.firebaseio.com/users.json', user)
            .then(response => {
                dispatch(signupUserSuccess())
            })
            .catch(error => {
                dispatch(signupUserFailed(error.response.data.error)); 
            })
            // const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000)
            // localStorage.setItem('token', response.data.idToken);
            // localStorage.setItem('expirationDate', expirationDate);
            // localStorage.setItem('userID', response.data.localId);
            // dispatch(fetchUserData());    
            // dispatch(authSuccess(response.data.idToken, response.data.localId));
            // dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFailed(error.response.data.error));
        });
    };
};




