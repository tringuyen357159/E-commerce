import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import adminReducer from './adminReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'admin',
    whitelist: ['isLogin', 'username', 'accessToken', 'isAdmin']
};

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    admin: persistReducer(userPersistConfig, adminReducer),
    product: productReducer,
    user: userReducer,
})

export default rootReducer