import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { legacy_createStore } from 'redux'
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <ChatProvider>
  <BrowserRouter>
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </BrowserRouter>

  // </ChatProvider>
);
