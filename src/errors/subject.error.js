export class SubjectAlreadyExistError extends Error {
  errorCode = "S001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export default {
  SubjectAlreadyExistError,
};
