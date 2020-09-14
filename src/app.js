
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport');
let dbConnection = require('./db/dbConnection.js');
// import third-party routers'
let flash = require('connect-flash');
app.use(passport.initialize());
app.use(flash())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('App is working'))
/// import routes
require('./routes')(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
module.exports = app