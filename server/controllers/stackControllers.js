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
    locs.push(JSON.stringify(res.downloads));
    console.log(`${tech} loc`, locs);
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

stackController.findOne = (req, res, next) => {
  const name = req.body.name;
  const queryOne = `SELECT libraries.name, types.name AS type, framework.name AS framework FROM libraries 
                        INNER JOIN types ON libraries.type_id = types.type_id
                        INNER JOIN framework ON libraries.framework_id = framework.framework_id
                        WHERE libraries.name = '${name}'; `;
  db.query(queryOne)
    .then((data) => {
      console.log(data.rows);
      res.locals.one = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = stackController;
