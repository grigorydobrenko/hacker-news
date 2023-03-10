import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./appReducer";
import {newsReducer} from "./newsReducer";

export const store = configureStore({
    reducer: {
        app: appReducer,
        news: newsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;