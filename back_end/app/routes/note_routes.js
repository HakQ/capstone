// note_routes.js
var ObjectID = require('mongodb').ObjectID;//Gets mongodb id
var cryptoObj = require("/home/tuxschool/Mern Setup/Utilities/crypto.js");//grabs crypto js file to encrypt/decrypt

//Return obj type
function typeOf(obj) {
  return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
}

//export functionalities, get, post, put, delete.
module.exports = function(app, db) {

//Grab ID + Keypass. Grabs ID, Grabs Password, Create Key:Pair, find Obj. Take password (Hashed) + Unhashed password, compare using bcrypt, if true return data. Else, return false;
app.get('/notes/:id/:KeyPass', (req, res) => {
    const id = req.params.id;
	console.log("ID" + req.params.id);
    const details = { '_id': new ObjectID(id) };
	const keyStr = req.params.KeyPass;
	var keyPass;
	try{
		keyPass =  { '_KeyPass' : keyStr };
	}
	catch(err){
		console.log("No Key");
		res.send({'error':'An error has occurred, no Key'});
		return;
	}
	db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
		cryptoObj.comparePassword(keyPass._KeyPass, item.Pass, function(err, match){
			if(match){
			    console.log(typeOf(item));
			    console.log(JSON.stringify(item, null, 4));
				//res.send(JSON.stringify(item, null, 4));
				res.send(true);
			}
			else{
			    res.send(false);//Incorrect password
			}
		});
      } 
    });
	
  });


//Post the data into the database if the user does not already exist. (Encrypt User/Password), Ok User needs to be done, easily can be. 
app.post('/notes', (req, res) => {
    const note = { User: req.body.User, Pass: req.body.Password, KeyPass: "test" };
	//const details = { '_id': new ObjectID(id) }; 
	//const details = {'User' : new ObjectID(note.User) };
	
	console.log("USER" , req.body.User); //db.collection('notes').findOne({"User" : req.body.User}, (err, item) => {
	

	
	db.collection('notes').findOne({"User" : note.User}, (err, item) => {
	   console.log(item);
	   if(!item){
	    var temp = cryptoObj.cryptPassword(req.body.Password, function(err, hashed){
		    if(err){
		    	console.log("failed to hash");
		    	res.send({ 'error': "Could not hash. Try again in 2 minutes"});
		    }
		    else{
			    note.Pass = hashed;
			    const keyPass = req.body.KeyPass;
    		    db.collection('notes').insert(note, (err, result) => {
      			    if (err) { 
        		    	res.send({ 'error': 'An error has occurred' }); 
      			    }else {
        		    	res.send(result.ops[0]);
      			    }
    	        });
		    }
	    });
	   }
	   else{
            res.send({'error': "Username exists"});
        }
	  });  
  });

//Deletes data in database by ID
app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });

//Updates User by ID
app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { User: req.body.User, Pass: req.body.Password, KeyPass: "test" };

	var temp = cryptoObj.cryptPassword(req.body.Password, function(err, hashed){
		if(err){
			console.log("failed to hash");
			res.send("Could not hash. Try again in 2 minutes");
		}
		else{
			note.Pass = hashed;
			const keyPass = req.body.KeyPass;
    		 db.collection('notes').update(details, note, (err, result) => {
      			if (err) { 
        			res.send({ 'error': 'An error has occurred' }); 
      			}else {
        			res.send(note);
      			}
    	    });
		}
	});

  });
};
