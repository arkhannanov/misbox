import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import departmetsReducer from "./departmets-reducer";

let reducers = combineReducers({
  departmentsPage: departmetsReducer,
  auth: authReducer,
  form: formReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleware)));
window.__store__ = store;

export default store;