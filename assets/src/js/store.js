import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import dashboard from "./reducers";

export default  store = createStore(dashboard, applyMiddleware(thunk));