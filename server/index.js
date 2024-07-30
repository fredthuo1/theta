const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const uploadRoutes = require('./routes/index');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = "mongodb+srv://thuofred1:TKFKIhY6bFHtWrBh@cluster0.bw1mft0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        const database = client.db("video-platform");
        app.locals.db = database;

        app.use('/api', uploadRoutes);

        const port = process.env.PORT || 5000;
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
run().catch(console.dir);
