/**
 *@author: meekoMa
 *@date: 19/05/15 15:55:33
 *@desc: store
 */
import { applyMiddleware,createStore } from 'redux'
import { persistStore, persistReducer,persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/es/storage'
import rootReducer from "../reducers/index";
import logger from 'redux-logger'
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    applyMiddleware(thunk,logger),
);
const persistor =  persistStore(store);

export default {store,persistor};