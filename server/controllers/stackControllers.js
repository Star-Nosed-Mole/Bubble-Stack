const db = require('../models/stackModels');
const { stack } = require('../routes/api');
const npm = require('npm-stats-api');

const stackController = {};

const techs = [
  'redux',
  'recoil',
  'mobx',
  'material-ui',
  'react-bootstrap',
  'rebass'
];
let locs = [];
techs.forEach((tech) => {
  npm.stat(tech, '2018-01-01', '2019-05-01', (err, res) => {
    let techObj = {};
    techObj[tech] = JSON.stringify(res.downloads);
    // let techObj = {
    //   key: JSON.stringify(res.downloads)
    // };
    locs.push(techObj);
    // console.log(`${tech} loc`, locs);
  });
});

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

  const queryOne = `SELECT libraries.name, types.name AS type, framework.name AS framework FROM libraries 
                        INNER JOIN types ON libraries.type_id = types.type_id
                        INNER JOIN framework ON libraries.framework_id = framework.framework_id
                        WHERE libraries.name = '${name}'; `;
  db.query(queryOne)
    .then((data) => {
      res.locals.one = data.rows[0];
      res.locals.locs = locs;
      console.log('GET LIBRARY: ', res.locals);
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
