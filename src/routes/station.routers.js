const express = require('express');
// const app = express();
const stationController = require('../controller/station.controller');
const validatorForStation = require('../middleware/validatior');
const { validationResult } = require('express-validator');
const authJWT = require('../middleware/authJwt');
const passport = require('passport');
module.exports = function (app) {
    app.use(passport.authenticate('jwt', { session: false }))
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // get All Stations route
    app.get('/stations',
        (req, res, next) => {
            next();
        },
        (req, res) => {
            stationController.getAll(req, res);
        });

    // Insert new station record
    app.post('/station',
        [validatorForStation.validateRegisterStation()],
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() });
            } else {
                console.log('next');
                next();
            }
        },
        (req, res) => {
            // content of the route layer
            console.log("api");
            stationController.createNewStation(req, res);
            // Call to service layer
        });

    // find one station record by id 
    app.get('/station/:id',
        (req, res) => {
            stationController.findOne(req, res);
        });

    // find one station record by histo_flag
    app.get('/station/histo_flag/:id',
        (req, res) => {
            stationController.findOneByHistoFlag(req, res);
        }
    )

    // find one station record by realtime_flag
    app.get('/station/realtime_flag/:id',
        (req, res) => {
            stationController.findOneByRealtimeFlag(req, res);
        }
    )

    // find one station record by id 
    app.put('/station/:id', (req, res) => {
        stationController.updateOne(req, res);
    })
    // delete record by id
    app.delete('/station/:id', (req, res) => {
        stationController.deleteOne(req, res);
    });
}
