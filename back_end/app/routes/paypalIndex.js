const apiRoutes = require('./Paypal_routes');

module.exports = function(app) {
  apiRoutes(app);
  // Other route groups could go here, in the future
};
