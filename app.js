const path = require('path');
const express = require('express');
const app = express();
const mime = require('mime');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define the static files directory
app.use(express.static('public'));

// Custom middleware to set the correct MIME type for CSS files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  const filePath = path.join(__dirname, 'public', req.url);
  const contentType = mime.getType(filePath);

  if (contentType === 'text/css') {
    res.setHeader('Content-Type', contentType);
  }

  next();
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  // Add other relevant fields
});

const User = mongoose.model('User', userSchema);

// Define routes
app.get('/', (req, res) => {
  res.redirect('/login'); // Redirect to the login page
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the entered username and password match the required credentials
  if (username === 'admin' && password === 'password') {
    // Successful login
    req.session.authenticated = true; // Set the session authenticated flag
    res.redirect('/home'); // Redirect to the home page after successful login
  } else {
    // Invalid credentials
    res.redirect('/login'); // Redirect back to the login page for another attempt
  }
});

app.get('/home', (req, res) => {
  if (req.session.authenticated) {
    res.render('home');
  } else {
    res.redirect('/login'); // Redirect to the login page if user is not authenticated
  }
});

app.get('/about', (req, res) => {
  if (req.session.authenticated) {
    res.render('about');
  } else {
    res.redirect('/login'); // Redirect to the login page if user is not authenticated
  }
});

app.get('/contact', (req, res) => {
  if (req.session.authenticated) {
    res.render('contact');
  } else {
    res.redirect('/login'); // Redirect to the login page if user is not authenticated
  }
});

app.get('/projects', (req, res) => {
  if (req.session.authenticated) {
    res.render('projects');
  } else {
    res.redirect('/login'); // Redirect to the login page if user is not authenticated
  }
});

app.get('/services', (req, res) => {
  if (req.session.authenticated) {
    res.render('services');
  } else {
    res.redirect('/login'); // Redirect to the login page if user is not authenticated
  }
});

app.get('/contacts', (req, res) => {
  if (req.session.authenticated) {
    // Retrieve contacts from the database
    const contacts = [
      // Sample contact data
      { name: 'John Cena', phone: '123456789', email: 'john@example.com' },
      { name: 'Jane Smith', phone: '987654321', email: 'jane@example.com' },
      // Add more contacts as needed
    ];

    res.render('contacts', { contacts });
  } else {
    res.redirect('/login'); // Redirect to the login page if user is not authenticated
  }
});

// Similarly update other route handlers as needed

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
