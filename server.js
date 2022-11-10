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

//middleware funciton, serve static Assets
app.use('/public', express.static('public'));

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

app.get('', (req, res) => {
    res.render('index');
});

app.listen(port, function() {
    console.log(`Server is listening at port ${port}`);
});