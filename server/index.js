const express = require('express')
const app = express();
const cors = require("cors");
require("dotenv").config();
const MongoClient = require('mongodb').MongoClient;

app.use(express.static('public'))

const port = process.env.SERVER_PORT || 8000;
const mongodbUrl = process.env.MONGODB_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
  })
);

MongoClient.connect(mongodbUrl, (err, client) => {
  if (err) throw err

  const db = client.db('blogger');
});

app.get("/", async (req, res) => {
    res.send("API FOR BLOGGER");
});


app.listen(port, async() => {
    console.log(`Server Listning on ${port}`)
})