import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { createBrowserHistory } from 'history'
import { createReduxHistoryContext } from 'redux-first-history'
import logger from 'redux-logger';
import { rootSaga } from "./rootSaga";
import { Env } from "../config/Env";
import { postReducer } from "../features/posts/postSlice";
import { userReducer } from "../features/user/userSlice";


const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  reduxTravelling: Env.isDev(),
  savePreviousLocations: 1,
});

console.log(Env.isDev());

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: {
      post: postReducer,
      user: userReducer,
      router: routerReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false })
        .concat(sagaMiddleware)
        .concat(routerMiddleware)
        .concat(logger)
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const history = createReduxHistory(store);
