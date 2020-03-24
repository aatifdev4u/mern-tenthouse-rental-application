const express = require('express');
const router = express.Router();
const { Transaction } = require("../models/Transaction");
const { Product } = require("../models/Product");
const { auth } = require("../middleware/auth")
const pdfTemplate = require('../documents');
const pdf = require('html-pdf');
const path = require('path')

// @route POST /api/transaction/createTransaction
// @desc create new Transaction
// @access Private
router.post('/createTransaction',  (req, res)=>{
    const newTransaction = new Transaction(req.body);
    let productUpdation = false;
    const transactionDetails = req.body.transactionDetails;

    console.log("transactionDetails: ", transactionDetails);
    transactionDetails.forEach((item)=>{
        Product.findOneAndUpdate(
            {"productName" : item.productName},
            {$inc : {"availableQty" : -item.quantity } },
            { new : true},
            (err)=>{
                if(err){
                    console.log(err);
                    if(err) return res.status(400).json({ success: false, msg: "Failed to add Customer in product", err})
                }else{
                   
                    console.log('success')
                }
            }
        )
    })
   
        newTransaction.save((err, transaction)=>{
            if(err) return res.status(400).json({ success: false, msg: "Failed to add Customer in transaction", err})
    
            return res.status(200).json({
                success: true,
                msg: "Successfuly added customer",
                transaction
            })
        })
    
})


// @route GET /api/transaction/getTransaction
// @desc get Transaction details
// @access Public
router.get('/getTransaction/:transactionId', (req, res)=>{
    console.log(req.params.transactionId);
    let id = req.params.transactionId
    Transaction.findById(id, (err, details)=>{
        if(err) return res.status(400).json({ success: false, err})

        return res.status(200).json({
            success: true,
            details
        })
    })
})


// @route POST /api/transaction/refundTransaction
// @desc Refund Transaction
// @access private
router.post('/refundTransaction',  (req, res)=>{
    const newTransaction = new Transaction(req.body);
    const transactionDetails = req.body.transactionDetails;

    transactionDetails.forEach((item)=>{
        console.log("item:", item);
        Product.findOneAndUpdate(
            {"productName" : item.productName},
            {$inc : {"availableQty" : item.quantity } },
            { new : true},
            (err)=>{
                if(err){
                    if(err) return res.status(400).json({ success: false, msg: "Failed to add Customer in product", err})
                }else{
                    console.log('success')
                }
            }
        )
    })
   
        newTransaction.save((err, transaction)=>{
            if(err) return res.status(400).json({ success: false, msg: "Failed to add Customer in transaction", err})
    
            return res.status(200).json({
                success: true,
                msg: "Successfuly added customer",
                transaction
            })
        })
    
})


// @route GET /api/transaction/getTransactionList
// @desc get Transaction list details sorted in descending wih created date
// @access Public
router.get('/getTransactionList', (req, res)=>{

    Transaction.find({}, {
        'parentTransactionId': 0,    // select keys to return here
    }, {sort: '-createdAt'}, function(err, transaction) {
        // use it here
        if(err) return res.status(400).json({ success: false, err})

        return res.status(200).json({
            success: true,
            transaction
        })

    });
    
})


// @route POST /api/transaction/createPdf
// @desc POST route is going to fetch the data and generate a PDF.
// @access Public
router.post('/createPdf', (req, res)=>{
    pdf.create(pdfTemplate(req.body), {}).toFile('report.pdf', (err)=>{
        if(err){
            return res.send(Promise.reject())
        }

        res.send(Promise.resolve())
    })  
})


// @route GET /api/transaction/fetchPdf
// @desc GET route is going to send the generated PDF to the client.
// @access Public
router.get('/fetchPdf', (req, res)=>{
    res.sendFile(path.join(__dirname + '../../../report.pdf'))
})


module.exports = router;