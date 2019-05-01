import React, { Component } from 'react';
import './App.css';

import Header from './shared/components/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-Wrapper">
          <Header />
          <div style={{padding: '10px 20px'}}>
            <p>
              Please show a list of jobs as per design
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
