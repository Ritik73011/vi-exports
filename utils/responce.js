
const response = (res, code, data) => {
    return res.status(code).send(data);
}
module.exports = { response }