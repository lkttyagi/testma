import { history } from '../_helpers/history';  
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';



export const EMAIL_CONFIRMATION_REQUEST='EMAIL_CONFIRMATION_REQUEST'
export const EMAIL_CONFIRMATION_REQUEST_SUCCESS='EMAIL_CONFIRMATION_REQUEST_SUCCESS'
export const EMAIL_CONFIRMATION_REQUEST_ERROR='EMAIL_CONFIRMATION_REQUEST_ERROR'




export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({type:"USER_LOADING"});
    
    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    return fetch("accounts/user/", {headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'USER_LOADED', user: res.data });
          console.log(res.data);
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}
export const login = (username, password) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({username, password});

    return fetch("accounts/login/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'LOGIN_SUCCESSFUL', data: res.data });
          history.push('/launch')
          return res.data;
          
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          NotificationManager.error('Email or Password Is incorrect', 'Click me!')
        

          throw res.data;
        } else {
          dispatch({type: "LOGIN_FAILED", data: res.data});
          NotificationManager.error('Email or Password Is incorrect', 'Click me!')

          throw res.data;
        }
      })
  }
}
export const register = (username, password ,first_name ,email) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({username, password, first_name ,email});

    return fetch("accounts/register/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          dispatch({type: 'REGISTRATION_SUCCESSFUL', data: res.data });
          history.push('/input_phone');
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          dispatch({type: "REGISTRATION_FAILED", data: res.data});
          throw res.data;
        }
      })
  }
}

export function emailConfirmationRequest(){
  return{
    type:EMAIL_CONFIRMATION_REQUEST
  }
}
export function emailConfirmationRequestSuccess(){
  return{
    type:EMAIL_CONFIRMATION_REQUEST_SUCCESS
  }
}
export function emailConfirmationRequestError(){
  return{
    type:EMAIL_CONFIRMATION_REQUEST_ERROR
  }
}
export function emailConfirmationAction(key){
  return(dispatch,getState) =>{
    dispatch(emailConfirmationRequest())
    const data={
      key:key
    }
    axios
         .post('http://localhost:8000/accounts/registration/verify-email/',data)
         .then(response =>{
          dispatch(emailConfirmationRequestSuccess())
         })
         .catch(error=>{
          dispatch(emailConfirmationRequestError())
          
         })
  }
}


