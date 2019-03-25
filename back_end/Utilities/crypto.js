const bcrypt = require('bcrypt');
const saltRounds = 10;
const crypto = require('crypto');

//export functionality of bcrypt to salt password, and then hash the password given the salt does not fail
exports.cryptPassword = function(password, callback) {
   bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) 
      return callback(err);

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });
  });
};


//export functionality to compare a plain password to a hash. It deduces the salt and returns boolean
exports.comparePassword = function(plainPass, hashword, callback) {
   bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
       return err == null ?
           callback(null, isPasswordMatch) :
           callback(err);
   });
};
