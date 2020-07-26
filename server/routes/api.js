const express = require('express');
const modelsController = require('../controllers/stackControllers');
const router = express.Router();


router.get('/',
modelsController.getAll,
 (req, res) => {
  res.status(200).json(res.locals.all);
  });

router.post('/one',
modelsController.findOne,
 (req, res) => {
  res.status(200).json(res.locals.one);
  });
  
module.exports = router;

