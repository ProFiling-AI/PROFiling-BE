export class CreateQuestionError extends Error {
  errorCode = "Q001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class NoSSTPathError extends Error {
  errorCode = "Q002";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class QuestionLessThan10Error extends Error {
  errorCode = "Q003";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export default {
  CreateQuestionError,
  NoSSTPathError,
  QuestionLessThan10Error,
};
