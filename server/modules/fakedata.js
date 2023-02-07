const { faker } = require('@faker-js/faker');

const db = require('./db');
const Blogs = require('../models/Blogs');
const User = require('../models/User');
const num_users = 5;
const num_blogs = 10;

async function init_users()
{
    let users = await User.find({});
    if( users.length == 0 )
    {
        for(i = 0; i < num_users; i++)
        {
            let name = faker.name.fullName();
            let email = faker.internet.email();
            let password = "@#User123";
            let isAdmin = 0;
            const user = await User.create({name, email, password, isAdmin});
        }    
    }
}
async function init_blogs()
{
    let blogs = await Blogs.find({});
    if( blogs.length == 0)
    {
        users = await User.find({});
        for(i = 0; i < num_blogs; i++)
        {
            let title = faker.name.jobTitle();
            let title_description = faker.name.jobType();
            let content = faker.lorem.paragraphs(5); 
            let category = faker.name.jobArea();
            let views = faker.random.numeric();
            let index = views > 10 ? 1 : views;
            let owner = ( typeof users[index] == 'undefined') ? users[0] : users[index];
            const product = await Blogs.create({title, title_description, content, category, views, owner});
        }
    }
}

init_users();
init_blogs();