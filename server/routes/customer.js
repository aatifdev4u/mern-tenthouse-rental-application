const express = require('express');
const router = express.Router();
const { Customer } = require("../models/Customer");
const { auth } = require("../middleware/auth");


// @route POST api/customer/addCustomer
// @desc add customer
// @access Private
router.post('/addCustomer', auth, (req, res)=>{
    const newCustomer = new Customer(req.body);

    newCustomer.save((err)=>{
        if(err) return res.status(400).json({ success: false, msg: "Failed to add Customer", err})

        return res.status(200).json({
            success: true,
            msg: "Successfuly added customer"
        })
    })
})

// @route GET /api/customer/getCustomer
// @desc get customer
// @access Private
router.get('/getCustomer', (req, res)=>{

    Customer.find({}, (err, customers)=>{
            if(err) return res.status(400).json({success: false, err})
    
            return res.status(200).json({
                success: true,
                msg: "Successfully Fetched Customers",
                customers
            })
        })
    }
)

module.exports = router;