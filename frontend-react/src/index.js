import React from 'react';
import { render } from 'react-dom';
import App from "./App";
import storeFactory from "./redux/store";
import { Provider } from "react-redux";

const store = storeFactory();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
