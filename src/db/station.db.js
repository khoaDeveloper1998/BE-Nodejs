// import middlewares and models
const db = require('./dbConnection');
const stationModel = require('../models/station');

// Get All
const getAll = () => {
    return stationModel
        .find({},{__v:0})
}
// Create one record
const createOne = async (station) => {
    const value = await station.save(station);
}

// Find one record
const findOne = (id) => {
    console.log(id);
    return stationModel.findOne({ id: id },{_id : 0,__v:0}).exec();
}

//Update one record
const updateOne = async (id, station) => {
    console.log('db', station);
    const modifiedStation = await stationModel.findOneAndUpdate({ id: id }, station, {
        new: true,
        rawResult: true
    });
    return modifiedStation.value;
}


// Delete one record
const deleteOne = async (id, station) => {
    console.log('db', station);
    await stationModel.deleteOne({ id: id }, (err, result) => {
        if (err)
            throw err;
        else
            console.log(result);
    })
}


// Find by histo_flag
const findByHistoFlag = async(value) =>{
    console.log('fetching data with histo_flag = ',value);
    let data = await stationModel.find({histo_flag: value},{_id : 0,__v:0}).exec();
    return data;
}

// Find by realtime_flag
const findByRealtimeFlag = async(value) =>{
    console.log('fetching data with realtime_flag = ',value);
    let data = await stationModel.find({realtime_flag: value},{_id : 0,__v:0}).exec();
    return data;
}
module.exports = {
    getAll,
    createOne,
    findOne,
    updateOne,
    deleteOne,
    findByHistoFlag,
    findByRealtimeFlag    
}