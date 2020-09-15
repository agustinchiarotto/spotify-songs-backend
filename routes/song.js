const express = require('express');
const app = express.Router();

const songController = require('../controllers/song');


app.get('/',songController.getSongsByArtistName);
app.get('/:songId',songController.getSongById);


module.exports = app; 
