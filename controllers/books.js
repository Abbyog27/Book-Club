const express = require('express');
const router = express.Router();
const axios = require('axios');

//get all books
router.get('/', async (req, res) => {
  try {
    const input = req.query.input || "*";
    const currentPage = req.query.page || 1;
    const pageSize = 100;
    const searchParams = "q=" + input + "&page=" + currentPage;
    console.log(searchParams);
    const response = await axios.get('https://openlibrary.org/search.json?' + searchParams);
    const data = response.data;
    console.log('data: ', data);
    const books = [];
    for(const book of data.docs) {
      books.push({
        title: book.title,
        author_name: (!book.author_name || book.author_name.length === 0) ? "N/A" :  book.author_name[0],
        publish_year : (!book.publish_year || book.publish_year.length === 0) ? "N/A" :  book.publish_year[0]
      });
    }   
    console.log('books: ', books);
    res.render('index', {
      cards: books,
      currentPage: parseInt(currentPage),
      totalPages: Math.ceil(data.numFound / pageSize),
    });
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