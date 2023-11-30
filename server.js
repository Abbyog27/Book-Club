require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bookRoutes = require('./controllers/books');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const { favorite } = require('./models');


// environment variables
SECRET_SESSION = process.env.SECRET_SESSION;

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(flash());            // flash middleware

app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));

// add passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  res.render('index');
})

app.use('/auth', require('./controllers/auth'));

// Add this below /auth controllers
app.use('/books', require('./controllers/books'));

app.get('/profile', isLoggedIn, async (req, res) => {
  const { id, name, email } = req.user.get();
  const favoriteIsbn = await favorite.findAll({
    where: { userId: id },
    attributes: ['isbn']
  });
  console.log(favoriteIsbn);
  const userBooks = [];
  for (let i = 0; i < favoriteIsbn.length; i++) {
    const isbn = favoriteIsbn[i];
    if (isbn && isbn.dataValues && isbn.dataValues.isbn) {
      console.log(isbn.dataValues.isbn);
      const bookDetailsResponse = await axios.get(`https://openlibrary.org/isbn/${isbn.dataValues.isbn}.json`);
      const bookDetails = bookDetailsResponse.data;
      const title = bookDetails.title;
      userBooks.push({title : title, isbn : isbn.dataValues.isbn});
    }
  }
  console.log(userBooks);
  res.render('profile', { id, name, email, userBooks });
});








const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
