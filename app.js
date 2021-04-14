// Importing Required File
const express = require('express');
const path = require('path');
const bodyparser=require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 80;

//Defining mongoose schema
const ContactSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password:String,
    Reason:String
});

//Creating Model from schema
const Contact = mongoose.model('Contact', ContactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving Static Files.
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); //Set the template engine as pug.
app.set('views', path.join(__dirname, 'views')) //Set the views directory.


//END POINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
})
app.get('/about', (req, res) => {
    const params = {};
    res.status(200).render('about.pug', params);
})
app.get('/bookclass', (req, res) => {
    const params = {};
    res.status(200).render('bookclass.pug', params);
})
app.post('/contact', (req, res) => {
    var myData=new Contact(req.body)
    myData.save().then(()=>{
        res.render('form_success.pug');
    }).catch(()=>{
        res.status(404).render('form_error.pug');
    })
})
//START THE SERVER.
app.listen(port, () => {
    console.log(`Server successfully started at ${port}`);
});
