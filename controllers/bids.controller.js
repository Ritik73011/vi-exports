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
        const aa = await newBid.save();
        const newDate = new Date().toISOString();

        if (differenceInMinutes <= 5) {
            await tendersModel.findByIdAndUpdate(body.tenderId, { endTime: tender.bufferTime })
            return response(res, 200, { success: true, msg: 'Bid placed in last 5 min & tender time extended.', _id: aa._id, newDate });
        }
        return response(res, 200, { success: true, msg: 'Bid placed...', _id: aa._id, newDate });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return response(res, 500, { success: false, msg: "validation error, unexpected value", errors, });
        }
        return response(res, 500, { success: false, error })
    }
}

//getting bids for admin
const getAllBids = async (req, res) => {
    try {
        const pipeline = [
            {
                $lookup: {
                    from: "tenders",
                    localField: "tenderId",
                    foreignField: "_id",
                    as: "tender"
                }
            },
            {
                $unwind: '$tender'
            },
            {
                $project: {
                    tenderName: "$tender.name",
                    tenderId: 1,
                    flag: 1,
                    name: 1,
                    email: 1,
                    bidTime: 1,
                    bidCost: 1,
                    createdAt: 1
                }
            }
        ];
        const bids = await userBidsModel.aggregate(pipeline).sort({ bidCost: 1 });
        return response(res, 200, { success: true, bids });
    } catch (error) {
        return response(res, 500, { success: false, error })
    }
}


module.exports = { createNewBid, getAllBids }