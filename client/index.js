import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import {createStore} from 'redux';
import rootReducer from '../store/reducers/index.js';
import {Provider} from 'react-redux';

const myStore = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<Provider store={myStore}><App /></Provider>, document.getElementById("app"));