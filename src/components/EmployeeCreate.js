import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMutation } from '@apollo/client';
import { GET_EMPLOYEES, ADD_EMPLOYEE } from '../graphql/queries';
import { Button, Form, Modal } from 'react-bootstrap';

const EmployeeCreateModal = ({ show, handleClose }) => {
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
        } else if (!isNaN(firstName)) {
            newErrors['First Name'] = 'First Name cannot be a number';
        }

        if (lastName.trim() === '') {
            newErrors['Last Name'] = 'Last Name is required';
        } else if (!isNaN(lastName)) {
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
                handleClose();
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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='firstName'
                            value={firstName}
                            onChange={handleChange}
                            placeholder='Enter First Name'
                        />
                        {errors['First Name'] && <div className='alert alert-danger mt-2'>{errors['First Name']}</div>}
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='lastName'
                            value={lastName}
                            onChange={handleChange}
                            placeholder='Enter Last Name'
                        />
                        {errors['Last Name'] && <div className='alert alert-danger mt-2'>{errors['Last Name']}</div>}
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type='number'
                            name='age'
                            value={age}
                            onChange={handleChange}
                            placeholder='Enter Age'
                        />
                        {errors.age && <div className='alert alert-danger mt-2'>{errors.age}</div>}
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Date of Joining</Form.Label>
                        <Form.Control
                            type='date'
                            name='dateOfJoining'
                            value={dateOfJoining}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control as='select' name='title' onChange={handleChange}>
                            <option value=''>Select Title</option>
                            <option value='Employee'>Employee</option>
                            <option value='Manager'>Manager</option>
                            <option value='Director'>Director</option>
                            <option value='VP'>VP</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Department</Form.Label>
                        <Form.Control as='select' name='department' onChange={handleChange}>
                            <option value=''>Select Department</option>
                            <option value='IT'>IT</option>
                            <option value='Marketing'>Marketing</option>
                            <option value='HR'>HR</option>
                            <option value='Engineering'>Engineering</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Employee Type</Form.Label>
                        <Form.Control as='select' name='employeeType' onChange={handleChange}>
                            <option value=''>Select Type</option>
                            <option value='FullTime'>FullTime</option>
                            <option value='PartTime'>PartTime</option>
                            <option value='Contract'>Contract</option>
                            <option value='Seasonal'>Seasonal</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EmployeeCreateModal;
