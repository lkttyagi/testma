import { createStore, combineReducers, applyMiddleware } from 'redux';
import auth from '../reducers/auth';
import campaign from '../reducers/campaign';
import feedback from '../reducers/feedback';
import thunkMiddleware from 'redux-thunk';

// middleware to enable dispatch multiple actions to store, https://github.com/tshelburne/redux-batched-actions


let reducers = combineReducers({
	auth,campaign,feedback
});

const store = createStore(
reducers,
applyMiddleware(
thunkMiddleware // lets us dispatch() functions

)
);
export default store;