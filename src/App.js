import React from 'react'
import {Provider} from 'react-redux'
// import {Router} from "react-router-dom"
import {PersistGate} from 'redux-persist/integration/react'
import {Routing} from "app/routing"
import history from 'app/history'
import {store, persistor} from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './resources/css/main.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import {Router, Route} from 'react-router-dom'
import {Event} from 'app/event'
import ScrollToTop from 'components/ScrollToTop'
import {ToastContainer, Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          transition={Slide}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <ScrollToTop />
            <Routing />
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
