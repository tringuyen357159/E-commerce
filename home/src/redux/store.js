import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer/index';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';



export const history = createBrowserHistory();

const reducer = rootReducer(history);

const store = createStore(reducer, compose(applyMiddleware(thunk)));

export const persistor = persistStore(store);

export default store;