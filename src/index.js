import { SnackbarProvider } from "notistack";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./i18n";
import { store } from "./Redux/store";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<div>Loading</div>}>
        <SnackbarProvider
          maxSnack={1}
          dense={false}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <App />
        </SnackbarProvider>
      </Suspense>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
