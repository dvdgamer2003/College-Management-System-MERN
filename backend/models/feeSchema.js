const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
    sclassName: { 
        type: String, 
        required: true 
    },
    classID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "sclass", 
        required: true, 
        unique: true // Ensures one fee per class
    },
    amount: { 
        type: Number, 
        required: true 
    },
    adminID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "admin", 
        required: true 
    },
    dueDate: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model("Fee", feeSchema);
