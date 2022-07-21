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
routes.patch('/courses/:id', CoursesController.update)

//LESSONS
routes.get('/lessons/:id', LessonsController.findById)
routes.patch('/lessons/:id', LessonsController.update)

//INSTRUCTORS
routes.patch('/instructors/:id', InstructorsController.update)

module.exports = routes;

// lessons
// courses
// instructors