import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import reportWebVitals from './reportWebVitals';
import { BurgerConstructorProvider } from "./context/burger-constructor-context";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BurgerConstructorProvider>
      <App />
    </BurgerConstructorProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
