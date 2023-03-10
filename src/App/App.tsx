import React from 'react';
import './App.css';
import {Outlet} from "react-router-dom";
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;

function App(): JSX.Element {

    return (
        <div className="App">
            <Outlet/>
        </div>
    );
}

export default App;
