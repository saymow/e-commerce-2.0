import React from 'react';
import { Provider } from 'react-redux';
import Router from './routes';
import GlobalStyles from './styles/globalStyles';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Router />
    </Provider>
  );
}

export default App;
