export class MyProfessorNoExistError extends Error {
  errorCode = "P001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 404;
    this.data = data;
  }
}

export class CreateProfessorReviewError extends Error {
  errorCode = "P002";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class CreateProfessorRatingError extends Error {
  errorCode = "P003";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class CreateProfessorExamError extends Error {
  errorCode = "P004";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class FindProfessorReviewError extends Error {
  errorCode = "P005";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 500;
    this.data = data;
  }
}

export default {
  MyProfessorNoExistError,
  CreateProfessorReviewError,
  CreateProfessorExamError,
  CreateProfessorRatingError,
  FindProfessorReviewError,
};
