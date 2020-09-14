const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('debug',true);
const validator = require('validator');
const stationSchema = new mongoose.Schema({
        id: String,

        last_run: Date,

        histo_flag: Number,

        realtime_flag: Number,
})

module.exports = mongoose.model('Station',stationSchema,"Station");

