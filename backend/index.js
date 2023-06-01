var $acq34$express = require("express");
require("express-http-proxy");
var $acq34$cors = require("cors");
var $acq34$mongodb = require("mongodb");





var $bd295355364a39aa$require$MongoClient = $acq34$mongodb.MongoClient;

var $bd295355364a39aa$require$ObjectId = $acq34$mongodb.ObjectId;
// Create Express app
const $bd295355364a39aa$var$app = $acq34$express();
// Add CORS to all routes and methods
$bd295355364a39aa$var$app.use($acq34$cors());
// Enable parsing of JSON bodies
$bd295355364a39aa$var$app.use($acq34$express.json());
const $bd295355364a39aa$var$port = 3600;
const $bd295355364a39aa$var$dbName = "mean-passwordManager";
const $bd295355364a39aa$var$collectionName = "passwords";
// database connection string
const $bd295355364a39aa$var$dbUrl = "mongodb+srv://admin:xOuG5xzD7E4ZZCdF@mycluster.upxjjyn.mongodb.net/?retryWrites=true&w=majority";
let $bd295355364a39aa$var$dbConnection;
// Define server routes
// List all passwords
// TODO: Task - Write whole GET Request
$bd295355364a39aa$var$app.route("/passwords").get(async (req, res)=>{
    let passwords = [];
    passwords = await $bd295355364a39aa$var$dbConnection.collection($bd295355364a39aa$var$collectionName).find().toArray();
    res.json(passwords);
});
// Get a password
$bd295355364a39aa$var$app.route("/password-edit/:id").get(async (req, res)=>{
    const id = req.params.id;
    const result = await $bd295355364a39aa$var$dbConnection.collection($bd295355364a39aa$var$collectionName).findOne({
        _id: new $bd295355364a39aa$require$ObjectId(id)
    });
    if (!result) {
        res.status(404).json({
            error: "Could not find"
        });
        return;
    }
    res.json(result);
});
// Create a new password
$bd295355364a39aa$var$app.route("/passwords-edit").post(async (req, res)=>{
    const doc = req.body;
    const result = await $bd295355364a39aa$var$dbConnection.collection($bd295355364a39aa$var$collectionName).insertOne(doc);
    res.status(201).json({
        _id: result.insertedId
    });
});
// Update a password
$bd295355364a39aa$var$app.route("/passwords-edit/:id").put(async (req, res)=>{
    const id = req.params.id;
    const doc = req.body;
    // make sure the id field is correct object type
    doc._id = new $bd295355364a39aa$require$ObjectId(id);
    const result = await $bd295355364a39aa$var$dbConnection.collection($bd295355364a39aa$var$collectionName).updateOne({
        _id: new $bd295355364a39aa$require$ObjectId(id)
    }, {
        $set: doc
    });
    if (result.matchedCount == 0) {
        res.status(404).json({});
        return;
    }
    res.json({});
});
// Delete a person
$bd295355364a39aa$var$app.route("/passwords/:id").delete(async (req, res)=>{
    const id = req.params.id;
    // TODO: Task - Write delete query only
    await $bd295355364a39aa$var$dbConnection.collection($bd295355364a39aa$var$collectionName).deleteOne({
        _id: new $bd295355364a39aa$require$ObjectId(id)
    });
    res.json({});
});
// Start server and listen for requests
$bd295355364a39aa$var$app.listen($bd295355364a39aa$var$port, function() {
    console.log("Listening on " + $bd295355364a39aa$var$port + ".");
});
// database connection
$bd295355364a39aa$require$MongoClient.connect($bd295355364a39aa$var$dbUrl).then((client)=>{
    $bd295355364a39aa$var$dbConnection = client.db($bd295355364a39aa$var$dbName);
}).catch((err)=>{
    console.log(err);
});


//# sourceMappingURL=index.js.map
