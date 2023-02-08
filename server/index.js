const express = require('express')
const app = express();
const cors = require("cors");
let validator = require('validator');
const bcrypt = require('bcrypt');

require("dotenv").config();
const port = process.env.SERVER_PORT || 8000;

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
  })
);
require('./modules/fakedata');
const User = require('./models/User');

app.post("/login", async (req, res) => {
    console.log(req.body); 

    if( validator.isEmail(req.body.email) 
        && !validator.isEmpty(req.body.password)
        && validator.isLength(req.body.password , {min:6, max:15})    
         )
    {
        const user = await User.findOne({email: req.body.email});
        if( user )
        {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result == true) 
                {
                    res.json({
                        loggedIn:true,
                        name:user.name,
                        email:user.email,
                        isAdmin:user.isAdmin
                    });
                } 
                else 
                {
                    reject(new Error("Password is incorrect.")); 
                }
            });
        }
        else
        {
            res.json({
                loggedIn:false,
                error:"Email not registerd."
            });
        }
    }
    else
    {
        res.json({
            loggedIn:false,
            error:"Invalid data"
        });
    }
});

app.post("/register", async (req, res) => {
    
    if( validator.isEmail(req.body.email) 
        && !validator.isEmpty(req.body.username)
        && !validator.isEmpty(req.body.password)
        && validator.isLength(req.body.password , {min:6, max:15})    
         )
    {
        const user = await User.findOne({email: req.body.email});
        if( !user )
        {
            let name = req.body.username;
            let email = req.body.email;
            let password = req.body.password;
            let isAdmin = 0;
            const user = await User.create({name, email, password, isAdmin});
            res.json({
                signUp:true,
                message:"Signup successful."
            });
        }
        else
        {
            res.json({
                signUp:false,
                error:"Email already registerd."
            });
        }
    }
    else
    {
        res.json({
            signUp:false,
            error:"Invalid data"
        });
    }
});

const blogRoutes = require('./routes/blogs');
app.use('/blogs', blogRoutes);

app.get("/", async (req, res) => {
    /*app._router.stack.forEach(function(r){
      if (r.route && r.route.path){
        console.log(r.route.path)
      }
    });*/
    res.send("API FOR BLOGGER");
});

app.listen(port, async() => {
    console.log(`Server Listning on ${port}`)
})