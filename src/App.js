import React, { Component } from 'react';
import './App.css';


import MainComponent from './main'
//import MainComponent from './bootstrapCart'

class App extends Component {
  render() {
    return (
        <div className="App">
            <MainComponent/>
        </div>
    );
  }
}

export default App;
