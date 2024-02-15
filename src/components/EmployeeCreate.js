import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Mutation } from '@apollo/client/react/components';
import { GET_EMPLOYEES, ADD_EMPLOYEE } from '../graphql/queries';


class EmployeeCreate extends Component {
    state = {
        firstName: '',
        lastName: '',
        age: '',
        dateOfJoining: '',
        title: '',
        department: '',
        employeeType: '',
        currentStatus: true, // Assuming working status upon creation
        errors: {}, // To store validation errors
    };



    validateForm = () => {
        const errors = {};
        const { firstName, lastName, age } = this.state;

        const validate = (fieldName, fieldState) => {
            if (fieldState.trim() === '') {
                errors[fieldName] = `${fieldName} is required`;
            } else if (!isNaN(fieldState)) {
                errors[fieldName] = `${fieldName} cannot be a number`;
            }
        };

        // First and Last Name validation
        validate('First Name', firstName);
        validate('Last Name', lastName);


        // Age validation
        if (age < 20 || age > 70) {
            errors.age = 'Age must be between 20 and 70';
        }

        // Add more validations as needed

        this.setState({ errors });
        return Object.keys(errors).length === 0; // Form is valid if no errors
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    addEmployee = (addEmployeeMutation) => {
        const { firstName, lastName, age, dateOfJoining, title, department, employeeType } = this.state;
        addEmployeeMutation({
            variables: {
                firstName,
                lastName,
                age: parseInt(age),
                dateOfJoining,
                title,
                department,
                employeeType
            },
            refetchQueries: [{ query: GET_EMPLOYEES }]
        });
    };

    handleSubmit = (event, addEmployeeMutation) => {
        event.preventDefault();
        if (this.validateForm()) {
            this.addEmployee(addEmployeeMutation);
            this.setState({
                firstName: '',
                lastName: '',
                age: '',
                dateOfJoining: '',
                title: '',
                department: '',
                employeeType: '',
                currentStatus: true,
                errors: {}
            });
        }
    };

    render() {
        const { firstName, lastName, age, dateOfJoining, errors } = this.state;

        return (
            <Mutation mutation={ADD_EMPLOYEE}>
                {(addEmployeeMutation, { loading, error }) => (

                    <div className='card mt-5' id='createEmpDiv'>

                        <div className='card-header text-center'>
                            Create Employee
                        </div>
                        <form onSubmit={(event) => this.handleSubmit(event, addEmployeeMutation)} className='p-4'>
                            <div className="mb-3">
                                <label className="form-label">First Name</label>
                                <input type="text" name="firstName" value={firstName} onChange={this.handleChange} className="form-control" />
                                {errors['First Name'] && <div className="alert alert-danger mt-2">{errors['First Name']}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Last Name</label>
                                <input type="text" name="lastName" value={lastName} onChange={this.handleChange} className="form-control" />
                                {errors['Last Name'] && <div className="alert alert-danger mt-2">{errors['Last Name']}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Age</label>
                                <input type="number" name="age" value={age} onChange={this.handleChange} className="form-control" />
                                {errors.age && <div className="alert alert-danger mt-3">{errors.age}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Date of Joining</label>
                                <input type="date" name="dateOfJoining" value={dateOfJoining} onChange={this.handleChange} className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <select name="title" onChange={this.handleChange} className="form-select" required>
                                    <option value="">Select Title</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Director">Director</option>
                                    <option value="VP">VP</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Department</label>
                                <select name="department" onChange={this.handleChange} className="form-select" required>
                                    <option value="">Select Department</option>
                                    <option value="IT">IT</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="HR">HR</option>
                                    <option value="Engineering">Engineering</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Employee Type</label>
                                <select name="employeeType" onChange={this.handleChange} className="form-select" required>
                                    <option value="">Select Type</option>
                                    <option value="FullTime">FullTime</option>
                                    <option value="PartTime">PartTime</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Seasonal">Seasonal</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default EmployeeCreate;
