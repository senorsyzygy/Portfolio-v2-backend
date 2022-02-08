const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
projectName: {
    type: String,
    indexed: true,
    required: true
},
subname: {
    type: String,
},
bulktext: {
    type: String,
    required: true
},
image1:{
    type: String
},
frontend:{
    type: String
},
backend:{
    type: String
},
livesite:{
    type: String
}
},
{
timestamps: true  
})

module.exports.Project = mongoose.model('Project', projectSchema)