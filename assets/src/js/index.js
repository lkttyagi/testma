import React from 'react';
import ReactDOM from 'react-dom';
import M from 'materialize-css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import * as firebase from 'firebase/app';

var firebaseConfig ={
	apiKey: "AIzaSyC0YzCuOtZaeK0LPJ1z0ryKTkAkyEoOyH8",
    authDomain: "drishte-dashboard.firebaseapp.com",
    databaseURL: "https://drishte-dashboard.firebaseio.com",
    projectId: "drishte-dashboard",
    storageBucket: "drishte-dashboard.appspot.com",
    messagingSenderId: "102153897301",
    appId: "1:102153897301:web:9c356b1f08daa5e9469bdc",
    measurementId: "G-BZFEZVB58L"

};
firebase.initializeApp(firebaseConfig);
ReactDOM.render(
	<BrowserRouter forceRefresh={true}>
	<App />
	</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
