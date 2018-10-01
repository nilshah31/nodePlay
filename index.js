const config     = require('./config.json')
const express    = require('express')
const routes     = require('./routes/routes.js')
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const app        = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * MONGO configuration
 */
//Set up default mongoose connection
var mongoDB = config.db.db_url+"/"+config.db.db_name;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/**
 * Routes and server Configuration
 */
app.use('/api', routes);
app.listen(config.dev.port, () => console.log(`Application Running on the Port : ${config.dev.port}!`))


