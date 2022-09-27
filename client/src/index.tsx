import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from './app';
import { store } from './store';
import { Provider } from 'react-redux';

import '@styles/styles.css';
import '@styles/styles.less';
import '@styles/styles.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
