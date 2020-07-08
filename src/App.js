import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter} from "react-router-dom"
import {PersistGate} from 'redux-persist/integration/react'
import {Routing} from "app/routing"
import {store, persistor} from 'store'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routing />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
