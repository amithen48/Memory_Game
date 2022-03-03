import * as actionTypes from '../actions/actionTypes';

const intialState = {
    numLevel: null,
    numOfCards: null,
    gameStarted: false,
    gameWon: false,
    time: null,
    error: null
};

const gameReducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.SET_GAME_DATA_SUCCESS:
        return {
            ...state,
            time: action.time,
            numOfCards: action.numOfCards,
            numLevel: action.numLevel
        }
        case actionTypes.SET_GAME_DATA_FAILED:
        return {
            ...state,
            error: action.error
        }
        case actionTypes.GAME_STARTED:
        return {
            ...state,
            gameStarted: true
        }
        case actionTypes.GAME_WON:
        return {
            ...state,
            gameWon: true,
        }
        case actionTypes.SET_DEFAULT_LEVEL_SETTING:
        return {
            numLevel: null,
            numOfCards: null,
            gameStarted: false,
            gameWon: false,
            time: null,
            error: null        
        }
        default: return state
        }
};

export default gameReducer;