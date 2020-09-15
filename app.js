const express = require('express'); // Express web server framework
const cookieParser = require('cookie-parser');
const cors = require('cors');

/**
 * Challenge para candidatos a Backend Developers - PatagonianTech 
 * Guillermo Agustin Chiarotto
 */

const songRoutes = require('./routes/song');
require("./database");

const app = express();

app.use('/songs', songRoutes);
app.use(express.static(__dirname + '/public')).use(cors()).use(cookieParser());

console.log('Listening on 8888');
app.listen(8888);


