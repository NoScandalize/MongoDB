const { MongoClient } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/notes";

let _db;

const initDb = cb => {

    MongoClient.connect(uri)
    .then(client => {
        _db = client
        cb(null, _db)
    })
    .catch(err => {
        cb(err)
        console.error(err)
    })
}

const getDb = () => {
    return _db
}

module.exports = {
    initDb,
    getDb
}