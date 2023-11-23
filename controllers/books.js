const express = require('express');
const router = express.Router();



//get all books
router.get('/', (req, res) => {
    res.send('books');
  });

//getting book by id
router.get('/id', req,res => {
  res.send('book with specific id', req.params.id);
})

  module.exports = router;