const bcrypt = require('bcryptjs');
<<<<<<< HEAD

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
=======
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: 'your private api key'
  }
}));

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
>>>>>>> chris_testing
  });
};

exports.getSignup = (req, res, next) => {
<<<<<<< HEAD
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
=======
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
>>>>>>> chris_testing
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
<<<<<<< HEAD
  User.findOne({email: email})
    .then(user => {
      if (!user) {
        return res.redirect('/login');
      }
      bcrypt
      .compare(password, user.password)
      .then(doMatch => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            console.log(err);
            res.redirect('/');   
        });
        }
        res.redirect('/login');
      })
      //catch łapie errory, a nie gdy hasła do siebie nie pasują
      .catch(err => {
        console.log(err);
        res.redirect('/login');
      });
=======
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
>>>>>>> chris_testing
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
<<<<<<< HEAD
  // Max nie chciał wytłumaczyć jak  przy pomocy mongodb stworzyć email jako index z własnością unique
  User.findOne({
    email: email
  })
  .then(userDoc => {
    if (userDoc) {
      return res.redirect('/signup');
    }
    return bcrypt
      .hash(password, 12)  
      .then(hashedPassword => {
        const user = new User({
          email: email,
          password: hashedPassword,
          cart: { items: []}
        });
        return user.save();
      })
      .then ( result => {
      res.redirect('/login');
      });
  })
  .catch( err => {
    console.log(err)
  });
=======
  let correctPasswords = (confirmPassword === password)

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'There is a existing user with that e-mail adress.');
      }
      if (!correctPasswords){
        req.flash('error', 'You must fill correctly password fields.');
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
          return transporter.sendMail({
            to: email,
            from: 'Type validate email here',
            subject: 'Signup succeeded!',
            html: '<h1> You succesfully signed up! </h1>'
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
>>>>>>> chris_testing
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
