const express = require('express');
const router = express.Router();
const axios = require('axios');

//get all books
router.get('/search', async (req, res) => {
  try {
    const input = req.query.input || "*";
    const currentPage = req.query.page || 1;
    const pageSize = 100;
    const searchParams = "q=" + input + "&page=" + currentPage;
    const response = await axios.get('https://openlibrary.org/search.json?' + searchParams);
    const data = response.data;
    const books = [];
    for(const book of data.docs) {
      books.push({
        title: book.title,
        author_name: (!book.author_name || book.author_name.length === 0) ? "N/A" :  book.author_name[0],
        publish_year : (!book.publish_year || book.publish_year.length === 0) ? "N/A" :  book.publish_year[0],
        isbn: (!book.isbn || book.isbn.length === 0) ? "N/A" :  book.isbn[0]
      });
    }   
    res.render('index', {
      cards: books,
      input, input,
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
    const id  = req.params.id;

    const bookDetailsResponse = await axios.get(`https://openlibrary.org/isbn/${id}.json`);
    const bookDetails = bookDetailsResponse.data;
    
    let author = {
      personal_name : "N/A",
      bio : {value : "N/A"}
    }
    if(bookDetails.authors && bookDetails.authors.length > 0) {
      const authorResponse = await axios.get(`https://openlibrary.org/${bookDetails.authors[0].key}.json`)
      author = authorResponse.data;  
    }
  
    res.render('book-details.ejs', {
    isbn: id,
    title: bookDetails.title,
    publishers: bookDetails.publishers,
    publishDate: bookDetails.publish_date,
    author: author.personal_name,
    bio: !author.bio ? "N/A" : author.bio.value
  });
} catch (error) {
  console.error('Error making API call:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

//adding book to favorite
router.put('/favorite', (req, res) => {

})

module.exports = router;