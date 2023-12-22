const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://scandalize:riqpkUM34h9pJjOG@cluster0.pecvt17.mongodb.net/?retryWrites=true&w=majority`;

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