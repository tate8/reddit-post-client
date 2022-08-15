import React from "react";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client'
import App from "./components/App";
import { store } from "./store/store";

// render app with global store
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <App />
</Provider>
)