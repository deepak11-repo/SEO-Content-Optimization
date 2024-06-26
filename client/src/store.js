// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import inputsReducer from './utility/inputsSlice';
import loaderReducer from './utility/loaderSlice';

const store = configureStore({
    reducer: {
        inputs: inputsReducer,
        loader: loaderReducer,
    },
});

export default store;
