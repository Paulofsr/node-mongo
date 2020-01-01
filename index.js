const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOperations = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);
    const collection = "dishes";

    dbOperations.insertDocument(db, { name: "Vadonut", description: "Test"}, collection)
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dbOperations.findDocuments(db, collection);
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dbOperations.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, collection);

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dbOperations.findDocuments(db, collection);
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
                            
            return db.dropCollection(collection);
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));