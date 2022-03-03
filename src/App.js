import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbarz from './js/Navbarz/Navbarz';
import Game from './js/Game/Game';
import StatsPage from './js/Views/StatsPage/StatsPage';
import Login from  './js/Views/Auth/Login/Login';
import Logout from './js/Views/Auth/Logout/Logout';
import Signup from './js/Views/Auth/Signup/Signup';
import Levels from './js/Views/Levels/Levels';
import * as actions from './js/store/actions/index';

import './App.css';

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignUp();
  }

  render(){

    const navbar = this.props.isAuthenticated ? <Navbarz/> : null

    let routes = (
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/signup' component={Signup}></Route>
        <Route path='/' component={Login}></Route>
      </Switch>
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/logout' component={Logout}></Route>
          <Route path='/levels' component={Levels}></Route>
          <Route path='/game' component={Game}></Route>
          <Route path='/stats' component={StatsPage}></Route>
          <Route path='/' exact component={Game}></Route>  
          <Redirect to='/levels'/>     
        </Switch>
      );
    }
    return(
      <div className = 'App'>
        {navbar}
        {routes}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
