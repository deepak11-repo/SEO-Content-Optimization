// src/utility/loaderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    urlLoading: true,
    titleLoading: true,
    metaLoading: true,
    h1Loading: true,
    h2Loading: true,
    h3Loading: true,
    h4Loading: true,
    h5Loading: true,
    h6Loading: true,
    paragraphLoading: true,
    imageLoading: true,
    anchorLoading: true
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setUrlLoading: (state, action) => {
            state.urlLoading = action.payload;
        },
        setTitleLoading: (state, action) => {
            state.titleLoading = action.payload;
        },
        setMetaLoading: (state, action) => {
            state.metaLoading = action.payload;
        },
        setH1Loading: (state, action) => {
            state.h1Loading = action.payload;
        },
        setH2Loading: (state, action) => {
            state.h2Loading = action.payload;
        },
        setH3Loading: (state, action) => {
            state.h3Loading = action.payload;
        },
        setH4Loading: (state, action) => {
            state.h4Loading = action.payload;
        },
        setH5Loading: (state, action) => {
            state.h5Loading = action.payload;
        },
        setH6Loading: (state, action) => {
            state.h6Loading = action.payload;
        },
        setParagraphLoading: (state, action) => {
            state.paragraphLoading = action.payload;
        },
        setImageLoading: (state, action) => {
            state.imageLoading = action.payload;
        },
        setAnchorLoading: (state, action) => {
            state.anchorLoading = action.payload;
        },
    },
});

export const {
    setUrlLoading,
    setTitleLoading,
    setMetaLoading,
    setH1Loading,
    setH2Loading,
    setH3Loading,
    setH4Loading,
    setH5Loading,
    setH6Loading,
    setParagraphLoading,
    setImageLoading,
    setAnchorLoading
} = loaderSlice.actions;

export default loaderSlice.reducer;
