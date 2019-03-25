// routes/index.js

//Simple Route redirect
const noteRoutes = require('./note_routes');
module.exports = function(app, db) {
  noteRoutes(app, db);
  // Other route groups could go here, in the future
};

/*
const apiRoutes = require('./Paypal_routes');

module.exports = function(app) {
  apiRoutes(app);
  // Other route groups could go here, in the future
};*/
