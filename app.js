const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require('body-parser');
const port = 8000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/contactDance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start your application or perform database operations
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    const myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("this item has been saved to the database")
    }).catch(() => {
        res.status(400).send("item was not saved to the database")
    });
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});


