const mongoose = require('mongoose');

const server = "127.0.0.1:27017";
const database = "StationManagement";
// dabase connections
class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                const collections = Object.keys(mongoose.connection.collections);
                console.log(collections);
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }
}
module.exports = new Database();