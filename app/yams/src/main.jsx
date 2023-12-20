import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./store/store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './routes'

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/contact",
    element: (
      <>
        <Root />
        <p>Hello, laisse moi un message</p>
      </>
    ),
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
