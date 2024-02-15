import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class EmployeeSearch extends Component {
    state = {
        // State to manage search parameters
    };

    handleSearch = () => {
        // Implement search functionality
    };

    render() {
        return (
            <div class='card mt-5'>
                <div class='card-header text-center'>
                    Search Employee
                </div>
                <div class="mb-3 p-3 row align-items-center">
                    <div class="col-9">
                        <input type="text" class="form-control" placeholder="Search Employees" />
                    </div>
                    <div class="col-3">
                        <button class="btn btn-primary w-100" onClick={this.handleSearch}>Search</button>
                    </div>
                </div>
            </div>


        );
    }
}

export default EmployeeSearch;