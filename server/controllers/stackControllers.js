const db = require('../models/stackModels');
const { stack } = require('../routes/api');
const npm = require('npm-stats-api');
const stackController = {};
let day = 11;
let date = new Date();
let today = date.getDate();
let formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
let queryUpdateLibrary = [];
let passing = '';

if (today > day + 5) {
  const queryGetNames = `SELECT name FROM libraries`;
  db.query(queryGetNames)
    .then((data) => {
      data.rows.forEach((tech) => {
        npm.stat(tech.name, '2020-01-01', `${formattedDate}`, (err, response) => {
          queryUpdateLibrary.push(`UPDATE libraries SET loc = ${Math.ceil(Math.log10(response.downloads))} WHERE name = '${tech.name}';`)
          passing = queryUpdateLibrary.join(' ');
        })
      });
    })
.catch((err) => {
      return err;
    });
}
stackController.getAll = (req, res, next) => {
  const queryAll = `SELECT libraries.name, libraries.loc, types.name AS type, framework.name AS framework FROM libraries 
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
stackController.updateLoc = (req, res, next) => {
  console.log("passing", passing)
  db.query(passing) 
    .then(() => {
      console.log('SUCCESS')
      return next()
    })
    .catch((err) => {
      return next(err);
    })
}
// update library with API data
stackController.updateLibrary = (req, res, next) => {
  // let tech = req.body.library;
  let date = new Date();
  let formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  let today = date.getDate();
  // only update libraries table with loc every 5 days
  if (today > day + 5) {
    // const techs = [];
    // query to get all names from libraries table
    const queryGetNames = `SELECT name FROM libraries`;
    db.query(queryGetNames)
      .then((data) => {
        return data.rows
        // let locs = [];
      })
      .then(arr => {
        techs.forEach((tech) => {
          npm.stat(tech.name, '2018-01-01', `${formattedDate}`, (err, res) => {
            // locs.push(JSON.stringify(res.downloads));
            // console.log(`${tech.name} loc`, locs);
            console.log(res.downloads)
            const queryUpdateLibrary = `UPDATE libraries SET loc = res.downloads WHERE name = '${tech.name}'`;
            db.query(queryUpdateLibrary) 
            .then(() => {
              console.log('SUCCESS')
              // return next()
            })
            .catch((err) => {
              return next(err);
            })
          });
        });
      })
      .catch((err) => {
        return next(err);
      });
  // TODO: 
  // update library with loc
    // 'UDPATE libraries SET loc = `${locs[i]}` WHERE name = `${techs[i]}`
  // update global day variable to today
  day = today;
  return next()
  }
  else {
    return next()
  }
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
