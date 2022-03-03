import React from 'react';
import './Card.css';
import '../Dnd/redPin.png'

const Card = (props) => {

  return(

    <div className = 'card-container' style = {props.isCheatActivated ? {border: '2px red solid'} : null}>
      <div className = 'card' 
      onClick = {props.isFlipped?null:props.flip}
      onContextMenu = {(event) => props.cheatToggler(event)}
      style = {props.isFlipped?{transform : 'rotateY(180deg)'}:null}>
        <div className = 'front'>
          <img src={props.backsideImage}
          alt = ''/>
        </div>
        <div className = 'back'>
          <img src={props.src}
          alt = ''/>
        </div>
      </div>
    </div>
  );
}

export default Card;