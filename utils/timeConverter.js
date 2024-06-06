function getDateFromTimestamp(timestampInMilliseconds) {
    return new Date(timestampInMilliseconds).toLocaleString();;
}


function convertDateTimeToTimestamp(dateTimeString) {
    const date = new Date(dateTimeString);
    const timestamp = date.getTime();
    return timestamp;
}

module.exports = { convertDateTimeToTimestamp, getDateFromTimestamp }