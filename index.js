const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOperations = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    const dishesCollection = "dishes";

    dbOperations.insertDocument(db, { name: "Vadonut", description: "Test"}, dishesCollection,
        (result) => {
            console.log("Insert Document:\n", result.ops);

            dbOperations.findDocuments(db, dishesCollection, 
                (docs) => {
                    console.log("Found Documents:\n", docs);

                    dbOperations.updateDocument(db, { name: "Vadonut" },
                        { description: "Updated Test" }, dishesCollection,
                        (result) => {
                            console.log("Updated Document:\n", result.result);

                            dbOperations.findDocuments(db, dishesCollection, 
                                (docs) => {
                                    console.log("Found Updated Documents:\n", docs);
                                    
                                    db.dropCollection(dishesCollection, 
                                        (result) => {
                                            console.log("Dropped Collection: ", result);

                                            client.close();
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    );
});