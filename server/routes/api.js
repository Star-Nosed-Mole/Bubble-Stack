const express = require('express');
const modelsController = require('../controllers/stackControllers');
const router = express.Router();

// Backend API Requests
// GET to '/'
// Retrieve all libraries and properties(types and frameworks)

// POST to '/getLibrary' { "library": value }
// Retrieve ONE library and its properties

// GET to '/getTypes'
// Retrieve all types

// POST to '/getFramework' { "framework": value }
// Retrieve libraries and corresponding types for ONE framework

// POST to '/addType' { "type": value }
// Add new type to database

// POST to '/deleteType' { "type": value }
// Remove type from database

// POST to '/addFramework' { "framework": value }
// Add new framework to database

// POST to '/deleteFramework' { "framework": value }
// Remove framework from database

// POST to '/addLibrary' { "library": value, "framework": value, "type": value }
// Add new library to database

// POST to '/deleteLibrary' { "library": value }
// Remove library from database

//route get all libraries of all types and frameworks
router.get('/', modelsController.getAll,
(req, res) => {
  res.status(200).json(res.locals.all);
});

// route get ONE specific library's information
router.post('/getLibrary', modelsController.getLibrary,
 (req, res) => {
  res.status(200).json(res.locals.one);
});

//route retrieve types
router.get('/getTypes', modelsController.getTypes, (req, res) => {
  res.status(200).json(res.locals.types);
});

//route retrieve all information for a specific framework
router.post('/getFramework', modelsController.getFramework, (req, res) => {
  res.status(200).json(res.locals.framework);
});

//REQUESTS TO CREATE/DELETE IN THE DATABASE
//route add type
router.post('/addType', modelsController.addType, (req, res) => {
  res.sendStatus(200);
});

//route delete type
router.post('/deleteType', modelsController.deleteType, (req, res) => {
  res.sendStatus(200);
});

//route add framework
router.post('/addFramework', modelsController.addFramework, (req, res) => {
  res.sendStatus(200);
});

//route delete framework
router.post(
  '/deleteFramework',
  modelsController.deleteFramework,
  (req, res) => {
    res.sendStatus(200);
  }
);

//route add library
router.post('/addLibrary', modelsController.addLibrary, (req, res) => {
  res.sendStatus(200);
});

//route delete library
router.post('/deleteLibrary', modelsController.deleteLibrary, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
