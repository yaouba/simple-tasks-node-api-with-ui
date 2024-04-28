class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
  }
}

const createCustomError = (msg, statusCode = 500) => {
  return new CustomError(msg, statusCode)
}

module.exports = {
	createCustomError,
  CustomError
};
