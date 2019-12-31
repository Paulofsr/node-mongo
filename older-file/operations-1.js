const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
    const dbCollection = db.collection(collection);
    dbCollection.insert(document, (err, result) => {
        assert.equal(err, null);
        console.log(`Inserted ${result.result.n} documents into the collection  ${collection}`);
        callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => {
    const dbCollection = db.collection(collection);
    dbCollection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        callback(docs);        
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const dbCollection = db.collection(collection);
    dbCollection.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        console.log("Removed the document ", document);
        callback(result);        
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const dbCollection = db.collection(collection);
    dbCollection.updateOne(document, { $set: update }, null, (err, result) => {
        assert.equal(err, null);
        console.log("Updated the document with ", update);
        callback(result);        
    });
};
