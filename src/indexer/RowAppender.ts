import { AppError, NullError } from '../error/AppError';
import { appendFile } from 'fs';

enum ErrorCodes {
  APPEND_FILE_ERROR= 1,
}

const FS_ERROR = 'FS_ERROR';

const AppendFileErrorCallback = (err) => {
  if (err)
    throw err;
};

export function RowAppender(path: string, row: string): AppError {
  try {
    appendFile(path, row, AppendFileErrorCallback);
    return new NullError();
  } catch (err) {
    return new AppError(FS_ERROR, ErrorCodes.APPEND_FILE_ERROR, err.message);
  }
}
