const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const product = require('../models/product');

router.post("/create", upload.single("image"), async (req, res) => {
    try {
        await product.create({
        name: req.body.name,
        price: req.body.price,
        image: req.file.buffer,
        discount: req.body.discount,
        bgcolor: req.body.bgcolor,
        panelcolor: req.body.panelcolor,
        textcolor: req.body.textcolor,
        });
        req.flash('success', 'Product created successfully');
        res.redirect('/owners/admin');
    }
    catch (error) {
        res.send(error.message);
    }
});

module.exports = router;