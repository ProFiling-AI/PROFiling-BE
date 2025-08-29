export class UserNotExistError extends Error {
  errorCode = "A001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class PasswordMismatchError extends Error {
  errorCode = "A002";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class TokenExpiredError extends Error {
  errorCode = "A003";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 401;
    this.data = data;
  }
}

export class RefreshTokenError extends Error {
  errorCode = "A004";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 403;
    this.data = data;
  }
}

export class AccessTokenError extends Error {
  errorCode = "A005";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 401;
    this.data = data;
  }
}

export class InvalidTokenError extends Error {
  errorCode = "A006";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 403;
    this.data = data;
  }
}

export class RefreshTokenMissingError extends Error {
  errorCode = "A007";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 401;
    this.data = data;
  }
}

export class UserAlreadyExistsError extends Error {
  errorCode = "A008";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class SendmailError extends Error {
  errorCode = "A009";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class DataBaseError extends Error {
  errorCode = "A010";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class EmailVerificationNotExistsError extends Error {
  errorCode = "A011";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class EmailVerificationExpiredError extends Error {
  errorCode = "A012";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class InvalidVerificationCodeError extends Error {
  errorCode = "A013";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class EmailVerificationError extends Error {
  errorCode = "A014";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class MissingAuthorizationHeader extends Error {
  errorCode = "A015";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class UserQuitError extends Error {
  errorCode = "A016";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 401;
    this.data = data;
  }
}

export class PasswordPolicyError extends Error {
  errorCode = "A017";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export default {
  UserNotExistError,
  PasswordMismatchError,
  TokenExpiredError,
  RefreshTokenError,
  AccessTokenError,
  InvalidTokenError,
  RefreshTokenMissingError,
  UserAlreadyExistsError,
  SendmailError,
  DataBaseError,
  EmailVerificationNotExistsError,
  EmailVerificationExpiredError,
  InvalidVerificationCodeError,
  EmailVerificationError,
  MissingAuthorizationHeader,
  UserQuitError,
  PasswordPolicyError,
};
