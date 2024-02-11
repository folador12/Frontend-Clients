import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Cadastro from "./Cadastro.tsx";
import Editar from "./Editar.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/editar/:id",
    element: <Editar />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
