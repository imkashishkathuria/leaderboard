import mongoose from 'mongoose'

const HistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pointsClaimed: Number,
    timeStamp: { type: Date, default: Date.now }
});

const History = mongoose.model("History", HistorySchema);

export default History