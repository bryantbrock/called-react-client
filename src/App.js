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
import { Router, Route } from 'react-router-dom'
import {Event} from 'app/event'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <Routing />
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
