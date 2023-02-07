const express = require('express')
const app = express();
const cors = require("cors");

require("dotenv").config();
app.use(express.static('public'))

const port = process.env.SERVER_PORT || 8000;

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
  })
);
require('./modules/fakedata');

app.get("/", async (req, res) => {
    res.send("API FOR BLOGGER");
});

app.post("/login", async (req, res) => {
    console.log(req.body);
    res.json({
        loggedIn:true,
        name:"Charan Kumar",
        email:"mckk84@gmail.com",
        password: "password",
    });
});

const blogRoutes = require('./routes/blogs');
app.use('/blogs', blogRoutes);

app.listen(port, async() => {
    console.log(`Server Listning on ${port}`)
})