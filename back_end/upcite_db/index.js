const restify = require('restify');
const config = require('./config');

const server = restify.createServer();

//Middle ware
server.use(restify.plugins.bodyParser());
/*
server.use(function crossOrigin(req,res,next) {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Header","X-Requested-With");
	return next();
	}
);
*/
server.listen(config.PORT, ()=>{});
require('./routes/get_info')(server);
console.log('Server started on port',config.PORT)
