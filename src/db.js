import { MongoClient } from "mongodb";


let db;

async function connectToDB(cb) {
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ghldva8.mongodb.net/?retryWrites=true&w=majority`); // connect to local mongodb
    await client.connect();
    db = client.db('react-blog-db'); // reeferencing the specific database
    cb();
}


export {
    db,
    connectToDB,
};