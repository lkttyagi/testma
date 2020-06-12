import React from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import './register.css';
import {connect} from "react-redux";
import {Link,Redirect} from 'react-router-dom';
import {auth} from '../actions';

class Register extends React.Component{
	state = {
    first_name:'',
		username:'',
		email:'',		
		password:''
	};
	onSubmit = e => {
    e.preventDefault();
    this.props.register( this.state.password, this.state.first_name,this.state.email);
  }


	handle_change = e =>{
		const name = e.target.name;
		const value = e.target.value;
		this.setState(prevstate =>{
			const newState = { ...prevstate };
			newState[name] =value;
			return newState;
		});
	};
	render(){
       if (this.props.isAuthenticated) {
            return <Redirect to="/dashboard" />
        }
   
			
				return(
			<div className="row">
      <div className="col s12">
        <div className="container"><div id="register-page" className="row">
  <div className="col s12 m6 l4 z-depth-4 card-panel border-radius-6 register-card bg-opacity-8">
    <form className="login-form" onSubmit={this.onSubmit}>
      <div className="row">
        <div className="input-field col s12">
          <h5 className="ml-4">Register</h5>
          <p className="ml-4">Join to our community now !</p>
        </div>
      </div>
      <div className="row margin">
        <div className="input-field col s12">
          <i className="material-icons prefix pt-2">person_outline</i>
          <input id="first_name" type="text" name="first_name" value={this.state.first_name} onChange={e=>this.setState({first_name:e.target.value})}/>
          <label htmlFor="first_name" className="center-align">Name</label>
        </div>
      </div>
      
      <div className="row margin">
        <div className="input-field col s12">
          <i className="material-icons prefix pt-2">mail_outline</i>
          <input id="email" type="text" name="email" value={this.state.email} onChange={e=>this.setState({email:e.target.value})}/>
          <label htmlFor="email" className="center-align">Email</label>
        </div>
      </div>
      
      <div className="row margin">
        <div className="input-field col s12">
          <i className="material-icons prefix pt-2">lock_outline</i>
          <input id="password" type="password" name="password" value={this.state.password} onChange={e=> this.setState({password:e.target.value})}/>
          <label htmlFor="password">Password</label>
        </div>
      </div>
      
      <div className="row">
        <div className="input-field col s12">
          <button type="submit"  className="btn waves-effect waves-light border-round gradient-45deg-purple-deep-orange col s12">Register</button>
        </div>
      </div>
      { (this.props.errors.length > 0  && this.props.errors[0].field.length > 7) ?  <div className="row" style={{textAlign:"center"}}>
                  <span style={{color:'red'}}>{'Please fill the form again'}</span>
                </div> : null}
      <div className="row">
        <div className="input-field col s12">
          <p className="margin medium-small"><Link to="/login">Already have an account? Login</Link></p>
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
    register: (username, password ,first_name,email) => dispatch(auth.register(username, password ,first_name ,email)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);