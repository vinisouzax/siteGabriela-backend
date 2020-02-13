const moongose = require('mongoose');

const PdfSchema = new moongose.Schema({
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
}, {
    toJSON:{
        virtuals: true,
    }
});

PdfSchema.virtual('pdf_url').get(function(){
    return `http://localhost:3333/files/${this.name}`
});


module.exports = moongose.model('Pdf', PdfSchema);