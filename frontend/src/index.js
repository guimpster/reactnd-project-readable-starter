import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter><App store={store}/></BrowserRouter>
</Provider>
, document.getElementById('root'))
registerServiceWorker();
