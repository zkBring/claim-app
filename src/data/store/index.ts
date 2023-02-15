import { createBrowserHistory } from 'history'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware, { ThunkDispatch, ThunkMiddleware } from "redux-thunk"
import { userReducer } from './reducers/user/reducer';
import { tokenReducer } from './reducers/token/reducer'
import { dropReducer } from './reducers/drop/reducer'
// import { setProps, getLocalStore, setLocalStore } from './local-storage-redux'
import { UserState } from './reducers/user/types';
import { TokenState } from './reducers/token/types';
import { DropState } from './reducers/drop/types';
import { TokenActions } from './reducers/token/types'
import { DropActions } from './reducers/drop/types'
import { UserActions } from './reducers/user/types'

export const history = createBrowserHistory()
type TActions = TokenActions & DropActions & UserActions

const reducers = combineReducers({
  user: userReducer,
  drop: dropReducer,
  token: tokenReducer
})

type IAppState = ReturnType<typeof reducers>

export interface RootState {
    user: UserState,
    token: TokenState,
    drop: DropState
}

export type IAppDispatch = ThunkDispatch<IAppState, any, TActions>

const composeEnhancers =
    process.env.NODE_ENV === "development"
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : compose;

const store = createStore<RootState, any, any, any>(
  reducers,
  composeEnhancers(
    applyMiddleware<IAppDispatch, any>(
      thunkMiddleware as ThunkMiddleware<IAppState, TActions, any>,
    )
  )
)


export default store;