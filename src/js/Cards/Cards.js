import React from 'react';
import Card from '../Game/Card/Card'

const Cards = (props) => {
    return props.cardsArr.map((card, index) => {
        return(
            <Card
            key = {card.id}
            isFlipped = {card.isFlipped}
            isCheatActivated = {card.isCheatActivated}
            src = {require("" + card.url)}
            backsideImage = {require('./static/backsideOfCard.png')}
            flip = {() => props.flip(index)}
            cheatToggler = {(event) => props.cheatToggler(event, index)}
            />
            );
    });
}

export default Cards;

