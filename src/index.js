import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom'
/*
import { makeServer } from './server'

if(process.env.NODE_ENV === 'development') {
  makeServer({ enviroment: 'development' })
}
*/
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

