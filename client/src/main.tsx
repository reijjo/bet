import "./index.css";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.tsx";
import { store } from "./store/store.tsx";

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
