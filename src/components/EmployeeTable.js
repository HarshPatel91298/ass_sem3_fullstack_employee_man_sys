import React  from 'react';
import { useQuery, useMutation } from '@apollo/react-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GET_EMPLOYEES, DELETE_EMPLOYEE } from '../graphql/queries';



const EmployeeTable = () => {

    const DeleteButton = ({ id }) => {
        const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
            refetchQueries: [{ query: GET_EMPLOYEES }] // Refetch employees after deletion
        });
    
        const handleDelete = () => {
            deleteEmployee({ variables: { id } });
        };
    
        return <button className="btn btn-danger" onClick={handleDelete}>Delete</button>;
    };
    
    const formatDate = (timestamp) => {
        const date = new Date(parseInt(timestamp));
        const options = { month: 'short', year: 'numeric', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };
    

    const { loading, error, data } = useQuery(GET_EMPLOYEES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="card mt-5">
            <div className="card-header text-center">Employees</div>
            <div className="card-body p-3">
                <table className="table">
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
                                    <DeleteButton id={employee.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default EmployeeTable;
