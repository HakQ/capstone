const restify = require('restify');
const config = require('./config');

const server = restify.createServer();

//Middle ware
server.use(restify.plugins.bodyParser());

server.listen(config.PORT, ()=>{});
require('./routes/get_info')(server);
console.log('Server started on port',config.PORT)
