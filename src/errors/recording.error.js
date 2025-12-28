export class RecordingListError extends Error {
  errorCode = "R001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class BookmarkAddError extends Error {
  errorCode = "R002";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class RecordingNotFoundError extends Error {
  errorCode = "R003";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class BookmarkNotFoundError extends Error {
  errorCode = "R004";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class BookmarkDeleteError extends Error {
  errorCode = "R005";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class BookmarkListError extends Error {
  errorCode = "R006";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class MemoListError extends Error {
  errorCode = "R007";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class MemoCreateError extends Error {
  errorCode = "R008";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class MemoNotFoundError extends Error {
  errorCode = "R009";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class MemoAlreadyDeletedError extends Error {
  errorCode = "R010";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class DeleteMemoError extends Error {
  errorCode = "R011";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class RenameMemoError extends Error {
  errorCode = "R012";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class ModifyRecordingError extends Error {
  errorCode = "R013";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class EmptySearchKeywordError extends Error {
  errorCode = "R014";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export class RecordingSearchError extends Error {
  errorCode = "R015";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export default {
  RecordingListError,
  BookmarkAddError,
  RecordingNotFoundError,
  BookmarkNotFoundError,
  BookmarkDeleteError,
  BookmarkListError,
  MemoListError,
  MemoCreateError,
  MemoNotFoundError,
  MemoAlreadyDeletedError,
  DeleteMemoError,
  RenameMemoError,
  ModifyRecordingError,
  EmptySearchKeywordError,
  RecordingSearchError,
};
