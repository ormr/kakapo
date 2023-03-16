import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import { setupListeners } from '@reduxjs/toolkit/query';
import Env from '../config/Env';
import { authReducer } from '../features/auth/authSlice';
import { postsApi } from '../services/api/PostsApi';
import { authApi } from '../services/api/AuthApi';
import { errorLoggerMiddleware } from './middleware/errorLogger';
import { usersApi } from '../services/api/UsersApi';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
    reduxTravelling: Env.isDev(),
    savePreviousLocations: 1,
  });

const makeStore = () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      router: routerReducer,
      [authApi.reducerPath]: authApi.reducer,
      [postsApi.reducerPath]: postsApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(routerMiddleware)
        .concat(errorLoggerMiddleware)
        .concat(authApi.middleware)
        .concat(postsApi.middleware)
        .concat(usersApi.middleware),
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
