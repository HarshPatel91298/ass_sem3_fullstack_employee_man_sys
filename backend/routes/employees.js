const router = require('express').Router();
let Employee = require('../models/employee.model');

// Get all employees
router.route('/').get((req, res) => {
  Employee.find()
    .then(employees => res.json(employees))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new employee
router.route('/add').post((req, res) => {
  const newEmployee = new Employee({ ...req.body });

  newEmployee.save()
    .then(() => res.json('Employee added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Define other routes for updating and deleting employees

module.exports = router;
