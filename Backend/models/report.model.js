import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    location: {
        type: String, 
        required: true,
    },
    wasteType: {
        type: String,
        required: true,
        maxlength: 255, 
    },
    amount: {
        type: String,
        required: true,
        maxlength: 255, 
    },
    imageUrl: {
        type: String, 
    },
    verificationResult: {
        type: mongoose.Schema.Types.Mixed, 
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
        maxlength: 255, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    collectorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: false,
    },
})
export default mongoose.model('report' , reportSchema)