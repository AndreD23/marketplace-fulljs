import {config as dotenvConfig} from 'dotenv';
dotenvConfig();

import express = require('express');
import mongoose = require('mongoose');
import cors = require('cors');
import fileupload = require('express-fileupload');

if (typeof process.env.DATABASE_URL === 'undefined') {
  throw new Error('DATABASE_URL is undefined');
}
mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on('error', (err) => {
  console.error('err', err);
})

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileupload());

app.use(express.static(__dirname+'/public'));

app.get('/ping', (req, res) => {
  res.send('pong');
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})
