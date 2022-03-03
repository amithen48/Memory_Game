import * as actionTypes from './actionTypes';
import axios from '../../../axios-cahol-sagol';

export const setGameDataSuccess = (time, numOfCards, numLevel) => {
    return {
        type: actionTypes.SET_GAME_DATA_SUCCESS,
        time: time,
        numOfCards: numOfCards,
        numLevel: numLevel
    } 
}

export const setGameDataFailed = (error) => {
    return {
        type: actionTypes.SET_GAME_DATA_FAILED,
        error: error
    } 
}

export const levelPicked = (numOfLevel) => {
    return dispatch => {
        axios.get('/levels.json')
        .then(response => {
            let fetchedLevels = [];
            for(let key in response.data){
                fetchedLevels.push({
                    ...response.data[key],
                    id: key
                }); 
            }
            fetchedLevels.map(level => {
                if(level.id === numOfLevel){
                    dispatch(setGameDataSuccess(level.time, level.numCards ,level.id));
                } 
            }) 
            fetchedLevels = null;

        })
        .catch(error => {
            dispatch(setGameDataFailed(error.response.data.error));
        })
    }
}

export const gameStarted = () => {
    return {
        type: actionTypes.GAME_STARTED
    } 
}

export const gameWon = () => {
    return {
        type: actionTypes.GAME_WON,
    } 
}

export const setDefaultGameSetting = () => {
    return {
        type: actionTypes.SET_DEFAULT_LEVEL_SETTING,
    } 
}

export const gameWonStatsPost = (madeMovesCompleted, timeFinished, userData, numLevel) => {
    return dispatch => {
        console.log(userData);
        let exactWeek = 'שבוע ' + Math.ceil(numLevel/8);
        const score = {
            madeMoves: madeMovesCompleted,
            timeFinished: timeFinished
        }
        let userEncodedKey = null
        axios.get('/users.json')
        .then(response => {
            for(let key in response.data){
                console.log(response.data[key].userID)
                if(response.data[key].userID === userData.userID){
                    userEncodedKey = key;
                }
            }
            if(userData.levels.weeks[exactWeek][parseInt(numLevel)].scores === undefined){
                userData.levels.weeks[exactWeek][parseInt(numLevel)].scores = [];
            }
            userData.levels.weeks[exactWeek][parseInt(numLevel)].scores.push(score);
            let bestScore = userData.levels.weeks[exactWeek][parseInt(numLevel)].bestScore;
            if(bestScore === undefined){
                bestScore = score;
            }
            else {
                if((bestScore.madeMoves + bestScore.timeFinished) > (score.madeMoves + score.timeFinished)){
                    bestScore = score;
                }
            }
            userData.levels.weeks[exactWeek][parseInt(numLevel)].bestScore = bestScore;
            if(parseInt(numLevel)%8 === 0){
                exactWeek = 'שבוע ' + (Math.ceil(numLevel/8)+1);
                userData.levels.weeks[exactWeek][parseInt(numLevel)+1].active = true;
            } else {
                userData.levels.weeks[exactWeek][parseInt(numLevel)+1].active = true; 
            }
            //     if(userData.levels.weeks[exactWeek][numLevel].scores === undefined){
            //         userData.levels.weeks[exactWeek][numLevel].scores = []
            //     }
            //     userData.levels.weeks[exactWeek][numLevel].scores.push(score)
            //     const levelToActive = toString(parseInt(numLevel)+1)
            //     userData.levels.weeks[exactWeek][levelToActive].active = true;
            //     console.log(userData.levels.weeks[exactWeek][numLevel])   
            // }
            const url = '/users/' + userEncodedKey + '.json' ;
            axios.put(url, userData)
            .then(response => {
            })
            .catch(error => {
                console.log(error);
            })
        })
        .catch(error => {
            console.log(error);
        });  
        userEncodedKey = null;  
        dispatch(gameWon());
        setTimeout(() => dispatch(setDefaultGameSetting()), 2000);
    } 
}









