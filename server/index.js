const express = require('express')
const app = express();
const cors = require("cors");
const { faker } = require('@faker-js/faker');

require("dotenv").config();
app.use(express.static('public'))

const port = process.env.SERVER_PORT || 8000;

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
  })
);

const db = require('./modules/db');
const Blogs = require('./models/Blogs');
const User = require('./models/User');

async function init()
{
    try{
        console.log('init');
        let blogs = await Blogs.find({});
        let users = await User.find({});
        console.log(users.length);
        console.log(blogs.length);
        for(i = 0; i < 10; i++){
            let title = faker.name.jobTitle();
            let title_description = faker.name.jobType();
            let content = faker.lorem.paragraphs(5); 
            let category = faker.name.jobArea();
            let views = faker.random.numeric();
            let index = views > 10 ? 1 : views;
            let owner = ( typeof users[index] == 'undefined') ? users[1] : users[index];
            const product = await Blogs.create({title, title_description, content, category, views, owner});
            console.log(product);
        }
    } 
    catch(e)
    {
        console.log(e);
    }
}
//init();

app.get("/", async (req, res) => {
    res.send("API FOR BLOGGER");
});

app.post("/login", async (req, res) => {
        
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