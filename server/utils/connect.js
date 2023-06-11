const mongoose = require('mongoose');
const config = require('config');
const log = require('./logger');

const connect = async () => {
    const dbUri = config.get("dbUri");
    try {
        await mongoose.connect(dbUri);
        log.info('Connected to the DB');
    } catch (e) {
        log.error('Error connecting to the DB');
        process.exit(1);
    }
}

module.exports = {
    connect
}