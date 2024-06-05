const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tender name is required'],
        trim: true,
        maxlength: [50, 'Tender name must be less than 50 characters'],
        minlength: [3, 'Tender name must be atleast 3 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [4000, 'Description must be less than 4000 characters'],
        minlength: [3, 'Description must be atleast 3 characters']
    },
    startTime: {
        type: Number,
        required: [true, 'Start time is required'],
    },
    endTime: {
        type: Number,
        required: [true, 'End time is required'],
    },
    bufferTime: {
        type: Number,
        required: [true, 'Buffer time is required'],
    },
    isClosed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const tendersModel = mongoose.model('tenders', tenderSchema);
module.exports = tendersModel;