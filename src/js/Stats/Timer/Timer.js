import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import './Timer.css';

class Timer extends Component {

    state = {       
       minutes: this.props.time.minutes,
       seconds: this.props.time.seconds,
       gameLost: false
    }

    componentDidUpdate(prevProps) {
        if (prevProps.gameWon !== this.props.gameWon) {
            const timeFinished = (this.props.time.minutes*60 + this.props.time.seconds)-(this.state.minutes*60 + this.state.seconds);
            console.log(timeFinished);
            this.props.onGameWon(this.props.madeMoves, timeFinished, this.props.userData, this.props.numLevel);
        }
        this.gameLostChecker();
    }

    gameLostChecker = () => {
        if(this.state.minutes*60 + this.state.seconds === 0 && this.props.gameStarted){
            setTimeout(() => {
                this.setState({ gameLost: true })
                this.props.onGameLost();
            }, 1000);
        } 
    }

    render(){

        const { minutes, seconds } = this.state;

        let timerClass = null;
        if(this.props.gameWon){
            timerClass ='timer_end_win';
        }
        if(this.state.minutes === 0 && this.state.seconds === 0){
            timerClass ='timer_end_lose';
        }

        return (
            <div className = {timerClass}>
                <h2>{ minutes }:{ seconds < 10 ? `0${ seconds }` : seconds } :זמן נותר</h2>
            </div>    
        );
    }
    

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state
            if (seconds > 0 && !this.props.gameWon) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0 || this.props.gameWon) {
                if (minutes === 0 || this.props.gameWon) {
                    clearInterval(this.myInterval)
                } else {
                this.setState(({ minutes }) => ({
                    minutes: minutes - 1,
                    seconds: 59
                    }))
                }
            }
        }, 1000)
    }
}

const mapStateToProps = state => {
    return {
        gameStarted: state.game.gameStarted,
        time: state.game.time,
        numLevel: state.game.numLevel,
        userData: state.auth.userData
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGameWon: (madeMovesCompleted, timeFinished, userData, numLevel) => dispatch(actions.gameWonStatsPost(madeMovesCompleted, timeFinished, userData, numLevel)),
        onGameLost: () => dispatch(actions.setDefaultGameSetting())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Timer);


