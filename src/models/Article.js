const moongose = require('mongoose');

const ArticleSchema = new moongose.Schema({
    title: {
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
    txt_dsc: String,
    subject:{
        type: moongose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    content:{
        type: moongose.Schema.Types.ObjectId,
        ref: 'Content'
    },     
    views: {
        type: Number,
        default: 0
    }
});

module.exports = moongose.model('Article', ArticleSchema);