import React, { Component } from 'react';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable';
import EmployeeCreate from './EmployeeCreate';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from '../App';

const client = new ApolloClient({
  uri: 'http://localhost:5500/graphql',
  cache: new InMemoryCache()
});


class EmployeeDirectory extends Component {
  state = {
    // Initial state or data to be passed to child components
  };



  render() {
    return (
      <ApolloProvider client={client}>
        <div className='container mt-5'>
          <div className='card'>
            <div className='card-header text-center'>
              <h3>Employee Management System</h3>
            </div>
            </div>
            <EmployeeSearch />
            <EmployeeTable />
            <EmployeeCreate />
          
        </div>
      </ApolloProvider>
    );
  }

  // render() {
  //     return <EmployeeTable />;
  //   }
}

export default EmployeeDirectory;

