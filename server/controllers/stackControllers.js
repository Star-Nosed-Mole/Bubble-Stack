const db = require('../models/stackModels');

const stackController = {};


// stackController.getStack = (req, res, next) => {

// }
// starWarsController.getCharacters = (req, res, next) => {
//   // write code here
//   // decalre variable that contains SQL query string 
//   // pass it into db query
//   // write and send a query to grab all the columns from the people table.
//   const people = 'SELECT p.*, s.name AS species, pl.name AS homeworld FROM people AS p JOIN species AS s ON p.species_id = s._id JOIN planets AS pl ON pl._id = p.homeworld_id';

//   db.query(people)
//   .then(resolve => {
//     res.locals = resolve.rows;
//     next();
//   })
//   .catch((err) => {
//     next(err);
//   });
// }

// starWarsController.getSpecies = (req, res, next) => {
//   // write code here
//   const species_id = req.query.id;
//   const species = `SELECT species._id, species.classification, species.average_height, species.average_lifespan, species.language, planets.name AS homeworld
//                     FROM species 
//                     LEFT OUTER JOIN planets 
//                     ON planets._id = species.homeworld_id
//                     WHERE species._id =${species_id}`;
//   db.query(species)
//   .then(resolve => {
//     res.locals = resolve.rows[0];
//     next();
//   })
//   .catch((err) => {
//     next(err);
//   });
// }

// starWarsController.getHomeworld = (req, res, next) => {
//   // write code here
//   const homeworld_id = req.query.id;
//   const homeworld = `SELECT _id, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population
//                       FROM planets 
//                       WHERE _id = ${homeworld_id}`;
//   db.query(homeworld)
//   .then(resolve => {
//     res.locals = resolve.rows[0];
//     next();
//   })
//   .catch((err) => {
//     next(err);
//   });
// }

// starWarsController.getFilm = (req, res, next) => {
//   // write code here

//   next();
// }

// starWarsController.addCharacter = (req, res, next) => {
//   // write code here
//   console.log(req);
//   const characterObj = req.body;
//   const character = `INSERT INTO people (name, gender, species_id, birth_year, eye_color, skin_color, hair_color, mass, height,  homeworld_id)
//                      VALUES ('${characterObj.name}', '${characterObj.gender}', '${characterObj.species_id}', '${characterObj.birth_year}', '${characterObj.eye_color}', '${characterObj.skin_color}', '${characterObj.hair_color}', '${characterObj.mass}', '${characterObj.height}', '${characterObj.homeworld_id}')`;
//   db.query(character)
//   .then(resolve => {
//     console.log('this should be inserted');
//     res.status(200);
//     next();
//   })
//   .catch((err) => {
//     next(err);
//   });
//}

module.exports = stackController;