import React from 'react';
import './global.css';
import Routes from './routes';
import LoginContextProvider from './contexts/LoginContext';
import { ToastProvider } from 'react-toast-notifications';


function App() {
  return (
    <ToastProvider placement="bottom-right" autoDismiss autoDismissTimeout={6000} >
      <LoginContextProvider>
        <Routes />
      </LoginContextProvider>
    </ToastProvider>
  );
}

export default App;
