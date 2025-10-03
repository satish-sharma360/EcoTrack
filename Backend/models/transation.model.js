import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['earned', 'redeemed'], // Suggest a valid set for 'earned' or 'redeemed'
    },
    amount: {
        type: Number, // Maps to integer
        required: true,
    },
    description: {
        type: String, // Maps to text
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
})
export default mongoose.model('transaction',TransactionSchema)