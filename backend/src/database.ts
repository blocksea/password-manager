// import mongodb client from the node.js driver
const { MongoClient } = require('mongodb')
// import Password interface
import { Password } from "./password";

// database connection string
const dbURL: string = 'mongodb+srv://admin:xOuG5xzD7E4ZZCdF@mycluster.upxjjyn.mongodb.net/?retryWrites=true&w=majority'

let dbConnection: any = {};

// function to create a database connection
export const connectToDb = async(dbURL: string) => {
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
