import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from './app';
import { store } from './store';
import { Provider } from 'react-redux';

import '@styles/styles.css';
import '@styles/styles.less';
import '@styles/styles.scss';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
