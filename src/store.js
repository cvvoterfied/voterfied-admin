import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const initialState = { };
const middleware = [thunk];

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(
    persistedReducer,
    initialState,
    compose(
        applyMiddleware(...middleware)
    ));
export const persistor = persistStore(store);



