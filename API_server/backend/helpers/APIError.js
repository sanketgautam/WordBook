import httpStatus from 'http-status';

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(status,message,data,errors) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.isPublic = true;
    this.message = message;
    this.data = data || null;
    this.errors = errors || null;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(status = httpStatus.INTERNAL_SERVER_ERROR, message , data = {},errors = {}) {
    super(status,message, data, errors);
  }
}

export default APIError;
