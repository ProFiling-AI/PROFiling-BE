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

export default {
  RecordingListError,
  BookmarkAddError,
  RecordingNotFoundError,
};
