import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import {store} from './reduxStorage/redux.store.js'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './reduxStorage/redux.store.js';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
 <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>  
    </Provider>
  </StrictMode>
)
