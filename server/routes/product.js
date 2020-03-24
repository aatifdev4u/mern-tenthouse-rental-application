const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");
const multer = require('multer');
const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png' || ext !== '.jpeg') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

// Upload Images on nodeServer
router.post('/uploadImage', auth, (req, res)=>{
    upload(req, res,err => {
        if(err){
            return res.json({ success: false, err})
        }

        return res.json({
            success: true,
            image: res.req.file.path,
            fileName: res.req.file.filename 
        })
    })
})

// @route POST /api/product/uploadProduct
// @desc Upload
// @access Private
router.post('/uploadProduct', auth, (req, res)=>{
    let product = new Product(req.body);
    product.save((err)=>{
        if(err) return res.status(400).json({success: false, err})

        res.status(200).json({
            success: true,
            msg: "Successfull uploaded Product"
        })
    })
})

// 
// @route POST /api/product/getProducts
// @desc Get the Product details
// @access Public
router.post('/getProducts', (req, res)=>{

    let term = req.body.searchTerm;

    if(term){
        Product
            .find({ $text: { $search: term } })
            .exec((err, products) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ success: true, products})
            })
    }else{
        Product.find({}, (err, products)=>{
            if(err) return res.status(400).json({success: false, err})
    
            return res.status(200).json({
                success: true,
                msg: "Successfully Fetched Product",
                products
            })
        })
    }
})

// 
// @route POST /api/products/updateProduct
// @desc Get the Product details
// @access Public
router.post('/updateAvailability', (req, res)=>{
    const { productName, quantity } = req.body.details[0];
  

    Product.findOneAndUpdate(
        {"productName ": productName},
        {$inc : { "availableQty" : -quantity}},
        {new: true},
        (err, doc)=>{
            if(err) return res.json({ success: false, err})

            return res.status(200).json({
                success: true,
                doc
            })
        }
    )



})


module.exports = router;