import React, {Component} from 'react';
import M from 'materialize-css';
import './Login.css';
import {connect} from 'react-redux';
import {Link ,Redirect} from 'react-router-dom';
import {auth} from '../actions';



class Login extends Component {

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
    console.log(this.props.errors);
  }

  
	

	render(){
    if (this.props.isAuthenticated) {
            return <Redirect to="/profile" />
        }
   console.log(this.props.errors.length)
    
		return(
				<div className="row">
      <div className="col s12">
        <div className="container"><div id="login-page" className="row">
  <div className="col s12 m6 l4 z-depth-4 card-panel border-radius-6 login-card bg-opacity-8">
    <form className="login-form" onSubmit={this.onSubmit}>
      
      <div className="row">
        <div className="input-field col s12">
          <h5 className="ml-4">Sign in</h5>
        </div>
      </div>
      <div className="row margin">
        <div className="input-field col s12">
          <i className="material-icons prefix pt-2">person_outline</i>
          <input id="username" type="text" name="username"  onChange={e => this.setState({username: e.target.value})}/>
          <label htmlFor="username" className="center-align">Username</label>
        </div>
      </div>
      <div className="row margin">
        <div className="input-field col s12">
          <i className="material-icons prefix pt-2">lock_outline</i>
          <input id="password" type="password"  name="password"    onChange={e =>this.setState({password:e.target.value})}/>
          <label htmlFor="password">Password</label>
        </div>
      </div>

      <div className="row">
        <div className="col s12 m12 l12 ml-2 mt-1">
          <p>
            <label>
              <input type="checkbox" />
              <span>Remember Me</span>
            </label>
          </p>
        </div>
      </div>
      { (this.props.errors.length > 0  && this.props.errors[0].field.length > 7) ?  <div className="row" style={{textAlign:"center"}}>
                  <span style={{color:'red'}}>{'Either username or password is incorrect'}</span>
                </div> : null}
      <div className="row">
        <div className="input-field col s12">
          <button type="submit" className="btn waves-effect waves-light border-round gradient-45deg-purple-deep-orange col s12">Login</button>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6 m6 l6">
          <p className="margin medium-small"><Link to ="/">Register Now!</Link></p>
        </div>
        
      </div>
    </form>
  </div>
</div>
        </div>
      </div>
    </div>

			)
	}
} 
const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
     errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      return dispatch(auth.login(username, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


