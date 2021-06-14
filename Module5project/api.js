#!/usr/bin/env node

const express = require('express'), app = express(), port = process.env.PORT || 3500;
app.use(express.json());

var database = require('./database.js');
database.openDB();

var users = require('./user.js');
app.use('/', users);

var posts = require('./post.js');
app.use('/', posts);


app.listen(port);
console.log('Listening on port: ' + port);


