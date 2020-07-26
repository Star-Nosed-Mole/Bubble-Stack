const express = require('express');
const modelsController = require('../controllers/stackControllers');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('Success!');
  });
  
module.exports = router;

