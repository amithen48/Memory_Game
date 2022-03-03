import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.jpeg'

import { Menu, Dropdown } from 'semantic-ui-react';

class Navbarz extends Component {

    state = { 
        activeItem: null,
    }

    handleItemClick = (e , {name}) => {
        this.setState({ activeItem: name });
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    render(){

        const nameOfUser = this.props.userData !== null ?
        this.capitalizeFirstLetter(this.props.userData.name.first) 
        + ' ' + 
        this.capitalizeFirstLetter(this.props.userData.name.last)
        :
        '';

        return(
            
            <Menu inverted size='massive'>
                <Menu.Item active={false}>
                    <img src={logo} style={{width: '50px', height: '25px'}}>
                    </img>
                </Menu.Item>
                <Menu.Item 
                    href='/stats'
                    name='נתונים'
                    active={this.state.activeItem === 'Stats'}
                    onClick={this.handleItemClick}>
                </Menu.Item>
                <Menu.Item   
                    href='/levels'                     
                    name='שלבים'
                    active={this.state.activeItem === 'Levels'}
                    onClick={this.handleItemClick}
                />
                <Menu.Menu position='right'>
                    <Dropdown item text={nameOfUser}>
                        <Dropdown.Menu>
                            <Dropdown.Item icon='log out' text='התנתק' href='/logout' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        ) ;
    }
}

const mapStateToProps = state => {
    return {
        userData: state.auth.userData,
    };
}

export default connect(mapStateToProps)(Navbarz);

