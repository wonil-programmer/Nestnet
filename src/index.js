import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Gallery from "./routes/Gallery";
import Modal from "./components/Modal/Modal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Modal />
  </React.StrictMode>
);
