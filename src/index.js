import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './Components/context/AuthContext';
import { ChatContextProvider } from './Components/context/ChatContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <link href="//db.onlinewebfonts.com/c/229a57bbeef591e04a1fdfe347c90864?family=Centra+No2" rel="stylesheet" type="text/css"/>
    <ChatContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);