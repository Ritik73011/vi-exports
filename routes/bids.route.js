const express = require('express');
const route = express.Router();
const { body } = require('express-validator');
const { createNewBid, getAllBids } = require('../controllers/bids.controller');

//route validator
const bidValidator = [
    body('tenderId').notEmpty().withMessage('Tender id is required')
        .isMongoId("Invalid ID."),
    body('name').notEmpty().withMessage('Company name is required')
        .isString().isLength({ min: 3, max: 30 }).withMessage("Tender name must be string & between 3-30 characters")
        .trim().escape(),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email').escape(),
    body('bidTime').notEmpty().withMessage('Bid time is required').isString().withMessage("Bid time should be string").escape(),
    body('bidCost').notEmpty().withMessage('Bid cost is required').isNumeric().withMessage('Bid cost should be number').escape(),
]


route.post('/create-bid', bidValidator, createNewBid)
route.get('/get-bid', getAllBids);
module.exports = route;