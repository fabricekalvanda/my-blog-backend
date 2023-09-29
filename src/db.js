import { MongoClient } from "mongodb";


let db;

async function connectToDB(cb) {
    const client = new MongoClient('mongodb://127.0.0.1:27017'); // connect to local mongodb
    await client.connect();
    const db = client.db('react-blog-db'); // reeferencing the specific database
    cb();
}


export {
    db,
    connectToDB,
}