import React from "react";
<<<<<<< HEAD
import * as ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
=======
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "jotai";
>>>>>>> 872a604 (store integration)

import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);
