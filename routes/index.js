const express = require('express');
const { isLoggedin } = require('../middlewares/isLoggedin');
const productModel = require('../models/product');
const usermodel = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
    let error = req.flash("error");
    
    res.render('index', { title: 'Home', error, loggedin: false });
});

router.get("/shop", isLoggedin, async (req, res) => {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render('shop', { title: 'Shop', products, success });
});

router.get("/cart", isLoggedin, async (req, res) => {
    const user = await usermodel.findOne({email: req.user.email}).populate("cart");
    res.render('cart', { title: 'Cart', user });
});

router.get("/addtocart/:id", isLoggedin, async (req, res) => {
    const user = await usermodel.findOne({email: req.user.email})

    user.cart.push(req.params.id);
    await user.save();
    req.flash("success", "Product added to cart");
    res.redirect("/shop");
});

module.exports = router;