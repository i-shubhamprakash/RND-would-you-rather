import React,{ Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { connect } from 'react-redux'

import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import Login from './Login'
import Add from './Add'
import { Route ,Switch} from 'react-router-dom'

import {getUsers} from '../actions/users'
import {getQuestions} from '../actions/questions'

import {_getUsers} from '../api/_DATA'
class App extends Component {

  componentDidMount(){
    this.props.dispatch(getUsers());
    this.props.dispatch(getQuestions());
    console.log("Prope",this.props);
  }

  render(){
    return (
      <>
        <CssBaseline />
        <Nav username={this.props.auth.username}/>
        <div style={{height:"64px", width:"100%"}}></div>
        <Switch>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/login">
            <Login users={this.props.users} auth={this.props.auth}/>
          </Route>
          <Route exact path="/add">
            <Add/>
          </Route>
        </Switch>
        <Footer/>
      </>
    );
  }
}
const mapStateToProps=(state)=>{
  return state
}
export default connect(mapStateToProps)(App);
