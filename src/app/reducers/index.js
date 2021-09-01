import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import auth from './auth'
import team from './team'
import project from './project'
import diagram from './diagram'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth','team','project', 'diagram']
}

const rootReducer = combineReducers({
    auth,
    team,
    project,
    diagram
})

export default persistReducer(persistConfig, rootReducer)