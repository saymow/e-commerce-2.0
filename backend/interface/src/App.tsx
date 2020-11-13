import React from 'react';
import { Provider } from 'react-redux';
import Router from './routes';
import GlobalStyles from './styles/globalStyles';
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer closeOnClick autoClose={2000} />
      <GlobalStyles />
      <Router />
    </Provider>
  );
}

export default App;
