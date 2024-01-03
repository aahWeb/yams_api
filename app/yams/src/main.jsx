import React from "react";
import ReactDOM from "react-dom/client";
// Le store est créer par configureStore()
import { store } from "./store/store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout.jsx";

import "./index.css";
import App from "./App.jsx";
import Contact from "./pages/Contact.jsx";

/**
 * Création des routes et de leur chemain dans l'URL. La variable router doit être fourni dans <RouterProvider />
 * createBrowserRouter() intègre l'API History pour manipuler l'historique de navigation de l'onglet.
 * 
 * https://reactrouter.com/en/main/routers/create-browser-router
 * https://developer.mozilla.org/fr/docs/Web/API/History
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: ( // Layout.jsx englobe nos pages pour leur ajouter une bare de navigation avec le "logout"
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <Contact />
      </Layout>
    ),
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* On fourni le "store" redux pour permettre à toute l'application d'accéder aux "state global" via useDispatch() et useSelector() */}
    <Provider store={store}>
      <RouterProvider router={router} /> {/* On fourni nos routes défini plus haut */}
    </Provider>
  </React.StrictMode>
);
