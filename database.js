// Llamo a dotenv para que me cargue las variables locales cargadas en el archivo .env
// de la raiz
//require("dotenv").config();

//hago la conexion a la bd
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/spotify', { useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true });


mongoose.connection
	.once('open', () => {
		console.log('DB connected');
	})
	.on('error', console.error.bind(console, 'MongoDB connection error:'));
