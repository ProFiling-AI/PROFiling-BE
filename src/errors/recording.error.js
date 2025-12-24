export class RecordingListError extends Error {
  errorCode = "R001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
    this.data = data;
  }
}

export default {
  RecordingListError,
};
