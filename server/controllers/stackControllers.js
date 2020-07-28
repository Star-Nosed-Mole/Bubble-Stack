const db = require('../models/stackModels');
const { stack } = require('../routes/api');
const npm = require('npm-stats-api');

const stackController = {};

/*
The npm.stats.api allows us to get the number of npm downloads each tech stack has.
We didn't want to refresh the data and fetch from the api with every get or post request because the numbers are big enough that refreshing every
5 days would've sufficed. The below is us checking for the last updated day - if it's been 5 or more days since the last update,
we will make a request to the api and store the information as one SQL query into a variable called passing which we will query
in the middleware stockController.updateLoc
*/
// day is last updated day
let day = 11; /* day is currently hard coded in, but need to find a way to update day every time we update, didn't have time to figure this part out */
// getting today's date
let date = new Date();
// getting the day of today's date (e.g., if it's July 27, today = 27)
let today = date.getDate();
// formatting the date to match the syntax required for API parameter
let formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
// creating an array to store all the queries we will be creating below
let queryUpdateLibrary = [];
// we will be using the join method to combine the queryUpdateLibrary array elements into one string, so we are declaring the variable of this string here
let passing = '';
// if it has been 5 or more days since the last update
if (today > day + 5) {
  // reassign last updated day to be today's date
  day = today;
  // SQL query to get all names from the libraries table
  const queryGetNames = `SELECT name FROM libraries`;
  db.query(queryGetNames)
    .then((data) => {
      // data.rows comes back as an array of objects (console.log to see what this looks like for reference) so we will iterate through this array
      data.rows.forEach((tech) => {
        // for each el in array (console.log for reference), we will use the below API method to get the number of downloads and store that as a column called 'loc' in the libraries table
        // the parameters required for npm.stat is npm.stat(name of tech - string - e.g., 'redux' , range from date, range to date, callback function)
        npm.stat(tech.name, '2020-01-01', `${formattedDate}`, (err, response) => {
          // push this query into queryUpdateLibrary - had to divide by 1000 because numbers were too large
          queryUpdateLibrary.push(`UPDATE libraries SET loc = ${Math.floor(response.downloads/1000)} WHERE name = '${tech.name}';`)
          // concat arr els to be one string
          passing = queryUpdateLibrary.join(' ');
        })
      });
    })
    .catch((err) => {
      return err;
    });
}

stackController.getAll = (req, res, next) => {
  const queryAll = `SELECT libraries.name, types.name AS type, framework.name AS framework FROM libraries 
                    INNER JOIN types ON libraries.type_id = types.type_id
                    INNER JOIN framework ON libraries.framework_id = framework.framework_id;`;

  db.query(queryAll)
    .then((data) => {
      res.locals.all = data.rows;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// retrieve information for a specific library
stackController.getLibrary = (req, res, next) => {
  const name = req.body.library;
  const queryOne = `SELECT libraries.name, libraries.loc, types.name AS type, framework.name AS framework FROM libraries 
                        INNER JOIN types ON libraries.type_id = types.type_id
                        INNER JOIN framework ON libraries.framework_id = framework.framework_id
                        WHERE libraries.name = '${name}'; `;
  db.query(queryOne)
    .then((data) => {
      console.log(data.rows[0]);
      res.locals.one = data.rows[0];
      console.log('RESLOCALSONE ', res.locals.one);
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// update loc column in libraries table
stackController.updateLoc = (req, res, next) => {
  // console.log('passing', passing);
  db.query(passing)
    .then(() => {
      // console.log('SUCCESS');
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

//retrieve types
stackController.getTypes = (req, res, next) => {
  const queryTypes = `SELECT * FROM types;`;

  db.query(queryTypes)
    .then((data) => {
      console.log(data.rows);
      res.locals.types = data.rows;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

//retrieve all libraries for a specific framework
stackController.getFramework = (req, res, next) => {
  const name = req.body.framework;
  const queryFramework = `SELECT libraries.name, types.name AS type FROM libraries 
                          INNER JOIN types ON libraries.type_id = types.type_id
                          INNER JOIN framework ON libraries.framework_id = framework.framework_id
                          WHERE framework.name = '${name}';`;

  db.query(queryFramework)
    .then((data) => {
      console.log(data.rows);
      res.locals.framework = data.rows;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

//add type
stackController.addType = (req, res, next) => {
  const type = req.body.type;
  const queryType = `INSERT INTO types VALUES ('${type}');`;

  db.query(queryType)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

//delete type
stackController.deleteType = (req, res, next) => {
  const type = req.body.type;
  const queryType = `DELETE FROM types WHERE name = '${type}';`;

  db.query(queryType)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

//add framework
stackController.addFramework = (req, res, next) => {
  const framework = req.body.framework;
  const queryFramework = `INSERT INTO framework (name) VALUES ('${framework}');`;

  db.query(queryFramework)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

//delete framework
stackController.deleteFramework = (req, res, next) => {
  const framework = req.body.framework;
  const queryFramework = `DELETE FROM framework WHERE name = '${framework}';`;

  db.query(queryFramework)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

//add library
stackController.addLibrary = (req, res, next) => {
  const library = req.body.library;
  const framework = req.body.framework;
  const type = req.body.type;
  const queryLibrary = `INSERT INTO libraries (name, framework_id, type_id) VALUES ('${library}',
                        (SELECT framework_id FROM framework WHERE framework.name = '${framework}'),
                        (SELECT type_id FROM types WHERE types.name = '${type}'));`;

  db.query(queryLibrary)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

//delete library
stackController.deleteLibrary = (req, res, next) => {
  const library = req.body.library;
  const queryLibrary = `DELETE FROM libraries WHERE name = '${library}';`;

  db.query(queryLibrary)
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = stackController;
