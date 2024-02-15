import React, { Component } from 'react';
import EmployeeDirectory from './components/EmployeeDirectory';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {

  render() {
    return (
      <div className="App">
        <EmployeeDirectory/>
      </div>
    );
  }
}

export default App;
