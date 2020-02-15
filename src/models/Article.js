const moongose = require('mongoose');

const ArticleSchema = new moongose.Schema({
    name: {
        type: String,
        required: true
    }, 
    dt_creation: {
        type: Date,
        default: Date.now,
        required: true
    }, 
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    subject:{
        type: moongose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    content:{
        type: moongose.Schema.Types.ObjectId,
        ref: 'Content'
    },
    user:{
        type: moongose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = moongose.model('Article', ArticleSchema);