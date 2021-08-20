const config = require('config');
const mongoose = require('mongoose');

const dbConnection = async () => {
    await mongoose.connect(`${config.get('dbConfig.host')}${config.get('dbConfig.port')}${config.get('dbConfig.dbName')}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => console.log("Conected MongoDB..."))
        .catch((err) => {
            console.log('Error connect MongoDB...', err);
            throw new Error('Error connect MongoDB...');
        });
}

module.exports = {
    dbConnection
}