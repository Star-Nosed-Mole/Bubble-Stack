const db = require('../models/stackModels');
const { stack } = require('../routes/api');

const stackController = {};


stackController.getAll = (req, res, next) => {

    const queryAll = `SELECT libraries.name, types.name AS type, framework.name AS framework FROM libraries 
                    INNER JOIN types ON libraries.type_id = types.type_id
                    INNER JOIN framework ON libraries.framework_id = framework.framework_id;`;

    db.query(queryAll)
    .then(data=> {
        res.locals.all = data.rows;
        return next();
    })
    .catch((err) => {
        return next(err);
    });
}


stackController.findOne = (req, res, next) => {
    const name = req.body.name;
    const queryOne = `SELECT libraries.name, types.name AS type, framework.name AS framework FROM libraries 
                        INNER JOIN types ON libraries.type_id = types.type_id
                        INNER JOIN framework ON libraries.framework_id = framework.framework_id
                        WHERE libraries.name = '${name}'; `;
    db.query(queryOne)
    .then(data=> {
        console.log(data.rows);
        res.locals.one = data.rows[0];
        return next();
    })
    .catch((err) => {
        return next(err);
    });
}

module.exports = stackController;