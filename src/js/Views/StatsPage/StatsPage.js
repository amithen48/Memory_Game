import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react'

import './StatsPage.css';


class StatsPage extends Component {

    render() {

        const fetchedWeeks = []
        if(this.props.userData !== null){
            for(let key in this.props.userData.levels.weeks){
                fetchedWeeks.push({
                    ...this.props.userData.levels.weeks[key],
                    id: key
                });
            }
            const weekList = fetchedWeeks.map((week) => {
                let fetchedLevels = []
                for(let key in week){
                    fetchedLevels.push({
                        ...week[key],
                        id: key
                    });
                }
                const levelsList = fetchedLevels.map((level => {
                    if(level.id !== '0' && level.id !== 'id'){
                        console.log(level);
                        return(
                            <div key={level.id}>
                                <strong><u>שלב {level.id}</u>   :</strong> {level.bestScore !== undefined ? 
                                level.bestScore.madeMoves+ level.bestScore.timeFinished
                                :
                                'אין תוצאה'}
                            </div>
                        )
                    }  
                    return null;            
                }))
                return(
                    <div className='weekStatsDiv' key={week.id}>
                        <h2>{week.id}</h2> 
                        {levelsList}         
                    </div>
                )    
            })

            return (
                <div>     
                    <h1>נתונים</h1>
                    <div style={{width:'50%',  margin:'auto'}}>
                        <Message info>
                            <Message.Header>!?הידעת</Message.Header>
                            <p>
                                !ככל שציונך נמוך יותר, כך אחוזי ההצלחה שלך גבוהים יותר
                            </p>
                        </Message>
                    </div>
                    {weekList}
                </div>
            )
        }
        else {
            return null;
        }
    }
}

const mapStateToProps = state => {
    return {
        userData: state.auth.userData
    };
}

export default connect(mapStateToProps)(StatsPage);


