import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
// import logger from "redux-logger";
import Env from '../config/Env';
import { postReducer } from '../features/posts/postSlice';
import { userReducer } from '../features/user/userSlice';
import { postApi } from '../features/post/api';
import { setupListeners } from '@reduxjs/toolkit/query';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
    reduxTravelling: Env.isDev(),
    savePreviousLocations: 1,
  });

const makeStore = () => {
  const store = configureStore({
    reducer: {
      // post: postReducer,
      user: userReducer,
      router: routerReducer,
      [postApi.reducerPath]: postApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(routerMiddleware)
        .concat(postApi.middleware),
  });

  return store;
};

export const store = makeStore();

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const history = createReduxHistory(store);
