// import middlewares
const stationService = require('../services/station.service');
const dateformat = require('../middleware/formatDate');

// Get all record 
const getAll = async (req, res, next) => {
    try {
        let data = await stationService.getAllRecord();
        let returnedData = []
        returnedData = Object.assign(returnedData, data);
        console.log('controller data = ', returnedData)
        const data1 = returnedData.map((each) => {
            let modifiedDate = dateformat.formatDate(each.last_run);
            return { ...each._doc, last_run: modifiedDate };
        });
        res.status(200).send(data1);
    }
    catch { (err) => { console.log("err catched " + err); } }
}

// insert new station record
const createNewStation = async (req, res) => {
    const stationDTO = req.body
    try {
        console.log("controller log");
        await stationService.createRecord(stationDTO)
        res.status(200);
        res.send({ message: "Create new document successfully" })
    }
    catch (err) { console.log(err.message); }
}

// find one station record by id
const findOne = async (req, res, next) => {
    try {
        let data = await stationService.findRecord(req.params.id);
        let returnedData = {};
        returnedData = Object.assign(returnedData, data);
        if (data) {
            console.log("controller tra ve ", returnedData._doc);
            res.status(200).send(returnedData._doc);
        } else {
            res.status(400).send({ message: "cant find any record with id  = " + req.params.id })
        }
    } catch (err) {
        console.log("err catched", err);
    }
}

// find one station record by histo_flag
const findOneByHistoFlag = async (req, res, next) => {
    try {
        console.log('request params ', req.params.id);
        let data = await stationService.findRecordByHistoFlag(req.params.id);
        let returnedData = [];
        returnedData = Object.assign(returnedData, data);
        if (data) {
            console.log("controller tra ve ", returnedData);
            res.status(200).send(returnedData);
        } else {
            res.status(400).send({ message: "cant find any record with histo_flag  = " + req.params.id })
        }
    } catch (err) {
        console.log("err catched", err);
    }
}

// find one station record by realtime_flag
const findOneByRealtimeFlag = async (req, res, next) => {
    try {
        console.log('request params ', req.params.id);
        let data = await stationService.findRecordByRealTimeFlag(req.params.id);
        let returnedData = [];
        returnedData = Object.assign(returnedData, data);
        if (data) {
            console.log("controller tra ve ", returnedData);
            res.status(200).send(returnedData);
        } else {
            res.status(400).send({ message: "cant find any record with realtime_flag  = " + req.params.id })
        }
    } catch (err) {
        console.log("err catched", err);
    }
}

// update one station record by id
const updateOne = async (req, res, next) => {
    let stationDTO = req.body;
    let id = req.params.id;
    try {
        console.log('controller log');
        const modifiedStation = await stationService.updateRecord(id, stationDTO);
        if (modifiedStation) {
            res.status(200).send([{ message: "update new document successfully" }, modifiedStation]);
        } else {
            res.status(400).send({ message: "Please check ur id" })
        }
    } catch (err) {
        console.log("err catched in controller", err);
        res.status(400).send({ message: "update new document failed" });
    }
}

// delete one record by id 
const deleteOne = async (req, res, next) => {
    let id = req.params.id;
    try {
        const value = await stationService.deleteRecord(id);
        if (!value)
            res.send(500)
        else
            res.status(200);
        res.send({ message: `delete document successfully with id = ${id}` });
    } catch (error) {
        res.send(500);
        console.log("err catched in controller", err);
    }
}
module.exports = {
    getAll,
    createNewStation,
    findOne,
    findOneByHistoFlag,
    updateOne,
    deleteOne,
    findOneByRealtimeFlag
}