const { validationResult } = require("express-validator");
const { response } = require('../utils/responce')
const { convertDateTimeToTimestamp } = require('../utils/timeConverter');
const tendersModel = require("../models/tenders.model");

const createNewTender = async (req, res) => {
    const body = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return response(res, 400, { success: false, errors: errors.array() });

        const startTime = convertDateTimeToTimestamp(body.startTime);
        const endTime = convertDateTimeToTimestamp(body.endTime);
        const bufferTime = convertDateTimeToTimestamp(body.bufferTime);

        if (startTime === NaN || endTime === NaN || bufferTime === NaN)
            return response(res, 400, { success: false, msg: "Invalid date formet" });

        const obj = {
            name: body.name,
            description: body.description,
            startTime,
            endTime,
            bufferTime
        }

        const newTender = new tendersModel(obj);
        await newTender.validate();
        await newTender.save();
        return response(res, 200, { success: true, msg: 'Tender created...' })
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return response(res, 500, { success: false, msg: "validation error, unexpected value", errors, });
        }
        return response(res, 500, { success: false, error })
    }
}

// getting tenders for admin
const getTenders = async (req, res) => {
    try {
        const tenders = await tendersModel.find().sort({ createdAt: -1 });
        return response(res, 200, { success: true, tenders });
    } catch (error) {
        return response(res, 500, { success: false, error })
    }
}

//get tender for users
const getTendersForUser = async (req, res) => {
    try {
        const pipeline = [
            {
                $match: {
                    isClosed: false,
                    endTime: { $gt: Date.now() }
                }
            },
            {
                $lookup: {
                    from: 'bids',
                    localField: '_id',
                    foreignField: 'tenderId',
                    as: 'bids'
                }
            }
        ]
        const tenders = await tendersModel.aggregate(pipeline);
        return response(res, 200, { success: true, tenders });
    } catch (error) {
        return response(res, 500, { success: false, error })
    }
}

module.exports = { createNewTender, getTenders, getTendersForUser }