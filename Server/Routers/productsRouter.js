const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Entry Point: 'http://localhost:8000/homePage
router.route('/').get((req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.status(401).json('No Token Provided!');
    return;
  }
  const ACCESS_SECRET_TOKEN = 'Volley16ball1607ZXQW';

  jwt.verify(token, ACCESS_SECRET_TOKEN, (err, data) => {
    if (err) {
      console.log('error!!!')
      res.status(401).json('Failed to authenticate token');
      return;
    }
    const fullName = data.fullName; // Access the fullName property from the decoded token
    // Send the fullName value in the response
    res.json({ fullName });
  });
});

module.exports = router;
