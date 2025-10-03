import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    points: {
        type: Number, // Maps to integer
        required: true,
        default: 0,
    },
    level: {
        type: Number, // Maps to integer
        required: true,
        default: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true,
    },
    description: {
        type: String, // Maps to text
    },
    name: {
        type: String,
        required: true,
    },
    collectionInfo: {
        type: String, // Maps to text
        required: true,
    },
})
export default mongoose.model('reward',rewardSchema)