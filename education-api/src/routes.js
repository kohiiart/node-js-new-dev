const express = require('express');

const routes = express.Router();

const IndexController = require('./controllers/IndexController'); 
const CoursesController = require('./controllers/CoursesController');
const InstructorsController = require('./controllers/InstructorsController');

routes.get('/', IndexController.index);

routes.post('/courses', CoursesController.create);

routes.post('/instructors', InstructorsController.create);

module.exports = routes;

// lessons
// courses
// instructors