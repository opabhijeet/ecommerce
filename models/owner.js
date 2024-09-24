const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    products: {
        type: Array,
        default: []
    },
    picture: String,
    gstin:{
        type: String,
        default: null
    },
});

module.exports = mongoose.model('owner', ownerSchema);