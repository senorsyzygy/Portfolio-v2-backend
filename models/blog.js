const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    indexed: true,
    required: true
  },
  subTitle: {
    type: String,
    required: true
  },
  bulkText: {
    type: String,
    required: true
  },
  image1:{
    type: String
  },
  image2:{
    type: String
  }
},
{
  timestamps: true  
})

module.exports.Blog = mongoose.model('Blog', blogSchema)