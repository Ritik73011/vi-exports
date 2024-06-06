const { validationResult } = require("express-validator");
const { response } = require('../utils/responce');
const { convertDateTimeToTimestamp } = require('../utils/timeConverter');
const tendersModel = require("../models/tenders.model");
const userBidsModel = require("../models/userBids.model");

const createNewBid = async (req, res) => {
    const body = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return response(res, 400, { success: false, errors: errors.array() });

        const bidTime = convertDateTimeToTimestamp(body.bidTime);

        if (bidTime === NaN)
            return response(res, 400, { success: false, msg: "Invalid date formet" });

        const tender = await tendersModel.findOne({ _id: body.tenderId });
        if (!tender)
            return response(res, 400, { success: false, msg: "Invalid tender id" });

        const currentTime = Date.now();
        if (currentTime >= tender.endTime)
            return response(res, 400, { success: false, msg: "Tender closed." });

        const differenceInMs = tender.endTime - currentTime;
        const differenceInMinutes = differenceInMs / (1000 * 60);

        const newBid = new userBidsModel({
            tenderId: body.tenderId,
            name: body.name,
            email: body.email,
            bidTime: bidTime,
            bidCost: body.bidCost,
            flag: differenceInMinutes <= 5 ? true : false
        })
        await newBid.validate();
        await newBid.save();

        if (differenceInMinutes <= 5) {
            await tendersModel.findByIdAndUpdate(body.tenderId, { endTime: tender.bufferTime })
            return response(res, 200, { success: true, msg: 'Bid placed in last 5 min & tender time extended.' });
        }
        return response(res, 200, { success: true, msg: 'Bid placed...' });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return response(res, 500, { success: false, msg: "validation error, unexpected value", errors, });
        }
        return response(res, 500, { success: false, error })
    }
}



module.exports = { createNewBid }