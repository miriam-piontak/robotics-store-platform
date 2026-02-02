import './App.css';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Routing } from './components/routing';
import Nav from './components/nav'
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>

      <div className="App">


        <BrowserRouter>
          <Nav></Nav>
          <Routing></Routing>
        </BrowserRouter>

      </div>
    </Provider>


  );
}

export default App;
