import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {routes} from "./routes/root";
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/createStore";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <Provider store={store}>
        <RouterProvider router={routes}/>
    </Provider>
)

reportWebVitals();
