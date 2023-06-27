const path = require('path');
const express = require('express');
const app = express();
const mime = require('mime');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

// Set the view engine to EJS
app.set('view engine', 'ejs');

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
// Login View
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/', (req, res) => {
  res.redirect('/login'); // Redirect to the login page
});


app.post('/login', (req, res) => {
  // Handle login authentication
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the entered username and password match the required credentials
  if (username === 'admin' && password === 'password') {
    // Successful login
    req.session.authenticated = true; // Set the session authenticated flag
    res.redirect('/contacts'); // Redirect to the secure area (e.g., contacts page)
  } else {
    // Invalid credentials
    res.redirect('/login'); // Redirect back to the login page for another attempt
  }
});


// Business Contacts List View
app.get('/contacts', (req, res) => {
  // Fetch contacts from the database and render the contacts view
});

// Update View
app.get('/contacts/:id/update', (req, res) => {
  // Fetch contact details from the database and render the update view
});

app.post('/contacts/:id/update', (req, res) => {
  // Update contact details in the database and redirect to the contacts view
});

app.post('/contacts/:id/delete', (req, res) => {
  // Delete the contact from the database and redirect to the contacts view
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/projects', (req, res) => {
  res.render('projects');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/', (req, res) => {
  if (req.session.authenticated) {
    // User is authenticated, render the home view
  } else {
    // User is not authenticated, redirect to the login view
    res.redirect('/login');
  }
});

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/contacts'); // Redirect to the secure area
  } else {
    res.redirect('/login'); // Redirect to the login page
  }
});


app.get('/about', (req, res) => {
  if (req.session.authenticated) {
    // User is authenticated, render the about view
  } else {
    // User is not authenticated, redirect to the login view
    res.redirect('/login');
  }
});

app.get('/contacts', (req, res) => {
  // Retrieve contacts from the database
  const contacts = [
    // Sample contact data
    { name: 'John Doe', phone: '123456789', email: 'john@example.com' },
    { name: 'Jane Smith', phone: '987654321', email: 'jane@example.com' },
    // Add more contacts as needed
  ];

  res.render('contacts', { contacts });
});


// Similarly update other route handlers as needed


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
