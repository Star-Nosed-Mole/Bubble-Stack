const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const apiRouter = require('./routes/api');

app.use(express.json());

// statically serve everything in the build folder on the route '/build
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client')); 
    app.use('/build', express.static(path.join(__dirname, '../build')));
  }

app.use('/api', apiRouter);

// global error handler
app.use('*', (req,res) => res.sendStatus(404) )

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  return res.status(errorObj.status).json(errorObj.message);
});
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });

module.exports = app;


