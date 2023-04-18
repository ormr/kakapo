import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

/**
 * Log a warning and show a toast!
 */

const excludedStatuses = [401];

export const errorLoggerMiddleware: Middleware = (_api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action) && !excludedStatuses.includes(action.payload.status)) {
    toast.error(action.payload.data.message);
  }

  return next(action);
};
