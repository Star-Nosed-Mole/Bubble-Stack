const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000
// const bodyParser = require('body-parser');
// allows controller to read json files from req.body
// Define route handlers
app.use(express.json())
// app.use('/', express.static('client')); 
// app.use('/build', express.static(path.join(__dirname, '../build')));
// statically serve everything in the build folder on the route '/build
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    // app.use(express.json())
    app.use('/', express.static('client')); 
    app.use('/build', express.static(path.join(__dirname, '../build')));
    // app.use('/build', express.static(path.join(__dirname, '../build')));
    // // serve index.html on the route '/'
    // app.get('/', (req, res) => {
    //   res.sendFile(path.join(__dirname, '../index.html'));
    // });
  }
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


