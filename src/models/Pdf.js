const moongose = require('mongoose');

const PdfSchema = new moongose.Schema({
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
    link: {
        type: String,
        required: true
    }, 
    article:{
        type: moongose.Schema.Types.ObjectId,
        ref: 'Article'
    },   
    views: {
        type: Number,
        default: 0
    }   
});

module.exports = moongose.model('Pdf', PdfSchema);