import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import { login, logout, restoreSession } from './store/session';


const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.login = login;
  window.logout = logout;
}

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );  
}

if (sessionStorage.getItem('currentUser') === null
  || sessionStorage.getItem('X-CSRF-Token') === null) {
    store.dispatch(restoreSession()).then(renderApp);
} else {
  renderApp();
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
