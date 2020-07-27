const express = require('express');
const modelsController = require('../controllers/stackControllers');
const router = express.Router();

//route get all libraries of all types and frameworks
router.get('/',
modelsController.getAll,
 (req, res) => {
  res.status(200).json(res.locals.all);
  });

// route get ONE specific library's information
router.post('/getLibrary',
modelsController.getLibrary,
 (req, res) => {
  res.status(200).json(res.locals.one);
  });

//route retrieve types
router.get('/getTypes',
modelsController.getTypes,
  (req, res) => {
    res.status(200).json(res.locals.types);
  });

//route retrieve all information for a specific framework
router.post('/getFramework',
modelsController.getFramework,
  (req, res) => {
    res.status(200).json(res.locals.framework);
  });

//REQUESTS TO CREATE/DELETE IN THE DATABASE
//route add type
router.post('/addType',
modelsController.addType,
 (req, res) => {
  res.sendStatus(200);
  });

//route delete type
router.post('/deleteType',
modelsController.deleteType,
 (req, res) => {
  res.sendStatus(200);
  });

//route add framework
router.post('/addFramework',
modelsController.addFramework,
 (req, res) => {
   res.sendStatus(200);
 });

//route delete framework
router.post('/deleteFramework',
modelsController.deleteFramework,
 (req, res) => {
  res.sendStatus(200);
  });


//route add library
router.post('/addLibrary',
modelsController.addLibrary,
 (req, res) => {
  res.sendStatus(200);
  });


//route delete library
router.post('/deleteLibrary',
modelsController.deleteLibrary,
 (req, res) => {
  res.sendStatus(200);
  });


module.exports = router;

