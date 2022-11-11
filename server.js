const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({extended: true})
);

//Middleware funciton, serve static Assets
app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'node_modules')));

//Set view's 
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs'); // view engine, EJS

//Database connection with mysql
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "moto_shop"
});

con.connect(function(err) {
    if(err) throw err;
    console.log("Connected to database.");
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/pocetna', (req, res) => {
    res.render('pocetna');
});

app.get('/moto-oprema', (req, res) => {
    res.render('moto-oprema');
});

app.get('/oprema-za-motore', (req, res) => {
    res.render('oprema-za-motore');
});

app.get('/o-nama', (req, res) => {
    res.render('o-nama');
});

app.get('/kontakt', (req, res) => {
    res.render('kontakt');
});

app.listen(port, function() {
    console.log(`Server is listening at port ${port}`);
});