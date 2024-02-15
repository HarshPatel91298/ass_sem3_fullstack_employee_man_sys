import React from 'react';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable';
import EmployeeCreate from './EmployeeCreate';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  uri: 'http://localhost:5500/graphql',
  cache: new InMemoryCache()
});


const EmployeeDirectory = () => {
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
};

export default EmployeeDirectory;

