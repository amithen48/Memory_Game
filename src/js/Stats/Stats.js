import React, {Component} from 'react'

import Timer from './Timer/Timer'

import { Button } from 'semantic-ui-react'
import './Stats.css';

class Stats extends Component {

    render() {
        const rawStats =
        this.props.gameStarted ? 
            <div>
                <h2>{this.props.madeMoves} :מהלכים </h2>
                <Timer
                    gameWon = {this.props.gameWon}
                    madeMoves = {this.props.madeMoves}>
                </Timer>
            </div>
            :
            <Button 
            color='teal' 
            size='massive'
            style = {{marginTop: '130px'}} 
            onClick = {this.props.createBoard}>!התחל</Button>
    
        return(
            <div className='stats'>
                {rawStats}
            </div>        
        )
    } 
}

export default Stats;