import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "../store/rootReducer";

// SAGA
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../store/rootSaga";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootSaga);

export default store;