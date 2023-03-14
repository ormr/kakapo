import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import Env from '../config/Env';
import { postReducer } from '../features/posts/postSlice';
import { userReducer } from '../features/user/userSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postApi } from '../features/post/api';
import { authApi } from '../features/user/api';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
    reduxTravelling: Env.isDev(),
    savePreviousLocations: 1,
  });

const makeStore = () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      router: routerReducer,
      [authApi.reducerPath]: authApi.reducer,
      [postApi.reducerPath]: postApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(routerMiddleware)
        .concat(authApi.middleware)
        .concat(postApi.middleware)
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
