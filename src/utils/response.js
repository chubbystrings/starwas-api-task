class ResponseStatus {
  constructor() {
    this.statusCode = null;
    this.status = null;
    this.data = null;
    this.message = null;
  }

  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.status = 'success';
  }

  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.status = 'error';
  }

  send(res) {
    const result = {
      status: this.status,
      message: this.message,
      data: this.data,
    };

    if (this.status === 'success') {
      return res.status(this.statusCode ? this.statusCode : 200).json(result);
    }

    return res.status(this.statusCode ? this.statusCode : 500).json({
      status: this.status,
      message: this.message,
      data: [],
    });
  }
}
export default ResponseStatus;
