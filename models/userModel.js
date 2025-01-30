const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ 
    name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    }, 
    token: { 
        type: String 
    },
    tokenExpiry: { 
        type: Date // To store the token's expiry time
    }
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);