import React from 'react';
import { createRoot } from 'react-dom/client';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import { App } from './app';
import { history, store } from './store';
import { Provider } from 'react-redux';

import '@styles/styles.css';
import '@styles/styles.less';
import '@styles/styles.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
