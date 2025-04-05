const Fee = require('../models/feeSchema.js');
const Sclass=require('../models/sclassSchema.js')

const setClassFee = async (req, res) => {
    try {
        const { classID, amount,adminID,dueDate} = req.body;
        
        // Fetch class details to get sclassName
        const existingClass = await Sclass.findById(classID);
        if (!existingClass) {
            return res.status(400).json({ message: "Invalid Class ID" });
        }

        const { sclassName } = existingClass; // Get class name

        const updatedFee = await Fee.findOneAndUpdate(
            { classID },  // Find by classID (ensuring uniqueness)
            { sclassName, classID, amount, adminID, dueDate }, // Update fee amount
            { new: true, upsert: true } // 🔹 Upsert: Update if exists, create if not
        );

     
     return res.status(200).json({ message: "Fee set successfully" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all fees for display in Fee Dashboard
const fetchAllFees = async (req, res) => {
    try {
        const fees = await Fee.find().populate("classID", "sclassName");
        res.status(200).json(fees);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Get fee for a specific class
const fetchClassFee = async (req, res) => {
    try {
        const { classID } = req.params;
        const fee = await Fee.findOne({ classID }).populate("classID", "sclassName");

        if (!fee) {
            return res.status(200).json({
                amount: "Not yet set",
                dueDate: "N/A"
            });
        }
        

        res.status(200).json(fee);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = { setClassFee,fetchAllFees,fetchClassFee};
