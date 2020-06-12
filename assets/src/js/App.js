import React, { Component } from 'react';
import { withRouter,Route, Switch, BrowserRouter, Redirect ,Router} from 'react-router-dom';

import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { history } from './_helpers/history';

import {auth} from "./actions";
import Profile from './components/profile';



import Register from './components/Register';
import Login from "./components/Login";
import store from './store/store';
import * as action from './actions/auth';




class RootContainerComponent extends Component {



  componentDidMount() {
    
    store.dispatch(action.loadUser())

  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  }

  render() {
    let {PrivateRoute} = this;
    return (
        
        
          
          
          <Router history={history}>
          <Switch>
          <Route  path="/login" component={Login} />
          <Route exact path="/" component={Register}/>
          <PrivateRoute path="/profile" component={Profile}/>
          
          

          
          </Switch>
          
   
          </Router>
          

          
          
          
          
          
          
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}



let RootContainer = connect(mapStateToProps)(RootContainerComponent);

 class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}
export default withRouter(App);


