#!/usr/bin/env node

'use strict';

const JWT_REST_PORT = process.env.JWT_REST_PORT || 3377;

const express = require('express');
const morgan = require('morgan')('combined');
const bodyParser = require('body-parser');
const app = express();
const auth = require('./server/auth');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  next();
});

app.use(morgan);
app.use(bodyParser.json());

app.post('/login', auth.login('topsecret', (reqbody, next) => {
  // this h'yar method is just whatever you need to return a user.
  // prob would get something out of the db. use whatever info in reqbody
  // you need to lookup user in db. generally username and password or such.
  next(null, {
    joe: 'user'
  });
}));

app.get('/free', (req, res) => {
  res.json({
    free: 'lunch'
  });
});

app.get('/', auth.guard('topsecret'), (req, res) => {
  res.json(req.user);
});

app.listen(JWT_REST_PORT, (err) => {
  if (err) {
    console.error('start failed: %s', err + '');
    process.exit(1);
  } else {
    console.log('listening on port: %d NODE_ENV: %s', JWT_REST_PORT, process.env.NODE_ENV);
  }
});