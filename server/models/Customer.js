const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

const customerSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

customerSchema.plugin(uniqueValidator)
const Customer = mongoose.model('Customer', customerSchema);

module.exports = { Customer }
