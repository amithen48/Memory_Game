import React, { Component } from 'react';
import { connect } from 'react-redux';

import Week from './Week/Week';

import './Levels.css';
import { Redirect } from 'react-router-dom';

class Levels extends Component {
   
    render(){  

        const levelsRedirect = this.props.isGameDataSaved ?
        <Redirect to = '/game'/>
        :
        null

        const fetchedWeeks = []
        if(this.props.userData !== null){
            for(let key in this.props.userData.levels.weeks){
                fetchedWeeks.push({
                    ...this.props.userData.levels.weeks[key],
                    id: key
                });
            }

            return(
                <div className='levelsDiv' key=''>
                    {fetchedWeeks.map(week => (
                        <div className = 'weekDiv' key={week.id}>
                            <h2>{week.id}</h2>
                            <Week 
                            key={week.id}   
                            week = {week} />
                            <hr></hr>
                        </div>
                    ))}
                    {levelsRedirect}
                </div>
            );
        } else {
            return null;
        }
    }  
}

const mapStateToProps = state => {
    return {
        userData: state.auth.userData,
        isGameDataSaved: state.game.numOfCards !== null
    }
}
    
export default connect(mapStateToProps)(Levels);
  
    
