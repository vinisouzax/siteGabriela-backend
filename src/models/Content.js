const moongose = require('mongoose');

const ContentSchema = new moongose.Schema({
    name: {
        type: String,
        required: true
    }, 
    dt_creation: {
        type: Date,
        default: Date.now,
        required: true
    }, 
    image: String,
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    subject:{
        type: moongose.Schema.Types.ObjectId,
        ref: 'Subject'
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

ContentSchema.virtual('image_url').get(function(){
    return `${process.env.FILES_URL}${this.name}`
});

module.exports = moongose.model('Content', ContentSchema);