const express = require('express');

const routes = express.Router();

const IndexController = require('./controllers/IndexController'); 
const CoursesController = require('./controllers/CoursesController');
const InstructorsController = require('./controllers/InstructorsController');
const LessonsController = require('./controllers/LessonsController');

routes.get('/', IndexController.index);

routes.post('/courses', CoursesController.create);

routes.post('/instructors', InstructorsController.create);

routes.post('/lessons', LessonsController.create);

//COURSES
routes.get('/courses', CoursesController.find)
routes.get('/courses/:id', CoursesController.findById)

module.exports = routes;

// lessons
// courses
// instructors