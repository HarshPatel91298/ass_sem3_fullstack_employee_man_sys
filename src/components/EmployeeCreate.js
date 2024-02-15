import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMutation } from '@apollo/client';
import { GET_EMPLOYEES, ADD_EMPLOYEE } from '../graphql/queries';

const EmployeeCreate = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [title, setTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [employeeType, setEmployeeType] = useState('');
    const [errors, setErrors] = useState({});

    const [addEmployeeMutation] = useMutation(ADD_EMPLOYEE, {
        refetchQueries: [{ query: GET_EMPLOYEES }],
    });

    const validateForm = () => {
        const newErrors = {};
        if (firstName.trim() === '') {
            newErrors['First Name'] = 'First Name is required';
        }else if(!isNaN(firstName)){
            newErrors['First Name'] = 'First Name cannot be a number';
        }
        
        if (lastName.trim() === '') {
            newErrors['Last Name'] = 'Last Name is required';
        }else if(!isNaN(lastName)){
            newErrors['Last Name'] = 'Last Name cannot be a number';
        }

        if (isNaN(age) || age < 20 || age > 70) {
            newErrors.age = 'Age must be between 20 and 70';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'firstName') {
            setFirstName(value);
        } else if (name === 'lastName') {
            setLastName(value);
        } else if (name === 'age') {
            setAge(value);
        } else if (name === 'dateOfJoining') {
            setDateOfJoining(value);
        } else if (name === 'title') {
            setTitle(value);
        } else if (name === 'department') {
            setDepartment(value);
        } else if (name === 'employeeType') {
            setEmployeeType(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            addEmployeeMutation({
                variables: {
                    firstName,
                    lastName,
                    age: parseInt(age),
                    dateOfJoining,
                    title,
                    department,
                    employeeType,
                },
            }).then(() => {
                // Clear form after successful submission
                setFirstName('');
                setLastName('');
                setAge('');
                setDateOfJoining('');
                setTitle('');
                setDepartment('');
                setEmployeeType('');
                setErrors({});
            });
        }
    };

    return (
        <div className='card mt-5' id='createEmpDiv'>
            <div className='card-header text-center'>Create Employee</div>
            <form onSubmit={handleSubmit} className='p-4'>
                <div className='mb-3'>
                    <label className='form-label'>First Name</label>
                    <input
                        type='text'
                        name='firstName'
                        value={firstName}
                        onChange={handleChange}
                        className='form-control'
                    />
                    {errors['First Name'] && <div className='alert alert-danger mt-2'>{errors['First Name']}</div>}
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Last Name</label>
                    <input
                        type='text'
                        name='lastName'
                        value={lastName}
                        onChange={handleChange}
                        className='form-control'
                    />
                    {errors['Last Name'] && <div className='alert alert-danger mt-2'>{errors['Last Name']}</div>}
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Age</label>
                    <input type='number' name='age' value={age} onChange={handleChange} className='form-control' />
                    {errors.age && <div className='alert alert-danger mt-3'>{errors.age}</div>}
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Date of Joining</label>
                    <input
                        type='date'
                        name='dateOfJoining'
                        value={dateOfJoining}
                        onChange={handleChange}
                        className='form-control'
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <select name='title' onChange={handleChange} className='form-select' required>
                        <option value=''>Select Title</option>
                        <option value='Employee'>Employee</option>
                        <option value='Manager'>Manager</option>
                        <option value='Director'>Director</option>
                        <option value='VP'>VP</option>
                    </select>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Department</label>
                    <select name='department' onChange={handleChange} className='form-select' required>
                        <option value=''>Select Department</option>
                        <option value='IT'>IT</option>
                        <option value='Marketing'>Marketing</option>
                        <option value='HR'>HR</option>
                        <option value='Engineering'>Engineering</option>
                    </select>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Employee Type</label>
                    <select name='employeeType' onChange={handleChange} className='form-select' required>
                        <option value=''>Select Type</option>
                        <option value='FullTime'>FullTime</option>
                        <option value='PartTime'>PartTime</option>
                        <option value='Contract'>Contract</option>
                        <option value='Seasonal'>Seasonal</option>
                    </select>
                </div>
                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EmployeeCreate;
