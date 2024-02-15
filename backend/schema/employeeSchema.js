const { gql } = require('apollo-server-express');

const employeeSchema = gql`
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Boolean!
  }

  type Query {
    employees: [Employee]
  }

  type Mutation {
    addEmployee(firstName: String!, lastName: String!, age: Int!, dateOfJoining: String!, title: String!, department: String!, employeeType: String!): Employee,
    deleteEmployee(id: ID!): Boolean,
  }
`;


// Resolvers define the technique for fetching the types in the schema.
const Employee = require('../models/employee.model'); // Ensure you have an Employee model

const resolvers = {
  Query: {
    employees: async () => await Employee.find({}),
  },
  Mutation: {
    addEmployee: async (_, { firstName, lastName, age, dateOfJoining, title, department, employeeType }) => {
      const newEmployee = new Employee({ firstName, lastName, age, dateOfJoining, title, department, employeeType, currentStatus: true });
      await newEmployee.save();
      return newEmployee;
    },
    deleteEmployee: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return true;
    },
}
};


module.exports = { employeeSchema, resolvers};
