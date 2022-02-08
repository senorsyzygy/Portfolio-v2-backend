require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');
const { Blog } = require('./models/blog');
const { Project } = require ('./models/projects')
const { Guestbook } = require('./models/guestbook')
const { path } = require('express/lib/application');
const multer = require("multer");
const fs = require("fs");
const { S3Client, PutObjectCommand, CreateBucketCommand } = require("@aws-sdk/client-s3")
const fileUpload = require('express-fileupload');
const { env } = require('process');
//For connecting the server
mongoose.connect(process.env.MONGO_SERVER,
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const port = process.env.PORT || 3001
// defining the Express app
const app = express();
const defaultSort = {createdAt: -1}
// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));


//BLOGS
//Posting a blog
app.post('/', async (req, res) => {
    const newBlog = req.body
    const blog = new Blog(newBlog)
    await blog.save()
    res.send({message: 'Blog saved'})
})

//fetching the blogs to map
app.get('/bloggers', async (req, res) => {
    res.send(await Blog.find().sort(defaultSort).lean())
})
//PROJECTS
//Posting a project
app.post('/projadd', async (req, res) => {
    const newProject = req.body
    const project = new Project(newProject)
    await project.save()
    res.send({message: 'Project saved'})
})
//fetching the projects to map
app.get('/projects', async (req, res) => {
    res.send(await Project.find().sort(defaultSort).lean())
})
//GUEST BOOK
//Posting a Guest Book comment
app.post('/guestbookadd', async (req, res) => {
    const newGuestbook = req.body
    const guestbook = new Guestbook(newGuestbook)
    await guestbook.save()
    res.send({message: 'Guestbook comment saved'})
    console.log(guestbook)
})
//fetching guestbook comments
app.get('/guestbooks', async (req, res) => {
    res.send(await Guestbook.find().sort(defaultSort).lean())
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Optimus Prime is online")
});