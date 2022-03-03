import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import { Button } from 'semantic-ui-react';

import './Week.css';

class Week extends Component {

    render() {

        const levels = [];

        for(let key in this.props.week){
            levels.push({
                ...this.props.week[key],
                id: key    
            })
        }

        console.log(levels)

        const levelsLayout = levels.map(level => {
            if(!isNaN(level.id)&&(level.id!=='0')){
                return (
                <div className='levelsButton' key={level.id}>
                    <Button 
                    disabled = {!level.active} 
                    color = {level.active ? 'teal' : 'grey'}
                    onClick = {() => this.props.onLevelPicked(level.id)}>
                        {level.id}
                    </Button>
                </div> 
                )      
            }
        })

        return levelsLayout;
    }
}  

const mapDispatchToProps = dispatch => {
    return {
        onLevelPicked: (numOfLevel) => dispatch(actions.levelPicked(numOfLevel)),
    }
}
    
export default connect(null, mapDispatchToProps)(Week);
  
