import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <LoginForm />
  </Provider>,
  document.getElementById('root')
);