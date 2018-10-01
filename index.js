const express    = require('express')
const app        = express()
const port       = 8001
const routes     = require('./routes/routes.js')
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/todo';
mongoose.connect(mongoDB,{ useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
global.mongoConnection = db;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', routes);
app.listen(port, () => console.log(`Application Running on the Port : ${port}!`))


