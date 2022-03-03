import React from 'react';
import Draggable from 'react-draggable';

import './Dnd.css'

const Dnd = () => {
    return(
        <Draggable>
            <div className = 'redPin'>
                <img  src = {require('./redPin.png')} alt = ''></img>
            </div>
        </Draggable>
    ) 
}

export default Dnd;

