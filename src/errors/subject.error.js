export class SubjectAlreadyExistError extends Error {
  errorCode = "S001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class SubjectNotExistError extends Error {
  errorCode = "S002";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class DeleteSubjectError extends Error {
  errorCode = "S004";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class ModifySubjectError extends Error {
  errorCode = "S005";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class RestoreSubjectError extends Error {
  errorCode = "S006";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export default {
  SubjectAlreadyExistError,
  SubjectNotExistError,
  DeleteSubjectError,
  ModifySubjectError,
  RestoreSubjectError,
};
