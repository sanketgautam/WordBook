import httpStatus from 'http-status';

class Response{
  constructor(status,message,data, errors) {
    this.status = status;
    this.message = message || null;
    this.data = data || null;
    this.errors = errors || null;
    return {
          status: status,
          message:message,
          data: data,
          error: errors,
        };
     }
  }
export default Response;
