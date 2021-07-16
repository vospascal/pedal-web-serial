import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import WebSerialContextProvider from "./WebSerialContext";

const root = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <WebSerialContextProvider>
            <App/>
        </WebSerialContextProvider>
    </React.StrictMode>,
    root
);
