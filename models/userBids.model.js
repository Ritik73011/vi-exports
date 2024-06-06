const mongoose = require('mongoose');

const userBidsSchema = new mongoose.Schema({
    tenderId: mongoose.Schema.Types.ObjectId,
    flag: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        maxlength: [30, 'Company name must be less than 30 characters'],
        minlength: [3, 'Company name must be atleast 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
    },
    bidTime: {
        type: Number,
        required: [true, 'Bid time is required'],
    },
    bidCost: {
        type: Number,
        required: [true, 'Bid cost is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const userBidsModel = mongoose.model('bids', userBidsSchema);
module.exports = userBidsModel;