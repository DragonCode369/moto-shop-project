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
    res.render('index'); //pocetna
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
    res.render('kontakt', {
        extraHead: '<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>'
    });

});

app.post('/contact-form', (req, res) => { 
    let name = req.body.name && req.body.name.trim();
    let surname = req.body.surname && req.body.surname.trim();
    let email = req.body.email && req.body.email.trim();
    let msg = req.body.textbox && req.body.textbox.trim();

    // Basic validation
    if (!name || !surname || !email || !msg) {
        return res.status(400).json({
            result: "error",
            message: "Sva polja su obavezna. Molimo popunite sva polja."
        });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            result: "error",
            message: "Unesite ispravnu email adresu."
        });
    }

    // Check for previous messages by this user (by email)
    con.query('SELECT * FROM contacts WHERE email = ?', [email], function(err, results) {
        if (err) {
            return res.status(500).json({
                result: "error",
                message: "Greška na serveru. Pokušajte kasnije."
            });
        }
        // If user exists, check if the same message was already sent (case-insensitive)
        if (results.length > 0) {
            const msgLower = msg.toLowerCase();
            let duplicate = false;
            for (let i = 0; i < results.length; i++) {
                const dbMsg = (results[i].message || '').toLowerCase();
                if (dbMsg === msgLower) {
                    duplicate = true;
                    break;
                }
            }
            if (duplicate) {
                return res.status(409).json({
                    result: "error",
                    message: "Već ste poslali ovu poruku. Pošaljite drugačiju poruku ili sačekajte odgovor."
                });
            }
        }

        // If all is good, insert into database (optional, if you want to save)
        con.query('INSERT INTO contacts (name, surname, email, message) VALUES (?, ?, ?, ?)', [name, surname, email, msg], function(err2) {
            if (err2) {
                return res.status(500).json({
                    result: "error",
                    message: "Greška pri čuvanju podataka. Pokušajte kasnije."
                });
            }
            res.json({
                data: [name, surname, email, msg],
                result: "ok",
                message: "Poruka uspešno primljena! Hvala na kontaktiranju."
            });
        });
    });
});

app.post('/login', function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

});

app.listen(port, function() {
    console.log(`Server is listening at port ${port}`);
});


