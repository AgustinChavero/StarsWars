class ClientError extends Error {
  statusCode = 500;
  constructor(message, status = 500) {
    super(message);
    this.statusCode = status;
  }
}

module.exports = ClientError;
