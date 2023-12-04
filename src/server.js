import fs from "fs";
import admin from "firebase-admin";
import express from "express";
import { db, connectToDB } from "./db.js";

const credentials = JSON.parse(
    fs.readFileSync('../credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());


app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params; // getting the api url parameter "name"

    const article = await db.collection('articles').findOne({ name }); // quering to find the corresponding parameter

    if (article) {
        res.json(article);
    }else {
        res.sendStatus(404);
    }
});

app.put('/api/articles/:name/upvote', async(req, res) => {
    const { name } = req.params;
    
    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1},
    });
    const article = await db.collection('articles').findOne({ name });

    if (article){
        res.send(article);
    } else {
        res.send(`That article doesn't exist`);
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } },
    });
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);
    }else {
        res.send(`That article doesn't exist`);
    }
});

/*
app.post('/api/artiles/', async (req, res) => {
    const { name } = req.body;
    
   await db.collection('articles').post({name}, {
     $push: { name: {name}},
   });

   const article = await db.collection('articles').findOne({ name });
   
   res.send(`The article ${article} has been added`);
}); */

connectToDB(() => {
    console.log('Successfully connected to database');
    app.listen(8000, () => {
        console.log('Server listening on port 8000');
    });
})
