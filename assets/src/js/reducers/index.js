import auth from './auth';
import {combineReducers} from 'redux';
import campaign from './campaign';
import feedback from './feedback';

const dashboard = combineReducers({
	auth,campaign,feedback
	})

export default dashboard;
