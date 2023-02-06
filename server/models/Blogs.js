const mongoose = require('mongoose');
const BlogsSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "can't be blank"]
  },
  title_description: {
    type: String,
    required: [true, "can't be blank"]
  },
  content: {
    type: String,
    required: [true, "can't be blank"]
  },
  category: {
    type: String,
    required: [true, "can't be blank"]
  },
  views: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'Draft'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: 0
  },
  date: {
    type: String,
    default: new Date().toISOString().split('T')[0]
  }
}, {minimize: false});

const Blogs = mongoose.model('Blogs', BlogsSchema);

module.exports = Blogs;
