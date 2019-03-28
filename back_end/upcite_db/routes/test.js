const express = require('express');

const router = express.Router();


router.get('/test', (req, res) => { 
  res.json({msg:"hello"});
});

router.post('/test', (req, res) => {
  res.json({msg:"bad bad bad"});
});



module.exports = router;