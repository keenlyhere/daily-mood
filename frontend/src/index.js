import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import './index.css';
import { Modal, ModalProvider } from './context/Modal';
import * as sessionActions from './store/session';
import { DragDropContext } from 'react-beautiful-dnd';
import "./reset.css";
import { loadCurrentDayTasks } from './store/userTaskReducer';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {

  
  return (
    <ModalProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
            <Modal />
          </BrowserRouter>
        </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
