const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dbConnection = require('./config/config');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

dbConnection().then(() => {
    app.listen(8000, () => {
        console.log("database is connected and server is listening on", 8000);
    })
}).catch((err) => {
    console.log("Connection error: " + err);
})