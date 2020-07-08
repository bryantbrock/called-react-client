import reducer from 'app/reducers'
import {thunk} from 'middleware'
import {configureStore} from '@reduxjs/toolkit'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {key: 'root', storage}
const persistedReducer = persistReducer(persistConfig, reducer)
const middleware = [thunk]

export const store = configureStore({reducer: persistedReducer, middleware})
export const persistor = persistStore(store)
