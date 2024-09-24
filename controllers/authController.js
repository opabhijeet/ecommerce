const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {generateToken} = require("../utils/generatetoken")

module.exports.registerUser = async (req, res)=>{
    try{
        let {email, password, fullname} = req.body;
        if(!email || !password || !fullname){
            return res.status(400).json({msg: "All fields are required"})
        }

        const userExists = await userModel.findOne({email});
        if(userExists){
            return res.status(400).json({msg: "User already exists"})
        }

        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(password, salt, async (err, hash)=>{
                if(err) throw err;
                const user = await userModel.create({
                    email,
                    password: hash,
                    fullname
                })
                const token = generateToken(user);
                res.cookie("token", token);
                res.redirect("/shop");
            })
        })
    }
    catch(err){
        console.log(err.message)
    }
}

module.exports.loginUser = async (req, res)=>{
    try{
        let {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({msg: "All fields are required"})
        }

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({msg: "Invalid credentials"})
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if(err) throw err;
            if(result) {
                const token = generateToken(user);
                res.cookie("token", token);
                res.redirect("/shop");
            } else {
                return res.status(400).json({msg: "Invalid credentials"})
            }
        });

    }
    catch(err){
        console.log(err.message)
    }
}

module.exports.logout = async (req, res)=>{
    try{
        res.clearCookie("token");
        res.redirect("/");
    }
    catch(err){
        console.log(err.message)
    }
}