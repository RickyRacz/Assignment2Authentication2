const express = require('express');
const router = express.Router();

// Add your authentication routes here
router.get('/login', (req, res) => {
    res.render('login');
  });
  

module.exports = router;
