class CustomError extends Error{
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const customizeError = (msg, statusCode) => {
    return new customizeError(msg, statusCode)
}

module.exports = {customizeError, CustomError}