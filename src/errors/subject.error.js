export class SubjectAlreadyExistError extends Error {
  errorCode = "S001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 409;
    this.data = data;
  }
}

export class SubjectNotExistError extends Error {
  errorCode = "S002";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 404;
    this.data = data;
  }
}

export class SubjectListError extends Error {
  errorCode = "S003";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 404;
    this.data = data;
  }
}

export class CreateSubjectError extends Error {
  errorCode = "S004";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class DeleteSubjectError extends Error {
  errorCode = "S005";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class ModifySubjectError extends Error {
  errorCode = "S006";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class RestoreSubjectError extends Error {
  errorCode = "S007";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class AddFavoriteSubjectError extends Error {
  errorCode = "S008";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class AddMyProfessorError extends Error {
  errorCode = "S009";
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
  SubjectListError,
  CreateSubjectError,
  DeleteSubjectError,
  ModifySubjectError,
  RestoreSubjectError,
  AddFavoriteSubjectError,
  AddMyProfessorError,
};
