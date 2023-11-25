const express = require('express');
const router = express.Router();
const axios = require('axios');

//get all books
router.get('/', async (req, res) => {
  try {
    //set default params
    let searchInput = "*";
    let pageNumber = 1;
    if (req.query.searchInput !== undefined && req.query.pageNumber !== undefined) {
      searchInput = req.query.searchInput;c
      pageNumber = req.query.pageNumber;
    }
    const searchParams = "q=" + searchInput + "&page=" + pageNumber;
    console.log(searchParams);
    const response = await axios.get('https://openlibrary.org/search.json?' + searchParams);
    console.log(response);
    const data = response.data;
    //render data from api in home page
    console.log(data);
    console.log("**************");
    console.log(data.docs[0]);
    res.render('index.ejs', { data: data.docs });
  } catch (error) {
    console.error('Error making API call:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//getting book by id
router.get('/:id', async (req, res) => {
  try {
    const id  = req.query.id;
    const response = await axios.get('https://openlibrary.org/search.json?' + id);
    console.log(response);
    const data = response.data;
    console.log(data.id_goodreads);
    for (let i = 0; i < data.length; i++) {
      let book =  data[i];
      if (book.id === req.query.searchInput) {
  }
  res.render('book-details.ejs', {id : id});
}} catch (error) {
  console.error('Error making API call:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

//adding book to favorite
router.put('/favorite', (req, res) => {

})

module.exports = router;