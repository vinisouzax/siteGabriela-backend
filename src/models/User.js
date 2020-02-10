const moongose = require('mongoose');

const UserSchema = new moongose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dt_creation: {
        type: Date,
        default: Date.now,
        required: true
    },
    dt_remove: Date,
    cpf_cnpj: {
        type: String,
        maxlength: 14
    },
    phone: {
        type: String,
        maxlength: 14
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    permission:{
        type: Number,
        default: 2,
        required: true
    }    
});

module.exports = moongose.model('User', UserSchema);