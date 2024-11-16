const express = require("express");
const exphbs = require('express-handlebars');
const userRoute = require("./src/route/router");
const db = require('./db')

const app = express();

//Middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(userRoute)

db.authenticate()
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });

// Serve static files from the 'public' directory
app.use(express.static('public'));

const hbs = exphbs.create({
  extname: 'hbs',  
  defaultLayout: 'main',
  layoutsDir: 'views/layouts',
});

// Set Handlebars engine
app.engine('hbs', hbs.engine); 
app.set("view engine", "hbs");

// Home route
app.get('/', (req, res) => {
    res.render('home'); 
});


const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
    console.log(`Successfully running on port ${port}`);
   
});
