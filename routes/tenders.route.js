const express = require('express');
const route = express.Router();
const { body } = require('express-validator');
const { createNewTender, getTenders, assignTenderToUser } = require('../controllers/tenders.controller');

//route validator
const tenderValidator = [
    body('name').notEmpty().withMessage('Tender name is required')
        .isString().isLength({ min: 3, max: 50 }).withMessage("Tender name must be string & between 3-50 characters")
        .trim().escape(),
    body('description').notEmpty().withMessage('Tender description is required')
        .isString().isLength({ min: 3, max: 4000 }).withMessage("Tender description must be string & between 3-4000 characters")
        .trim().escape(),
    body('startTime').notEmpty().withMessage('Start time is required').escape(),
    body('endTime').notEmpty().withMessage('End time is required').escape(),
    body('bufferTime').notEmpty().withMessage('Buffer time is required').escape(),
]


route.post('/create-tender', tenderValidator, createNewTender)
route.get('/get-tenders', getTenders);
route.patch('/assign-tender', assignTenderToUser);
module.exports = route;