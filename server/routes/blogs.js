const router = require('express').Router();
const Blogs = require('../models/Blogs');
const User = require('../models/User');

//get Blogs;
router.get('/', async(req, res)=> {
  try {
    const sort = {'_id': -1}
    const blogs = await Blogs.find().sort(sort);
    res.status(200).json(blogs);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

//get Users;
router.get('/users', async(req, res)=> {
  try {
    const sort = {'_id': -1}
    const users = await User.find().sort(sort);
    res.status(200).json(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

//create Blog
router.post('/', async(req, res)=> {
  try {
    const {title, title_description, content, userId, category} = req.body;
    const blog = await Blogs.create({title, title_description, content, userId, category});
    const blogs = await Blogs.find();
    res.status(201).json(blogs);
  } catch (e) {
    res.status(400).send(e.message);
  }
})


// update Blog

router.patch('/:id', async(req, res)=> {
  const {id} = req.params;
  try {
    const {title, title_description, content, category} = req.body;
    const blog = await Blogs.findByIdAndUpdate(id, {title, title_description, content, category});
    const blogs = await Blogs.find();
    res.status(200).json(blogs);
  } catch (e) {
    res.status(400).send(e.message);
  }
})


// delete Blog

router.delete('/:id', async(req, res)=> {
  const {id} = req.params;
  const {user_id} = req.body;
  try {
    const user = await User.findById(user_id);
    if(!user.isAdmin) return res.status(401).json("You don't have permission");
    await Blogs.findByIdAndDelete(id);
    const blogs = await Blogs.find();
    res.status(200).json(blogs);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

router.get('/:id', async(req, res)=> {
  const {id} = req.params;
  try {
    const blog = await Blogs.findById(id);
    const similar = await Blogs.find({category:category, _id:{ $ne : id} }).limit(5);
    res.status(200).json({blog, similar})
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/category/:category', async(req,res)=> {
  const {category} = req.params;
  try {
    let blogs;
    const sort = {'_id': -1}
    if(category == "all"){
      blogs = await Blogs.find().sort(sort);
    } else {
      blogs = await Blogs.find({category}).sort(sort)
    }
    res.status(200).json(blogs)
  } catch (e) {
    res.status(400).send(e.message);
  }
})

module.exports = router;
