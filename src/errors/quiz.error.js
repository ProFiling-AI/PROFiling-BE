export class CreateQuestionError extends Error {
  errorCode = "Q001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export default {
  CreateQuestionError,
};
