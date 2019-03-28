const express = require('express');
const router = express.Router();

router.use('/', require('./get_info.js'));


module.exports = router;
