import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Table } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPLOYEES, DELETE_EMPLOYEE } from '../graphql/queries';
import EmployeeCreateModal from './EmployeeCreate';

const EmployeeTable = () => {
    const [showModal, setShowModal] = useState(false);

    const { loading, error, data } = useQuery(GET_EMPLOYEES);
    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
        refetchQueries: [{ query: GET_EMPLOYEES }],
    });

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const formatDate = (timestamp) => {
        const date = new Date(parseInt(timestamp));
        const options = { month: 'short', year: 'numeric', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleDelete = (id) => {
        deleteEmployee({ variables: { id } });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Card className='mt-5'>
            <Card.Header className='d-flex justify-content-between align-items-center'>
                <h4>Employee Directory</h4>
                <Button variant='primary' onClick={handleShowModal} className='float-end'>
                    Create New Employee
                </Button>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Date of Joining</th>
                            <th>Title</th>
                            <th>Department</th>
                            <th>Employee Type</th>
                            <th>Current Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.employees.map((employee, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.age}</td>
                                <td>{formatDate(employee.dateOfJoining)}</td>
                                <td>{employee.title}</td>
                                <td>{employee.department}</td>
                                <td>{employee.employeeType}</td>
                                <td>{employee.currentStatus ? 'Working' : 'Retired'}</td>
                                <td>
                                    <Button variant='danger' onClick={() => handleDelete(employee.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
            <EmployeeCreateModal show={showModal} handleClose={handleCloseModal} />
        </Card>
    );
};

export default EmployeeTable;
