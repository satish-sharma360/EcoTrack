import mongoose from "mongoose";

const CollectedWasteSchema = new mongoose.Schema({
    reportId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'report',
        required: true,
    },
    collectorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    collectionDate: {
        type: Date, // Maps to timestamp
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'collected',
    },
})

export default mongoose.model('collectedWaste',CollectedWasteSchema)