const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const db = require('../models')
const methodOverride = require('method-override');

// import models
const { user } = require('../models');

router.get("/signup", (req, res) => {
  return res.render("auth/signup");
});

router.get("/login", (req, res) => {
  return res.render("auth/login");
});

router.get('/logout', (req, res) => {
  req.logOut(function (err, next) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Logging out... See you next time!');
    res.redirect('/auth/login');
  }); // logs the user out of the session
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/books/search',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome back ...',
  failureFlash: 'Either email or password is incorrect'
}));

router.post('/signup', async (req, res) => {
  // we now have access to the user info (req.body);
  const { email, name, password } = req.body; // goes and us access to whatever key/value inside of the object
  try {
    const [_user, created] = await user.findOrCreate({
      where: { email },
      defaults: { name, password }
    });

    if (created) {
      // if created, success and we will redirect back to / page
      console.log(`----- ${_user.name} was created -----`);
      const successObject = {
        successRedirect: '/auth/login',
        successFlash: `Welcome ${_user.name}. Account was created and logging in...`
      }
      // 
      passport.authenticate('local', successObject)(req, res);
    } else {
      // Send back email already exists
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup'); // redirect the user back to sign up page to try again
    }
  } catch (error) {
    // There was an error that came back; therefore, we just have the user try again
    console.log('**************Error');
    console.log(error);
    req.flash('error', 'Either email or password is incorrect. Please try again.');
    res.redirect('/auth/signup');
  }
});




router.get('/:id/edit', (req, res) => {
  db.user.findOne({
    where: { id: req.params.id }
  })
    .then(user => {
      return res.render('auth/edit-profile.ejs', { user:user});
    })
    .catch(error => {
      if (error) {
        console.log('---- error ----', error);
        return res.status(404).json({ message: 'Email cannot be found.' })

      }
    });
});

//Updated Users email
router.put('/:email', async (req, res) => {
  
  try {
    const { email } = req.params;
  const { id } = user.get()
    const user = await db.user.findOne({ where: {id: id} });
    if (!user) {
      return res.status(404).json({
      error: 'Could not find user'
    });
  }
    user.email = email
      await user.save()
      res.status(200).json({ message: 'Email has been updated', user });
    } catch (error) {
      res.status(500).json({ error: 'Error' });
  }
});
module.exports = router;