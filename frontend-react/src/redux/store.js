import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { logger, saver, sessionSaver } from "./middleware";

// const initialState = (localStorage['redux-store']) ?
//   JSON.parse(localStorage['redux-store']) :
//   {}
// ;

const getInitialState = () => {
  const sessionState = sessionStorage['redux-store'] ? JSON.parse(sessionStorage['redux-store']) : {};
  const persistedState = localStorage['redux-store'] ? JSON.parse(localStorage['redux-store']) : {};

  return {
    ...sessionState,
    ...persistedState
  };
};

export default function storeFactory () {
  const store = createStore(
    rootReducer,
    getInitialState(),
    applyMiddleware(saver, sessionSaver, logger, thunk)
  );

  console.log(store.getState());

  return store;
}
