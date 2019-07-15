import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
// import logger from "redux-logger";

import App from "./App";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// const myLogger = (store) => (next) => (action) => {
//     console.log("Logged Action: ", action);
//     next(action);
// };

const initialState = {
    photos: [],
    selectedImage: {
        selected: false,
        url: ''
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SELECTED_IMAGE":
            state = {
                ...state,
                selectedImage: action.payload
            };
            break;
        case "SET_PHOTOS":
            state = {
                ...state,
                photos: state.photos.concat(action.payload)
            };
            break;
            case "SET_EMPTY_PHOTOS":
            state = {
                ...state,
                photos: []
            };
            break;
        default:
            break;
    }
    return state;
};

const store = createStore(reducer);



// store.subscribe(() => {
//     console.log("Store updated!", store.getState());
// });

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>,
    document.getElementById("root"));
