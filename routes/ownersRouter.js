const express = require('express');
const router = express.Router();
const owner = require('../models/owner');

if(process.env.NODE_ENV === 'development') {
    router.post("/create", async (req, res) => {
        try {
            let owners = await owner.find();
            if(owners.length > 0) {
                return res.status(400).send('You are not authorized to create an owner');
            }
            const { fullName, email, password } = req.body;
            let createdOwner = await owner.create({
                fullName,
                email,
                password,
            })
            res.status(201).send(createdOwner);
        } catch (error) {
            res.status(400).send(error);
        }
    });
}

router.get("/admin", (req, res) => {
    let success = req.flash("success");
    res.render("createproducts", { title: 'Admin', success });
}
)


module.exports = router;