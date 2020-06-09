

// Needed for redux-saga es6 generator support
// import '@babel/polyfill';
// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import history from './utils/history';
// import 'sanitize.css/sanitize.css';

// Import root app
import HomeContainer from './containers/HomeContainer/index';



import configureStore from './configureStore';
import {homeContainerSaga} from "./containers/HomeContainer/saga"

// Import i18n messages


// Create redux store with history
const initialState = {};
const { store, persistor } = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

store.runSaga(homeContainerSaga)



  ReactDOM.render(
   
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {/* <ConnectedRouter history={history}> */}
     
                <HomeContainer/>
       
            {/* </ConnectedRouter> */}
        </PersistGate>
      </Provider>,
    MOUNT_NODE
  );


// if (module.hot) {
//   // Hot reloadable React components and translation json files
//   // modules.hot.accept does not accept dynamic dependencies,
//   // have to be constants at compile-time
//   module.hot.accept(['./i18n', 'containers/App'], () => {
//     ReactDOM.unmountComponentAtNode(MOUNT_NODE);
//     render(translationMessages);
//   });
// }

// // Chunked polyfill for browsers without Intl support
// if (!window.Intl) {
//   new Promise(resolve => {
//     resolve(import('intl'));
//   })
//     .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
//     .then(() => render(translationMessages))
//     .catch(err => {
//       throw err;
//     });
// } else {
//   render(translationMessages);
// }

// // Install ServiceWorker and AppCache in the end since
// // it's not most important operation and if main code fails,
// // we do not want it installed
// if (process.env.NODE_ENV === 'production') {
//   require('offline-plugin/runtime').install(); // eslint-disable-line global-require
// }
