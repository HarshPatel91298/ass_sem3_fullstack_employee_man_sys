const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

// Database Connection
const mongoose = require('mongoose');

// Connect to the database
const connectDatabase = async () => {
    try {
        // Using an environment variable for the MongoDB connection string
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected!!!');
    } catch (err) {
        console.error('MongoDB Not Connected!!!', err);
        process.exit(1); // Exit the process with error
    }
};

// Import your schema and resolvers
const { employeeSchema, resolvers } = require('./schema/employeeSchema');

async function startApolloServer(employeeSchema, resolvers) {
    const app = express();
    app.use(cors());
    app.use(express.json());

    // Connect to the database
    await connectDatabase();

    // Create an instance of ApolloServer
    const server = new ApolloServer({
        typeDefs: employeeSchema,
        resolvers,
    });

    await server.start();
    server.applyMiddleware({ app: app, path: '/graphql' });

    // Optional: Basic route for health checks or welcome message
    app.get('/', (req, res) => res.send('Welcome to the GraphQL API Backend!'));

    const PORT = process.env.PORT || 5500;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
    });
}

// Remember to call the function to start the server
startApolloServer(employeeSchema, resolvers);
