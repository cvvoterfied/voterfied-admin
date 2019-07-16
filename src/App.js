import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import './fonts.css';
import Landing from './components/LandingPage';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store';

class App extends Component {
componentDidMount() {
    document.title = "Voterfied";
}
  render() {
      return (
          <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                  <Landing />
              </PersistGate>
          </Provider>
    );
  }
}

export default App;
    
