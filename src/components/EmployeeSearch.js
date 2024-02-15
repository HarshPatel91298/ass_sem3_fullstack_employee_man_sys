import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeSearch = () => {

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
                    <button class="btn btn-primary w-100">Search</button>
                </div>
            </div>
        </div>
    );

}

export default EmployeeSearch;