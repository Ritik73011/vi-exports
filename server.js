const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dbConnection = require('./config/config');
const tenderRoute = require('./routes/tenders.route');
const bidRoute = require('./routes/bids.route');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

//routes
app.use(tenderRoute);
app.use(bidRoute);


dbConnection().then(() => {
    app.listen(8000, () => {
        console.log("database is connected and server is listening on", 8000);
    })
}).catch((err) => {
    console.log("Connection error: " + err);
})