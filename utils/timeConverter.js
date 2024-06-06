function getDateFromTimestamp(timestampInMilliseconds) {
    return new Date(timestampInMilliseconds).toLocaleString();;
}


function convertDateTimeToTimestamp(dateTimeString) {
    const date = new Date(dateTimeString).toISOString();
    const timestamp = new Date(date);
    const miliseconds = timestamp.getMilliseconds();
    return miliseconds;
}

module.exports = { convertDateTimeToTimestamp, getDateFromTimestamp }