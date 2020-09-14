const dbConnection = require("../db/dbConnection");
const stationModel = require('../models/station');
const station_db = require('../db/station.db');
/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
// Get all station record
let getAllRecord = async () => {
    try {
        const data = await station_db.getAll();
        console.log("service tra ve " + data);
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
}
// Find station record by id
let findRecord = async (id) => {
    try {
        const data = await station_db.findOne(id);
        console.log("service tra ve " + data);
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}
// Find station record by histo_flag
let findRecordByHistoFlag = async (value) => {
    try {
        const data = await station_db.findByHistoFlag(value);
        console.log("service tra ve " + data);
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

// Find station record by realtime_flag
let findRecordByRealTimeFlag = async (value) => {
    try {
        const data = await station_db.find(value);
        console.log("service tra ve " + data);
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}

// insert new record
let createRecord = async (stationDTO) => {
    const station = new stationModel({
        id: stationDTO.id,
        last_run: stationDTO.last_run,
        histo_flag: stationDTO.histo_flag,
        realtime_flag: stationDTO.realtime_flag
    });
    try {
        const data = await station_db.createOne(station);

    } catch (err) { console.log('error in service layers with err = ', err); };
}

// update record
let updateRecord = async (id, stationDTO) => {
    const station = new stationModel({
        id: stationDTO.id,
        last_run: stationDTO.last_run,
        histo_flag: stationDTO.histo_flag,
        realtime_flag: stationDTO.realtime_flag
    });

    try {
        let modifiedStation = await station_db.updateOne(id, stationDTO);
        console.log('service', modifiedStation);
        return modifiedStation;
    } catch (error) {
        console.log('error in service layers with err = ', error);
    }
}
// deleteRecord
let deleteRecord = async (id) => {
    try {
        let value = await station_db.deleteOne(id);
        console.log("result after delete " + value);
        return value;
    } catch (err) {
        throw new Error(err.message);
    }
}
module.exports = {
    getAllRecord,
    createRecord,
    findRecord,
    updateRecord,
    deleteRecord,
    findRecordByHistoFlag
}
