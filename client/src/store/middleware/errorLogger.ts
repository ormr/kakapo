import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const excludedStatuses = [401];

const errorLoggerMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action) && !excludedStatuses.includes(action.payload.status)) {
    toast.error(action.payload.data.message);
  }

  return next(action);
};

export default errorLoggerMiddleware;
