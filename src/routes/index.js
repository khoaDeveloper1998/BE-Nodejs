// require the router of station 
const station_route = require('./station.routers');


//require the authentication google route 
const auth_google_route = require('./auth.google');
// require the router of user 
const user_route = require('./user.routers');
module.exports = function (app) {
    //include station route 
    station_route(app);

    //include google auth route 
    auth_google_route(app);
    
    //include user route
    user_route(app);
}