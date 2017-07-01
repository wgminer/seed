'use strict';

// imports
const fs = require('fs-extra');
const pug = require('pug');
const express = require('express');
const favicon = require('serve-favicon');
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.set('views', 'src');
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log('Our app is running on http://localhost:' + port);
});