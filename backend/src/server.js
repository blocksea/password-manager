const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
// import Password interface
// import { Password } from "./password";

// Create Express app
const app = express();

// Add CORS to all routes and methods
app.use(cors());

// Enable parsing of JSON bodies
app.use(express.json());

// Initialize parameters
// const port = eval("process.env.PORT") || 3600;
const port = 3600;
const dbName = "mean-passwordManager";
const collectionName = "passwords";

// database connection string
const dbURL = 'mongodb+srv://admin:xOuG5xzD7E4ZZCdF@mycluster.upxjjyn.mongodb.net/?retryWrites=true&w=majority'

let dbConnection;

// function to create a database connection
export const connectToDb = async(dbURL) => {
    try{
        // create client interface
        const client = new MongoClient(dbURL);

        // connect to the cluster
        const response = await client.connect();
        console.log(response);

        // connect to the specific database
        dbConnection = client.db('Passwords');
        console.log("Database connection done.");
    } catch (error) {
        console.log(error);
    }
}

// Start server and listen for requests
app.listen(port, function () {
    console.log("Listening on " + port + ".");
  });

// Define server routes
// List all passwords
// TODO: Task - Write whole GET Request
app.route("/passwords").get(async (req, res) => {
    let passwords = [];
  
    passwords = await db.collection(collectionName)
                            .find({})
                            .toArray();
  
    res.json(people);
});

// Get a password
app.route("/password-edit/:id").get(async (req, res) => {
    const id = req.params.id;
    const result = await db.collection(collectionName).findOne(ObjectId(id));
  
    if (!result) {
      res.status(404).json({error: "Could not find"});
      return;
    }
  
    res.json(result);
});

// Create a new person
app.route("/passwords-edit").post(async (req, res) => {
    const doc = req.body;
    const result = await db.collection(collectionName).insertOne(doc);
    res.status(201).json({ _id: result.insertedId });
  });

// Update a person
app.route("/passwords-edit/:id").put(async (req, res) => {
    const id = req.params.id;
    const doc = req.body;
    const result = await db
      .collection(collectionName)
      .updateOne({ _id: ObjectId(id) }, { $set: doc });
  
    if (result.matchedCount == 0) {
      res.status(404).json({});
      return;
    }
  
    res.json({});
  });

  // Delete a person
app.route("/passwords/:id").delete(async (req, res) => {
    const id = req.params.id;
  
    // TODO: Task - Write delete query only
    await db.collection(collectionName).deleteOne({ _id: ObjectId(id) });
  
    res.json({});
  });