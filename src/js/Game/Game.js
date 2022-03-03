import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Cards from '../Cards/Cards.js';
import Stats from '../Stats/Stats.js';
import * as actions from '../store/actions/index';

import picturesSrc from '../Cards/static/pictures/picturesSrc';
import mathHardSrc from '../Cards/static/mathHard/mathHardSrc';
import mathEasySrc from '../Cards/static/mathEasy/mathEasySrc';
import sentencesSrc from '../Cards/static/sentences/sentencesSrc';
import wordsSrc from '../Cards/static/words/wordsSrc';

import photoConfiguration from './photoConfiguration';

import './Game.css';

class Game extends Component{

    state ={
        cardsArr : [],
        madeMoves : 0 , 
        numFlipped : 0 ,
        gameWon : false, 
    };

    shuffle(arr) {
        let j, x, i;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = arr[i];
            arr[i] = arr[j];
            arr[j] = x;
        }
        return arr;
    }

    createBoard = () => {
        const picturesArray = [...picturesSrc];
        const mathHardArray = [...mathHardSrc];
        const mathEasyArray = [...mathEasySrc];
        const sentencesArray = [...sentencesSrc];
        const wordsArray = [...wordsSrc];
        
        const shuffledPictursArray = this.shuffle(picturesArray);
        const shuffledMathHardArray = this.shuffle(mathHardArray);
        const shuffledMathEasyArray = this.shuffle(mathEasyArray);
        const shuffledSentencesArray = this.shuffle(sentencesArray);
        const shuffledWordsArray = this.shuffle(wordsArray);

        const half = photoConfiguration(this.props.numOfCards, this.props.numLevel, shuffledPictursArray, shuffledMathHardArray, shuffledMathEasyArray, shuffledSentencesArray, shuffledWordsArray);
        console.log(half)
        const lastArray = [...half,...half];
        let lastShuffled = this.shuffle(lastArray);
        let cardsArr = [];
        let count = 0;
        console.log(lastShuffled)
        while(lastShuffled.length > 0){
            let url = lastShuffled.pop()
            cardsArr.push({ url: url, id : count , isFlipped: false , isOkay : false, isCheatActivated: false})
            count++;      
        }
        console.log(cardsArr)
        this.setState({  
            cardsArr : cardsArr, 
            madeMoves : 0,
            numFlipped : 0,
            gameWon : false,
        });
        this.props.onGameStarted();
    }

    cheatHandler = (event, cardIndex) => {
        event.preventDefault();
        const cardsArr =[...this.state.cardsArr];
        cardsArr[cardIndex].isCheatActivated = !cardsArr[cardIndex].isCheatActivated;
        this.setState({cardsArr : cardsArr});        
    }

    flipHandler = (cardIndex) => {
        const cardsArr =[...this.state.cardsArr];
        cardsArr[cardIndex].isFlipped = !cardsArr[cardIndex].isFlipped;
        const madeMoves = this.state.madeMoves + 1;
        const numFlipped = this.state.numFlipped + 1;
        this.setState({cardsArr : cardsArr , madeMoves : madeMoves , numFlipped : numFlipped});
    }

    checkPairHandler = () => {
        let cardsArr = [...this.state.cardsArr];
        const indexFlipped = [];
        for(let i = 0; i < cardsArr.length; i++){
            if((cardsArr[i].isFlipped === true)&&(cardsArr[i].isOkay === false)) {
                indexFlipped.push(cardsArr[i].id);
            }
        }
        if(cardsArr[indexFlipped[0]].url === cardsArr[indexFlipped[1]].url){
            cardsArr[indexFlipped[0]].isOkay = true;
            cardsArr[indexFlipped[1]].isOkay = true;
        }
        else{
            cardsArr[indexFlipped[0]].isFlipped = false;
            cardsArr[indexFlipped[1]].isFlipped = false;
        } 
        this.setState({ cardsArr : cardsArr , numFlipped : 0 }) 
    }

    gameWonChecker = () => {
        let cards = [...this.state.cardsArr];
        for(let i = 0 ; i < cards.length; i++ ){
            if(!cards[i].isOkay) return;
        }
        this.setState({gameWon : true})
    }

    render(){

        let gameRedirect = this.props.numOfCards === null ?
        <Redirect to='/levels'/>
        :
        null 
    
        const show = (
            <div>
                <Cards 
                cardsArr = {this.state.cardsArr}
                flip = {this.flipHandler}
                cheatToggler = {this.cheatHandler}/>
                
            </div>
        )
        
        return(
            <div>
                {gameRedirect}
                {show}
                <Stats 
                createBoard = {this.createBoard}
                gameWon = {this.state.gameWon}
                gameStarted = {this.props.gameStarted}
                madeMoves = {this.state.madeMoves}
                />
            </div>          
        );
    }

    componentDidUpdate (){
        if(this.state.numFlipped === 2){
            setTimeout(() => this.checkPairHandler(),300);
        }
        console.log(this.state);
        if(!this.state.gameWon){
            this.gameWonChecker();
        }
    } 
}

const mapStateToProps = state => {
    return {
        numLevel: state.game.numLevel,
        numOfCards: state.game.numOfCards,
        gameStarted: state.game.gameStarted,
        gameWon: state.game.gameWon,
        time: state.game.time
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGameStarted: () => dispatch(actions.gameStarted()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Game);
