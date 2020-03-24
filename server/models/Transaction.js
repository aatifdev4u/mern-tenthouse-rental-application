const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    type:{
        type: String,
        enum : ['IN', 'OUT'], 
    },
    parentTransactionId: {
        type: mongoose.Schema.Types.ObjectId
    },
    customerName:{
        type: String
    },
    transactionDetails:{
        type: Array,
        default: []
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { Transaction }
