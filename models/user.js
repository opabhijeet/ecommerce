const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/genie');

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String,
});

module.exports = mongoose.model('user', userSchema);