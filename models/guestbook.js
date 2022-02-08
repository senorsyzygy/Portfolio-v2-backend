const mongoose = require('mongoose');

const guestbookSchema = mongoose.Schema({
author: {
    type: String,
    required: true
},
comment: {
    type: String,
    required: true
}
},
{
timestamps: true  
})

module.exports.Guestbook = mongoose.model('Guestbook', guestbookSchema)